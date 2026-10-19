'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Search,
  Filter,
  Calendar,
  Lock,
  Eye,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  User,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Toast } from '@/components/ui/Toast';
import { AuditoriaCompleta } from '@/lib/admin-store';

export default function AdminAuditoriaPage() {
  const [logs, setLogs] = useState<AuditoriaCompleta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroAcao, setFiltroAcao] = useState<string>('TODAS');
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('todos');
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Modal para inspecionar registro em detalhes
  const [registroSelecionado, setRegistroSelecionado] = useState<AuditoriaCompleta | null>(null);

  const carregarLogs = useCallback(async () => {
    try {
      setCarregando(true);
      const params = new URLSearchParams();
      if (termoBusca.trim()) params.set('busca', termoBusca.trim());
      if (filtroAcao !== 'TODAS') params.set('acao', filtroAcao);
      if (filtroPeriodo !== 'todos') params.set('periodo', filtroPeriodo);

      const res = await fetch(`/api/admin/auditoria?${params.toString()}`);
      const data = await res.json();

      if (data.sucesso) {
        setLogs(data.dados);
      } else {
        setToast({ tipo: 'error', mensagem: data.mensagem || 'Falha ao carregar auditoria.' });
      }
    } catch {
      setToast({ tipo: 'error', mensagem: 'Falha de conexão com os registros de auditoria.' });
    } finally {
      setCarregando(false);
    }
  }, [termoBusca, filtroAcao, filtroPeriodo]);

  useEffect(() => {
    carregarLogs();
  }, [carregarLogs]);

  const handleBuscaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    carregarLogs();
  };

  // Helper de badges visuais de ação para estética RPG
  const getBadgeAcao = (acao: string) => {
    switch (acao) {
      case 'CRIACAO':
        return <Badge variant="success">✨ CRIAÇÃO</Badge>;
      case 'EDICAO':
        return <Badge variant="cyan">✏️ EDIÇÃO</Badge>;
      case 'ARQUIVAMENTO':
        return <Badge variant="danger">📦 ARQUIVAMENTO</Badge>;
      case 'RESTAURACAO':
        return <Badge variant="purple">♻️ RESTAURAÇÃO (RN10)</Badge>;
      case 'MODERACAO_ARQUIVAMENTO':
        return <Badge variant="danger">⚖️ MODERAÇÃO: ARQUIVAMENTO</Badge>;
      case 'DENUNCIA_CRIADA':
        return <Badge variant="warning">🚩 DENÚNCIA REGISTRADA</Badge>;
      case 'DENUNCIA_RESOLVIDA':
        return <Badge variant="default">🛡️ DENÚNCIA IMPROCEDENTE</Badge>;
      case 'CRIACAO_MISSAO':
        return <Badge variant="purple">🎯 NOVA MISSÃO OFICIAL</Badge>;
      default:
        return <Badge variant="default">{acao}</Badge>;
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

      {/* Navegação */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel geral
        </Link>

        {/* Badge Informativa da Regra RN04 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Regra RN04: Tabela Inviolável (Somente Leitura)</span>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs mb-3">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Crônicas e Registros Imutáveis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          Logs de Auditoria do Sistema
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Histórico perene de mutações, ações disciplinares e alterações de estado da guilda (RF18, RF18a, RN04).
        </p>
      </div>

      {/* Barra de Filtros e Busca (RF18a) */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-quest-border mb-6 space-y-4">
        <form onSubmit={handleBuscaSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Busca textual */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ficha, autor ou detalhes..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filtro por Ação */}
          <div className="md:col-span-3">
            <select
              value={filtroAcao}
              onChange={(e) => setFiltroAcao(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="TODAS">Todas as Ações</option>
              <option value="CRIACAO">Criação de Ficha</option>
              <option value="EDICAO">Edição de Ficha</option>
              <option value="ARQUIVAMENTO">Arquivamento de Ficha</option>
              <option value="RESTAURACAO">Restauração de Ficha</option>
              <option value="MODERACAO_ARQUIVAMENTO">Moderação (Arquivamento)</option>
              <option value="DENUNCIA_CRIADA">Denúncias Registradas</option>
              <option value="DENUNCIA_RESOLVIDA">Denúncias Resolvidas</option>
              <option value="CRIACAO_MISSAO">Criação de Missões</option>
            </select>
          </div>

          {/* Filtro por Período */}
          <div className="md:col-span-2">
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="todos">Todo o Período</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
            </select>
          </div>

          {/* Botão de Pesquisa */}
          <div className="md:col-span-2 flex gap-2">
            <Button type="submit" size="sm" className="flex-1 gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Filtrar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTermoBusca('');
                setFiltroAcao('TODAS');
                setFiltroPeriodo('todos');
                carregarLogs();
              }}
              title="Recarregar"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>
            Exibindo <strong>{logs.length}</strong> registro(s) auditado(s)
          </span>
          <span className="text-slate-500">
            Armazenamento Append-Only garantido (RN04)
          </span>
        </div>
      </div>

      {/* Tabela Responsiva de Auditoria (Modo Somente Leitura) */}
      {carregando ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900/40 rounded-xl border border-quest-border">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-400">Verificando cadeia de custódia da auditoria...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            icone={<FileText className="w-12 h-12 text-slate-500" />}
            titulo="Nenhum registro de auditoria encontrado"
            descricao="Não há ações registradas para os filtros selecionados nesta era."
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-quest-border bg-slate-900/80 shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-300 text-xs uppercase tracking-wider border-b border-quest-border font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Data e Hora</th>
                <th className="py-3 px-4">Ação Auditada</th>
                <th className="py-3 px-4">Ficha / Alvo</th>
                <th className="py-3 px-4">Autor da Operação</th>
                <th className="py-3 px-4">Detalhes do Evento</th>
                <th className="py-3 px-4 text-center">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  {/* ID */}
                  <td className="py-3 px-4 font-mono text-xs text-slate-400">
                    #{log.id}
                  </td>

                  {/* Data e Hora */}
                  <td className="py-3 px-4 text-xs text-slate-300 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{new Date(log.data_hora).toLocaleDateString('pt-BR')}</span>
                      <span className="text-slate-500">
                        {new Date(log.data_hora).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Ação */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getBadgeAcao(log.acao)}
                  </td>

                  {/* Ficha / Alvo */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {log.ficha_nome ? (
                      <span className="font-medium text-slate-200">
                        {log.ficha_nome}{' '}
                        <span className="text-xs text-slate-500 font-mono">
                          (#{log.ficha_id})
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-500 italic text-xs">Sistema / Global</span>
                    )}
                  </td>

                  {/* Autor */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-200 font-medium">{log.autor_nome}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {log.autor_tipo}
                      </span>
                    </div>
                  </td>

                  {/* Detalhes */}
                  <td className="py-3 px-4 text-xs text-slate-300 max-w-xs sm:max-w-md truncate">
                    <span title={log.detalhes}>{log.detalhes}</span>
                  </td>

                  {/* Ação: Ver Completo */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setRegistroSelecionado(log)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition"
                      title="Inspecionar detalhes da auditoria"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DE DETALHES DO REGISTRO DE AUDITORIA               */}
      {/* ======================================================== */}
      <Modal
        isOpen={!!registroSelecionado}
        onClose={() => setRegistroSelecionado(null)}
        title="Registro de Auditoria Imutável (RN04)"
        description="Visualização dos dados brutos e certificados deste evento no sistema."
        confirmText="Concluir Visualização"
        confirmVariant="primary"
        onConfirm={() => setRegistroSelecionado(null)}
      >
        {registroSelecionado && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 block">ID do Registro:</span>
                <span className="font-mono text-slate-200 font-bold">#{registroSelecionado.id}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Carimbo Temporal:</span>
                <span className="text-slate-200 font-medium">
                  {new Date(registroSelecionado.data_hora).toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-slate-500 block">Ação Executada:</span>
                <div className="mt-1">{getBadgeAcao(registroSelecionado.acao)}</div>
              </div>
              <div className="mt-2">
                <span className="text-slate-500 block">Autor / Operador:</span>
                <span className="text-slate-200 font-medium">
                  {registroSelecionado.autor_nome} ({registroSelecionado.autor_tipo})
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block mb-1 font-semibold uppercase">
                Descrição Completa e Justificativa:
              </span>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {registroSelecionado.detalhes}
              </p>
            </div>

            <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/60 rounded text-[11px] text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                Registro assinado criptograficamente. Conforme <strong>RN04</strong>, esta linha não pode ser alterada nem excluída.
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
