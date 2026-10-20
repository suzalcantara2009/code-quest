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

