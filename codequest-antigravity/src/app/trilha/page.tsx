import React from 'react';
import Link from 'next/link';
import { Compass, Blocks, Code, FileCode, Layers, ArrowRight, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const MODULOS_TRILHA = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao: 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.',
    missao_titulo: 'O Despertar dos Blocos Mágicos',
    dificuldade: 'facil' as const,
    icone: Blocks,
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao: 'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.',
    missao_titulo: 'O Cálculo do Dano Crítico',
    dificuldade: 'facil' as const,
    icone: Code,
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao: 'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.',
    missao_titulo: 'O Estandarte Responsivo da Guilda',
    dificuldade: 'medio' as const,
    icone: FileCode,
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao: 'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.',
    missao_titulo: 'O Feitiço da API Assíncrona',
    dificuldade: 'dificil' as const,
    icone: Layers,
  },
];

export default function TrilhaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Trilha Pedagógica</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Trilha de Aprendizagem</h1>
        <p className="text-sm text-slate-400 mt-1">
          Percorra os 4 módulos estruturados para consolidar seus conhecimentos e desbloquear novas missões.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULOS_TRILHA.map((m) => {
          const Icon = m.icone;
          const badgeDificuldade =
            m.dificuldade === 'facil'
              ? { variant: 'success' as const, label: 'Fácil' }
              : m.dificuldade === 'medio'
              ? { variant: 'warning' as const, label: 'Médio' }
              : { variant: 'danger' as const, label: 'Difícil' };

          return (
            <Link key={m.id} href={`/trilha/${m.id}`} className="group">
              <Card className="h-full hover:border-indigo-500/50 transition-colors flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900/50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="purple">{m.tecnologia}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-indigo-400 transition-colors">
                    {m.titulo}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{m.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-300 min-w-0">
                      <Target className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="font-medium truncate">{m.missao_titulo}</span>
                    </div>
                    <Badge variant={badgeDificuldade.variant} className="flex-shrink-0">
                      {badgeDificuldade.label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-end text-sm text-indigo-400 font-medium pt-1">
                    <span>Acessar Módulo</span>
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
