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
