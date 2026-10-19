/**
 * CodeQuest - Utilitários de Integração OAuth com GitHub (RF01b, RNF05)
 */

import { gerarTokenSessao, SESSION_COOKIE_NAME, SessionPayload } from '@/lib/auth';

export interface GithubUserProfile {
  id: number | string;
  login: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}

export function obterGithubOAuthConfig() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID || '';
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET || '';
  const isConfigurado =
    clientId.trim() !== '' &&
    clientId !== 'seu_github_oauth_client_id' &&
    clientSecret.trim() !== '' &&
    clientSecret !== 'seu_github_oauth_client_secret';

  return {
    clientId,
    clientSecret,
    isConfigurado,
  };
}

/**
 * Troca o authorization code pelo access_token na API do GitHub
 */
export async function trocarCodigoPorAccessToken(code: string): Promise<string | null> {
  const { clientId, clientSecret } = obterGithubOAuthConfig();

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await res.json();
    return data.access_token || null;
  } catch (error) {
    console.error('[GITHUB_OAUTH] Falha ao trocar code por access_token:', error);
    return null;
  }
}

/**
 * Obtém os dados do perfil do usuário na API do GitHub
 */
export async function obterPerfilGithub(accessToken: string): Promise<GithubUserProfile | null> {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'CodeQuest-Platform',
      },
    });

    if (!res.ok) return null;
    const userData = await res.json();

    let email = userData.email;

    // Se o email principal for privado, busca na lista de emails verificados
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'CodeQuest-Platform',
        },
      });

      if (emailRes.ok) {
        const emails = await emailRes.json();
        const primary = emails.find((e: { primary: boolean; verified: boolean }) => e.primary && e.verified);
        if (primary) email = primary.email;
        else if (emails.length > 0) email = emails[0].email;
      }
    }

    return {
      id: userData.id,
      login: userData.login,
      name: userData.name || userData.login,
      email: email || `${userData.login}@users.noreply.github.com`,
      avatar_url: userData.avatar_url,
    };
  } catch (error) {
    console.error('[GITHUB_OAUTH] Falha ao buscar perfil do usuário no GitHub:', error);
    return null;
  }
}

