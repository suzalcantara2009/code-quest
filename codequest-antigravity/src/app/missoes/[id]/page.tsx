'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Award,
  Sparkles,
  BookOpen,
  Send,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';
import { MissaoAdmin } from '@/lib/admin-store';

export default function MissaoDetalhesPage({ params }: { params: { id: string } }) {
  const [missao, setMissao] = useState<MissaoAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const [submetendo, setSubmetendo] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  useEffect(() => {
    const carregarMissao = async () => {
      try {
        setCarregando(true);
        const res = await fetch(`/api/missoes/${params.id}`);
        const data = await res.json();
        if (data.sucesso && data.dados) {
          setMissao(data.dados);
        } else {
          setMissao(null);
        }
      } catch (err) {
        console.error('Erro ao carregar detalhes da missão:', err);
        setMissao(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarMissao();
  }, [params.id]);

  const copiarCodigo = () => {
    if (missao?.codigo_inicial) {
      navigator.clipboard.writeText(missao.codigo_inicial);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
      setToast({
        tipo: 'success',
        mensagem: 'Código inicial copiado para a área de transferência!',
      });
    }
  };

  const handleSubmeter = () => {
    setSubmetendo(true);
    setTimeout(() => {
      setSubmetendo(false);
      setConcluido(true);
      setToast({
        tipo: 'success',
        mensagem: `Missão "${missao?.titulo}" submetida com sucesso! XP creditado à ficha.`,
      });
    }, 1200);
  };

  if (carregando) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-1 flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-slate-400 mt-4">Consultando pergaminho da missão...</p>
      </div>
    );
  }

  if (!missao) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-1 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-slate-900 border border-quest-border text-slate-500 mb-4">
          <AlertCircle className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Missão Não Encontrada</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          A missão #{params.id} não foi localizada no catálogo oficial da trilha pedagógica.
        </p>
        <Link href="/missoes">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Catálogo de Missões
          </Button>
        </Link>
      </div>
    );
  }

  const badgeDificuldade =
    missao.dificuldade === 'facil'
      ? { variant: 'success' as const, label: '🟢 Dificuldade: Fácil' }
      : missao.dificuldade === 'medio'
      ? { variant: 'warning' as const, label: '🟡 Dificuldade: Médio' }
      : { variant: 'danger' as const, label: '🔴 Dificuldade: Difícil' };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
      {/* Toast flutuante */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast tipo={toast.tipo} mensagem={toast.mensagem} aoFechar={() => setToast(null)} />
        </div>
      )}

      {/* Navegação de Retorno */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/missoes"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o catálogo de missões
        </Link>

        <Link
          href={`/trilha/${missao.modulo_id}`}
          className="text-indigo-400 hover:text-indigo-300 text-xs inline-flex items-center gap-1.5 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ver Módulo na Trilha</span>
        </Link>
      </div>

      <Card className="border-indigo-900/60 shadow-2xl bg-slate-900/80">
        <CardHeader className="pb-4 border-b border-quest-border">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={badgeDificuldade.variant}>{badgeDificuldade.label}</Badge>
              <Badge variant="purple">{missao.modulo_titulo}</Badge>
              <span className="text-xs text-slate-500 font-mono">Missão #{missao.id}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/50">
              <Award className="w-3.5 h-3.5" />
              <span>{missao.total_conclusoes || 0} aventureiros concluíram</span>
            </div>
          </div>

          <CardTitle className="text-2xl sm:text-3xl text-white font-bold">
            {missao.titulo}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Enunciado do Desafio */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Enunciado do Desafio</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {missao.enunciado}
            </p>
          </div>

          {/* Critério de Aceite */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/80 text-sm">
            <h3 className="font-semibold text-indigo-300 mb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Critério de Aceite / Validação (RF14, RF15)</span>
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pl-6">
              {missao.criterio_aceite}
            </p>
          </div>

          {/* Código Inicial */}
          {missao.codigo_inicial && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Código Inicial / Template</span>
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copiarCodigo}
                  className="h-8 text-xs gap-1.5 text-slate-400 hover:text-white"
                >
                  {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiado ? 'Copiado!' : 'Copiar Código'}</span>
                </Button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-300">
                <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {missao.codigo_inicial}
                </pre>
              </div>
            </div>
          )}

          {/* Ações e Submissão */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-quest-border">
            <div className="text-xs text-slate-400">
              {concluido ? (
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Missão concluída com sucesso por sua ficha!
                </span>
              ) : (
                <span>Submeta sua solução para registrar progresso na trilha e subir no ranking.</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/missoes">
                <Button variant="outline" size="sm">
                  Outras Missões
                </Button>
              </Link>

              <Button
                size="sm"
                className="gap-2"
                onClick={handleSubmeter}
                isLoading={submetendo}
                disabled={submetendo || concluido}
                variant={concluido ? 'secondary' : 'primary'}
              >
                {concluido ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Concluída</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submeter Resolução</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
