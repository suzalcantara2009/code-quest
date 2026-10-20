'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Target,
  ArrowRight,
  Code2,
  CheckCircle2,
  Blocks,
  FileCode,
  Layers,
  Code,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MissaoAdmin } from '@/lib/admin-store';

const MODULOS_INFO: Record<
  number,
  {
    titulo: string;
    tecnologia: string;
    descricao: string;
    ementa: string[];
    icone: any;
  }
> = {
  1: {
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao:
      'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.',
    ementa: [
      'Sequenciamento e fluxo de controle',
      'Estruturas condicionais (se / senão)',
      'Laços de repetição finita e baseada em condição',
      'Resolução de labirintos e otimização de passos',
    ],
    icone: Blocks,
  },
  2: {
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao:
      'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.',
    ementa: [
      'Variáveis, tipos primitivos e operadores',
      'Definição de funções com type hints (PEP 484)',
      'Estruturas de dados (listas, tuplas, dicionários)',
      'Tratamento de exceções e testes unitários básicos',
    ],
    icone: Code,
  },
  3: {
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao:
      'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.',
    ementa: [
      'Elementos semânticos do HTML5 (<section>, <header>, <article>, <dl>)',
      'Boas práticas de acessibilidade e contraste (WCAG AA)',
      'Design responsivo e Media Queries (@media)',
      'Layout moderno com CSS Flexbox e CSS Grid',
    ],
    icone: FileCode,
  },
  4: {
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao:
      'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.',
    ementa: [
      'Sintaxe moderna ES6+ (arrow functions, destructuring, template literals)',
      'Assincronismo: Promises e async/await',
      'Consumo de endpoints REST com fetch e tratamento de erros 4xx/5xx',
      'Manipulação de dados JSON e renderização no DOM',
    ],
    icone: Layers,
  },
};

export default function ModuloDetalhesPage({ params }: { params: { moduloId: string } }) {
  const moduloId = Number(params.moduloId);
  const infoModulo = MODULOS_INFO[moduloId] || {
    titulo: `Módulo ${params.moduloId}`,
    tecnologia: 'Geral',
    descricao: 'Conteúdo programático da trilha pedagógica.',
    ementa: ['Conceitos fundamentais', 'Prática orientada', 'Missão prática'],
    icone: BookOpen,
  };

  const [missoes, setMissoes] = useState<MissaoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarMissoesDoModulo = async () => {
      try {
        setCarregando(true);
        const res = await fetch(`/api/missoes?modulo_id=${moduloId}`);
        const data = await res.json();
        if (data.sucesso && Array.isArray(data.dados)) {
          setMissoes(data.dados);
        }
      } catch (err) {
        console.error('Erro ao buscar missões do módulo:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarMissoesDoModulo();
  }, [moduloId]);

  const IconeModulo = infoModulo.icone;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
      {/* Navegação de Retorno */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/trilha"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a trilha completa
        </Link>

        {/* Navegação entre módulos (RF13) */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((id) => (
            <Link key={id} href={`/trilha/${id}`}>
              <Button
                variant={id === moduloId ? 'secondary' : 'outline'}
                size="sm"
                className="h-7 px-2.5 text-xs"
              >
                M{id}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Card do Módulo */}
        <Card className="border-indigo-900/60 shadow-xl bg-slate-900/80">
          <CardHeader>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-lg bg-indigo-950/70 border border-indigo-900/50 text-indigo-400">
                  <IconeModulo className="w-6 h-6" />
                </div>
                <div>
                  <Badge variant="purple">{infoModulo.tecnologia}</Badge>
                  <CardTitle className="text-2xl mt-1 text-white">{infoModulo.titulo}</CardTitle>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{infoModulo.descricao}</p>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {/* Tópicos Abordados */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Competências & Ementa do Módulo</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                {infoModulo.ementa.map((topico, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{topico}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missões Vinculadas ao Módulo */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  <span>Missão Prática Oficial do Módulo</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {missoes.length} desafio(s) disponível(is)
                </span>
              </div>

              {carregando ? (
                <div className="flex items-center justify-center p-8 bg-slate-950/40 rounded-xl border border-quest-border">
                  <LoadingSpinner size="md" />
                </div>
              ) : missoes.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-sm text-slate-400">
                  Nenhuma missão cadastrada para este módulo no momento.
                </div>
              ) : (
                <div className="space-y-4">
                  {missoes.map((m) => {
                    const badgeDificuldade =
                      m.dificuldade === 'facil'
                        ? { variant: 'success' as const, label: 'Fácil' }
                        : m.dificuldade === 'medio'
                        ? { variant: 'warning' as const, label: 'Médio' }
                        : { variant: 'danger' as const, label: 'Difícil' };

                    return (
                      <div
                        key={m.id}
                        className="p-5 rounded-xl bg-slate-950/70 border border-indigo-900/40 hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={badgeDificuldade.variant}>
                              {badgeDificuldade.label}
                            </Badge>
                            <span className="text-xs text-slate-500 font-mono">
                              Missão #{m.id}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white">{m.titulo}</h4>
                          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                            {m.enunciado}
                          </p>

                          <div className="pt-1 text-xs text-slate-400">
                            <strong className="text-slate-300">Aceite:</strong> {m.criterio_aceite}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                          <Link href={`/missoes/${m.id}`}>
                            <Button size="sm" className="gap-1.5 whitespace-nowrap">
                              <span>Iniciar Missão</span>
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
