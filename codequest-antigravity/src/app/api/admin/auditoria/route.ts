import { NextResponse } from 'next/server';
import { listarAuditorias } from '@/lib/admin-store';
import { obterSessaoAtual } from '@/lib/auth';

/**
 * RF18a / RN04: Consulta de logs de auditoria inviolável.
 * Somente leitura (GET). Mutações diretas nesta tabela são bloqueadas por regra de negócio.
 */
export async function GET(request: Request) {
  try {
    const sessao = await obterSessaoAtual();
    if (!sessao) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Não autenticado.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const busca = searchParams.get('busca') || undefined;
    const acao = searchParams.get('acao') || undefined;
    const periodo = searchParams.get('periodo') || undefined;

    const logs = await listarAuditorias({ busca, acao, periodo });

    return NextResponse.json({
      sucesso: true,
      dados: logs,
      total: logs.length,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao consultar logs de auditoria.' },
      { status: 500 }
    );
  }
}

// Bloqueio explícito de métodos de mutação para reforçar RN04
export async function POST() {
  return NextResponse.json(
    { sucesso: false, mensagem: 'Regra RN04: A tabela de auditoria é inviolável e não permite inserções manuais diretas.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { sucesso: false, mensagem: 'Regra RN04: A tabela de auditoria é imutável e não permite alterações (UPDATE).' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { sucesso: false, mensagem: 'Regra RN04: A tabela de auditoria é imutável e não permite exclusões (DELETE).' },
    { status: 405 }
  );
}

