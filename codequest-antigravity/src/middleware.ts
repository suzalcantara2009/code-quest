import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'codequest_session';
const SECRET_KEY = process.env.SESSION_SECRET || 'codequest-super-secret-key-32-chars-long!!';

// Utilitário para decodificar Base64URL no Edge Runtime
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

// Verificação de assinatura criptográfica HMAC-SHA256 no Edge Runtime
async function verificarTokenHMAC(
  token: string
): Promise<{ tipo: string; usuarioId: number; email: string; expiraEm?: number } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [dataB64, signatureB64] = parts;

    const decodedJson = base64UrlDecode(dataB64);
    const payload = JSON.parse(decodedJson);

    // Se a sessão expirou
    if (payload.expiraEm && Date.now() > payload.expiraEm) {
      return null;
    }

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const expectedSigRaw = base64UrlDecode(signatureB64);
    const sigBytes = new Uint8Array(expectedSigRaw.length);
    for (let i = 0; i < expectedSigRaw.length; i++) {
      sigBytes[i] = expectedSigRaw.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(dataB64));
    if (isValid && payload && payload.tipo) {
      return payload;
    }

    return null;
  } catch {
    return null;
  }
}

// Extrai e valida a identidade contida no cookie de sessão do usuário
async function obterUsuarioDaSessao(
  req: NextRequest
): Promise<{ tipo: string; usuarioId: number; email: string } | null> {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  // 1. Token com assinatura HMAC
  if (sessionToken.includes('.')) {
    const usuarioHMAC = await verificarTokenHMAC(sessionToken);
    if (usuarioHMAC) return usuarioHMAC;
  }

  // 2. Cookie JSON ou URL-encoded (para testes manuais ou desenvolvimento)
  try {
    const decoded = decodeURIComponent(sessionToken);
    if (decoded.startsWith('{') && decoded.endsWith('}')) {
      const parsed = JSON.parse(decoded);
      if (parsed && typeof parsed === 'object' && parsed.tipo) {
        return {
          usuarioId: parsed.usuarioId || 1,
          email: parsed.email || 'usuario@codequest.dev',
          tipo: parsed.tipo,
        };
      }
    }
  } catch {}

  // 3. Cookie com string do tipo direto (ex: "admin" ou "moderador")
  if (['admin', 'moderador', 'estudante', 'professor'].includes(sessionToken)) {
    return {
      usuarioId: 1,
      email: `${sessionToken}@codequest.dev`,
      tipo: sessionToken,
    };
  }

  return null;
}

/**
 * Middleware de Proteção Estrita das Rotas /admin
 * Bloqueia e redireciona para /login qualquer tentativa de acesso
 * a rotas iniciadas com /admin sem sessão válida de 'admin' ou 'moderador'.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Intercepta qualquer rota que comece com /admin
  if (pathname.startsWith('/admin') || pathname === '/admin') {
    const usuario = await obterUsuarioDaSessao(req);

    // Sem sessão válida de 'admin' ou 'moderador': bloqueia e redireciona para /login
    if (!usuario || (usuario.tipo !== 'admin' && usuario.tipo !== 'moderador')) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      if (usuario) {
        loginUrl.searchParams.set('erro', 'permissao_negada');
      }
      return NextResponse.redirect(loginUrl);
    }

    // Sessão válida de 'admin' ou 'moderador': permite acesso
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', String(usuario.usuarioId));
    requestHeaders.set('x-user-role', usuario.tipo);
    requestHeaders.set('x-user-email', usuario.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
