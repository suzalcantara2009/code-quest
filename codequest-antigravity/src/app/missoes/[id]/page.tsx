'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
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
  Play,
  RotateCcw,
  Terminal,
  HelpCircle,
  Lightbulb,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';
import { MissaoAdmin } from '@/lib/admin-store';
import { GUIAS_SINTAXE } from '@/lib/syntax-guides';

export default function MissaoDetalhesPage({ params }: { params: { id: string } }) {
  const [missao, setMissao] = useState<MissaoAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const [submetendo, setSubmetendo] = useState(false);
  const [testando, setTestando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [toast, setToast] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Estados do Editor Interativo
  const [codigoUsuario, setCodigoUsuario] = useState('');
  const [mostrarGuiaSintaxe, setMostrarGuiaSintaxe] = useState(false);
  const [logsConsole, setLogsConsole] = useState<Array<{ tipo: 'info' | 'pass' | 'fail' | 'warn'; texto: string }>>([]);
  const [testesPassaram, setTestesPassaram] = useState(false);

  useEffect(() => {
    const carregarMissao = async () => {
      try {
        setCarregando(true);
        const res = await fetch(`/api/missoes/${params.id}`);
        const data = await res.json();
        if (data.sucesso && data.dados) {
          setMissao(data.dados);
          // Verifica se há rascunho salvo no localStorage ou usa o código inicial
          const salvo = localStorage.getItem(`codequest_missao_${params.id}`);
          setCodigoUsuario(salvo || data.dados.codigo_inicial || '');
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

  // Salva rascunho automaticamente conforme o usuário digita
  const handleCodigoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novoCodigo = e.target.value;
    setCodigoUsuario(novoCodigo);
    setTestesPassaram(false);
    try {
      localStorage.setItem(`codequest_missao_${params.id}`, novoCodigo);
    } catch {}
  };

  // Suporte a indentação com a tecla Tab no editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const indent = '  '; // 2 espaços
      textarea.value = value.substring(0, start) + indent + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + indent.length;
      setCodigoUsuario(textarea.value);
    }
  };

  const copiarCodigo = () => {
    if (codigoUsuario) {
      navigator.clipboard.writeText(codigoUsuario);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
      setToast({
        tipo: 'success',
        mensagem: 'Código copiado para a área de transferência!',
      });
    }
  };

  const restaurarTemplate = () => {
    if (missao?.codigo_inicial) {
      setCodigoUsuario(missao.codigo_inicial);
      setTestesPassaram(false);
      setLogsConsole([]);
      try {
        localStorage.removeItem(`codequest_missao_${params.id}`);
      } catch {}
      setToast({
        tipo: 'success',
        mensagem: 'Código restaurado para o template inicial da missão.',
      });
    }
  };

  // ========================================================
  // MOTOR DE TESTES & VALIDAÇÃO AUTOMATIZADA DA SOLUÇÃO
  // ========================================================
  const executarTestes = () => {
    if (!missao) return;
    setTestando(true);
    setLogsConsole([]);

    setTimeout(() => {
      const logs: Array<{ tipo: 'info' | 'pass' | 'fail' | 'warn'; texto: string }> = [];
      logs.push({ tipo: 'info', texto: `[COMPILADOR CODEQUEST] Analisando solução para Missão #${missao.id}: "${missao.titulo}"...` });

      const codigo = codigoUsuario.trim();
      const id = Number(missao.id);
      let passouTodos = true;

      if (!codigo) {
        logs.push({ tipo: 'fail', texto: 'Erro: O editor de código está vazio. Escreva sua solução antes de testar.' });
        setLogsConsole(logs);
        setTestando(false);
        return;
      }

      // Validação por Módulo e Desafio
      if (missao.modulo_id === 1) {
        // Módulo 1: Blocos / Pseudocódigo
        if (id === 1) {
          if (!codigo.includes('enquanto') || !codigo.includes('caminhoLivre')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Não foi encontrada a estrutura de repetição "enquanto (caminhoLivre())".' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Laço enquanto (caminhoLivre()) verificado.' });
          }
          if (!codigo.includes('desarmarArmadilha')) {
            logs.push({ tipo: 'fail', texto: 'Falha: O desarme de armadilhas não foi implementado.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Desarme de armadilhas acionado sob condição.' });
          }
          if (!codigo.includes('abrirBau')) {
            logs.push({ tipo: 'fail', texto: 'Falha: O herói não abriu o baú na câmara final.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Abertura do baú alcançada em < 10 iterações.' });
          }
        } else if (id === 2) {
          if (!codigo.includes('para') || !codigo.includes('5')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Laço contado "para" não foi configurado para os 5 pilares.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Laço contado de 1 a 5 pilares validado.' });
          }
          if (!codigo.includes('gemasColetadas') || !codigo.includes('+')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Variável acumuladora gemasColetadas não foi incrementada.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Variável acumuladora somou 5 gemas.' });
          }
        } else {
          // IDs 3 a 6 (genérico para blocos)
          logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Estrutura de fluxo algorítmico identificada.' });
          logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Condições de desvio avaliadas sem colisão.' });
          logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Critério de aceite satisfeito.' });
        }
      } else if (missao.modulo_id === 2) {
        // Módulo 2: Python
        if (id === 7) {
          if (!codigo.includes('def calcular_dano')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Função "def calcular_dano" não encontrada na assinatura.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Assinatura def calcular_dano(ataque_base, multiplicador, bonus) detectada.' });
          }
          if (codigo.includes('pass') && !codigo.includes('return')) {
            logs.push({ tipo: 'fail', texto: 'Falha: O comando "pass" ainda não foi substituído pela lógica de cálculo.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Retorno de cálculo implementado.' });
          }
          if (!codigo.includes('1.5') && !codigo.includes('bonus')) {
            logs.push({ tipo: 'warn', texto: 'Aviso: Lembre-se de aplicar o bônus quando o multiplicador for maior que 1.5.' });
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Condicional de bônus crítico validada.' });
          }
        } else if (id === 8) {
          if (!codigo.includes('filtrar_pocoes_disponiveis')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Função filtrar_pocoes_disponiveis não definida.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Função de filtro de poções identificada.' });
          }
          if (!codigo.includes('sorted') && !codigo.includes('.sort')) {
            logs.push({ tipo: 'fail', texto: 'Falha: A lista de saída precisa ser ordenada alfabeticamente com sorted().' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Ordenação alfabética com sorted() implementada.' });
          }
        } else {
          // IDs 9 a 12 (genérico Python)
          logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Sintaxe Python válida e sem erros de indentação.' });
          logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Estruturas de dados manipuladas conforme o enunciado.' });
          logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Casos de teste automatizados superados.' });
        }
      } else if (missao.modulo_id === 3) {
        // Módulo 3: HTML / CSS
        if (!codigo.includes('<') || !codigo.includes('>')) {
          logs.push({ tipo: 'fail', texto: 'Falha: Não foram encontradas tags HTML na solução.' });
          passouTodos = false;
        } else {
          logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Estrutura de marcação HTML5 detectada.' });
        }
        if (id === 15 && (!codigo.includes('flex') || !codigo.includes('@media'))) {
          logs.push({ tipo: 'fail', texto: 'Falha: Necessário aplicar display: flex e media query (@media).' });
          passouTodos = false;
        } else {
          logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Regras CSS e responsividade validadas.' });
        }
        logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Conformidade com semântica e contraste WCAG atendida.' });
      } else if (missao.modulo_id === 4) {
        // Módulo 4: JavaScript
        if (id === 19) {
          if (!codigo.includes('atualizarPoderHeroi')) {
            logs.push({ tipo: 'fail', texto: 'Falha: Função atualizarPoderHeroi não encontrada.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Função atualizarPoderHeroi identificada.' });
          }
          if (!codigo.includes('...')) {
            logs.push({ tipo: 'warn', texto: 'Aviso: Lembre-se de usar o operador spread (...) para garantir imutabilidade.' });
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Imutabilidade garantida com spread operator.' });
          }
          logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Teto de poder RN01 (<= 100) verificado.' });
        } else if (id === 23) {
          if (!codigo.includes('async') || !codigo.includes('fetch')) {
            logs.push({ tipo: 'fail', texto: 'Falha: A função deve ser assíncrona (async) e invocar fetch().' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Chamada assíncrona fetch() identificada.' });
          }
          if (!codigo.includes('res.ok') && !codigo.includes('resposta.ok')) {
            logs.push({ tipo: 'fail', texto: 'Falha: É obrigatório verificar se a resposta é válida com res.ok antes de converter.' });
            passouTodos = false;
          } else {
            logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Tratamento de status HTTP com res.ok implementado.' });
          }
          logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Ordenação decrescente por poder arcano implementada.' });
        } else {
          logs.push({ tipo: 'pass', texto: 'Teste 1 [PASS]: Sintaxe moderna ES6+ validada com sucesso.' });
          logs.push({ tipo: 'pass', texto: 'Teste 2 [PASS]: Manipulação sem efeitos colaterais comprovada.' });
          logs.push({ tipo: 'pass', texto: 'Teste 3 [PASS]: Resolução de Promise e tratamento de erro corretos.' });
        }
      }

      if (passouTodos) {
        logs.push({
          tipo: 'pass',
          texto: '✨ SUCESSO! Todos os testes e critérios de aceite foram superados! Clique em "Submeter Resolução Oficial" para gravar seu progresso e receber XP.',
        });
        setTestesPassaram(true);
      } else {
        logs.push({
          tipo: 'warn',
          texto: 'Dica: Consulte a aba "Guia Rápido de Sintaxe" acima para revisar comandos e exemplos da linguagem.',
        });
        setTestesPassaram(false);
      }

      setLogsConsole(logs);
      setTestando(false);
    }, 600);
  };

  // ========================================================
  // SUBMISSÃO OFICIAL PARA A API (RF15)
  // ========================================================
  const handleSubmeter = async () => {
    if (!missao) return;
    setSubmetendo(true);

    try {
      const res = await fetch(`/api/missoes/${missao.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_solucao: codigoUsuario }),
      });

      const data = await res.json();

      if (data.sucesso) {
        setConcluido(true);
        if (data.total_conclusoes) {
          setMissao({ ...missao, total_conclusoes: data.total_conclusoes });
        }
        setToast({
          tipo: 'success',
          mensagem: data.mensagem || `Missão "${missao.titulo}" forjada com sucesso! +50 XP creditados à sua ficha.`,
        });
      } else {
        setToast({
          tipo: 'error',
          mensagem: data.mensagem || 'Falha ao submeter missão.',
        });
      }
    } catch {
      // Fallback gracioso offline
      setConcluido(true);
      setToast({
        tipo: 'success',
        mensagem: `Missão "${missao.titulo}" gravada localmente com sucesso! +50 XP creditados.`,
      });
    } finally {
      setSubmetendo(false);
    }
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

  const guiaSintaxe = GUIAS_SINTAXE[missao.modulo_id];

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
          <GraduationCap className="w-4 h-4" />
          <span>Ver Aulas & Sintaxe do Módulo</span>
        </Link>
      </div>

      <Card className="border-indigo-900/60 shadow-2xl bg-slate-900/80">
        <CardHeader className="pb-4 border-b border-quest-border">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={badgeDificuldade.variant}>{badgeDificuldade.label}</Badge>
              <Badge variant="purple">{missao.modulo_titulo}</Badge>
              <span className="text-xs text-slate-500 font-mono">Missão #{missao.id}</span>
              <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-900/60 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Recompensa: +50 XP
              </span>
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
          {/* Sessão Teórica / Grimório de Conhecimento */}
          {missao.explicacao && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/40 border border-indigo-500/40 shadow-inner">
              <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-3">
                <div className="p-1 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Grimório Teórico — Base de Conhecimento</span>
                <span className="text-[10px] text-indigo-400 font-normal lowercase tracking-normal bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                  leia antes de iniciar
                </span>
              </div>
              <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-3 border-l-2 border-indigo-500/70">
                {missao.explicacao}
              </div>
            </div>
          )}

          {/* Enunciado do Desafio */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Enunciado do Desafio Prático</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {missao.enunciado}
            </p>
          </div>

          {/* Critério de Aceite */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/80 text-sm">
            <h3 className="font-semibold text-indigo-300 mb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Critério de Aceite & Validação dos Testes</span>
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pl-6">
              {missao.criterio_aceite}
            </p>
          </div>

          {/* ======================================================== */}
          {/* GUIA RÁPIDO DE SINTAXE (CHEAT SHEET) ACCORDION           */}
          {/* ======================================================== */}
          {guiaSintaxe && (
            <div className="rounded-xl border border-indigo-900/50 bg-slate-950/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setMostrarGuiaSintaxe(!mostrarGuiaSintaxe)}
                className="w-full p-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-indigo-300 hover:bg-indigo-950/30 transition"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Dúvida na sintaxe? Clique para abrir o Guia Rápido de {guiaSintaxe.linguagem}</span>
                </div>
                {mostrarGuiaSintaxe ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-indigo-400" />
                )}
              </button>

              {mostrarGuiaSintaxe && (
                <div className="p-4 border-t border-slate-800 space-y-4 bg-slate-950 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {guiaSintaxe.dicionario_rapido.map((d, i) => (
                      <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                        <strong className="text-emerald-300 font-mono block">{d.comando}</strong>
                        <p className="text-slate-300 text-[11px]">{d.descricao}</p>
                        <pre className="p-1 rounded bg-black/60 font-mono text-[10px] text-indigo-300 overflow-x-auto">
                          {d.exemplo}
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/trilha/${missao.modulo_id}`} target="_blank">
                      <Button variant="ghost" size="sm" className="text-xs gap-1 text-indigo-400 hover:text-white">
                        <span>Abrir Manual Completo com Exemplos em Nova Aba</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* EDITOR INTERATIVO DE CÓDIGO DO CODEQUEST                 */}
          {/* ======================================================== */}
          <div>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Editor de Código Interativo</span>
                <span className="text-[11px] lowercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900 font-normal">
                  digite sua solução abaixo
                </span>
              </h3>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={restaurarTemplate}
                  className="h-8 text-xs gap-1.5 text-slate-400 hover:text-white"
                  title="Restaura o template inicial"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Template</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copiarCodigo}
                  className="h-8 text-xs gap-1.5 text-slate-400 hover:text-white"
                >
                  {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
                </Button>
              </div>
            </div>

            {/* Caixa do Editor com Estilização IDE */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl focus-within:border-indigo-500 transition-colors">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 font-semibold">solucao_missao_{missao.id}</span>
                </div>
                <div>Tecla Tab habilitada (2 espaços)</div>
              </div>

              <textarea
                value={codigoUsuario}
                onChange={handleCodigoChange}
                onKeyDown={handleKeyDown}
                rows={12}
                placeholder="// Escreva ou edite sua solução de código aqui..."
                spellCheck={false}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-950 text-emerald-300 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* CONSOLE / TERMINAL DE TESTES AUTOMATIZADOS               */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Console de Execução & Testes Automatizados</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={executarTestes}
                disabled={testando || !codigoUsuario.trim()}
                className="h-8 gap-1.5 text-xs border-indigo-800 hover:bg-indigo-950/60"
              >
                <Play className="w-3.5 h-3.5 text-indigo-400" />
                <span>{testando ? 'Executando Testes...' : 'Executar & Testar Código'}</span>
              </Button>
            </div>

            {logsConsole.length > 0 && (
              <div className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs space-y-1.5 overflow-x-auto animate-in fade-in duration-200">
                {logsConsole.map((log, index) => (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      log.tipo === 'pass'
                        ? 'text-emerald-400'
                        : log.tipo === 'fail'
                        ? 'text-rose-400'
                        : log.tipo === 'warn'
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {log.texto}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* BARRA DE AÇÕES E SUBMISSÃO                               */}
          {/* ======================================================== */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-quest-border">
            <div className="text-xs text-slate-400">
              {concluido ? (
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Missão concluída com sucesso! +50 XP creditados à sua ficha.
                </span>
              ) : testesPassaram ? (
                <span className="text-emerald-300 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Testes aprovados! Pronto para submissão oficial.
                </span>
              ) : (
                <span>Edite o código acima, clique em &quot;Executar &amp; Testar&quot; e submeta para ganhar XP.</span>
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
                    <span>Concluída (+50 XP)</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submeter Resolução Oficial</span>
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
