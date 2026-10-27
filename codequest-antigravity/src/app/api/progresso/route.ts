import { NextResponse } from 'next/server';
import { obterSessaoAtual } from '@/lib/auth';
import {
  obterProgressoUsuario,
  salvarProgressoAula,
  salvarProgressoAtividade,
} from '@/lib/progresso-store';

export async function GET(request: Request) {
  try {
    const sessao = await obterSessaoAtual();
    // Se o estudante estiver autenticado usa o ID dele, senão usa ID 1 (sessão de demonstração)
    const usuarioId = sessao?.usuarioId || 1;

    const progresso = await obterProgressoUsuario(usuarioId);

    return NextResponse.json({
      sucesso: true,
      dados: progresso,
    });
  } catch (error) {
    console.error('[API_PROGRESSO_GET_ERRO]', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao carregar o progresso do estudante.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessao = await obterSessaoAtual();
    const usuarioId = sessao?.usuarioId || 1;

    const body = await request.json().catch(() => ({}));
    const { tipo, modulo_id, aula_id, atividade_id, concluida, codigo_submetido } = body;

    if (!tipo || !modulo_id || !aula_id) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: 'Parâmetros obrigatórios ausentes: tipo, modulo_id e aula_id.',
        },
        { status: 400 }
      );
    }

    const estaConcluida = concluida !== undefined ? Boolean(concluida) : true;
    const modId = Number(modulo_id);

    if (tipo === 'aula') {
      const resultado = await salvarProgressoAula(usuarioId, modId, String(aula_id), estaConcluida);
      const progressoAtualizado = await obterProgressoUsuario(usuarioId);

      return NextResponse.json({
        sucesso: true,
        mensagem: resultado.mensagem,
        dados: {
          concluida: resultado.concluida,
          progresso: progressoAtualizado,
        },
      });
    }

    if (tipo === 'atividade') {
      if (!atividade_id) {
        return NextResponse.json(
          { sucesso: false, mensagem: 'O campo atividade_id é obrigatório para o tipo atividade.' },
          { status: 400 }
        );
      }

      const resultado = await salvarProgressoAtividade(
        usuarioId,
        modId,
        String(aula_id),
        String(atividade_id),
        estaConcluida,
        codigo_submetido
      );
      const progressoAtualizado = await obterProgressoUsuario(usuarioId);

      return NextResponse.json({
        sucesso: true,
        mensagem: resultado.mensagem,
        dados: {
          concluida: resultado.concluida,
          progresso: progressoAtualizado,
        },
      });
    }

    return NextResponse.json(
      { sucesso: false, mensagem: 'Tipo de progresso inválido (use "aula" ou "atividade").' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[API_PROGRESSO_POST_ERRO]', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao salvar progresso na base de dados.' },
      { status: 500 }
    );
  }
}

