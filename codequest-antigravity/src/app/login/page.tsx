'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { loginSchema } from '@/lib/validations/auth';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const erroParam = searchParams.get('erro');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [toastSucesso, setToastSucesso] = useState<string | null>(null);

  const executarLogin = async (emailLogin: string, senhaLogin: string) => {
    setCarregando(true);
    setErros({});
    setErroGeral(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
      });

      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        if (data.erros) {
          const fieldErrors: Record<string, string> = {};
          Object.keys(data.erros).forEach((key) => {
            fieldErrors[key] = Array.isArray(data.erros[key]) ? data.erros[key][0] : data.erros[key];
          });
          setErros(fieldErrors);
        } else {
          setErroGeral(data.mensagem || 'E-mail ou senha incorretos.');
        }
        return;
      }

      const tipo = data.usuario?.tipo || 'estudante';
      const destino = redirectParam || (tipo === 'admin' || tipo === 'moderador' ? '/admin' : '/fichas');
      setToastSucesso(`Acesso liberado como ${tipo.toUpperCase()}! Entrando...`);

      // Usa window.location.href para forçar atualização integral dos cookies no middleware
      setTimeout(() => {
        window.location.href = destino;
      }, 700);
    } catch {
      setErroGeral('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});
    setErroGeral(null);

    // Validação usando Zod (RI01, RI07, RNF02)
    const validacao = loginSchema.safeParse({ email, senha });
    if (!validacao.success) {
      const errosFormatados: Record<string, string> = {};
      validacao.error.errors.forEach((err) => {
        if (err.path[0]) {
          errosFormatados[err.path[0] as string] = err.message;
        }
      });
      setErros(errosFormatados);
      return;
    }

    await executarLogin(email, senha);
  };

  const handleLoginRapido = (tipo: 'admin' | 'moderador' | 'estudante') => {
    const credenciais = {
      admin: { email: 'admin@codequest.dev', senha: 'senha123admin' },
      moderador: { email: 'moderador@codequest.dev', senha: 'senha123mod' },
      estudante: { email: 'estudante@codequest.dev', senha: 'senha123user' },
    }[tipo];

    setEmail(credenciais.email);
    setSenha(credenciais.senha);
    executarLogin(credenciais.email, credenciais.senha);
  };

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Toast de Sucesso (RI09) */}
      {toastSucesso && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast tipo="success" mensagem={toastSucesso} aoFechar={() => setToastSucesso(null)} />
        </div>
      )}

      {/* Alerta de Redirecionamento de Proteção de Rota */}
      {redirectParam && redirectParam.startsWith('/admin') && (
        <div className="mb-4 p-3.5 rounded-xl bg-amber-950/70 border border-amber-700/80 text-amber-200 text-xs flex items-start gap-2.5 shadow-xl animate-in fade-in">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Acesso Restrito:</strong> A rota <code>{redirectParam}</code> exige identificação de{' '}
            <strong>Administrador</strong> ou <strong>Moderador</strong>. Efetue login para prosseguir.
          </div>
        </div>
      )}

      {erroParam === 'permissao_negada' && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-700/80 text-red-200 text-xs flex items-start gap-2.5 shadow-xl animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Permissão Insuficiente:</strong> Sua conta atual não possui o perfil de Administrador ou Moderador necessário. Entre com uma conta autorizada.
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-3">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Portal de Acesso CodeQuest</h1>
        <p className="text-sm text-slate-400 mt-1">
          Identifique-se para entrar nas dependências do reino
        </p>
      </div>

      <Card className="border-quest-border bg-quest-surface/90 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-100">Autenticação</CardTitle>
          <CardDescription>
            Informe seu e-mail e senha para desbloquear seu acesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* BOTÕES DE ACESSO RÁPIDO COM 1-CLIQUE */}
          <div className="p-3 rounded-lg bg-slate-900 border border-quest-border space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Acesso Rápido de Teste (1 Clique):</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={carregando}
                onClick={() => handleLoginRapido('admin')}
                className="text-xs bg-amber-950/30 border-amber-800/80 text-amber-300 hover:bg-amber-900/40"
              >
                🛡️ Entrar como Admin
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={carregando}
                onClick={() => handleLoginRapido('moderador')}
                className="text-xs bg-indigo-950/30 border-indigo-800/80 text-indigo-300 hover:bg-indigo-900/40"
              >
                ⚖️ Entrar como Mod
              </Button>
            </div>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-quest-surface px-2 text-slate-500">ou digite suas credenciais</span>
            </div>
          </div>

          {erroGeral && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{erroGeral}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CAMPO DE E-MAIL */}
            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="ex: admin@codequest.dev"
              required
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={erros.email}
              autoComplete="email"
              disabled={carregando}
            />

            {/* CAMPO DE SENHA */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Senha <span className="text-red-400">*</span></span>
                <Link
                  href="/esqueci-senha"
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="••••••••"
                required
                leftIcon={<Lock className="w-4 h-4" />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="text-slate-400 hover:text-white transition focus:outline-none"
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                error={erros.senha}
                autoComplete="current-password"
                disabled={carregando}
              />
            </div>

            {/* BOTÃO SUBMIT */}
            <Button
              type="submit"
              className="w-full font-semibold py-2.5 text-sm gap-2"
              isLoading={carregando}
              disabled={carregando}
            >
              <span>Entrar no Sistema</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* LOGIN SOCIAL VIA GITHUB OAUTH (RF01b) */}
          <div className="pt-2">
            <a
              href={`/api/auth/github${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`}
              className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-colors border border-slate-700 bg-slate-950/70 hover:bg-slate-800 hover:border-slate-600 text-slate-200 gap-2.5 text-xs sm:text-sm py-2.5"
            >
              <Github className="w-4 h-4 text-white" />
              <span>Entrar com conta do GitHub (OAuth)</span>
            </a>
          </div>
        </CardContent>

        <CardFooter className="justify-center border-t border-slate-800 text-xs sm:text-sm text-slate-400 pt-4">
          Ainda não possui personagem?{' '}
          <Link
            href="/cadastro"
            className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline ml-1"
          >
            Criar conta agora
          </Link>
        </CardFooter>
      </Card>

      <p className="text-center text-[11px] text-slate-500 mt-6 flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" />
        Painel protegido por middleware com validação de cookies HttpOnly (RF01a).
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 relative py-12">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <Suspense fallback={<div className="text-slate-400 text-sm">Carregando portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
