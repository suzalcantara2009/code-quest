/**
 * CodeQuest - Gerenciador de Persistência de Progresso do Estudante
 * Salva e recupera o progresso de Aulas Técnicas e Sequência de Atividades
 * diretamente na tabela do banco de dados (Prisma ORM / PostgreSQL) com fallback resiliente.
 */

import { prisma } from './db';
import { AULAS_TRILHA } from './course-lessons';

export interface ProgressoUsuarioDTO {
  usuario_id: number;
  aulas_concluidas: Record<string, boolean>; // ex: { 'm1-aula-1': true }
  atividades_concluidas: Record<string, boolean>; // ex: { 'atv-m1-a1-p1': true }
  progresso_modulos: Record<
    number,
    {
      modulo_id: number;
      total_aulas: number;
      aulas_concluidas: number;
      total_atividades: number;
      atividades_concluidas: number;
      porcentagem: number;
    }
  >;
  total_xp: number;
}

// Fallback em memória para ambiente de desenvolvimento / modo offline
interface MemoriaProgresso {
  aulas: Map<string, { usuario_id: number; modulo_id: number; aula_id: string; concluida: boolean; data_conclusao: Date }>;
  atividades: Map<string, { usuario_id: number; modulo_id: number; aula_id: string; atividade_id: string; concluida: boolean; data_conclusao: Date }>;
}

const memoriaStore: MemoriaProgresso = {
  aulas: new Map(),
  atividades: new Map(),
};

/**
 * Salva a conclusão ou desmarcação de uma Aula Técnica na tabela progresso_aulas
 */
export async function salvarProgressoAula(
  usuarioId: number,
  moduloId: number,
  aulaId: string,
  concluida: boolean = true
): Promise<{ sucesso: boolean; mensagem: string; concluida: boolean }> {
  const chave = `${usuarioId}_${moduloId}_${aulaId}`;

  // 1. Atualiza cache em memória para resposta instantânea
  memoriaStore.aulas.set(chave, {
    usuario_id: usuarioId,
    modulo_id: moduloId,
    aula_id: aulaId,
    concluida,
    data_conclusao: new Date(),
  });

  // 2. Persiste na tabela progresso_aulas do banco de dados (Prisma)
  try {
    if (concluida) {
      await prisma.progressoAula.upsert({
        where: {
          usuario_id_modulo_id_aula_id: {
            usuario_id: usuarioId,
            modulo_id: moduloId,
            aula_id: aulaId,
          },
        },
        update: {
          concluida: true,
          data_conclusao: new Date(),
        },
        create: {
          usuario_id: usuarioId,
          modulo_id: moduloId,
          aula_id: aulaId,
          concluida: true,
        },
      });
    } else {
      await prisma.progressoAula.deleteMany({
        where: {
          usuario_id: usuarioId,
          modulo_id: moduloId,
          aula_id: aulaId,
        },
      });
    }
  } catch (error) {
    // Fallback silencioso: se o banco PostgreSQL não estiver conectado em dev,
    // a memória local sustenta a operação sem quebrar a experiência do usuário.
    console.warn('[DB_PROGRESSO] Banco de dados indisponível, usando persistência em memória local:', error);
  }

  return {
    sucesso: true,
    mensagem: concluida
      ? 'Aula técnica concluída com sucesso! Progresso salvo na trilha.'
      : 'Aula marcada como pendente.',
    concluida,
  };
}

/**
 * Salva a conclusão de uma atividade prática na tabela progresso_atividades
 */
export async function salvarProgressoAtividade(
  usuarioId: number,
  moduloId: number,
  aulaId: string,
  atividadeId: string,
  concluida: boolean = true,
  codigoSubmetido?: string
): Promise<{ sucesso: boolean; mensagem: string; concluida: boolean }> {
  const chave = `${usuarioId}_${atividadeId}`;

  // 1. Atualiza cache em memória
  memoriaStore.atividades.set(chave, {
    usuario_id: usuarioId,
    modulo_id: moduloId,
    aula_id: aulaId,
    atividade_id: atividadeId,
    concluida,
    data_conclusao: new Date(),
  });

  // 2. Persiste na tabela progresso_atividades do banco de dados
  try {
    if (concluida) {
      await prisma.progressoAtividade.upsert({
        where: {
          usuario_id_atividade_id: {
            usuario_id: usuarioId,
            atividade_id: atividadeId,
          },
        },
        update: {
          modulo_id: moduloId,
          aula_id: aulaId,
          concluida: true,
          codigo_submetido: codigoSubmetido || null,
          data_conclusao: new Date(),
        },
        create: {
          usuario_id: usuarioId,
          modulo_id: moduloId,
          aula_id: aulaId,
          atividade_id: atividadeId,
          concluida: true,
          codigo_submetido: codigoSubmetido || null,
        },
      });
    } else {
      await prisma.progressoAtividade.deleteMany({
        where: {
          usuario_id: usuarioId,
          atividade_id: atividadeId,
        },
      });
    }
  } catch (error) {
    console.warn('[DB_PROGRESSO] Banco indisponível ao salvar atividade, operando em memória:', error);
  }

  return {
    sucesso: true,
    mensagem: concluida
      ? 'Atividade prática superada com sucesso! Progresso salvo.'
      : 'Atividade desmarcada.',
    concluida,
  };
}

/**
 * Obtém o estado consolidado de progresso do usuário no banco de dados e memória
 */
export async function obterProgressoUsuario(usuarioId: number): Promise<ProgressoUsuarioDTO> {
  const aulasConcluidas: Record<string, boolean> = {};
  const atividadesConcluidas: Record<string, boolean> = {};

  // 1. Lê do banco de dados caso disponível
  try {
    const registrosAulas = await prisma.progressoAula.findMany({
      where: { usuario_id: usuarioId, concluida: true },
    });

    for (const r of registrosAulas) {
      aulasConcluidas[r.aula_id] = true;
    }

    const registrosAtividades = await prisma.progressoAtividade.findMany({
      where: { usuario_id: usuarioId, concluida: true },
    });

    for (const a of registrosAtividades) {
      atividadesConcluidas[a.atividade_id] = true;
    }
  } catch (error) {
    // Se o banco estiver offline, usa os dados acumulados na memória
  }

  // 2. Mescla com o armazenamento em memória
  memoriaStore.aulas.forEach((item) => {
    if (item.usuario_id === usuarioId && item.concluida) {
      aulasConcluidas[item.aula_id] = true;
    }
  });

  memoriaStore.atividades.forEach((item) => {
    if (item.usuario_id === usuarioId && item.concluida) {
      atividadesConcluidas[item.atividade_id] = true;
    }
  });

  // 3. Calcula o percentual e métricas por módulo (1 a 4)
  const progressoModulos: ProgressoUsuarioDTO['progresso_modulos'] = {};
  let totalXP = 0;

  for (const moduloId of [1, 2, 3, 4]) {
    const aulas = AULAS_TRILHA[moduloId] || [];
    const totalAulas = aulas.length;
    let aulasFeitas = 0;
    let totalAtividades = 0;
    let atividadesFeitas = 0;

    for (const aula of aulas) {
      if (aulasConcluidas[aula.id]) {
        aulasFeitas++;
        totalXP += aula.xpRecompensa;
      }

      for (const atv of aula.sequenciaAtividades) {
        totalAtividades++;
        if (atividadesConcluidas[atv.id]) {
          atividadesFeitas++;
          totalXP += atv.xp;
        }
      }
    }

    // O peso é 50% aulas teóricas e 50% atividades práticas
    const percAulas = totalAulas > 0 ? (aulasFeitas / totalAulas) * 50 : 0;
    const percAtv = totalAtividades > 0 ? (atividadesFeitas / totalAtividades) * 50 : 0;
    const porcentagem = Math.min(100, Math.round(percAulas + percAtv));

    progressoModulos[moduloId] = {
      modulo_id: moduloId,
      total_aulas: totalAulas,
      aulas_concluidas: aulasFeitas,
      total_atividades: totalAtividades,
      atividades_concluidas: atividadesFeitas,
      porcentagem,
    };
  }

  return {
    usuario_id: usuarioId,
    aulas_concluidas: aulasConcluidas,
    atividades_concluidas: atividadesConcluidas,
    progresso_modulos: progressoModulos,
    total_xp: totalXP,
  };
}
