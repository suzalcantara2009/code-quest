import { NextResponse } from 'next/server';
import { listarMissoesAdmin, cadastrarMissaoAdmin } from '@/lib/admin-store';
import { missaoSchema } from '@/lib/validations/missao';
import { obterSessaoAtual } from '@/lib/auth';

export async function GET() {
  try {
    const missoes = await listarMissoesAdmin();
    return NextResponse.json({
      sucesso: true,
      dados: missoes,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao listar missões administrativas.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessao = await obterSessaoAtual();
    if (!sessao) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Não autenticado.' },
        { status: 401 }
      );
    }

    // Regra RN05: Apenas perfil Administrador pode cadastrar missões oficiais
    if (sessao.tipo !== 'admin') {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: 'Regra RN05: Apenas usuários com perfil Administrador podem criar missões e módulos oficiais.',
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = missaoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erros: parsed.error.flatten().fieldErrors,
          mensagem: 'Dados inválidos para cadastro da missão.',
        },
        { status: 422 }
      );
    }

    const resultado = await cadastrarMissaoAdmin({
      modulo_id: parsed.data.modulo_id,
      titulo: parsed.data.titulo,
      enunciado: parsed.data.enunciado,
      dificuldade: parsed.data.dificuldade,
      criterio_aceite: parsed.data.criterio_aceite,
      codigo_inicial: parsed.data.codigo_inicial,
      adminId: sessao.usuarioId,
      adminNome: sessao.nome || 'Mestre Administrador',
      adminTipo: sessao.tipo,
    });

    if (!resultado.sucesso) {
      return NextResponse.json(resultado, { status: 400 });
    }

    return NextResponse.json(resultado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao cadastrar missão.' },
      { status: 500 }
    );
  }
}

