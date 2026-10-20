'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Target, Filter, Award, CheckCircle2, ArrowRight, Code2, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MissaoAdmin } from '@/lib/admin-store';

const MODULOS_OPCOES = [
  { id: '', nome: 'Todos os Módulos' },
  { id: '1', nome: 'Módulo 1 — Programação em Blocos' },
  { id: '2', nome: 'Módulo 2 — Python' },
  { id: '3', nome: 'Módulo 3 — HTML e CSS' },
  { id: '4', nome: 'Módulo 4 — JavaScript' },
];

export default function MissoesPage() {
  const [missoes, setMissoes] = useState<MissaoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [dificuldade, setDificuldade] = useState<string>('');
  const [moduloId, setModuloId] = useState<string>('');

  const carregarMissoes = useCallback(async () => {
    try {
      setCarregando(true);
      const params = new URLSearchParams();
      if (dificuldade) params.append('dificuldade', dificuldade);
      if (moduloId) params.append('modulo_id', moduloId);

      const res = await fetch(`/api/missoes?${params.toString()}`);
      const data = await res.json();
      if (data.sucesso && Array.isArray(data.dados)) {
        setMissoes(data.dados);
      }
    } catch (err) {
      console.error('Erro ao carregar missões:', err);
    } finally {
      setCarregando(false);
    }
  }, [dificuldade, moduloId]);

  useEffect(() => {
    carregarMissoes();
  }, [carregarMissoes]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Desafios da Trilha Pedagógica</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Catálogo de Missões</h1>
          <p className="text-sm text-slate-400 mt-1">
            Resolva desafios de programação para forjar seu código, evoluir suas habilidades e elevar o poder da sua ficha.
          </p>
        </div>

        <Link href="/trilha">
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Ver Trilha Completa
          </Button>
        </Link>
      </div>

      {/* Filtros de Missões (RF14a) */}
      <div className="flex flex-wrap items-center gap-4 mb-8 bg-slate-900/60 p-4 rounded-xl border border-quest-border">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filtros:</span>
        </div>

        {/* Filtro por Dificuldade */}
        <select
          value={dificuldade}
          onChange={(e) => setDificuldade(e.target.value)}
          className="py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="">Todas as Dificuldades</option>
          <option value="facil">🟢 Fácil</option>
          <option value="medio">🟡 Médio</option>
          <option value="dificil">🔴 Difícil</option>
        </select>

        {/* Filtro por Módulo */}
        <select
          value={moduloId}
          onChange={(e) => setModuloId(e.target.value)}
          className="py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
        >
          {MODULOS_OPCOES.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.nome}
            </option>
          ))}
        </select>

        {(dificuldade || moduloId) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDificuldade('');
              setModuloId('');
            }}
            className="text-xs text-slate-400 hover:text-white"
          >
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Listagem de Missões */}
      <div className="flex-1">
        {carregando ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 rounded-xl border border-quest-border">
            <LoadingSpinner size="md" />
            <p className="text-sm text-slate-400 mt-4">Carregando missões da trilha...</p>
          </div>
        ) : missoes.length === 0 ? (
          <EmptyState
            icone={<Target className="w-12 h-12" />}
            titulo="Nenhuma missão encontrada"
            descricao="Não foram encontradas missões para os filtros selecionados. Tente ajustar os parâmetros."
            acao={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDificuldade('');
                  setModuloId('');
                }}
              >
                Ver Todas as Missões
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missoes.map((m) => {
              const badgeDificuldade =
                m.dificuldade === 'facil'
                  ? { variant: 'success' as const, label: 'Fácil' }
                  : m.dificuldade === 'medio'
                  ? { variant: 'warning' as const, label: 'Médio' }
                  : { variant: 'danger' as const, label: 'Difícil' };

              return (
                <Card
                  key={m.id}
                  className="flex flex-col justify-between hover:border-indigo-500/50 transition-all bg-slate-900/70 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeDificuldade.variant}>{badgeDificuldade.label}</Badge>
                        <Badge variant="purple">{m.modulo_titulo}</Badge>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">Missão #{m.id}</span>
                    </div>

                    <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors">
                      {m.titulo}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0 flex-1 flex flex-col justify-between text-sm">
                    <div className="space-y-3">
                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {m.enunciado}
                      </p>

                      <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                        <strong className="text-slate-300 block mb-0.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Critério de Aceite:
                        </strong>
                        <p className="line-clamp-2">{m.criterio_aceite}</p>
                      </div>

                      {m.explicacao && (
                        <div className="flex items-center gap-1.5 text-xs text-indigo-300">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Base teórica & conceitos pedagógicos inclusos</span>
                        </div>
                      )}

                      {m.codigo_inicial && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Code2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Código inicial fornecido</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-quest-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400">
                        <Award className="w-3.5 h-3.5" />
                        <span>{m.total_conclusoes || 0} aventureiros concluíram</span>
                      </div>

                      <Link href={`/missoes/${m.id}`}>
                        <Button size="sm" className="gap-1.5">
                          <span>Acessar Desafio</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
