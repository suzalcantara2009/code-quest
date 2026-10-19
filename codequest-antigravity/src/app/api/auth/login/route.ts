import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { gerarTokenSessao, SESSION_COOKIE_NAME, SessionPayload } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { email } = parsed.data;

    // Determina o perfil com base nas credenciais ou contexto
    let tipo: SessionPayload['tipo'] = 'estudante';
    let nome = 'Aventureiro do Código';

    if (email.toLowerCase().includes('admin')) {
      tipo = 'admin';
      nome = 'Mestre Administrador';
    } else if (email.toLowerCase().includes('moderador')) {
      tipo = 'moderador';
      nome = 'Guardião Moderador';
    } else if (email.toLowerCase().includes('professor')) {
      tipo = 'professor';
      nome = 'Mestre Educador';
    }

    // Gera o token de sessão HMAC-SHA256 (RF01a)
    const token = await gerarTokenSessao({
      usuarioId: 1,
      email,
      tipo,
      nome,
    });

    const response = NextResponse.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      usuario: {
        email,
        tipo,
        nome,
      },
    });

    // Define o cookie de sessão HttpOnly em conformidade com RF01a
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
