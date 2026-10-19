import { NextResponse } from 'next/server';
import {
  obterSessaoAtual,
  ROLE_OVERRIDE_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  gerarTokenSessao,
  SessionPayload,
} from '@/lib/auth';

export async function GET() {
  try {
    const sessao = await obterSessaoAtual();
    return NextResponse.json({
      sucesso: true,
      dados: sessao,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao obter sessão.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo } = body;

    const permitidos: SessionPayload['tipo'][] = ['admin', 'moderador', 'estudante'];
    if (!permitidos.includes(tipo)) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Papel inválido. Escolha: admin, moderador ou estudante.' },
        { status: 400 }
      );
    }

    const token = await gerarTokenSessao({
      usuarioId: 1,
      email: `${tipo}@codequest.dev`,
      tipo,
      nome:
        tipo === 'admin'
          ? 'Mestre Administrador'
          : tipo === 'moderador'
          ? 'Guardião Moderador'
          : 'Aventureiro Estudante',
    });

    const response = NextResponse.json({
      sucesso: true,
      mensagem: `Papel e sessão atualizados para "${tipo}" com sucesso.`,
      tipo,
    });

    // Atualiza tanto o cookie de sessão assinado quanto o cookie de simulação
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 86400,
    });

    response.cookies.set({
      name: ROLE_OVERRIDE_COOKIE_NAME,
      value: tipo,
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao alternar papel.' },
      { status: 500 }
    );
  }
}
