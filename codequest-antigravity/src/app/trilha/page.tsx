'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Blocks,
  Code,
  FileCode,
  Layers,
  ArrowRight,
  Target,
  GraduationCap,
  Award,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressoUsuarioDTO } from '@/lib/progresso-store';

const MODULOS_TRILHA = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao:
      'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.',
    total_aulas: 5,
    total_atividades: 15,
    missao_titulo: 'O Despertar dos Blocos Mágicos',
    dificuldade: 'facil' as const,
    icone: Blocks,
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao:
      'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.',
    total_aulas: 5,
    total_atividades: 15,
    missao_titulo: 'O Cálculo do Dano Crítico',
    dificuldade: 'facil' as const,
    icone: Code,
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao:
      'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.',
    total_aulas: 4,
    total_atividades: 12,
    missao_titulo: 'O Estandarte Responsivo da Guilda',
    dificuldade: 'medio' as const,
    icone: FileCode,
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao:
      'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.',
    total_aulas: 4,
    total_atividades: 12,
    missao_titulo: 'O Feitiço da API Assíncrona',
    dificuldade: 'dificil' as const,
    icone: Layers,
  },
];

export default function TrilhaPage() {
  const [progresso, setProgresso] = useState<ProgressoUsuarioDTO | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarProgresso = async () => {
      try {
        setCarregando(true);
        const res = await fetch('/api/progresso');
        const data = await res.json();
        if (data.sucesso && data.dados) {
          setProgresso(data.dados);
        }
      } catch (err) {
        console.error('Erro ao carregar progresso da trilha:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarProgresso();
  }, []);

  // Calcula estatísticas gerais
  const totalAulasFeitas = progresso
    ? Object.keys(progresso.aulas_concluidas).length
    : 0;
  const totalAtividadesFeitas = progresso
    ? Object.keys(progresso.atividades_concluidas).length
    : 0;
  const totalAulasGeral = 18; // 5 + 5 + 4 + 4
  const porcentagemGeral = Math.min(
    100,
    Math.round((totalAulasFeitas / totalAulasGeral) * 100)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Trilha Pedagógica Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Trilha de Aprendizagem</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Percorra os 4 módulos estruturados com aulas técnicas detalhadas, explicações teóricas
          aprofundadas, analogias de RPG e uma sequência prática de atividades passo a passo com
          persistência garantida no seu perfil.
        </p>
      </div>

      {/* Painel Consolidado de Progresso do Estudante (RF13a) */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/50 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Progresso Acadêmico do Herói</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Aulas técnicas concluídas e atividades registradas no banco de dados.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-900/60 text-amber-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{progresso?.total_xp || 0} XP Acumulados</span>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Conclusão da Trilha Geral</span>
            <span className="font-semibold text-indigo-400">{porcentagemGeral}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(porcentagemGeral, 2)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>{totalAulasFeitas} de 18 Aulas Técnicas lidas</span>
            <span>{totalAtividadesFeitas} Atividades Práticas superadas</span>
          </div>
        </div>
      </div>

      {/* Grid de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULOS_TRILHA.map((m) => {
          const Icon = m.icone;
          const badgeDificuldade =
            m.dificuldade === 'facil'
              ? { variant: 'success' as const, label: 'Iniciante' }
              : m.dificuldade === 'medio'
              ? { variant: 'warning' as const, label: 'Intermediário' }
              : { variant: 'danger' as const, label: 'Avançado' };

          const modProgresso = progresso?.progresso_modulos?.[m.id];
          const pct = modProgresso ? modProgresso.porcentagem : 0;
          const aulasConcluidasNoModulo = modProgresso ? modProgresso.aulas_concluidas : 0;
          const atvConcluidasNoModulo = modProgresso ? modProgresso.atividades_concluidas : 0;

          return (
            <Link key={m.id} href={`/trilha/${m.id}`} className="group">
              <Card className="h-full hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-950/20 bg-slate-900/90">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900/50 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      {pct === 100 && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Concluído</span>
                        </span>
                      )}
                      <Badge variant="purple">{m.tecnologia}</Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-400 transition-colors">
                    {m.titulo}
                  </CardTitle>
                  <CardDescription className="leading-relaxed line-clamp-2">
                    {m.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col gap-3">
                  {/* Badges de Conteúdo da Trilha */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-900/60 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-indigo-400" />
                      <span>{m.total_aulas} Aulas Técnicas</span>
                    </span>
                    <span className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 px-2.5 py-0.5 rounded flex items-center gap-1 font-mono">
                      <span>{m.total_atividades} Atividades Passo a Passo</span>
                    </span>
                  </div>

                  {/* Barra de Progresso do Módulo */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-slate-400">Progresso do Módulo</span>
                      <span className="font-semibold text-indigo-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(pct, 0)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>
                        {aulasConcluidasNoModulo} de {m.total_aulas} aulas lidas
                      </span>
                      <span>
                        {atvConcluidasNoModulo} de {m.total_atividades} atividades
                      </span>
                    </div>
                  </div>

                  {/* Destaque do Primeiro Desafio */}
                  <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-300 min-w-0">
                      <Target className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="font-medium truncate">Missão: {m.missao_titulo}</span>
                    </div>
                    <Badge variant={badgeDificuldade.variant} className="flex-shrink-0">
                      {badgeDificuldade.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-end text-sm text-indigo-400 font-medium pt-1">
                    <span>Acessar Aulas e Atividades</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
