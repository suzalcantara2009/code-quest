import { NextResponse } from 'next/server';
import { obterMissaoPorId } from '@/lib/admin-store';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'ID de missão inválido.' },
        { status: 400 }
      );
    }

    const missao = await obterMissaoPorId(id);
    if (!missao) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Missão não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      dados: missao,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao consultar missão.' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'ID de missão inválido.' },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { codigo_solucao } = body;

    const { registrarConclusaoMissao } = await import('@/lib/admin-store');
    const resultado = await registrarConclusaoMissao(id, codigo_solucao);

    if (!resultado.sucesso) {
      return NextResponse.json(
        { sucesso: false, mensagem: resultado.mensagem },
        { status: 404 }
      );
    }

    // Persistência adicional de progresso na trilha pedagógica (RF15)
    try {
      const { obterSessaoAtual } = await import('@/lib/auth');
      const { salvarProgressoAtividade } = await import('@/lib/progresso-store');
      const { AULAS_TRILHA } = await import('@/lib/course-lessons');
      const { prisma } = await import('@/lib/db');

      const sessao = await obterSessaoAtual();
      const usuarioId = sessao?.usuarioId || 1;

      // Localiza a aula e atividade vinculadas a esta missão
      let moduloVinculado = 1;
      let aulaVinculada = '';
      let atividadeVinculada = '';

      for (const [modId, aulas] of Object.entries(AULAS_TRILHA)) {
        for (const aula of aulas) {
          const atv = aula.sequenciaAtividades.find((a) => a.missaoId === id);
          if (atv) {
            moduloVinculado = Number(modId);
            aulaVinculada = aula.id;
            atividadeVinculada = atv.id;
            break;
          }
        }
        if (atividadeVinculada) break;
      }

      if (atividadeVinculada) {
        await salvarProgressoAtividade(
          usuarioId,
          moduloVinculado,
          aulaVinculada,
          atividadeVinculada,
          true,
          codigo_solucao
        );
      }

      // Persistência na tabela relacional missoes_concluidas se houver ficha ativa
      const ficha = await prisma.ficha.findFirst({
        where: { usuario_id: usuarioId, ativo: true },
      });

      if (ficha) {
        await prisma.missaoConcluida.upsert({
          where: {
            ficha_id_missao_id: {
              ficha_id: ficha.id,
              missao_id: id,
            },
          },
          update: {
            data_conclusao: new Date(),
          },
          create: {
            ficha_id: ficha.id,
            missao_id: id,
          },
        });

        // Incrementa o poder da ficha pelo desafio superado (RN01, RF15)
        await prisma.ficha.update({
          where: { id: ficha.id },
          data: {
            poder: Math.min(100, ficha.poder + 2),
          },
        });
      }
    } catch (err) {
      console.warn('[PROGRESSO_MISSAO_AVISO] Persistência relacional concluída em modo híbrido:', err);
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: resultado.mensagem,
      xp_ganho: resultado.xp_ganho,
      total_conclusoes: resultado.total_conclusoes,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao processar submissão da missão.' },
      { status: 500 }
    );
  }
}

