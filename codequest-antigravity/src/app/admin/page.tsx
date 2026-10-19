'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Target,
  FileText,
  AlertOctagon,
  UserX,
  Compass,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';

export default function AdminDashboardPage() {
  const [metricas, setMetricas] = useState({
    totalUsuarios: 0,
    totalFichasAtivas: 0,
    totalMissoesConcluidas: 0,
    totalDenunciasPendentes: 0,
    totalMissoes: 0,
    totalLogsAuditoria: 0,
  });
  const [papelUsuario, setPapelUsuario] = useState<'admin' | 'moderador'>('admin');
  const [carregando, setCarregando] = useState(true);
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const [resMetricas, resPerfil] = await Promise.all([
        fetch('/api/admin/metricas'),
        fetch('/api/admin/perfil'),
      ]);

      const dataMetricas = await resMetricas.json();
      const dataPerfil = await resPerfil.json();

      if (dataMetricas.sucesso) {
        setMetricas(dataMetricas.dados);
      }
      if (dataPerfil.sucesso && dataPerfil.dados?.tipo) {
        setPapelUsuario(dataPerfil.dados.tipo === 'moderador' ? 'moderador' : 'admin');
      }
    } catch {
      setToast({ tipo: 'error', mensagem: 'Falha ao carregar métricas administrativas.' });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
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
          mensagem: `Visão administrativa alternada para: ${novoPapel.toUpperCase()}`,
        });
      }
    } catch {
      setToast({ tipo: 'error', mensagem: 'Erro ao alternar papel.' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
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

      {/* Topo com título e seletor de papel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Mesa de Comando da Guilda</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Painel Administrativo & Moderação</h1>
          <p className="text-sm text-slate-400">
            Controle do reino: deliberação de denúncias, gestão de missões pedagógicas e auditoria inviolável.
          </p>
        </div>

        {/* Simulador de Papel de Acesso */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-quest-border px-3 py-1.5 rounded-lg text-xs self-start sm:self-auto">
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

      {/* Cards de Métricas Agregadas (RF22) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-900/70 border-quest-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase">Usuários no Reino</CardTitle>
            <Users className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {carregando ? '...' : metricas.totalUsuarios}
            </div>
            <p className="text-xs text-slate-500 mt-1">Contas totais registradas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/70 border-quest-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase">Fichas em Combate</CardTitle>
            <Shield className="w-4 h-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {carregando ? '...' : metricas.totalFichasAtivas}
            </div>
            <p className="text-xs text-slate-500 mt-1">Personagens ativos (ativo=true)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/70 border-quest-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase">Missões na Trilha</CardTitle>
            <Target className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {carregando ? '...' : metricas.totalMissoes}
            </div>
            <p className="text-xs text-slate-500 mt-1">Desafios pedagógicos cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/70 border-quest-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase">Denúncias Pendentes</CardTitle>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {carregando ? '...' : metricas.totalDenunciasPendentes}
            </div>
            <p className="text-xs text-slate-500 mt-1">Aguardando parecer do tribunal</p>
          </CardContent>
        </Card>
      </div>

      {/* Módulos do Sistema de Administração */}
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Salas de Comando e Gestão</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Moderação & Denúncias */}
        <Link href="/admin/denuncias" className="group">
          <Card className="h-full hover:border-red-500/50 transition-all bg-slate-900/80 group-hover:bg-slate-800/60">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-lg bg-red-950/60 text-red-400 border border-red-900/50">
                  <AlertOctagon className="w-6 h-6" />
                </div>
                <Badge variant={metricas.totalDenunciasPendentes > 0 ? 'danger' : 'default'}>
                  {metricas.totalDenunciasPendentes > 0
                    ? `${metricas.totalDenunciasPendentes} pendente(s)`
                    : 'Em dia'}
                </Badge>
              </div>
              <CardTitle className="group-hover:text-red-400 transition-colors">
                Moderação de Denúncias
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Julgue denúncias de conteúdo impróprio, aprove com arquivamento da ficha ou reverta restaurações com privilégio de Administrador (RF19, RN10).
              </p>
            </CardHeader>
            <CardContent className="pt-2 flex items-center justify-end text-sm text-red-400 font-medium">
              <span>Abrir Tribunal</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>

        {/* Card 2: Gestão de Missões */}
        <Link href="/admin/missoes" className="group">
          <Card className="h-full hover:border-indigo-500/50 transition-all bg-slate-900/80 group-hover:bg-slate-800/60">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900/50">
                  <Target className="w-6 h-6" />
                </div>
                <Badge variant="purple">RN05: Oficial</Badge>
              </div>
              <CardTitle className="group-hover:text-indigo-400 transition-colors">
                Gestão de Missões
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Cadastre novos desafios da trilha pedagógica estruturada nos 4 módulos com enunciados, dificuldades e critérios de aceite (RF13, RN05).
              </p>
            </CardHeader>
            <CardContent className="pt-2 flex items-center justify-end text-sm text-indigo-400 font-medium">
              <span>Acessar Forja</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>

        {/* Card 3: Auditoria Inviolável */}
        <Link href="/admin/auditoria" className="group">
          <Card className="h-full hover:border-emerald-500/50 transition-all bg-slate-900/80 group-hover:bg-slate-800/60">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-900/50">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant="success">RN04: Read-Only</Badge>
              </div>
              <CardTitle className="group-hover:text-emerald-400 transition-colors">
                Logs de Auditoria
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Tabela somente consulta inviolável com filtragem por ficha, autor, ação e período de data de todas as mutações no sistema (RF18, RF18a, RN04).
              </p>
            </CardHeader>
            <CardContent className="pt-2 flex items-center justify-end text-sm text-emerald-400 font-medium">
              <span>Consultar Crônicas</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Atalho adicional para gestão de contas */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Suspensão de Contas de Usuários</h3>
            <p className="text-xs text-slate-400">
              Bloqueio temporário e reativação disciplinar de contas sem exclusão de dados (RF23).
            </p>
          </div>
        </div>

        <Link href="/admin/usuarios">
          <Button variant="outline" size="sm">
            Gerenciar Usuários
          </Button>
        </Link>
      </div>
    </div>
  );
}
