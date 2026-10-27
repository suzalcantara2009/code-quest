import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AULAS_TRILHA } from '@/lib/course-lessons';
import { AulaTecnica } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduloIdParam = searchParams.get('modulo_id');
    const moduloId = moduloIdParam ? Number(moduloIdParam) : undefined;

    // Tenta buscar do banco Neon Postgres (Prisma)
    try {
      const where = moduloId ? { modulo_id: moduloId } : {};
      const aulasDb = await prisma.aula.findMany({
        where,
        include: {
          atividades: {
            orderBy: { ordem: 'asc' },
          },
        },
        orderBy: [{ modulo_id: 'asc' }, { numero: 'asc' }],
      });

      if (aulasDb && aulasDb.length > 0) {
        const formatadas: AulaTecnica[] = aulasDb.map((a) => ({
          id: a.id,
          modulo_id: a.modulo_id,
          numero: a.numero,
          titulo: a.titulo,
          subtitulo: a.subtitulo,
          tempoEstimado: a.tempo_estimado,
          xpRecompensa: a.xp_recompensa,
          resumo: a.resumo,
          objetivos: (a.objetivos as string[]) || [],
          secoes: (a.secoes as any) || [],
          conceitosChave: (a.conceitos_chave as any) || [],
          sequenciaAtividades: a.atividades.map((atv) => ({
            id: atv.id,
            ordem: atv.ordem,
            titulo: atv.titulo,
            descricaoPasso: atv.descricao_passo,
            tipo: (atv.tipo as any) || 'conceitual',
            missaoId: atv.missao_id || undefined,
            dificuldade: (atv.dificuldade as any) || 'facil',
            xp: atv.xp,
            dica: atv.dica || '',
            templateCodigo: atv.template_codigo || undefined,
            criterioAceite: atv.criterio_aceite,
            instrucoesPassoAPasso: (atv.instrucoes_passo_a_passo as string[]) || [],
          })),
        }));

        return NextResponse.json({
          sucesso: true,
          fonte: 'database',
          dados: formatadas,
        });
      }
    } catch (dbErr) {
      console.warn('[API_AULAS_DB_FALLBACK] Utilizando catálogo em memória:', dbErr);
    }

    // Fallback para AULAS_TRILHA
    const aulasFallback = moduloId
      ? AULAS_TRILHA[moduloId] || []
      : Object.values(AULAS_TRILHA).flat();

    return NextResponse.json({
      sucesso: true,
      fonte: 'fallback',
      dados: aulasFallback,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao listar aulas da trilha.' },
      { status: 500 }
    );
  }
}
