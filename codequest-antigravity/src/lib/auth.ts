import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// RNF01 - Hash com bcrypt (custo >= 10)
const BCRYPT_SALT_ROUNDS = 10;

export const SESSION_COOKIE_NAME = 'codequest_session';
export const ROLE_OVERRIDE_COOKIE_NAME = 'codequest_role_sim';

const SECRET_KEY = process.env.SESSION_SECRET || 'codequest-super-secret-key-32-chars-long!!';

export async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, BCRYPT_SALT_ROUNDS);
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash);
}

// Estrutura para gerenciamento de sessão e tokens (RF01a, RF01e)
export interface SessionPayload {
  usuarioId: number;
  email: string;
  tipo: 'estudante' | 'professor' | 'moderador' | 'admin';
  nome?: string;
  expiraEm?: number; // timestamp em ms
}

// Helpers para Web Crypto HMAC-SHA256 (compatível com Node.js e Edge Runtime)
function base64UrlEncode(str: string): string {
  if (typeof btoa === 'function') {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return Buffer.from(str, 'utf-8').toString('base64url');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  if (typeof atob === 'function') {
    return atob(base64);
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function gerarTokenSessao(payload: SessionPayload): Promise<string> {
  const key = await getCryptoKey();
  const data = JSON.stringify({
    ...payload,
    // Validade padrão: 7 dias (RF01a)
    expiraEm: payload.expiraEm || Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const dataB64 = base64UrlEncode(data);

  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(dataB64));
  const sigBytes = new Uint8Array(signatureBuffer);
  let binary = '';
  for (let i = 0; i < sigBytes.length; i++) {
    binary += String.fromCharCode(sigBytes[i]);
  }
  const signatureB64 = base64UrlEncode(binary);

  return `${dataB64}.${signatureB64}`;
}

export async function verificarTokenSessao(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [dataB64, signatureB64] = parts;

    const key = await getCryptoKey();
    const enc = new TextEncoder();

    const expectedSigRaw = base64UrlDecode(signatureB64);
    const sigBytes = new Uint8Array(expectedSigRaw.length);
    for (let i = 0; i < expectedSigRaw.length; i++) {
      sigBytes[i] = expectedSigRaw.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(dataB64));
    if (!isValid) return null;

    const decodedJson = base64UrlDecode(dataB64);
    const payload = JSON.parse(decodedJson) as SessionPayload;

    if (payload.expiraEm && Date.now() > payload.expiraEm) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Obtém a sessão do usuário logado via cookies (RF01a).
 * Compatível com Server Components e Route Handlers.
 */
export async function obterSessaoAtual(): Promise<SessionPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const simRole = cookieStore.get(ROLE_OVERRIDE_COOKIE_NAME)?.value;

    if (token) {
      const payload = await verificarTokenSessao(token);
      if (payload) {
        // Se houver uma simulação de papel ativa pelo switcher de teste, aplica-a
        if (simRole && ['estudante', 'professor', 'moderador', 'admin'].includes(simRole)) {
          return {
            ...payload,
            tipo: simRole as SessionPayload['tipo'],
          };
        }
        return payload;
      }
    }

    // Caso não haja token assinado, mas haja simulação ativa de teste
    if (simRole && ['estudante', 'professor', 'moderador', 'admin'].includes(simRole)) {
      return {
        usuarioId: 1,
        email: `${simRole}@codequest.dev`,
        nome: simRole === 'admin' ? 'Mestre Supremo (Admin)' : 'Guardião Moderador',
        tipo: simRole as SessionPayload['tipo'],
      };
    }

    // Sem sessão válida
    return null;
  } catch (error) {
    return null;
  }
}

export async function criarSessao(
  usuarioId: number,
  email: string = 'usuario@codequest.dev',
  tipo: SessionPayload['tipo'] = 'admin',
  nome: string = 'Herói do Código'
): Promise<string> {
  return gerarTokenSessao({
    usuarioId,
    email,
    tipo,
    nome,
  });
}

export async function revogarSessao(refreshTokenHash: string): Promise<void> {
  // Lógica de revogação de sessão
}

export async function revogarTodasSessoes(usuarioId: number): Promise<void> {
  // RF01e - Encerrar todas as sessões
}
