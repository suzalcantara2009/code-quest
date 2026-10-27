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
  Circle,
  Blocks,
  FileCode,
  Layers,
  Code,
  Sparkles,
  GraduationCap,
  Lightbulb,
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  Award,
  ListOrdered,
  CheckSquare,
  Square,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';
import { MissaoAdmin } from '@/lib/admin-store';
import { GUIAS_SINTAXE } from '@/lib/syntax-guides';
import { obterAulasDoModulo } from '@/lib/course-lessons';
import { AulaTecnica, AtividadeSequencia } from '@/types';
import { ProgressoUsuarioDTO } from '@/lib/progresso-store';

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
    titulo: 'Módulo 1 — Programação em Blocos & Pensamento Computacional',
    tecnologia: 'Blocos / Lógica',
    descricao:
      'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais, laços visuais de repetição e procedimentos modulares.',
    ementa: [
      'Sequenciamento e fluxo ordenado de controle',
      'Variáveis, tipos primitivos e acumuladores',
      'Estruturas condicionais (se / senão se / senão)',
      'Laços de repetição finita (para) e condicional (enquanto)',
      'Modularização com procedimentos reutilizáveis (DRY)',
      'Resolução autônoma de labirintos com a Regra da Mão Direita',
    ],
    icone: Blocks,
  },
  2: {
    titulo: 'Módulo 2 — Python (Sintaxe Limpa, Funções & POO)',
    tecnologia: 'Python 3',
    descricao:
      'Sintaxe limpa, PEP 8, funções puras com type hints estáticos (PEP 484), estruturas de dados e programação orientada a objetos.',
    ementa: [
      'Indentação obrigatória de 4 espaços, tipos primitivos e f-strings',
      'Funções puras, type hints (PEP 484) e docstrings (PEP 257)',
      'Listas, métodos de ordenação e List Comprehensions pythônicas',
      'Tabelas hash O(1) com dicionários e agregações (sum, len, max)',
      'Tratamento de exceções com blocos try/except/raise',
      'Orientação a objetos: classes, __init__, self, herança e super()',
    ],
    icone: Code,
  },
  3: {
    titulo: 'Módulo 3 — HTML e CSS (Web Semântica, Acessibilidade & Layout)',
    tecnologia: 'HTML5 / CSS3',
    descricao:
      'Estruturação semântica com HTML5, acessibilidade web (WCAG 2.1 AA), design responsivo com CSS Flexbox e CSS Grid.',
    ementa: [
      'Tags estruturais semânticas (<article>, <header>, <nav>, <dl>)',
      'Diretrizes de acessibilidade WCAG AA, contraste 4.5:1 e :focus-visible',
      'Formulários acessíveis com associação label-for e validação',
      'Layout unidimensional moderno com CSS Flexbox e gap nativo',
      'Layout bidimensional fluido com CSS Grid, repeat() e minmax()',
      'Design responsivo mobile-first com Media Queries (@media)',
    ],
    icone: FileCode,
  },
  4: {
    titulo: 'Módulo 4 — JavaScript (ES6+, DOM, Assincronismo & APIs)',
    tecnologia: 'JavaScript ES6+',
    descricao:
      'Interatividade no navegador, imutabilidade, métodos funcionais de array, manipulação da árvore DOM e consumo de APIs com fetch.',
    ementa: [
      'Declarações modernas (const/let), escopo de bloco e Arrow Functions',
      'Imutabilidade, Desestruturação e Spread Operator (...)',
      'Processamento funcional de dados com .filter(), .map() e .reduce()',
      'Manipulação da árvore DOM com querySelector e escuta de eventos',
      'Programação assíncrona com Promises e sintaxe async/await',
      'Consumo resiliente de APIs REST com fetch e validação de status HTTP',
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

  const aulasModulo: AulaTecnica[] = obterAulasDoModulo(moduloId);
  const guiaSintaxe = GUIAS_SINTAXE[moduloId];

  // Estados de navegação e abas
  const [abaAtiva, setAbaAtiva] = useState<'aulas' | 'atividades' | 'missoes' | 'sintaxe'>('aulas');
  const [aulaSelecionadaId, setAulaSelecionadaId] = useState<string>(
    aulasModulo[0]?.id || ''
  );

  // Estados de dados e persistência
  const [missoes, setMissoes] = useState<MissaoAdmin[]>([]);
  const [progresso, setProgresso] = useState<ProgressoUsuarioDTO | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvandoProgresso, setSalvandoProgresso] = useState(false);
  const [copiadoTopico, setCopiadoTopico] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Carrega missões do catálogo oficial
  useEffect(() => {
    const carregarMissoesDoModulo = async () => {
      try {
        const res = await fetch(`/api/missoes?modulo_id=${moduloId}`);
        const data = await res.json();
        if (data.sucesso && Array.isArray(data.dados)) {
          setMissoes(data.dados);
        }
      } catch (err) {
        console.error('Erro ao buscar missões do módulo:', err);
      }
    };

    carregarMissoesDoModulo();
  }, [moduloId]);

  // Carrega progresso do banco de dados
  const recarregarProgresso = async () => {
    try {
      setCarregando(true);
      const res = await fetch('/api/progresso');
      const data = await res.json();
      if (data.sucesso && data.dados) {
        setProgresso(data.dados);
      }
    } catch (err) {
      console.error('Erro ao carregar progresso salvo:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    recarregarProgresso();
  }, [moduloId]);

  // Aula selecionada atualmente
  const aulaAtual =
    aulasModulo.find((a) => a.id === aulaSelecionadaId) || aulasModulo[0];
  const indiceAulaAtual = aulasModulo.findIndex((a) => a.id === aulaAtual?.id);
  const aulaAnterior = indiceAulaAtual > 0 ? aulasModulo[indiceAulaAtual - 1] : null;
  const proximaAula =
    indiceAulaAtual < aulasModulo.length - 1 ? aulasModulo[indiceAulaAtual + 1] : null;

  const isAulaConcluida = aulaAtual ? Boolean(progresso?.aulas_concluidas[aulaAtual.id]) : false;

  // Persistência: Alternar status de conclusão da aula técnica (RF13, RF13a)
  const alternarConclusaoAula = async (aulaId: string) => {
    if (salvandoProgresso) return;
    setSalvandoProgresso(true);

    const novoStatus = !progresso?.aulas_concluidas[aulaId];

    try {
      const res = await fetch('/api/progresso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'aula',
          modulo_id: moduloId,
          aula_id: aulaId,
          concluida: novoStatus,
        }),
      });

      const data = await res.json();
      if (data.sucesso) {
        if (data.dados?.progresso) {
          setProgresso(data.dados.progresso);
        }
        setToast({
          tipo: 'success',
          mensagem: novoStatus
            ? `✨ Aula "${aulaAtual.titulo}" concluída! Progresso salvo no banco de dados.`
            : 'Aula marcada como pendente.',
        });
      } else {
        setToast({ tipo: 'error', mensagem: data.mensagem || 'Falha ao salvar progresso.' });
      }
    } catch (err) {
      setToast({ tipo: 'error', mensagem: 'Erro de comunicação ao salvar progresso.' });
    } finally {
      setSalvandoProgresso(false);
    }
  };

  // Persistência: Alternar status de atividade prática passo a passo (RF14, RF15)
  const alternarConclusaoAtividade = async (aulaId: string, atividadeId: string) => {
    if (salvandoProgresso) return;
    setSalvandoProgresso(true);

    const novoStatus = !progresso?.atividades_concluidas[atividadeId];

    try {
      const res = await fetch('/api/progresso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'atividade',
          modulo_id: moduloId,
          aula_id: aulaId,
          atividade_id: atividadeId,
          concluida: novoStatus,
        }),
      });

      const data = await res.json();
      if (data.sucesso) {
        if (data.dados?.progresso) {
          setProgresso(data.dados.progresso);
        }
        setToast({
          tipo: 'success',
          mensagem: novoStatus
            ? '⚔️ Atividade superada com sucesso! Progresso salvo na tabela de progresso.'
            : 'Atividade marcada como pendente.',
        });
      }
    } catch (err) {
      setToast({ tipo: 'error', mensagem: 'Falha ao salvar atividade.' });
    } finally {
      setSalvandoProgresso(false);
    }
  };

  const copiarExemplo = (id: string, codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiadoTopico(id);
    setTimeout(() => setCopiadoTopico(null), 2000);
    setToast({ tipo: 'success', mensagem: 'Snippet de código copiado com sucesso!' });
  };

  const IconeModulo = infoModulo.icone;
  const modProgresso = progresso?.progresso_modulos?.[moduloId];
  const porcentagemModulo = modProgresso ? modProgresso.porcentagem : 0;
  const aulasFeitasModulo = modProgresso ? modProgresso.aulas_concluidas : 0;
  const atvFeitasModulo = modProgresso ? modProgresso.atividades_concluidas : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      {/* Toast de Notificação */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast
            tipo={toast.tipo}
            mensagem={toast.mensagem}
            aoFechar={() => setToast(null)}
          />
        </div>
      )}

      {/* Barra de Navegação Superior */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/trilha"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Trilha de Aprendizagem</span>
        </Link>

        {/* Seletor Rápido de Módulo (RF13) */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 px-2">Módulos:</span>
          {[1, 2, 3, 4].map((id) => (
            <Link key={id} href={`/trilha/${id}`}>
              <Button
                variant={id === moduloId ? 'secondary' : 'ghost'}
                size="sm"
                className={`h-7 px-2.5 text-xs font-mono ${
                  id === moduloId
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                M{id}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Card Header do Módulo com Progresso em Tempo Real */}
      <Card className="mb-6 border-indigo-900/60 shadow-xl bg-slate-900/90 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 shadow-inner">
                <IconeModulo className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{infoModulo.tecnologia}</Badge>
                  {porcentagemModulo === 100 && (
                    <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Módulo Concluído</span>
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl sm:text-2xl mt-1 text-white">
                  {infoModulo.titulo}
                </CardTitle>
              </div>
            </div>

            {/* Badge de Progresso Geral do Módulo */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[200px] space-y-1.5 self-end sm:self-auto">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Progresso do Módulo</span>
                <span className="font-bold text-indigo-400 font-mono">{porcentagemModulo}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(porcentagemModulo, 0)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>
                  {aulasFeitasModulo} / {aulasModulo.length} Aulas
                </span>
                <span>
                  {atvFeitasModulo} Atividades
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {infoModulo.descricao}
          </p>
        </CardHeader>

        {/* Ementa e Competências */}
        <CardContent className="pt-0">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Competências & Ementa Oficial do Módulo</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-300">
              {infoModulo.ementa.map((topico, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{topico}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* NAVEGAÇÃO POR ABAS: AULAS TÉCNICAS, ATIVIDADES, DESAFIOS E DICIONÁRIO */}
      <div className="flex items-center gap-2 border-b border-quest-border pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setAbaAtiva('aulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
            abaAtiva === 'aulas'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Aulas Técnicas & Teoria ({aulasModulo.length})</span>
        </button>

        <button
          onClick={() => setAbaAtiva('atividades')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
            abaAtiva === 'atividades'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>Sequência de Atividades</span>
        </button>

        <button
          onClick={() => setAbaAtiva('missoes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
            abaAtiva === 'missoes'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Desafios Práticos Oficiais ({missoes.length})</span>
        </button>

        <button
          onClick={() => setAbaAtiva('sintaxe')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
            abaAtiva === 'sintaxe'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Cheat Sheet de Sintaxe</span>
        </button>
      </div>

      {/* ========================================================
          ABA 1: AULAS TÉCNICAS E TEORIA APROFUNDADA (RF13, RF13a)
          ======================================================== */}
      {abaAtiva === 'aulas' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Navegador Lateral de Aulas */}
          <div className="lg:col-span-1 space-y-2 sticky top-20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
              <span>Índice das Aulas</span>
              <span className="text-[11px] font-mono text-indigo-400">
                {aulasFeitasModulo}/{aulasModulo.length} Concluídas
              </span>
            </h3>

            <div className="space-y-1.5">
              {aulasModulo.map((aula) => {
                const ativa = aula.id === aulaAtual?.id;
                const concluida = Boolean(progresso?.aulas_concluidas[aula.id]);

                return (
                  <button
                    key={aula.id}
                    onClick={() => setAulaSelecionadaId(aula.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                      ativa
                        ? 'bg-indigo-950/70 border-indigo-500/70 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {concluida ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                        Aula {aula.numero}
                      </div>
                      <div className="text-xs font-medium truncate mt-0.5 leading-snug">
                        {aula.titulo}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-1">
                        <span>{aula.tempoEstimado}</span>
                        <span>•</span>
                        <span className="text-amber-400">+{aula.xpRecompensa} XP</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo Detalhado da Aula Selecionada */}
          {aulaAtual && (
            <div className="lg:col-span-3 space-y-6">
              {/* Header da Aula com Botão de Conclusão e Persistência no Banco */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-900/60 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-2.5 py-0.5 rounded-full">
                      Aula Técnica #{aulaAtual.numero}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{aulaAtual.tempoEstimado} de estudo</span>
                    </span>
                    <span className="text-xs text-amber-300 bg-amber-950/40 border border-amber-900/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>+{aulaAtual.xpRecompensa} XP</span>
                    </span>
                  </div>

                  {/* Botão de Persistência no Banco de Dados */}
                  <Button
                    onClick={() => alternarConclusaoAula(aulaAtual.id)}
                    disabled={salvandoProgresso}
                    variant={isAulaConcluida ? 'secondary' : 'primary'}
                    className={`gap-2 h-9 text-xs font-semibold whitespace-nowrap transition-all ${
                      isAulaConcluida
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
                    }`}
                  >
                    {isAulaConcluida ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Aula Concluída ✓</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Marcar como Concluída</span>
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {aulaAtual.titulo}
                  </h2>
                  <p className="text-sm text-indigo-200/80 mt-1 font-medium">
                    {aulaAtual.subtitulo}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {aulaAtual.resumo}
                  </p>
                </div>

                {/* Objetivos de Aprendizagem */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Objetivos de Aprendizagem desta Aula</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {aulaAtual.objetivos.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Explicações Teóricas Aprofundadas da Aula */}
              <div className="space-y-6">
                {aulaAtual.secoes.map((secao, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-md space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-indigo-400" />
                      <span>{secao.titulo}</span>
                    </h3>

                    {/* Explicação Teórica Formal */}
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
                      {secao.explicacao}
                    </div>

                    {/* Analogia Temática de RPG */}
                    {secao.analogiaRPG && (
                      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/50 flex items-start gap-3 text-xs sm:text-sm text-purple-200 leading-relaxed">
                        <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-purple-300 block mb-0.5">
                            Metáfora da Guilda / Analogia RPG:
                          </strong>
                          <span>{secao.analogiaRPG}</span>
                        </div>
                      </div>
                    )}

                    {/* Snippet de Código com Botão Copiar */}
                    {secao.codigoExemplo && (
                      <div className="rounded-xl overflow-hidden border border-slate-800 bg-black/90 font-mono text-xs">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-[11px] text-slate-400 bg-slate-900/60">
                          <span className="text-emerald-400 font-semibold">
                            {secao.codigoExemplo.tituloSnippet || 'CÓDIGO DIDÁTICO ILUSTRATIVO'}
                          </span>
                          <button
                            onClick={() =>
                              copiarExemplo(
                                `${aulaAtual.id}-snippet-${idx}`,
                                secao.codigoExemplo!.codigo
                              )
                            }
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
                          >
                            {copiadoTopico === `${aulaAtual.id}-snippet-${idx}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar Código</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {secao.codigoExemplo.codigo}
                        </pre>
                        {secao.codigoExemplo.explicacaoLinhaALinha && (
                          <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 text-[11px] text-slate-400 leading-normal">
                            <strong className="text-slate-300">Análise do Snippet: </strong>
                            {secao.codigoExemplo.explicacaoLinhaALinha}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dica Pro do Mestre */}
                    {secao.dicaPro && (
                      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/50 flex items-start gap-2.5 text-xs text-amber-200">
                        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 block mb-0.5">Dica Pro do Mestre:</strong>
                          <span>{secao.dicaPro}</span>
                        </div>
                      </div>
                    )}

                    {/* Atenção e Armadilha Comum */}
                    {secao.atencaoArmadilha && (
                      <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 flex items-start gap-2.5 text-xs text-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-red-300 block mb-0.5">
                            Cuidado / Armadilha Comum:
                          </strong>
                          <span>{secao.atencaoArmadilha}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Glossário de Conceitos-Chave da Aula */}
              {aulaAtual.conceitosChave.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span>Conceitos-Chave para Fixação</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {aulaAtual.conceitosChave.map((cc, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1"
                      >
                        <div className="text-xs font-bold text-indigo-300">{cc.termo}</div>
                        <div className="text-[11px] text-slate-400 leading-snug">{cc.definicao}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  SEQUÊNCIA PRÁTICA DE ATIVIDADES PASSO A PASSO DA AULA
                  ======================================================== */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-900/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ListOrdered className="w-5 h-5 text-indigo-400" />
                      <span>Sequência Prática de Atividades Passo a Passo</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Resolva as missões na ordem planejada para fixar a teoria no banco de dados.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800">
                    {aulaAtual.sequenciaAtividades.length} Atividades
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {aulaAtual.sequenciaAtividades.map((atv) => {
                    const atvConcluida = Boolean(progresso?.atividades_concluidas[atv.id]);

                    return (
                      <div
                        key={atv.id}
                        className={`p-4 rounded-xl border transition-all ${
                          atvConcluida
                            ? 'bg-slate-950/40 border-emerald-900/40'
                            : 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/40'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            {/* Checkbox de Persistência da Atividade */}
                            <button
                              onClick={() => alternarConclusaoAtividade(aulaAtual.id, atv.id)}
                              className="mt-0.5 text-slate-400 hover:text-white transition flex-shrink-0"
                            >
                              {atvConcluida ? (
                                <CheckSquare className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-600 hover:text-indigo-400" />
                              )}
                            </button>

                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-white">{atv.titulo}</span>
                                <Badge
                                  variant={
                                    atv.dificuldade === 'facil'
                                      ? 'success'
                                      : atv.dificuldade === 'medio'
                                      ? 'warning'
                                      : 'danger'
                                  }
                                >
                                  {atv.dificuldade}
                                </Badge>
                                <span className="text-[11px] text-amber-300 font-mono">
                                  +{atv.xp} XP
                                </span>
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed">
                                {atv.descricaoPasso}
                              </p>

                              {/* Instruções Passo a Passo */}
                              <div className="pt-1.5 space-y-1">
                                {atv.instrucoesPassoAPasso.map((inst, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1.5 text-[11px] text-slate-400"
                                  >
                                    <ChevronRight className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                                    <span>{inst}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="text-[11px] text-slate-400 pt-1">
                                <strong className="text-slate-300">Critério de Aceite:</strong>{' '}
                                {atv.criterioAceite}
                              </div>
                            </div>
                          </div>

                          {/* Ações da Atividade */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 self-end sm:self-auto pt-2 sm:pt-0">
                            {atv.missaoId ? (
                              <Link href={`/missoes/${atv.missaoId}`}>
                                <Button size="sm" className="gap-1.5 text-xs whitespace-nowrap">
                                  <span>Resolver no Editor</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                size="sm"
                                variant={atvConcluida ? 'secondary' : 'outline'}
                                onClick={() => alternarConclusaoAtividade(aulaAtual.id, atv.id)}
                                className="text-xs whitespace-nowrap gap-1"
                              >
                                {atvConcluida ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Concluído</span>
                                  </>
                                ) : (
                                  <span>Concluir Passo</span>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navegação entre Aulas (Anterior / Próxima) */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                {aulaAnterior ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAulaSelecionadaId(aulaAnterior.id)}
                    className="gap-2 text-xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Aula {aulaAnterior.numero}: {aulaAnterior.titulo}</span>
                  </Button>
                ) : (
                  <div />
                )}

                {proximaAula && (
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!isAulaConcluida) {
                        alternarConclusaoAula(aulaAtual.id);
                      }
                      setAulaSelecionadaId(proximaAula.id);
                    }}
                    className="gap-2 text-xs bg-indigo-600 hover:bg-indigo-500"
                  >
                    <span>Avançar para Aula {proximaAula.numero}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          ABA 2: SEQUÊNCIA CONSOLIDADA DE ATIVIDADES DE TODAS AS AULAS
          ======================================================== */}
      {abaAtiva === 'atividades' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-indigo-400" />
                <span>Matriz de Atividades Práticas do Módulo</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Acompanhe o cumprimento ordenado de todos os passos práticos vinculados às aulas técnicas.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-800">
                {atvFeitasModulo} Atividades Concluídas
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {aulasModulo.map((aula) => (
              <div
                key={aula.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded">
                      Aula {aula.numero}
                    </span>
                    <h4 className="text-sm font-bold text-white">{aula.titulo}</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAulaSelecionadaId(aula.id);
                      setAbaAtiva('aulas');
                    }}
                    className="text-xs text-indigo-400 hover:text-white h-7 gap-1"
                  >
                    <span>Ver Teoria da Aula</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {aula.sequenciaAtividades.map((atv) => {
                    const atvConcluida = Boolean(progresso?.atividades_concluidas[atv.id]);

                    return (
                      <div
                        key={atv.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                          atvConcluida
                            ? 'bg-emerald-950/10 border-emerald-900/40'
                            : 'bg-slate-900/60 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            onClick={() => alternarConclusaoAtividade(aula.id, atv.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            {atvConcluida ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white truncate">
                                {atv.titulo}
                              </span>
                              <Badge
                                variant={
                                  atv.dificuldade === 'facil'
                                    ? 'success'
                                    : atv.dificuldade === 'medio'
                                    ? 'warning'
                                    : 'danger'
                                }
                                className="text-[10px] py-0 px-1.5"
                              >
                                {atv.dificuldade}
                              </Badge>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {atv.descricaoPasso}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {atv.missaoId ? (
                            <Link href={`/missoes/${atv.missaoId}`}>
                              <Button size="sm" className="h-7 text-xs gap-1">
                                <span>Resolver Missão</span>
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              size="sm"
                              variant={atvConcluida ? 'secondary' : 'outline'}
                              onClick={() => alternarConclusaoAtividade(aula.id, atv.id)}
                              className="h-7 text-xs"
                            >
                              {atvConcluida ? 'Concluída ✓' : 'Concluir'}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          ABA 3: CATÁLOGO OFICIAL DE MISSÕES PRÁTICAS DO MÓDULO
          ======================================================== */}
      {abaAtiva === 'missoes' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-indigo-200">
              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                Resolva os desafios de código no editor integrado para ganhar XP e poder de combate.
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAbaAtiva('aulas')}
              className="text-xs h-7 gap-1 whitespace-nowrap"
            >
              <span>Ver Aulas Técnicas</span>
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Desafios Práticos Oficiais</span>
            </h3>
            <span className="text-xs text-indigo-400 bg-indigo-950/70 border border-indigo-800/80 px-2.5 py-1 rounded-full">
              {missoes.length} missões cadastradas
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={badgeDificuldade.variant}>{badgeDificuldade.label}</Badge>
                        {m.explicacao && (
                          <Badge variant="purple" className="text-[11px] py-0 px-2">
                            📖 Teoria Inclusa
                          </Badge>
                        )}
                        <span className="text-xs text-slate-500 font-mono">Missão #{m.id}</span>
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
                          <span>Resolver Desafio</span>
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
      )}

      {/* ========================================================
          ABA 4: CHEAT SHEET & DICIONÁRIO RÁPIDO DE SINTAXE
          ======================================================== */}
      {abaAtiva === 'sintaxe' && guiaSintaxe && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-purple-950/40 border border-indigo-500/40">
            <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold mb-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>{guiaSintaxe.titulo}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {guiaSintaxe.introducao}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/90 border border-quest-border space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Dicionário Rápido de Sintaxe ({guiaSintaxe.linguagem})
                </h4>
                <p className="text-xs text-slate-400">
                  Guia de consulta rápida dos comandos mais frequentes para resolver as atividades.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {guiaSintaxe.dicionario_rapido.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1.5"
                >
                  <div className="font-mono text-xs font-semibold text-emerald-300">
                    {item.comando}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">{item.descricao}</div>
                  <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                    {item.exemplo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
