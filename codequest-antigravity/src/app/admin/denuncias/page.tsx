'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertOctagon,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Shield,
  Filter,
  RefreshCw,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { EmptyState } from '@/components/ui/EmptyState';
import { DenunciaCompleta } from '@/lib/admin-store';

export default function AdminDenunciasPage() {
  const [denuncias, setDenuncias] = useState<DenunciaCompleta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('todas');
  const [papelUsuario, setPapelUsuario] = useState<'admin' | 'moderador'>('admin');
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Estados dos modais de ação
  const [modalAprovar, setModalAprovar] = useState<DenunciaCompleta | null>(null);
  const [modalRejeitar, setModalRejeitar] = useState<DenunciaCompleta | null>(null);
  const [modalReverter, setModalReverter] = useState<DenunciaCompleta | null>(null);
  const [justificativa, setJustificativa] = useState('');
  const [processandoAcao, setProcessandoAcao] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      const url = filtroStatus === 'todas'
        ? '/api/admin/denuncias'
        : `/api/admin/denuncias?status=${filtroStatus}`;

      const [resDenuncias, resPerfil] = await Promise.all([
        fetch(url),
        fetch('/api/admin/perfil'),
      ]);

      const dataDenuncias = await resDenuncias.json();
      const dataPerfil = await resPerfil.json();

      if (dataDenuncias.sucesso) {
        setDenuncias(dataDenuncias.dados);
      }
      if (dataPerfil.sucesso && dataPerfil.dados?.tipo) {
        setPapelUsuario(dataPerfil.dados.tipo === 'moderador' ? 'moderador' : 'admin');
      }
    } catch {
      setToast({
        tipo: 'error',
        mensagem: 'Falha ao sincronizar denúncias com o servidor.',
      });
    } finally {
      setCarregando(false);
    }
  }, [filtroStatus]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Alternar papel para testes de validação da regra RN10
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
          mensagem: `Visão alternada para: ${novoPapel.toUpperCase()}`,
        });
      }
    } catch {
      setToast({ tipo: 'error', mensagem: 'Erro ao alternar papel de teste.' });
    }
  };

  // 1. Aprovar Denúncia (Procedente -> Arquiva a ficha e grava log)
  const handleAprovarDenuncia = async () => {
    if (!modalAprovar) return;
    if (justificativa.trim().length < 5) {
      setToast({
        tipo: 'error',
        mensagem: 'Informe uma justificativa válida com pelo menos 5 caracteres.',
      });
      return;
    }

    setProcessandoAcao(true);
    try {
      const res = await fetch('/api/admin/denuncias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'aprovar',
          denunciaId: modalAprovar.id,
          justificativa: justificativa.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        setToast({ tipo: 'error', mensagem: data.mensagem || 'Erro ao aprovar denúncia.' });
        return;
      }

      setToast({
        tipo: 'success',
        mensagem: 'Denúncia aprovada como procedente! A ficha foi arquivada e o log foi salvo.',
      });
      setModalAprovar(null);
      setJustificativa('');
      await carregarDados();
    } catch {
      setToast({ tipo: 'error', mensagem: 'Falha na comunicação com o servidor.' });
    } finally {
      setProcessandoAcao(false);
    }
  };

  // 2. Rejeitar Denúncia (Improcedente -> Mantém ficha)
  const handleRejeitarDenuncia = async () => {
    if (!modalRejeitar) return;
    if (justificativa.trim().length < 5) {
      setToast({
        tipo: 'error',
        mensagem: 'Informe uma justificativa válida com pelo menos 5 caracteres.',
      });
      return;
    }

    setProcessandoAcao(true);
    try {
      const res = await fetch('/api/admin/denuncias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'rejeitar',
          denunciaId: modalRejeitar.id,
          justificativa: justificativa.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        setToast({ tipo: 'error', mensagem: data.mensagem || 'Erro ao rejeitar denúncia.' });
        return;
      }

      setToast({
        tipo: 'success',
        mensagem: 'Denúncia julgada improcedente e arquivamento evitado.',
      });
      setModalRejeitar(null);
      setJustificativa('');
      await carregarDados();
    } catch {
      setToast({ tipo: 'error', mensagem: 'Falha na comunicação com o servidor.' });
    } finally {
      setProcessandoAcao(false);
    }
  };

  // 3. Reverter Arquivamento (RN10: Exige perfil Administrador)
  const handleReverterArquivamento = async () => {
    if (!modalReverter) return;
    if (papelUsuario !== 'admin') {
      setToast({
        tipo: 'error',
        mensagem: 'Regra RN10: Apenas usuários com perfil Administrador podem reverter o arquivamento.',
      });
      return;
    }
    if (justificativa.trim().length < 5) {
      setToast({
        tipo: 'error',
        mensagem: 'Informe o motivo da restauração com pelo menos 5 caracteres.',
      });
      return;
    }

    setProcessandoAcao(true);
    try {
      const res = await fetch('/api/admin/denuncias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acao: 'reverter',
          fichaId: modalReverter.ficha_id,
          justificativa: justificativa.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        setToast({ tipo: 'error', mensagem: data.mensagem || 'Erro ao reverter arquivamento.' });
        return;
      }

      setToast({
        tipo: 'success',
        mensagem: `Arquivamento revertido com sucesso! A ficha foi reativada.`,
      });
      setModalReverter(null);
      setJustificativa('');
      await carregarDados();
    } catch {
      setToast({ tipo: 'error', mensagem: 'Falha na comunicação com o servidor.' });
    } finally {
      setProcessandoAcao(false);
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

      {/* Navegação e Switcher de Papel para Testes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Link
          href="/admin"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel geral
        </Link>

        {/* Simulador de Papel: Permite testar a restrição da Regra RN10 em tempo real */}
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
            🛡️ Administrador
          </button>
          <button
            onClick={() => alternarPapel('moderador')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              papelUsuario === 'moderador'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚖️ Moderador
          </button>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-xs mb-3">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Tribunal de Moderação & Diretrizes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          Painel de Moderação e Denúncias
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Análise de infrações éticas, arquivamento de fichas impróprias e reversão com chancela de Administrador (RF19, RF19a, RN10).
        </p>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-slate-900/60 p-4 rounded-xl border border-quest-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 uppercase font-semibold">Filtrar por Status:</span>
          <div className="flex gap-1.5">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'procedente', label: 'Procedentes' },
              { id: 'improcedente', label: 'Improcedentes' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFiltroStatus(st.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  filtroStatus === st.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={carregarDados}
          disabled={carregando}
          className="gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin' : ''}`} />
          Atualizar Lista
        </Button>
      </div>

      {/* Lista de Denúncias */}
      {carregando ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-400">Consultando pergaminhos de denúncias...</p>
        </div>
      ) : denuncias.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            icone={<ShieldCheck className="w-12 h-12 text-emerald-400" />}
            titulo="Nenhuma denúncia encontrada"
            descricao="Todas as fichas no reino estão em conformidade com as diretrizes da guilda."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {denuncias.map((d) => {
            const isPendente = d.status === 'pendente';
            const isProcedente = d.status === 'procedente';
            const isImprocedente = d.status === 'improcedente';
            const fichaArquivada = !d.ficha.ativo;

            return (
              <Card
                key={d.id}
                className={`transition-all border-l-4 ${
                  isPendente
                    ? 'border-l-amber-500 hover:border-amber-400/80'
                    : isProcedente
                    ? 'border-l-red-500 hover:border-red-400/80'
                    : 'border-l-slate-600'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          Denúncia #{d.id}
                        </span>

                        {isPendente && (
                          <Badge variant="warning" className="gap-1">
                            <Clock className="w-3 h-3" /> Pendente de Julgamento
                          </Badge>
                        )}
                        {isProcedente && (
                          <Badge variant="danger" className="gap-1">
                            <AlertOctagon className="w-3 h-3" /> Procedente (Ficha Penalizada)
                          </Badge>
                        )}
                        {isImprocedente && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Improcedente (Rejeitada)
                          </Badge>
                        )}

                        {fichaArquivada ? (
                          <Badge variant="danger">Ficha Arquivada (ativo = false)</Badge>
                        ) : (
                          <Badge variant="success">Ficha Ativa no Reino</Badge>
                        )}
                      </div>

                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <span>Ficha: {d.ficha.nome}</span>
                        <span className="text-xs font-normal text-slate-400">
                          ({d.ficha.classe} • {d.ficha.universo} • Poder {d.ficha.poder})
                        </span>
                      </CardTitle>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(d.criado_em).toLocaleDateString('pt-BR')} às {new Date(d.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Motivo da denúncia */}
                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-sm">
                    <div className="text-xs font-semibold text-slate-400 mb-1 uppercase flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>Motivo Alegado pelo Denunciante:</span>
                    </div>
                    <p className="text-slate-200 italic">&ldquo;{d.motivo}&rdquo;</p>
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                      <User className="w-3 h-3" />
                      <span>Denunciante: {d.denunciante_nome} ({d.denunciante_email})</span>
                    </div>
                  </div>

                  {/* Resolução anterior se houver */}
                  {d.resolvido_em && (
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                      <span className="font-semibold text-slate-400">Julgado por:</span>{' '}
                      <span className="text-indigo-400 font-medium">{d.moderador_nome || 'Moderador do Conselho'}</span>{' '}
                      em {new Date(d.resolvido_em).toLocaleDateString('pt-BR')}.
                      {d.justificativa_moderacao && (
                        <p className="mt-1 text-slate-300">
                          <span className="font-semibold text-slate-400">Despacho:</span> {d.justificativa_moderacao}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Barra de Ações de Moderação */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>ID Ficha: {d.ficha_id}</span>
                      {d.ficha.usuario_github && (
                        <span className="ml-2 flex items-center gap-1 text-slate-400">
                          GitHub: @{d.ficha.usuario_github}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Caso 1: Denúncia Pendente -> Moderador pode Aprovar ou Rejeitar */}
                      {isPendente && (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => {
                              setModalAprovar(d);
                              setJustificativa('');
                            }}
                          >
                            <AlertOctagon className="w-3.5 h-3.5" />
                            Aprovar Denúncia (Arquivar Ficha)
                          </Button>

                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => {
                              setModalRejeitar(d);
                              setJustificativa('');
                            }}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Rejeitar Denúncia
                          </Button>
                        </>
                      )}

                      {/* Caso 2: Ficha Arquivada -> Reverter Arquivamento (RN10: Exige Administrador) */}
                      {fichaArquivada && (
                        <div className="relative group">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={papelUsuario !== 'admin'}
                            className={`gap-1.5 ${
                              papelUsuario === 'admin'
                                ? 'border-amber-600/70 text-amber-300 hover:bg-amber-950/40'
                                : 'opacity-60 cursor-not-allowed text-slate-400'
                            }`}
                            onClick={() => {
                              if (papelUsuario === 'admin') {
                                setModalReverter(d);
                                setJustificativa('');
                              } else {
                                setToast({
                                  tipo: 'error',
                                  mensagem: 'Regra RN10: Apenas Administrador pode reverter arquivamento de moderação.',
                                });
                              }
                            }}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reverter Arquivamento
                          </Button>

                          {papelUsuario !== 'admin' && (
                            <span className="hidden sm:group-hover:block absolute bottom-full mb-1 right-0 w-64 p-2 text-xs bg-slate-900 border border-amber-600/50 text-amber-200 rounded shadow-xl z-20 pointer-events-none">
                              ⚠️ <strong>Regra RN10:</strong> Reverter esse arquivamento exige permissão de Administrador (alterne o perfil acima para testar).
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: APROVAR DENÚNCIA (Arquivar Ficha)               */}
      {/* ======================================================== */}
      <Modal
        isOpen={!!modalAprovar}
        onClose={() => setModalAprovar(null)}
        title="Confirmar Moderação: Aprovar Denúncia"
        description="Ao aprovar a denúncia como procedente, a ficha será arquivada imediatamente (ativo = false) e uma entrada imutável será registrada na tabela de auditoria (RF19a, RN10)."
        confirmText="Confirmar Arquivamento da Ficha"
        confirmVariant="danger"
        isLoading={processandoAcao}
        onConfirm={handleAprovarDenuncia}
      >
        <div className="space-y-3">
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
            <strong>Ficha Penalizada:</strong> {modalAprovar?.ficha.nome} (ID #{modalAprovar?.ficha_id})
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Justificativa Obrigatória do Moderador: <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Ex.: Conteúdo ofensivo flagrante confirmado. Arquivamento aplicado conforme as diretrizes da comunidade."
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </Modal>

      {/* ======================================================== */}
      {/* MODAL 2: REJEITAR DENÚNCIA (Improcedente)                */}
      {/* ======================================================== */}
      <Modal
        isOpen={!!modalRejeitar}
        onClose={() => setModalRejeitar(null)}
        title="Rejeitar Denúncia"
        description="A denúncia será marcada como improcedente. A ficha do personagem permanecerá ativa no sistema."
        confirmText="Marcar como Improcedente"
        confirmVariant="primary"
        isLoading={processandoAcao}
        onConfirm={handleRejeitarDenuncia}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Justificativa do Julgamento: <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Ex.: Não foi identificada nenhuma violação aos termos de conduta do CodeQuest."
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </Modal>

      {/* ======================================================== */}
      {/* MODAL 3: REVERTER ARQUIVAMENTO (RN10: Exige Admin)       */}
      {/* ======================================================== */}
      <Modal
        isOpen={!!modalReverter}
        onClose={() => setModalReverter(null)}
        title="Reverter Arquivamento de Ficha (RN10)"
        description="Esta ação restaurará a ficha de personagem ao estado ativo (ativo = true). A regra RN10 determina que apenas Administradores possuem este poder supremo."
        confirmText="Confirmar Restauração da Ficha"
        confirmVariant="primary"
        isLoading={processandoAcao}
        onConfirm={handleReverterArquivamento}
      >
        <div className="space-y-3">
          <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-300 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Chancela de Administrador:</strong> Esta deliberação anulará a penalidade anterior e registrará um evento &quot;RESTAURACAO&quot; na auditoria do reino.
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Motivo e Justificativa da Restauração: <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Ex.: Após recurso do estudante e reanálise dos fatos, foi verificado mal-entendido. Ficha restaurada com advertência verbal."
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
