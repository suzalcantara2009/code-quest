import { NextResponse } from 'next/server';
import { listarMissoesPublicas } from '@/lib/admin-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dificuldade = searchParams.get('dificuldade') || undefined;
    const moduloIdParam = searchParams.get('modulo_id');
    const modulo_id = moduloIdParam ? Number(moduloIdParam) : undefined;

    const missoes = await listarMissoesPublicas({
      dificuldade,
      modulo_id,
    });

    return NextResponse.json({
      sucesso: true,
      dados: missoes,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao listar missões do catálogo.' },
      { status: 500 }
    );
  }
}
