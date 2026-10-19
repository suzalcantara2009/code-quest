'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  Plus,
  BookOpen,
  Sparkles,
  Code2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Award,
  RefreshCw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { EmptyState } from '@/components/ui/EmptyState';
import { MissaoAdmin } from '@/lib/admin-store';
import { missaoSchema } from '@/lib/validations/missao';

const MODULOS_DISPONIVEIS = [
  { id: 1, nome: 'Módulo 1 — Programação em Blocos', tech: 'Lógica Visual' },
  { id: 2, nome: 'Módulo 2 — Python', tech: 'Python' },
  { id: 3, nome: 'Módulo 3 — HTML e CSS', tech: 'Web Frontend' },
  { id: 4, nome: 'Módulo 4 — JavaScript', tech: 'JavaScript ES6+' },
];

export default function AdminMissoesPage() {
  const [missoes, setMissoes] = useState<MissaoAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [papelUsuario, setPapelUsuario] = useState<'admin' | 'moderador'>('admin');
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Estados do Formulário de Cadastro
  const [moduloId, setModuloId] = useState<number>(1);
  const [titulo, setTitulo] = useState('');
  const [dificuldade, setDificuldade] = useState<'facil' | 'medio' | 'dificil'>('facil');
  const [enunciado, setEnunciado] = useState('');
  const [criterioAceite, setCriterioAceite] = useState('');
  const [codigoInicial, setCodigoInicial] = useState('');

  // Erros de Validação Inline
  const [erros, setErros] = useState<Record<string, string>>({});

  const carregarMissoesEPerfil = async () => {
    try {
      setCarregando(true);
      const [resMissoes, resPerfil] = await Promise.all([
        fetch('/api/admin/missoes'),
        fetch('/api/admin/perfil'),
      ]);

      const dataMissoes = await resMissoes.json();
      const dataPerfil = await resPerfil.json();

      if (dataMissoes.sucesso) {
        setMissoes(dataMissoes.dados);
      }
      if (dataPerfil.sucesso && dataPerfil.dados?.tipo) {
        setPapelUsuario(dataPerfil.dados.tipo === 'moderador' ? 'moderador' : 'admin');
      }
    } catch {
      setToast({
        tipo: 'error',
        mensagem: 'Não foi possível carregar o catálogo de missões.',
      });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMissoesEPerfil();
  }, []);

  const alternarPapel = async (novoPapel: 'admin' | 'moderador') => {
    try {
      const res = await fetch('/api/admin/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: novoPapel }),
      });
      if (res.ok) {
        setPapelUsuario(novoPapel);
        setToast({
          tipo: 'success',
          mensagem: `Papel alternado para: ${novoPapel.toUpperCase()}`,
        });
      }
    } catch {
      setToast({ tipo: 'error', mensagem: 'Erro ao alternar papel.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});

    // RN05: Checagem no cliente
    if (papelUsuario !== 'admin') {
      setToast({
        tipo: 'error',
        mensagem: 'Regra RN05: Apenas usuários com perfil Administrador podem criar missões oficiais.',
      });
      return;
    }

    const payload = {
      modulo_id: Number(moduloId),
      titulo: titulo.trim(),
      enunciado: enunciado.trim(),
      dificuldade,
      criterio_aceite: criterioAceite.trim(),
      codigo_inicial: codigoInicial.trim() || undefined,
    };

    // Validação com Zod
    const validacao = missaoSchema.safeParse(payload);
    if (!validacao.success) {
      const errosMap: Record<string, string> = {};
      validacao.error.errors.forEach((err) => {
        if (err.path[0]) errosMap[err.path[0] as string] = err.message;
      });
      setErros(errosMap);
      setToast({
        tipo: 'error',
        mensagem: 'Por favor, corrija os campos destacados no formulário.',
      });
      return;
    }

    setSalvando(true);
    try {
      const res = await fetch('/api/admin/missoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        if (data.erros) {
          const errosFormatados: Record<string, string> = {};
          Object.keys(data.erros).forEach((k) => {
            errosFormatados[k] = Array.isArray(data.erros[k]) ? data.erros[k][0] : data.erros[k];
          });
          setErros(errosFormatados);
        }
        setToast({
          tipo: 'error',
          mensagem: data.mensagem || 'Falha ao cadastrar a missão.',
        });
        return;
      }

      setToast({
        tipo: 'success',
        mensagem: 'Missão oficial forjada e incorporada à Trilha Pedagógica!',
      });

      // Limpa os campos
      setTitulo('');
      setEnunciado('');
      setCriterioAceite('');
      setCodigoInicial('');
      setDificuldade('facil');
      setModuloId(1);

      await carregarMissoesEPerfil();
    } catch {
      setToast({
        tipo: 'error',
        mensagem: 'Erro de conexão ao tentar salvar a missão.',
      });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      {/* Toast flutuante */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast
            tipo={toast.tipo}
            mensagem={toast.mensagem}
            aoFechar={() => setToast(null)}
          />
        </div>
      )}

      {/* Navegação e Switcher de Papel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Link
          href="/admin"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel geral
        </Link>

        {/* Simulador de Papel para testar RN05 */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-quest-border px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-400">Perfil ativo:</span>
          <button
            onClick={() => alternarPapel('admin')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              papelUsuario === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛡️ Administrador (Pode Criar)
          </button>
          <button
            onClick={() => alternarPapel('moderador')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              papelUsuario === 'moderador'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚖️ Moderador (Sem Acesso RN05)
          </button>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Curadoria Pedagógica Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          Gestão de Missões da Trilha
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Cadastro de desafios práticos para os 4 módulos da jornada de formação (RF13, RN05).
        </p>
      </div>

      {/* Grid Principal: Formulário à esquerda / Catálogo à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ======================================================== */}
        {/* FORMULÁRIO DE CADASTRO DE MISSÃO                        */}
        {/* ======================================================== */}
        <div className="lg:col-span-5">
          <Card className="border-indigo-900/60 shadow-xl bg-slate-900/80 sticky top-24">
            <CardHeader className="pb-3 border-b border-quest-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-400" />
                  <span>Forjar Nova Missão</span>
                </CardTitle>
                <Badge variant={papelUsuario === 'admin' ? 'purple' : 'danger'}>
                  {papelUsuario === 'admin' ? 'RN05: Autorizado' : 'RN05: Bloqueado'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Preencha os parâmetros do desafio didático. Todos os campos com asterisco são obrigatórios.
              </p>
            </CardHeader>

            <CardContent className="pt-4">
              {papelUsuario !== 'admin' && (
                <div className="mb-4 p-3 bg-red-950/50 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                  <span>
                    <strong>Acesso restrito (RN05):</strong> Usuários com perfil de Moderador não têm permissão para criar missões. Mude para Administrador no topo para desbloquear.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Título */}
                <Input
                  label="Título da Missão"
                  required
                  placeholder="Ex.: O Labirinto dos Ponteiros Perdidos"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  error={erros.titulo}
                  disabled={papelUsuario !== 'admin' || salvando}
                />

                {/* Módulo e Dificuldade em Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Módulo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Módulo da Trilha <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={moduloId}
                      onChange={(e) => setModuloId(Number(e.target.value))}
                      disabled={papelUsuario !== 'admin' || salvando}
                      className="w-full py-2.5 px-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      {MODULOS_DISPONIVEIS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dificuldade */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Dificuldade <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={dificuldade}
                      onChange={(e) => setDificuldade(e.target.value as 'facil' | 'medio' | 'dificil')}
                      disabled={papelUsuario !== 'admin' || salvando}
                      className="w-full py-2.5 px-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="facil">🟢 Fácil (Iniciante)</option>
                      <option value="medio">🟡 Médio (Intermediário)</option>
                      <option value="dificil">🔴 Difícil (Avançado)</option>
                    </select>
                  </div>
                </div>

                {/* Enunciado */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Enunciado do Desafio <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={enunciado}
                    onChange={(e) => setEnunciado(e.target.value)}
                    disabled={papelUsuario !== 'admin' || salvando}
                    placeholder="Descreva a história e a tarefa técnica que o aprendiz deve solucionar..."
                    className={`w-full p-2.5 rounded-lg bg-slate-950 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none ${
                      erros.enunciado
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-indigo-500'
                    }`}
                  />
                  {erros.enunciado && (
                    <span className="text-xs text-red-400 mt-1 block">{erros.enunciado}</span>
                  )}
                </div>

                {/* Critério de Aceite */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Critério de Aceite / Teste <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={criterioAceite}
                    onChange={(e) => setCriterioAceite(e.target.value)}
                    disabled={papelUsuario !== 'admin' || salvando}
                    placeholder="Ex.: A função deve retornar true para arrays ordenados e false com elementos nulos."
                    className={`w-full p-2.5 rounded-lg bg-slate-950 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none ${
                      erros.criterio_aceite
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-indigo-500'
                    }`}
                  />
                  {erros.criterio_aceite && (
                    <span className="text-xs text-red-400 mt-1 block">{erros.criterio_aceite}</span>
                  )}
                </div>

                {/* Código Inicial (Opcional) */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Código Inicial / Template</span>
                    </span>
                    <span className="text-xs text-slate-500 font-normal">Opcional</span>
                  </label>
                  <textarea
                    rows={3}
                    value={codigoInicial}
                    onChange={(e) => setCodigoInicial(e.target.value)}
                    disabled={papelUsuario !== 'admin' || salvando}
                    placeholder="def solucao(parametro):&#10;    # Seu código aqui&#10;    pass"
                    className="w-full p-2.5 font-mono text-xs rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Botão de Envio */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={papelUsuario !== 'admin' || salvando}
                    isLoading={salvando}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Cadastrar Missão na Trilha</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* LISTAGEM DE MISSÕES CADASTRADAS                          */}
        {/* ======================================================== */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Missões Ativas na Trilha ({missoes.length})</span>
            </h2>

            <Button
              variant="outline"
              size="sm"
              onClick={carregarMissoesEPerfil}
              disabled={carregando}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className={`w-3 h-3 ${carregando ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {carregando ? (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 rounded-xl border border-quest-border">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-slate-400">Carregando catálogo pedagógico...</p>
            </div>
          ) : missoes.length === 0 ? (
            <EmptyState
              icone={<Target className="w-12 h-12 text-slate-500" />}
              titulo="Nenhuma missão cadastrada"
              descricao="Utilize o formulário ao lado para forjar a primeira missão da trilha."
            />
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
                  <Card
                    key={m.id}
                    className="hover:border-indigo-500/50 transition-all bg-slate-900/60"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <Badge variant={badgeDificuldade.variant}>
                              {badgeDificuldade.label}
                            </Badge>
                            <Badge variant="purple">{m.modulo_titulo}</Badge>
                            <span className="text-xs text-slate-500 font-mono">ID #{m.id}</span>
                          </div>
                          <CardTitle className="text-base text-white">{m.titulo}</CardTitle>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/50">
                          <Award className="w-3.5 h-3.5" />
                          <span>{m.total_conclusoes || 0} conclusões</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0 text-sm">
                      <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                        {m.enunciado}
                      </p>

                      <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                        <strong className="text-slate-300 block mb-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Critério de Aceite:
                        </strong>
                        {m.criterio_aceite}
                      </div>

                      {m.codigo_inicial && (
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
                            Código Inicial Fornecido:
                          </div>
                          <pre>{m.codigo_inicial}</pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

