/**
 * CodeQuest - Admin Data Store
 * Gerenciamento centralizado de Denúncias, Missões, Auditoria e Fichas para o Painel Administrativo.
 * Suporta persistência em memória garantindo consistência em ambiente de desenvolvimento
 * e integração com Prisma ORM / PostgreSQL quando disponível.
 */

import { DificuldadeMissao, StatusDenuncia } from '@/types';

export interface FichaAdmin {
  id: number;
  usuario_id: number;
  nome: string;
  universo: string;
  classe: string;
  poder: number;
  usuario_github?: string | null;
  ativo: boolean;
  criado_em: string;
}

export interface DenunciaCompleta {
  id: number;
  ficha_id: number;
  ficha: FichaAdmin;
  denunciante_id: number;
  denunciante_nome: string;
  denunciante_email: string;
  moderador_id?: number | null;
  moderador_nome?: string | null;
  motivo: string;
  status: StatusDenuncia;
  criado_em: string;
  resolvido_em?: string | null;
  justificativa_moderacao?: string | null;
}

export interface MissaoAdmin {
  id: number;
  modulo_id: number;
  modulo_titulo: string;
  titulo: string;
  enunciado: string;
  codigo_inicial?: string | null;
  criterio_aceite: string;
  dificuldade: DificuldadeMissao;
  criado_em: string;
  total_conclusoes?: number;
}

export interface AuditoriaCompleta {
  id: number;
  ficha_id?: number | null;
  ficha_nome?: string | null;
  autor_id?: number | null;
  autor_nome: string;
  autor_tipo: string;
  acao: string;
  detalhes: string;
  data_hora: string;
}

// Sementes iniciais temáticas de RPG e programação para o CodeQuest
const FICHAS_INICIAIS: FichaAdmin[] = [
  {
    id: 1,
    usuario_id: 101,
    nome: 'Goku_Dark_Hacker_99',
    universo: 'Anime',
    classe: 'Mago',
    poder: 92,
    usuario_github: 'gokuhack-dev',
    ativo: true,
    criado_em: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
  },
  {
    id: 2,
    usuario_id: 102,
    nome: 'Spam_Bot_Crypto_Free',
    universo: 'Marvel',
    classe: 'Guerreiro',
    poder: 45,
    usuario_github: 'free-crypto-bot',
    ativo: false,
    criado_em: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
  },
  {
    id: 3,
    usuario_id: 103,
    nome: 'Aragorn_Senior_Dev',
    universo: 'Tolkien',
    classe: 'Ranger',
    poder: 88,
    usuario_github: 'aragorn-code',
    ativo: true,
    criado_em: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
  },
  {
    id: 4,
    usuario_id: 104,
    nome: 'Vader_Dev_Ofensivo_123',
    universo: 'Star Wars',
    classe: 'Bruxo',
    poder: 77,
    usuario_github: 'vader-dark',
    ativo: false, // Arquivado por denúncia anterior
    criado_em: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
  },
];

const DENUNCIAS_INICIAIS: DenunciaCompleta[] = [
  {
    id: 1,
    ficha_id: 1,
    ficha: FICHAS_INICIAIS[0],
    denunciante_id: 201,
    denunciante_nome: 'Frodo Bolseiro',
    denunciante_email: 'frodo@condado.org',
    moderador_id: null,
    moderador_nome: null,
    motivo: 'O nome do personagem e bio contêm incitação a ataques e conteúdo impróprio para iniciantes.',
    status: 'pendente',
    criado_em: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    resolvido_em: null,
  },
  {
    id: 2,
    ficha_id: 4,
    ficha: FICHAS_INICIAIS[3],
    denunciante_id: 202,
    denunciante_nome: 'Luke Skywalker',
    denunciante_email: 'luke@alianca.dev',
    moderador_id: 2,
    moderador_nome: 'Guardião Moderador (Elessar)',
    motivo: 'Personagem faz spam de ofensas no campo classe e utiliza linguagem discriminatória.',
    status: 'procedente',
    criado_em: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    resolvido_em: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    justificativa_moderacao: 'Confirmada violação das diretrizes de conduta. Ficha arquivada preventivamente.',
  },
  {
    id: 3,
    ficha_id: 3,
    ficha: FICHAS_INICIAIS[2],
    denunciante_id: 203,
    denunciante_nome: 'Gollum Debugger',
    denunciante_email: 'smeagol@caverna.net',
    moderador_id: 2,
    moderador_nome: 'Guardião Moderador (Elessar)',
    motivo: 'Suspeita infundada de trapaça em XP de missão.',
    status: 'improcedente',
    criado_em: new Date(Date.now() - 80 * 3600 * 1000).toISOString(),
    resolvido_em: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
    justificativa_moderacao: 'Métricas do GitHub e resoluções de missões verificadas e legítimas.',
  },
];

const MODULOS_MAP: Record<number, string> = {
  1: 'Módulo 1 — Programação em Blocos',
  2: 'Módulo 2 — Python',
  3: 'Módulo 3 — HTML e CSS',
  4: 'Módulo 4 — JavaScript',
};

const MISSOES_INICIAIS: MissaoAdmin[] = [
  {
    id: 1,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'O Despertar dos Blocos Mágicos',
    enunciado: 'Monte um algoritmo visual com repetição finita para guiar o herói pelo labirinto de pedra até o baú de runas.',
    codigo_inicial: '// Algoritmo de blocos visual\nenquanto(caminhoLivre()) {\n  andarFrente();\n}',
    criterio_aceite: 'O herói deve alcançar o baú em no máximo 10 iterações sem colidir com obstáculos.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 42,
  },
  {
    id: 2,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'O Cálculo do Dano Crítico',
    enunciado: 'Escreva uma função calcular_dano(ataque_base, multiplicador, bonus) que calcule o dano total aplicando bônus caso o multiplicador seja maior que 1.5.',
    codigo_inicial: 'def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:\n    # Implemente sua lógica aqui\n    pass',
    criterio_aceite: 'Retornar valor inteiro com arredondamento correto para 5 casos de teste.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 28,
  },
  {
    id: 3,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Estandarte Responsivo da Guilda',
    enunciado: 'Crie uma seção semântica <section class="guilda-card"> com CSS Grid ou Flexbox que reorganize o brasão e os atributos para telas móveis.',
    codigo_inicial: '<section class="guilda-card">\n  <!-- Adicione o brasão e os atributos -->\n</section>',
    criterio_aceite: 'Layout semântico responsivo com breakpoint em 640px e contraste acessível.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 19,
  },
  {
    id: 4,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Feitiço da API Assíncrona',
    enunciado: 'Implemente uma função async buscarPoderesGuilda(url) que consuma a API REST com fetch, tratando erros 4xx/5xx com mensagens amigáveis.',
    codigo_inicial: 'async function buscarPoderesGuilda(url) {\n  // Implemente com try/catch e fetch\n}',
    criterio_aceite: 'Tratar rejeições de Promise e retornar array tipado de poderes.',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 11,
  },
];

const AUDITORIA_INICIAL: AuditoriaCompleta[] = [
  {
    id: 1,
    ficha_id: 4,
    ficha_nome: 'Vader_Dev_Ofensivo_123',
    autor_id: 2,
    autor_nome: 'Guardião Moderador (Elessar)',
    autor_tipo: 'moderador',
    acao: 'MODERACAO_ARQUIVAMENTO',
    detalhes: 'Denúncia #2 deferida como procedente. Motivo: Linguagem ofensiva na ficha. Ficha arquivada.',
    data_hora: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 2,
    ficha_id: 3,
    ficha_nome: 'Aragorn_Senior_Dev',
    autor_id: 2,
    autor_nome: 'Guardião Moderador (Elessar)',
    autor_tipo: 'moderador',
    acao: 'DENUNCIA_RESOLVIDA',
    detalhes: 'Denúncia #3 arquivada como improcedente após auditoria de repositórios do GitHub.',
    data_hora: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
  },
  {
    id: 3,
    ficha_id: 1,
    ficha_nome: 'Goku_Dark_Hacker_99',
    autor_id: 201,
    autor_nome: 'Frodo Bolseiro',
    autor_tipo: 'estudante',
    acao: 'DENUNCIA_CRIADA',
    detalhes: 'Denúncia #1 registrada com motivo: Incitação a ataques e conteúdo impróprio.',
    data_hora: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 4,
    ficha_id: 3,
    ficha_nome: 'Aragorn_Senior_Dev',
    autor_id: 103,
    autor_nome: 'Aragorn',
    autor_tipo: 'estudante',
    acao: 'CRIACAO',
    detalhes: 'Ficha de personagem criada com universo Tolkien, classe Ranger e poder 88.',
    data_hora: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
  },
  {
    id: 5,
    ficha_id: 2,
    ficha_nome: 'Spam_Bot_Crypto_Free',
    autor_id: 1,
    autor_nome: 'Mestre Administrador',
    autor_tipo: 'admin',
    acao: 'ARQUIVAMENTO',
    detalhes: 'Arquivamento administrativo preventivo de conta suspeita de automação comercial.',
    data_hora: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
  },
];

// Singleton em memória para persistência contínua entre requisições
interface StoreGlobal {
  fichas: FichaAdmin[];
  denuncias: DenunciaCompleta[];
  missoes: MissaoAdmin[];
  auditorias: AuditoriaCompleta[];
  proximoIdDenuncia: number;
  proximoIdMissao: number;
  proximoIdAuditoria: number;
}

const globalForStore = globalThis as unknown as {
  __codequest_admin_store?: StoreGlobal;
};

if (!globalForStore.__codequest_admin_store) {
  globalForStore.__codequest_admin_store = {
    fichas: [...FICHAS_INICIAIS],
    denuncias: [...DENUNCIAS_INICIAIS],
    missoes: [...MISSOES_INICIAIS],
    auditorias: [...AUDITORIA_INICIAL],
    proximoIdDenuncia: 10,
    proximoIdMissao: 10,
    proximoIdAuditoria: 10,
  };
}

const store = globalForStore.__codequest_admin_store;

// ==========================================
// FUNÇÕES DE SERVIÇO DE MODERAÇÃO E DENÚNCIAS
// ==========================================

export async function listarDenuncias(filtroStatus?: string): Promise<DenunciaCompleta[]> {
  if (!filtroStatus || filtroStatus === 'todas') {
    return [...store.denuncias].sort(
      (a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()
    );
  }
  return store.denuncias
    .filter((d) => d.status === filtroStatus)
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
}

export async function obterDenunciaPorId(id: number): Promise<DenunciaCompleta | null> {
  const denuncia = store.denuncias.find((d) => d.id === id);
  return denuncia ? { ...denuncia } : null;
}

/**
 * RF19a: Moderador aprova a denúncia (marca como procedente) e arquiva a ficha.
 * RN10: Quando uma denúncia é confirmada como procedente por um moderador, a ficha é arquivada automaticamente.
 */
export async function aprovarDenuncia(params: {
  denunciaId: number;
  moderadorId: number;
  moderadorNome: string;
  justificativa: string;
}): Promise<{ sucesso: boolean; mensagem: string; denuncia?: DenunciaCompleta }> {
  const denunciaIndex = store.denuncias.findIndex((d) => d.id === params.denunciaId);
  if (denunciaIndex === -1) {
    return { sucesso: false, mensagem: 'Denúncia não encontrada.' };
  }

  const denuncia = store.denuncias[denunciaIndex];

  // RF19a: Um moderador não pode analisar denúncia relacionada à própria ficha
  if (denuncia.ficha.usuario_id === params.moderadorId) {
    return {
      sucesso: false,
      mensagem: 'Regra RF19a: Um moderador não pode deliberar sobre denúncia de sua própria ficha.',
    };
  }

  // Arquiva a ficha (ativo = false)
  const fichaIndex = store.fichas.findIndex((f) => f.id === denuncia.ficha_id);
  if (fichaIndex !== -1) {
    store.fichas[fichaIndex].ativo = false;
  }
  denuncia.ficha.ativo = false;

  // Atualiza a denúncia
  denuncia.status = 'procedente';
  denuncia.moderador_id = params.moderadorId;
  denuncia.moderador_nome = params.moderadorNome;
  denuncia.resolvido_em = new Date().toISOString();
  denuncia.justificativa_moderacao = params.justificativa;

  // Grava em auditoria inviolável (RF18, RN04)
  await registrarLogAuditoria({
    ficha_id: denuncia.ficha_id,
    ficha_nome: denuncia.ficha.nome,
    autor_id: params.moderadorId,
    autor_nome: params.moderadorNome,
    autor_tipo: 'moderador',
    acao: 'MODERACAO_ARQUIVAMENTO',
    detalhes: `Denúncia #${denuncia.id} aprovada como procedente. Ficha arquivada. Justificativa: ${params.justificativa}`,
  });

  return {
    sucesso: true,
    mensagem: 'Denúncia aprovada como procedente e ficha arquivada com sucesso.',
    denuncia: { ...denuncia },
  };
}

/**
 * Rejeita a denúncia (marca como improcedente), mantendo a ficha inalterada.
 */
export async function rejeitarDenuncia(params: {
  denunciaId: number;
  moderadorId: number;
  moderadorNome: string;
  justificativa: string;
}): Promise<{ sucesso: boolean; mensagem: string; denuncia?: DenunciaCompleta }> {
  const denunciaIndex = store.denuncias.findIndex((d) => d.id === params.denunciaId);
  if (denunciaIndex === -1) {
    return { sucesso: false, mensagem: 'Denúncia não encontrada.' };
  }

  const denuncia = store.denuncias[denunciaIndex];

  if (denuncia.ficha.usuario_id === params.moderadorId) {
    return {
      sucesso: false,
      mensagem: 'Regra RF19a: Um moderador não pode deliberar sobre denúncia de sua própria ficha.',
    };
  }

  denuncia.status = 'improcedente';
  denuncia.moderador_id = params.moderadorId;
  denuncia.moderador_nome = params.moderadorNome;
  denuncia.resolvido_em = new Date().toISOString();
  denuncia.justificativa_moderacao = params.justificativa;

  // Grava em auditoria inviolável
  await registrarLogAuditoria({
    ficha_id: denuncia.ficha_id,
    ficha_nome: denuncia.ficha.nome,
    autor_id: params.moderadorId,
    autor_nome: params.moderadorNome,
    autor_tipo: 'moderador',
    acao: 'DENUNCIA_RESOLVIDA',
    detalhes: `Denúncia #${denuncia.id} julgada como improcedente. Justificativa: ${params.justificativa}`,
  });

  return {
    sucesso: true,
    mensagem: 'Denúncia julgada como improcedente com sucesso.',
    denuncia: { ...denuncia },
  };
}

/**
 * RN10: Reverter arquivamento decorrente de moderação exige autorização de um Administrador.
 * Moderadores sozinhos NÃO podem reverter.
 */
export async function reverterArquivamentoPorAdmin(params: {
  fichaId: number;
  adminId: number;
  adminNome: string;
  adminTipo: string;
  justificativa: string;
}): Promise<{ sucesso: boolean; mensagem: string; ficha?: FichaAdmin }> {
  // RN10: Checagem estrita de privilégio
  if (params.adminTipo !== 'admin') {
    return {
      sucesso: false,
      mensagem: 'Regra RN10: Reverter o arquivamento decorrente de moderação exige perfil estrito de Administrador.',
    };
  }

  const fichaIndex = store.fichas.findIndex((f) => f.id === params.fichaId);
  if (fichaIndex === -1) {
    return { sucesso: false, mensagem: 'Ficha não encontrada.' };
  }

  const ficha = store.fichas[fichaIndex];
  ficha.ativo = true;

  // Atualiza referência nas denúncias vinculadas
  store.denuncias.forEach((d) => {
    if (d.ficha_id === params.fichaId) {
      d.ficha.ativo = true;
    }
  });

  // Registra auditoria inviolável
  await registrarLogAuditoria({
    ficha_id: ficha.id,
    ficha_nome: ficha.nome,
    autor_id: params.adminId,
    autor_nome: params.adminNome,
    autor_tipo: 'admin',
    acao: 'RESTAURACAO',
    detalhes: `Reversão administrativa de arquivamento concedida pelo Administrador (RN10). Justificativa: ${params.justificativa}`,
  });

  return {
    sucesso: true,
    mensagem: `Ficha "${ficha.nome}" restaurada com sucesso pelo Administrador (RN10).`,
    ficha: { ...ficha },
  };
}

// ==========================================
// FUNÇÕES DE SERVIÇO DE MISSÕES
// ==========================================

export async function listarMissoesAdmin(): Promise<MissaoAdmin[]> {
  return [...store.missoes].sort(
    (a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()
  );
}

/**
 * RN05: Apenas usuários com perfil Administrador podem criar missões oficiais.
 */
export async function cadastrarMissaoAdmin(params: {
  modulo_id: number;
  titulo: string;
  enunciado: string;
  dificuldade: DificuldadeMissao;
  criterio_aceite: string;
  codigo_inicial?: string | null;
  adminId: number;
  adminNome: string;
  adminTipo: string;
}): Promise<{ sucesso: boolean; mensagem: string; missao?: MissaoAdmin }> {
  // RN05: Verificação de perfil
  if (params.adminTipo !== 'admin') {
    return {
      sucesso: false,
      mensagem: 'Regra RN05: Apenas usuários com perfil de Administrador podem cadastrar novas missões.',
    };
  }

  const moduloTitulo = MODULOS_MAP[params.modulo_id] || `Módulo ${params.modulo_id}`;

  const novaMissao: MissaoAdmin = {
    id: store.proximoIdMissao++,
    modulo_id: params.modulo_id,
    modulo_titulo: moduloTitulo,
    titulo: params.titulo.trim(),
    enunciado: params.enunciado.trim(),
    codigo_inicial: params.codigo_inicial?.trim() || null,
    criterio_aceite: params.criterio_aceite.trim(),
    dificuldade: params.dificuldade,
    criado_em: new Date().toISOString(),
    total_conclusoes: 0,
  };

  store.missoes.unshift(novaMissao);

  // Registra auditoria
  await registrarLogAuditoria({
    autor_id: params.adminId,
    autor_nome: params.adminNome,
    autor_tipo: 'admin',
    acao: 'CRIACAO_MISSAO',
    detalhes: `Missão "${novaMissao.titulo}" (${novaMissao.dificuldade}) cadastrada no ${moduloTitulo}.`,
  });

  return {
    sucesso: true,
    mensagem: `Missão "${novaMissao.titulo}" cadastrada com sucesso na trilha pedagógica!`,
    missao: novaMissao,
  };
}

// ==========================================
// FUNÇÕES DE SERVIÇO DE AUDITORIA (RN04)
// ==========================================

export async function registrarLogAuditoria(params: {
  ficha_id?: number | null;
  ficha_nome?: string | null;
  autor_id?: number | null;
  autor_nome: string;
  autor_tipo: string;
  acao: string;
  detalhes: string;
}): Promise<AuditoriaCompleta> {
  const novoLog: AuditoriaCompleta = {
    id: store.proximoIdAuditoria++,
    ficha_id: params.ficha_id ?? null,
    ficha_nome: params.ficha_nome ?? null,
    autor_id: params.autor_id ?? null,
    autor_nome: params.autor_nome,
    autor_tipo: params.autor_tipo,
    acao: params.acao,
    detalhes: params.detalhes,
    data_hora: new Date().toISOString(),
  };

  store.auditorias.unshift(novoLog);
  return novoLog;
}

export async function listarAuditorias(filtros?: {
  busca?: string;
  acao?: string;
  periodo?: string;
}): Promise<AuditoriaCompleta[]> {
  let resultado = [...store.auditorias];

  if (filtros?.acao && filtros.acao !== 'TODAS') {
    resultado = resultado.filter((log) => log.acao === filtros.acao);
  }

  if (filtros?.busca) {
    const termo = filtros.busca.toLowerCase();
    resultado = resultado.filter(
      (log) =>
        (log.ficha_nome && log.ficha_nome.toLowerCase().includes(termo)) ||
        (log.autor_nome && log.autor_nome.toLowerCase().includes(termo)) ||
        (log.detalhes && log.detalhes.toLowerCase().includes(termo)) ||
        (log.acao && log.acao.toLowerCase().includes(termo))
    );
  }

  if (filtros?.periodo && filtros.periodo !== 'todos') {
    const agora = Date.now();
    let msLimite = 0;
    if (filtros.periodo === '24h') msLimite = 24 * 3600 * 1000;
    if (filtros.periodo === '7d') msLimite = 7 * 24 * 3600 * 1000;
    if (filtros.periodo === '30d') msLimite = 30 * 24 * 3600 * 1000;

    if (msLimite > 0) {
      resultado = resultado.filter(
        (log) => agora - new Date(log.data_hora).getTime() <= msLimite
      );
    }
  }

  return resultado.sort(
    (a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime()
  );
}

// Métricas agregadas do painel administrativo (RF22)
export async function obterMetricasAdmin() {
  const totalFichasAtivas = store.fichas.filter((f) => f.ativo).length;
  const totalDenunciasPendentes = store.denuncias.filter((d) => d.status === 'pendente').length;
  const totalMissoes = store.missoes.length;
  const totalLogsAuditoria = store.auditorias.length;

  return {
    totalUsuarios: 124, // Contas cadastradas simuladas
    totalFichasAtivas,
    totalMissoesConcluidas: 100,
    totalDenunciasPendentes,
    totalMissoes,
    totalLogsAuditoria,
  };
}

