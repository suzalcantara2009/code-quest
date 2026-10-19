import { NextResponse } from 'next/server';
import {
  listarDenuncias,
  aprovarDenuncia,
  rejeitarDenuncia,
  reverterArquivamentoPorAdmin,
} from '@/lib/admin-store';
import { obterSessaoAtual } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const denuncias = await listarDenuncias(status);
    return NextResponse.json({
      sucesso: true,
      dados: denuncias,
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro ao listar denúncias.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessao = await obterSessaoAtual();
    if (!sessao) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Sessão expirada ou não autenticada.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { acao, denunciaId, fichaId, justificativa } = body;

    if (!justificativa || typeof justificativa !== 'string' || justificativa.trim().length < 5) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'É obrigatório informar uma justificativa com no mínimo 5 caracteres.' },
        { status: 422 }
      );
    }

    // Ação: Moderador aprova denúncia (Ficha arquivada com ativo = false)
    if (acao === 'aprovar') {
      if (!denunciaId) {
        return NextResponse.json(
          { sucesso: false, mensagem: 'ID da denúncia obrigatório.' },
          { status: 400 }
        );
      }

      const resultado = await aprovarDenuncia({
        denunciaId: Number(denunciaId),
        moderadorId: sessao.usuarioId,
        moderadorNome: sessao.nome || 'Moderador do Sistema',
        justificativa: justificativa.trim(),
      });

      if (!resultado.sucesso) {
        return NextResponse.json(resultado, { status: 400 });
      }

      return NextResponse.json(resultado);
    }

    // Ação: Moderador rejeita denúncia (Ficha mantida ativa)
    if (acao === 'rejeitar') {
      if (!denunciaId) {
        return NextResponse.json(
          { sucesso: false, mensagem: 'ID da denúncia obrigatório.' },
          { status: 400 }
        );
      }

      const resultado = await rejeitarDenuncia({
        denunciaId: Number(denunciaId),
        moderadorId: sessao.usuarioId,
        moderadorNome: sessao.nome || 'Moderador do Sistema',
        justificativa: justificativa.trim(),
      });

      if (!resultado.sucesso) {
        return NextResponse.json(resultado, { status: 400 });
      }

      return NextResponse.json(resultado);
    }

    // Ação: Reverter Arquivamento (RN10: Exige perfil Administrador)
    if (acao === 'reverter') {
      if (!fichaId) {
        return NextResponse.json(
          { sucesso: false, mensagem: 'ID da ficha obrigatório para reversão.' },
          { status: 400 }
        );
      }

      // Regra RN10: Verifica privilégio estrito de Administrador
      if (sessao.tipo !== 'admin') {
        return NextResponse.json(
          {
            sucesso: false,
            mensagem: 'Permissão negada. A regra RN10 exige aprovação de um Administrador para reverter arquivamento decorrente de moderação.',
          },
          { status: 403 }
        );
      }

      const resultado = await reverterArquivamentoPorAdmin({
        fichaId: Number(fichaId),
        adminId: sessao.usuarioId,
        adminNome: sessao.nome || 'Administrador Supremo',
        adminTipo: sessao.tipo,
        justificativa: justificativa.trim(),
      });

      if (!resultado.sucesso) {
        return NextResponse.json(resultado, { status: 400 });
      }

      return NextResponse.json(resultado);
    }

    return NextResponse.json(
      { sucesso: false, mensagem: `Ação "${acao}" desconhecida.` },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no processamento da solicitação de moderação.' },
      { status: 500 }
    );
  }
}

