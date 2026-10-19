import { NextResponse } from 'next/server';
import {
  trocarCodigoPorAccessToken,
  obterPerfilGithub,
  GithubUserProfile,
} from '@/lib/github-oauth';
import { gerarTokenSessao, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const isDemo = url.searchParams.get('demo') === 'true';
  const state = url.searchParams.get('state');

  let destinoFinal = '/fichas';
  if (state) {
    try {
      destinoFinal = decodeURIComponent(state);
    } catch {}
  }

  let perfilGithub: GithubUserProfile | null = null;

  // 1. Fluxo oficial com código de autorização do GitHub
  if (code) {
    const accessToken = await trocarCodigoPorAccessToken(code);
    if (accessToken) {
      perfilGithub = await obterPerfilGithub(accessToken);
    }
  } else if (isDemo) {
    // 2. Fluxo de demonstração de desenvolvedor (RF01b)
    perfilGithub = {
      id: 583231,
      login: 'octocat-dev',
      name: 'Octocat Desenvolvedor',
      email: 'octocat@github.codequest.dev',
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    };
  }

  // Falha na autenticação OAuth
  if (!perfilGithub) {
    const loginErrorUrl = new URL('/login', request.url);
    loginErrorUrl.searchParams.set('erro', 'oauth_falhou');
    return NextResponse.redirect(loginErrorUrl);
  }

  // 3. Emissão de sessão em conformidade com RF01a e RF01b
  const tipo = perfilGithub.email?.includes('admin')
    ? 'admin'
    : perfilGithub.email?.includes('moderador')
    ? 'moderador'
    : 'estudante';

  const tokenSessao = await gerarTokenSessao({
    usuarioId: typeof perfilGithub.id === 'number' ? perfilGithub.id : 101,
    email: perfilGithub.email || `${perfilGithub.login}@github.codequest.dev`,
    tipo,
    nome: perfilGithub.name || perfilGithub.login,
  });

  const response = NextResponse.redirect(new URL(destinoFinal, request.url));

  // Grava o cookie HttpOnly de sessão
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: tokenSessao,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  });

  // Grava o username do GitHub vinculado para preenchimento automático de fichas (RF01b)
  response.cookies.set({
    name: 'codequest_github_username',
    value: perfilGithub.login,
    path: '/',
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}

