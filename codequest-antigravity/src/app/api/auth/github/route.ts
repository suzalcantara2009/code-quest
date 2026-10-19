import { NextResponse } from 'next/server';
import { obterGithubOAuthConfig } from '@/lib/github-oauth';

export async function GET(request: Request) {
  const { clientId, isConfigurado } = obterGithubOAuthConfig();
  const requestUrl = new URL(request.url);
  const redirectParam = requestUrl.searchParams.get('redirect') || '/fichas';

  // Se as credenciais estiverem configuradas, inicia o fluxo oficial com o GitHub
  if (isConfigurado) {
    const callbackUrl = new URL('/api/auth/github/callback', request.url).toString();
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', clientId);
    githubAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    githubAuthUrl.searchParams.set('scope', 'read:user user:email');
    githubAuthUrl.searchParams.set('state', encodeURIComponent(redirectParam));

    return NextResponse.redirect(githubAuthUrl.toString());
  }

  // Modo de demonstração / homologação quando GITHUB_OAUTH_CLIENT_ID ainda não foi cadastrado no GitHub
  // Permite validar todo o fluxo de vinculação de conta e emissão de sessão (RF01b)
  const demoCallbackUrl = new URL('/api/auth/github/callback', request.url);
  demoCallbackUrl.searchParams.set('demo', 'true');
  demoCallbackUrl.searchParams.set('state', encodeURIComponent(redirectParam));

  return NextResponse.redirect(demoCallbackUrl.toString());
}

