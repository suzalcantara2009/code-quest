import { NextResponse } from 'next/server';
import { obterMetricasAdmin } from '@/lib/admin-store';

export async function GET() {
  try {
    const metricas = await obterMetricasAdmin();
    return NextResponse.json({
      sucesso: true,
      dados: metricas,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao calcular métricas administrativas.' },
      { status: 500 }
    );
  }
}

