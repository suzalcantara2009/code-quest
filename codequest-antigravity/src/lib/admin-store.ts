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
  explicacao?: string | null;
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
  // ========================================================
  // MÓDULO 1: PROGRAMAÇÃO EM BLOCOS (Lógica & Algoritmos)
  // ========================================================
  {
    id: 1,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'O Despertar dos Blocos Mágicos',
    explicacao:
      'Antes de conjurar algoritmos complexos, todo aprendiz deve compreender que a programação é uma sequência ordenada e finita de instruções que transformam entradas em saídas previsíveis. No paradigma visual de blocos, o fluxo de execução é controlado por duas estruturas vitais:\n1. Estruturas de Repetição (enquanto / while): Avaliam continuamente uma condição lógica. Enquanto a condição for verdadeira (caminhoLivre() == true), o bloco interno é executado repetidamente.\n2. Estruturas de Decisão (se / if): Permitem que o herói reaja a imprevistos no ambiente, executando ações especiais (como desarmar uma armadilha) apenas quando uma contingência é detectada.\nCompreender o encadeamento correto de repetição e decisão é a fundação para evitar loops infinitos e travamentos em qualquer linguagem moderna.',
    enunciado:
      'Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.',
    codigo_inicial: `// Algoritmo Visual de Blocos
enquanto (caminhoLivre()) {
  andarFrente();
  se (detectarArmadilha()) {
    desarmarArmadilha();
  }
}
se (alcancouBau()) {
  abrirBau();
}`,
    criterio_aceite:
      'O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 42,
  },
  {
    id: 2,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'A Coleta das Gemas Elementais',
    explicacao:
      'Muitas vezes conhecemos de antemão o número exato de repetições necessárias. Para isso, utilizamos Laços Contados (laço para / for), acompanhados de uma Variável Acumuladora:\n1. Contador de Passos (para pilar de 1 até N): Uma variável de controle que incrementa a cada ciclo até atingir o limite estipulado.\n2. Variável Acumuladora (totalGemas = totalGemas + 1): Armazena e preserva o estado ao longo das iterações da jornada.\nDominar laços contados evita erros clássicos de "deslocamento por um" (off-by-one errors) e garante que o processamento termine exatamente após o último elemento planejado.',
    enunciado:
      'Uma ponte suspensa de 5 pilares arcanos estende-se sobre o abismo do esquecimento. Em cada pilar repousa uma gema elemental brilhante. Construa um algoritmo em blocos com um laço contado de 1 a 5: para cada pilar, o herói deve avançar, conjurar o feitiço de coleta e incrementar a variável acumuladora gemasColetadas. Ao final da ponte, retorne o total acumulado.',
    codigo_inicial: `// Coleta das Gemas com Laço Contado
let gemasColetadas = 0;

para (let pilar = 1; pilar <= 5; pilar++) {
  andarFrente();
  coletarGema();
  gemasColetadas = gemasColetadas + 1;
}

notificarGuilda("Total de gemas coletadas:", gemasColetadas);`,
    criterio_aceite:
      'O herói deve percorrer exatamente os 5 pilares da ponte e acumular 5 gemas no inventário ao final da travessia sem passos redundantes.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 37,
  },
  {
    id: 3,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'O Labirinto das Bifurcações Rúnicas',
    explicacao:
      'Quando o herói se depara com decisões com mais de dois desfechos possíveis, o simples se/senão torna-se insuficiente. Entram em cena as Estruturas Condicionais Encadeadas (se / senão-se / senão) e os Operadores Lógicos (E, OU, NÃO):\n- se (if): Avalia o primeiro caso prioritário.\n- senão-se (else if): Avalia casos secundários caso o primeiro seja falso.\n- senão (else): O caminho padrão executado se nenhuma das alternativas anteriores for satisfeita.\nEm sistemas reais, isso é análogo ao tratamento de múltiplos estados de conexão HTTP ou permissões de usuário (estudante, professor, moderador, admin).',
    enunciado:
      'O herói chega à Câmara dos Três Portais Rúnicos. Cada bifurcação emite uma aura mágica diferente que exige um feitiço específico: se a luz emitida for azul (gelo), deve conjurar Chama Arcana; senão se a luz for vermelha (fogo), deve conjurar Orbe de Gelo; caso contrário (luz neutra), deve conjurar Escudo de Vento e passar em silêncio. Escreva a lógica para desarmar 4 bifurcações consecutivas.',
    codigo_inicial: `// Estrutura Condicional Encadeada
funcao resolverBifurcacao(corLuz) {
  se (corLuz === "azul") {
    conjurarChamaArcana();
  } senao se (corLuz === "vermelha") {
    conjurarOrbeGelo();
  } senao {
    conjurarEscudoVento();
  }
  avancarProximaCamara();
}`,
    criterio_aceite:
      'O algoritmo deve identificar corretamente as cores emitidas pelas 4 bifurcações, conjurando a magia exata para cada uma sem sofrer penalidade de vida.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 25 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 29,
  },
  {
    id: 4,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'O Desarme dos Autômatos de Guarda',
    explicacao:
      'A repetição desnecessária de código é um dos maiores problemas na engenharia de software (princípio DRY: Don\'t Repeat Yourself). Para combater isso na programação visual, agrupamos rotinas em Procedimentos e Funções Modulares:\n1. Declaração do Procedimento: Define um bloco reutilizável com um nome descritivo e parâmetros de entrada.\n2. Parâmetros: Valores passados para o procedimento que personalizam seu comportamento interno.\n3. Invocação (Chamada): O herói reutiliza a mesma lógica para desarmar múltiplos autômatos sem duplicar blocos na tela.',
    enunciado:
      'Dois autômatos colossais guardam os portões da cidadela: um feito de ferro e outro de cristal. Cada um exige uma sequência de giros rúnicos de acordo com seu material. Crie um procedimento modular desarmarAutomato(tipo) que recebe o material como parâmetro e realiza a sequência adequada, invocando-o para ambos os guardas.',
    codigo_inicial: `// Procedimento Modular Reutilizável
funcao desarmarAutomato(tipo) {
  se (tipo === "ferro") {
    girarChave("esquerda", 2);
    pressionarRuna("bronze");
  } senao {
    girarChave("direita", 3);
    pressionarRuna("ametista");
  }
}

// Desarmando os dois guardas do salão:
desarmarAutomato("ferro");
avancar();
desarmarAutomato("cristal");`,
    criterio_aceite:
      'A lógica de desarme deve estar encapsulada em um único procedimento reutilizável com parâmetros, sendo executada com sucesso contra os dois autômatos.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 22 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 24,
  },
  {
    id: 5,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'A Travessia das Pontes Móveis',
    explicacao:
      'No desenvolvimento de sistemas reativos, frequentemente lidamos com Estados Transitórios e Sincronização Temporal. Uma ação não pode ocorrer antes que o ambiente externo atinja um estado seguro:\n1. Condições Compostas (E / &&): Exigem que múltiplos predicados sejam verdadeiros simultaneamente (ponteAbaixada() E tempoRestante >= 3).\n2. Espera Ativa Controlada (aguardar()): Pausa temporária enquanto a condição de travessia não estiver madura.\nEssa lógica modela requisições que aguardam disponibilidade de recursos ou controle de fluxo em sistemas distribuídos.',
    enunciado:
      'O herói precisa atravessar 3 pontes levadiças mágicas que abrem e fecham em intervalos cronometrados. O algoritmo deve verificar se a ponte está abaixada e se há pelo menos 3 segundos de tempo seguro antes de iniciar o passo. Se o tempo for insuficiente, o herói deve aguardar o próximo ciclo.',
    codigo_inicial: `// Sincronização com Pontes Móveis
para (let p = 1; p <= 3; p++) {
  enquanto (!ponteAbaixada() || obterTempoRestante() < 3) {
    aguardar(1);
  }
  atravessarPonte();
}`,
    criterio_aceite:
      'O herói deve cruzar as 3 pontes levadiças sem cair no abismo, garantindo travessia estritamente quando ponteAbaixada() for true e tempoRestante >= 3.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 21,
  },
  {
    id: 6,
    modulo_id: 1,
    modulo_titulo: 'Módulo 1 — Programação em Blocos',
    titulo: 'O Guardião do Labirinto de Espelhos',
    explicacao:
      'Algoritmos clássicos de navegação autônoma em labirintos utilizam a Regra da Mão Direita (Wall Follower). Em qualquer labirinto 2D simplesmente conexo, manter a mão direita encostada na parede garante que o viajante encontrará a saída sem entrar em ciclos eternos.\nPrioridade de decisão da máquina de estados a cada célula:\n1. Se houver caminho livre à direita: virar à direita e avançar.\n2. Senão, se o caminho à frente estiver livre: avançar.\n3. Senão, se houver caminho à esquerda: virar à esquerda e avançar.\n4. Caso esteja em um beco sem saída: dar meia-volta (180°).\nEsse algoritmo introduz os fundamentos de inteligência artificial simbólica e robótica móvel.',
    enunciado:
      'O mago supremo desafia você a escapar do temido Labirinto de Espelhos de Algoritmia. Escreva um algoritmo autônomo baseado na Regra da Mão Direita que permita ao autômato navegar por corredores complexos e becos sem saída até encontrar o portal de teletransporte.',
    codigo_inicial: `// Algoritmo Autônomo da Regra da Mão Direita
enquanto (!chegouAoPortal()) {
  se (ladoDireitoLivre()) {
    virarDireita();
    andarFrente();
  } senao se (frenteLivre()) {
    andarFrente();
  } senao se (ladoEsquerdoLivre()) {
    virarEsquerda();
    andarFrente();
  } senao {
    virarMeiaVolta();
  }
}`,
    criterio_aceite:
      'O autômato deve encontrar a saída do labirinto em no máximo 40 passos sem colidir e sem ficar preso em becos sem saída.',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 15,
  },

  // ========================================================
  // MÓDULO 2: PYTHON (Sintaxe Limpa, Funções & Algoritmos)
  // ========================================================
  {
    id: 7,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'O Cálculo do Dano Crítico',
    explicacao:
      'Python é uma linguagem de altíssima legibilidade e tipagem dinâmica forte. A partir da PEP 484, o ecossistema adotou amplamente Type Hints (anotações de tipo) que tornam o código autodocumentado e seguro.\nPontos fundamentais desta missão:\n1. Assinatura de Função: Definida com def nome_funcao(arg: tipo) -> tipo_retorno:.\n2. Docstrings (PEP 257): Documentação em bloco com aspas triplas descrevendo argumentos e retorno.\n3. Cálculos Aritméticos e Arredondamento: Operações de multiplicação (*), soma (+) e arredondamento com round() ou int().\n4. Condicionais e Função max(): Assegurar que o valor retornado respeite limites mínimos (por exemplo, nunca ser negativo com max(0, valor)).',
    enunciado:
      'Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.',
    codigo_inicial: `def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:
    """Calcula o dano final desferido pelo herói contra criaturas sombrias.
    
    Args:
        ataque_base: Força inicial do golpe (inteiro >= 0).
        multiplicador: Fator crítico (float >= 1.0).
        bonus: Valor adicional concedido por runas e equipamentos.
    
    Returns:
        Dano total resultante em número inteiro não-negativo.
    """
    # TODO: Implemente a lógica do cálculo de dano aqui
    pass`,
    criterio_aceite:
      'A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 17 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 31,
  },
  {
    id: 8,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'O Filtro de Poções do Boticário',
    explicacao:
      'A manipulação de coleções de dados é o coração de qualquer aplicação backend. Em Python, a técnica mais idiomática e eficiente para filtrar e transformar listas é a List Comprehension (compreensão de listas):\nresultado = [expressao for item in colecao if condicao]\nNeste desafio, trabalhamos com uma lista de dicionários (list[dict]). Para ordenar strings alfabeticamente, usamos a função embutida sorted(lista) ou o método lista.sort(). Escrever código pythônico significa priorizar compreensões de listas em vez de loops for manuais com múltiplos .append().',
    enunciado:
      'O boticário de Valfenda precisa catalogar seu estoque de poções para a guilda. Crie a função filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str] que recebe uma lista de poções (onde cada poção possui "nome": str, "nivel": int e "em_estoque": bool) e retorna uma lista ordenada alfabeticamente contendo apenas os nomes das poções que estão em estoque (em_estoque == True) e cujo nível seja maior ou igual a nivel_minimo.',
    codigo_inicial: `def filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str]:
    """Filtra poções disponíveis em estoque que atendem ao nível mínimo exigido.
    
    Args:
        inventario: Lista de dicionários com chaves 'nome', 'nivel', 'em_estoque'.
        nivel_minimo: Nível mínimo de maestria exigido (inteiro).
    
    Returns:
        Lista alfabética contendo os nomes das poções selecionadas.
    """
    # TODO: Use list comprehension para filtrar e ordene alfabeticamente com sorted()
    pass`,
    criterio_aceite:
      'Retornar lista ordenada alfabeticamente com os nomes das poções onde em_estoque é True e nivel >= nivel_minimo; retornar lista vazia caso nenhuma poção atenda aos critérios.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 16 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 27,
  },
  {
    id: 9,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'O Grimório de Fichas e Dicionários',
    explicacao:
      'Dicionários em Python (dict) são estruturas de associação chave-valor implementadas como tabelas hash de altíssimo desempenho O(1).\nNesta missão, exploramos:\n1. Acesso Seguro com .get(): Evita exceções KeyError fornecendo um valor padrão se a chave não existir.\n2. Agregações com sum() e len(): Métodos matemáticos nativos para calcular médias aritméticas.\n3. Identificação de Extremos (max(..., key=...)): A função max() aceita um argumento de função key (como lambda x: x["poder"]) para localizar o herói com maior pontuação em uma única linha elegante.',
    enunciado:
      'O escriba da guilda precisa de um relatório executivo sobre as fichas de personagens cadastradas. Implemente resumo_guilda(fichas: list[dict]) -> dict que recebe uma lista de fichas de personagens (cada uma contendo "nome", "classe", "poder" e "ativo") e retorna um dicionário com: "total_ativos" (contagem de fichas com ativo=True), "poder_medio" (média aritmética do poder das fichas ativas com 1 casa decimal) e "campeao_nome" (nome do personagem ativo de maior poder). Se não houver fichas ativas, retorne {"total_ativos": 0, "poder_medio": 0.0, "campeao_nome": None}.',
    codigo_inicial: `def resumo_guilda(fichas: list[dict]) -> dict:
    """Calcula estatísticas agregadas das fichas ativas da guilda.
    
    Args:
        fichas: Lista de personagens contendo 'nome', 'classe', 'poder', 'ativo'.
    
    Returns:
        Dicionário com 'total_ativos', 'poder_medio' e 'campeao_nome'.
    """
    # TODO: Filtre personagens ativos e calcule as agregações necessárias
    pass`,
    criterio_aceite:
      'O dicionário retornado deve conter as 3 chaves exatas; calcular o poder médio com 1 casa decimal de precisão e retornar valores neutros padrão caso a lista esteja vazia ou sem fichas ativas.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 22,
  },
  {
    id: 10,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'A Criptografia das Runas Antigas',
    explicacao:
      'A criptografia clássica por substituição (como a famosa Cifra de César) é um excelente exercício para compreender a representação binária e numérica de textos.\nConceitos chave em Python:\n1. Função ord(c): Retorna o código numérico ASCII/Unicode de um caractere (ex: ord("A") == 65).\n2. Função chr(n): Converte o código numérico de volta para o caractere original (ex: chr(65) == "A").\n3. Aritmética Modular (% 26): Garante que o deslocamento do alfabeto seja circular — passar de "Z" retorna para "A".\n4. Imutabilidade de Strings: Em Python, textos são imutáveis; strings cifradas são construídas acumulando caracteres ou utilizando "".join(...).',
    enunciado:
      'Para proteger mensagens contra espiões de Mordor, a guilda utiliza a Cifra de César. Crie a função cifrar_mensagem_runica(texto: str, deslocamento: int) -> str que aplica o deslocamento numérico a todas as letras (maiúsculas e minúsculas), preservando pontuações, números e espaços inalterados. Lembre-se de manter a caixa original de cada letra.',
    codigo_inicial: `def cifrar_mensagem_runica(texto: str, deslocamento: int) -> str:
    """Aplica a Cifra de César rúnica ao texto preservando espaços e pontuações.
    
    Args:
        texto: Mensagem original a ser codificada.
        deslocamento: Chave de translação do alfabeto (inteiro).
    
    Returns:
        Texto cifrado com caixa de caracteres preservada.
    """
    # TODO: Itere sobre os caracteres, aplique a rotação modular e retorne o texto
    pass`,
    criterio_aceite:
      'Manter maiúsculas e minúsculas no lugar correto, não alterar espaços nem pontuações, e calcular o ciclo modular corretamente para deslocamentos positivos ou maiores que 26.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 19,
  },
  {
    id: 11,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'O Validador de Nomes de Aventureiro',
    explicacao:
      'Validação de dados é uma exigência crítica de integridade e segurança de sistemas (RN08 e RNF02). Em Python, utilizamos o módulo embutido re (Expressões Regulares) e Exceções Customizadas:\n1. Expressão Regular (re.match): Permite testar padrões estruturados em uma linha (ex: ^[A-Z][a-zA-Z0-9_]{1,49}$).\n2. Lançamento de Erros com raise: Interrompe o fluxo anômalo disparando uma exceção clara (ValueError) para o chamador.\n3. Tratamento Defensivo: Previne inserções corrompidas ou ataques de injeção em camadas posteriores do banco.',
    enunciado:
      'Implemente a função validar_nome_heroi(nome: str) -> bool para validar nomes de aventureiros segundo as regras da guilda: o nome deve ter entre 2 e 50 caracteres; deve iniciar obrigatoriamente com letra maiúscula (A-Z); pode conter apenas letras, números e underscores (_); e não pode conter espaços. Se o nome for válido, retorne True. Se for inválido, levante uma exceção ValueError contendo uma mensagem descritiva do motivo da recusa.',
    codigo_inicial: `import re

def validar_nome_heroi(nome: str) -> bool:
    """Valida o identificador do aventureiro conforme as regras da guilda.
    
    Raises:
        ValueError: Se o nome infringir as regras de formato ou tamanho.
    """
    # TODO: Valide tamanho, início com maiúscula e caracteres permitidos
    pass`,
    criterio_aceite:
      'Retornar True para identificadores como "Goku_99" ou "Aragorn"; lançar ValueError descritivo para nomes curtos (< 2), iniciados em minúsculas ou com símbolos inválidos.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 18,
  },
  {
    id: 12,
    modulo_id: 2,
    modulo_titulo: 'Módulo 2 — Python',
    titulo: 'A Batalha de Turnos Orientada a Objetos',
    explicacao:
      'A Programação Orientada a Objetos (POO) é o paradigma fundamental de grandes arquiteturas de software. Em Python, classes encapsulam atributos (dados) e métodos (comportamentos).\nPilares aplicados nesta missão:\n1. Encapsulamento: Atributos inicializados no construtor __init__.\n2. Herança: Uma subclasse Mago(Personagem) herda todos os métodos da classe mãe.\n3. Sobrescrita de Métodos (Polimorfismo): Subclasses adaptam comportamentos (como o cálculo de ataque) mantendo a mesma interface pública.\n4. Invariantes de Estado: Garantir que a vida de um guerreiro nunca atinja valores negativos, estabelecendo vida = max(0, vida - dano).',
    enunciado:
      'Construa um mini-motor de combate em POO. Crie a classe base Personagem com os atributos nome (str), vida (int) e ataque (int), e o método receber_dano(quantidade: int) que reduz a vida sem deixá-la abaixo de 0. Crie a subclasse Mago(Personagem) que adiciona o atributo mana (int) e o método lancar_magia(alvo: Personagem) -> int: se tiver ao menos 10 pontos de mana, consome 10 de mana e desfere dano igual a ataque * 2 no alvo; caso contrário, realiza ataque normal (ataque * 1) sem gastar mana.',
    codigo_inicial: `class Personagem:
    def __init__(self, nome: str, vida: int, ataque: int):
        self.nome = nome
        self.vida = max(0, vida)
        self.ataque = ataque

    def receber_dano(self, quantidade: int):
        # TODO: Reduza a vida sem permitir valores negativos
        pass

class Mago(Personagem):
    def __init__(self, nome: str, vida: int, ataque: int, mana: int):
        super().__init__(nome, vida, ataque)
        self.mana = mana

    def lancar_magia(self, alvo: Personagem) -> int:
        # TODO: Verifique a mana, aplique dano crítico ao alvo e retorne o dano causado
        pass`,
    criterio_aceite:
      'A herança deve ser implementada com super().__init__; a vida do alvo nunca pode ser inferior a zero; e o consumo de mana e dano duplo devem ser executados apenas quando mana >= 10.',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 12,
  },

  // ========================================================
  // MÓDULO 3: HTML E CSS (Web Semântica, WCAG & Layout)
  // ========================================================
  {
    id: 13,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Estandarte Semântico do Herói',
    explicacao:
      'O HTML5 introduziu elementos que carregam significado estrutural e contextual, superando a era das "div soups" (páginas compostas exclusivamente por dezenas de tags <div> aninhadas).\nElementos semânticos indispensáveis:\n1. <section> e <article>: Representam seções temáticas independentes e autossuficientes do documento.\n2. <header> e <footer>: Delimitam o cabeçalho de introdução e o rodapé de autoria.\n3. <figure> e <figcaption>: Agrupam ilustrações, fotos ou brasões com sua legenda contextual.\n4. <dl>, <dt> e <dd>: Lista de definição ideal para exibir pares chave-valor (como "Classe: Mago" e "Poder: 92").\nO uso semântico é o primeiro requisito para conformidade com normas de acessibilidade digital e indexação em mecanismos de busca.',
    enunciado:
      'Construa a estrutura semântica em HTML5 de um cartão de herói da guilda. O cartão deve ser envolvido por uma tag <article class="heroi-card">, possuir um <header> com título <h2> para o nome do herói, uma tag <figure> com a imagem do brasão e legenda <figcaption>, e uma lista de definições <dl> apresentando os atributos "Universo", "Classe" e "Poder de Combate". A imagem deve conter um atributo alt acessível e descritivo.',
    codigo_inicial: `<!-- Cartão Semântico de Personagem -->
<article class="heroi-card">
  <header class="heroi-header">
    <h2>Goku</h2>
    <p class="heroi-subtitulo">Guerreiro Saiyajin</p>
  </header>

  <figure class="heroi-brasao">
    <img src="/avatar-anime.png" alt="Retrato ilustrado de Goku com aura dourada" />
    <figcaption>Brasão Oficial da Casa Kaioken</figcaption>
  </figure>

  <dl class="heroi-atributos">
    <dt>Universo:</dt>
    <dd>Anime</dd>
    <dt>Classe:</dt>
    <dd>Mago / Guerreiro</dd>
    <dt>Poder:</dt>
    <dd>92/100</dd>
  </dl>
</article>`,
    criterio_aceite:
      'Utilizar exclusivamente elementos semânticos de HTML5 (<article>, <header>, <figure>, <figcaption>, <dl>), incluir atributo alt descritivo e evitar divs vazias no esqueleto principal.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 26,
  },
  {
    id: 14,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Mural das Cores Acessíveis da Taverna',
    explicacao:
      'Acessibilidade na web não é opcional — é um direito de todos os usuários. As diretrizes internacionais WCAG 2.1 (nível AA) exigem uma taxa mínima de contraste de cores de 4.5:1 para textos normais e 3:1 para textos grandes (acima de 18pt ou 14pt em negrito).\nRecursos modernos de CSS:\n1. Variáveis CSS (Custom Properties): Declaradas com --nome-da-variavel no escopo :root, facilitam a manutenção de temas.\n2. Estados de Foco Visível (:focus-visible): Essenciais para usuários que navegam por teclado (Tab), desenhando um contorno nítido no elemento ativo.\n3. Cálculo de Luminância: Combinar fundos escuros (como #0f172a) com textos claros de alto contraste (como #f8fafc).',
    enunciado:
      'Desenvolva a folha de estilo de um painel de avisos da taverna com variáveis CSS globais no :root. Defina variáveis para --bg-card, --text-primary, --cor-destaque e --borda-foco. Garanta que a combinação de cores atenda à razão de contraste mínima de 4.5:1 (WCAG AA) e estilize o botão de ação do painel com :focus-visible exibindo um outline nítido de pelo menos 2px.',
    codigo_inicial: `:root {
  /* TODO: Defina variáveis com alto contraste (mínimo 4.5:1 WCAG AA) */
  --bg-card: #0f172a;
  --text-primary: #f8fafc;
  --cor-destaque: #6366f1;
  --borda-foco: #38bdf8;
}

.aviso-taverna {
  background-color: var(--bg-card);
  color: var(--text-primary);
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.btn-taverna:focus-visible {
  /* TODO: Estilize o contorno de foco acessível para navegação por teclado */
  outline: 2px solid var(--borda-foco);
  outline-offset: 2px;
}`,
    criterio_aceite:
      'Declarar variáveis no :root, assegurar taxa de contraste >= 4.5:1 entre texto e fundo, e definir regra :focus-visible nítida no botão.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 23,
  },
  {
    id: 15,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Estandarte Responsivo da Guilda',
    explicacao:
      'O design responsivo garante que a interface da guilda seja impecável tanto em smartphones quanto em monitores ultrawide. O CSS Flexbox é o modelo de caixa ideal para distribuir espaço ao longo de um eixo único (linha ou coluna):\n1. display: flex: Transforma o contêiner em um flex container.\n2. justify-content e align-items: Controlam o alinhamento nos eixos principal e transversal.\n3. Media Queries (@media (max-width: 640px)): Redefinem regras quando a largura da viewport atinge um ponto de quebra (breakpoint), alternando flex-direction: column para que os dados empilhem elegantemente em telas compactas.',
    enunciado:
      'Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa o cartão com classe .guilda-card utilizando Flexbox para que no computador os elementos fiquem lado a lado com espaçamento proporcional (gap: 1.5rem), e em dispositivos com tela de até 640px eles se reorganizem verticalmente em coluna única com alinhamento centralizado.',
    codigo_inicial: `/* Layout Flexbox Responsivo */
.guilda-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #1e1b4b;
  border-radius: 1rem;
}

@media (max-width: 640px) {
  .guilda-card {
    /* TODO: Reorganize em coluna única para telas móveis */
    flex-direction: column;
    text-align: center;
  }
}`,
    criterio_aceite:
      'Utilizar display: flex com gap, incluir media query em 640px com flex-direction: column e garantir ausência de barra de rolagem horizontal indesejada.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 20,
  },
  {
    id: 16,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Inventário em Grade Mágica',
    explicacao:
      'Enquanto o Flexbox é ideal para eixos unidimensionais, o CSS Grid Layout é o padrão moderno definitivo para grades bidimensionais (linhas e colunas simultâneas).\nA fórmula mágica da responsividade com Grid:\ngrid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n- repeat(): Repete a definição de colunas.\n- auto-fill: Cria tantas colunas quantas couberem na largura atual.\n- minmax(120px, 1fr): Cada coluna terá no mínimo 120px e expandirá proporcionalmente (1 fração) para ocupar o espaço livre. Dessa forma, a grade se adapta a qualquer tela sem uma única media query.',
    enunciado:
      'Construa a grade de inventário da mochila de itens mágicos do aventureiro. O contêiner .mochila-grid deve utilizar CSS Grid para acomodar slots de itens de no mínimo 120px de largura com preenchimento responsivo (repeat(auto-fill, minmax(120px, 1fr))). Cada slot .item-slot deve ter aspecto quadrado, fundo escuro, borda suave e efeito de elevação no :hover com transição suave (transform: translateY(-4px)).',
    codigo_inicial: `/* Mochila de Inventário com CSS Grid */
.mochila-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.item-slot {
  aspect-ratio: 1 / 1;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.item-slot:hover {
  /* TODO: Adicione o efeito de elevação e brilho de borda */
  transform: translateY(-4px);
  border-color: #818cf8;
}`,
    criterio_aceite:
      'Aplicar display: grid com repeat(auto-fill, minmax(120px, 1fr)), gap uniforme, proporção quadrada (aspect-ratio: 1/1) e transição fluida no :hover.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 17,
  },
  {
    id: 17,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'O Formulário Encantado de Alistamento',
    explicacao:
      'Formulários acessíveis conectam o usuário ao servidor de maneira confiável e sem barreiras. Em HTML/CSS, acessibilidade em formulários repousa em 3 pilares:\n1. Associação Explícita (<label for="id">): O leitor de tela anuncia o rótulo ao focar no campo, e o clique no rótulo foca o input.\n2. Agrupamento Semântico (<fieldset> e <legend>): Agrupa campos logicamente relacionados (ex: dados do herói).\n3. Pseudoclasses de Estado CSS (:focus, :invalid): Fornecem feedback visual instantâneo do estado de validação sem sobressaltos.',
    enunciado:
      'Crie a marcação e o estilo de um formulário de cadastro de ficha de herói da guilda. O formulário deve conter um <fieldset> com <legend>, campo de texto para Nome do Herói vinculado explicitamente ao seu <label>, campo <select> para escolha do Universo, e campo de e-mail com validação nativa (type="email" e required). Estilize os campos com bordas nítidas e realce de foco (:focus) sem remover o contorno acessível.',
    codigo_inicial: `<form class="form-alistamento">
  <fieldset>
    <legend>Dados de Alistamento do Aventureiro</legend>
    
    <div class="campo-grupo">
      <label for="nome-heroi">Nome do Aventureiro:</label>
      <input type="text" id="nome-heroi" name="nome" required minlength="2" placeholder="Ex: Gandalf" />
    </div>

    <div class="campo-grupo">
      <label for="universo-heroi">Universo:</label>
      <select id="universo-heroi" name="universo" required>
        <option value="">Selecione um universo...</option>
        <option value="Tolkien">Tolkien</option>
        <option value="Marvel">Marvel</option>
        <option value="Anime">Anime</option>
      </select>
    </div>
  </fieldset>
</form>`,
    criterio_aceite:
      'Todos os campos de entrada devem ter labels vinculados via atributo for e id correspondente; utilizar fieldset e legend; campos obrigatórios identificados e estilização adequada de foco.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 15,
  },
  {
    id: 18,
    modulo_id: 3,
    modulo_titulo: 'Módulo 3 — HTML e CSS',
    titulo: 'A Barra de Vida e Mana com Animações CSS',
    explicacao:
      'Animações CSS adicionam vida e polimento à experiência do usuário, tornando feedbacks imediatos e naturais. Para criar efeitos como alerta de perigo crítico ou regeneração de energia, combinamos:\n1. A Regra @keyframes: Define quadros-chave da animação ao longo do tempo (de 0% a 100%).\n2. Aceleração por Hardware: Usar propriedades como transform e opacity em vez de alterar margin ou width durante animações contínuas, mantendo 60 quadros por segundo sem causar repaint excessivo.\n3. Propriedade animation: Configura nome, duração, curva de aceleração (ease-in-out) e contagem de iterações (infinite).',
    enunciado:
      'Implemente as barras de status do herói (Vida e Mana). Crie uma animação em CSS chamada pulso-critico com @keyframes que faz a barra de vida pulsar (alternando a opacidade entre 0.6 e 1.0 e leve escala de 1.02) quando a classe .perigo estiver presente, sinalizando que os pontos de vida do personagem estão abaixo de 20%.',
    codigo_inicial: `/* Animação de Pulso Crítico */
@keyframes pulso-critico {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.02);
  }
}

.barra-vida-container {
  width: 100%;
  height: 20px;
  background: #334155;
  border-radius: 10px;
  overflow: hidden;
}

.barra-vida-preenchimento.perigo {
  background: #ef4444;
  animation: pulso-critico 1s infinite ease-in-out;
}`,
    criterio_aceite:
      'Definir a animação @keyframes pulso-critico com alternância de opacidade/transform, aplicar ao elemento com a classe perigo e garantir fluidez visual sem sobrecarregar a renderização.',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 11,
  },

  // ========================================================
  // MÓDULO 4: JAVASCRIPT INTERATIVO (ES6+, DOM & APIs)
  // ========================================================
  {
    id: 19,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'A Forja de Atributos com ES6+',
    explicacao:
      'O JavaScript moderno (ECMAScript 2015 / ES6+) transformou a linguagem, introduzindo recursos fundamentais para código limpo e seguro:\n1. Desestruturação de Objetos (const { nome, poder } = heroi): Permite extrair propriedades sem repetir o nome do objeto várias vezes.\n2. Operador Spread (...heroi): Cria cópias rasas de objetos permitindo Imutabilidade (um dos pilares do React e de aplicações modernas), alterando propriedades sem mutar a referência original.\n3. Template Literals (`Herói: ${nome}`): Facilita concatenação de strings com expressões dinâmicas interpoladas.\n4. Arrow Functions (const fn = () => ...): Sintaxe compacta e léxica para funções.',
    enunciado:
      'Na forja mágica, os atributos de um herói são aprimorados. Crie a função atualizarPoderHeroi(heroi, bonusPoder) que recebe um objeto de personagem { id, nome, classe, poder } e um valor numérico de bônus. A função deve retornar um NOVO objeto (sem alterar o objeto original recebido) contendo todos os atributos originais copiados via spread, o poder recalculado limitado ao teto de 100 (conforme a regra de negócio RN01), e um novo campo statusTexto formatado como: "O herói [nome] da classe [classe] possui [novoPoder] de poder!".',
    codigo_inicial: `/**
 * Atualiza o poder do herói com imutabilidade e teto RN01.
 * @param {{ id: number, nome: string, classe: string, poder: number }} heroi
 * @param {number} bonusPoder
 * @returns {object} Novo objeto com dados atualizados.
 */
function atualizarPoderHeroi(heroi, bonusPoder) {
  // TODO: Use destructuring, spread operator e limite em 100 (RN01)
}`,
    criterio_aceite:
      'A função não deve mutar o objeto recebido como argumento, deve respeitar a constraint RN01 com poder <= 100, e retornar o campo statusTexto com a interpolação solicitada.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 25,
  },
  {
    id: 20,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Manipulador do Domínio do DOM',
    explicacao:
      'O DOM (Document Object Model) é a representação orientada a objetos da página web que permite ao JavaScript interagir dinamicamente com o HTML.\nConceitos essenciais de manipulação do DOM:\n1. Seleção de Elementos (document.querySelector): Localiza elementos usando a mesma sintaxe de seletores CSS (#id, .classe).\n2. Escuta de Eventos (addEventListener("click", handler)): Registra ouvintes para reagir a interações do usuário de forma desacoplada.\n3. Manipulação de Classes (element.classList.add / toggle): A melhor prática para alterar o visual de um componente sem injetar estilos inline.\n4. Controle de Propriedades: Desabilitar botões (button.disabled = true) para evitar múltiplos cliques acidentais.',
    enunciado:
      'Implemente a função conectarBotaoEquipar(botaoId, displayId) que seleciona o botão de ação e o elemento de status da armadura. Ao ocorrer o clique no botão, o script deve: atualizar o texto do display para "Armadura Lendária Equipada!", adicionar a classe CSS .ativo ao display, e alterar a propriedade disabled do botão para true para impedir novos cliques.',
    codigo_inicial: `function conectarBotaoEquipar(botaoId, displayId) {
  const botao = document.querySelector(\`#\${botaoId}\`);
  const display = document.querySelector(\`#\${displayId}\`);

  if (!botao || !display) return;

  botao.addEventListener("click", () => {
    // TODO: Atualize o texto, adicione a classe 'ativo' e desabilite o botão
  });
}`,
    criterio_aceite:
      'Localizar os elementos pelo ID, anexar o ouvinte de evento click, alternar classe usando classList.add("ativo"), atualizar o textContent e setar disabled = true no botão.',
    dificuldade: 'facil',
    criado_em: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 22,
  },
  {
    id: 21,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Grimório dos Métodos de Array',
    explicacao:
      'Em JavaScript profissional, laços imperativos (for e while) são frequentemente substituídos por Métodos Funcionais de Array que não possuem efeitos colaterais:\n1. array.filter(item => boolean): Cria um novo array apenas com os elementos que atendem ao predicado lógico.\n2. array.map(item => transformacao): Transforma cada elemento da lista aplicando uma função e retornando um novo array de mesmo tamanho.\n3. array.reduce((acumulador, item) => ..., valorInicial): Reduz todo o array a um único valor acumulado (como somas, contagens ou médias).\nA combinação dessas três funções permite encadear transformações de dados de forma declarativa e legível.',
    enunciado:
      'O conselho dos magos necessita auditar o poder dos membros da guilda. Escreva a função auditarMembrosGuilda(membros) que recebe um array de objetos de heróis ({ nome: string, ativo: boolean, poder: number }) e retorna um objeto estatístico contendo: nomesAtivos (array contendo apenas os nomes dos membros com ativo === true em letras maiúsculas via .map()), totalPoderAtivo (a soma do poder de todos os membros ativos via .reduce()) e mediaPoderAtivo (média aritmética do poder dos membros ativos arredondada em número inteiro).',
    codigo_inicial: `function auditarMembrosGuilda(membros) {
  // TODO: Use .filter(), .map() e .reduce() para gerar o resumo estatístico
}`,
    criterio_aceite:
      'Usar obrigatoriamente os métodos filter, map e reduce da API de Array do JavaScript; retornar o objeto com as 3 chaves solicitadas e tratar listas vazias sem gerar divisão por zero.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 18,
  },
  {
    id: 22,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Guardião dos Formulários e Eventos Assíncronos',
    explicacao:
      'O comportamento nativo de envio de formulários no navegador é disparar uma requisição HTTP síncrona que recarrega a página inteira. Em SPAs (Single Page Applications) e aplicações modernas com Next.js:\n1. event.preventDefault(): Impede o comportamento padrão do navegador permitindo que o JavaScript assuma o controle do fluxo.\n2. Validação Pré-Envio no Cliente: Economiza requisições verificando campos vazios ou formatos inválidos antes de chamar o backend.\n3. Feedback de Carregamento: Atualizar o estado visual do botão (exibindo "Salvando..." ou um spinner) melhora sensivelmente a experiência do usuário (UX).',
    enunciado:
      'Implemente a função configurarEnvioSeguro(formElement, servicoEnvio) que adiciona o listener de submissão ao formulário. O script deve interceptar o envio com e.preventDefault(), validar se os campos de texto do formulário não estão vazios, desabilitar o botão de submit alterando seu texto para "Enviando...", invocar a função assíncrona servicoEnvio com os dados extraídos, e reabilitar o botão ao término do processo.',
    codigo_inicial: `function configurarEnvioSeguro(formElement, servicoEnvio) {
  formElement.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    // TODO: Valide os campos, desabilite o botão e invoque servicoEnvio()
  });
}`,
    criterio_aceite:
      'Invocar preventDefault no evento de submit, validar inputs antes do disparo, gerenciar o estado disabled e texto de loading no botão, e capturar eventuais falhas com bloco try/finally.',
    dificuldade: 'medio',
    criado_em: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 15,
  },
  {
    id: 23,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Feitiço da API Assíncrona',
    explicacao:
      'A comunicação com APIs REST externas é a base da computação em nuvem. A Web API moderna fornece a função fetch(), que opera com Promises e a sintaxe intuitiva async/await.\nArmadilhas comuns e boas práticas com fetch():\n1. O mito de que fetch() falha em erros 404/500: O fetch nativo não rejeita a Promise quando a API responde com código HTTP de erro (como 404 Not Found ou 500 Internal Server Error). Ele só rejeita em falhas catastróficas de rede.\n2. A verificação de res.ok: É mandatório checar se res.ok é verdadeiro (status HTTP entre 200 e 299). Se for falso, devemos disparar um throw new Error(...) explicitamente.\n3. Ordenação de Arrays (.sort()): Para ordenar números de forma decrescente: array.sort((a, b) => b.poder - a.poder).',
    enunciado:
      'Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona buscarPoderesGuilda(url: string) em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando fetch(), validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com !res.ok), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.',
    codigo_inicial: `/**
 * Consulta o grimório sagrado consumindo a API REST assíncrona.
 * @param {string} url - Endereço do endpoint do grimório da guilda.
 * @returns {Promise<Array<{ nome: string, poder: number }>>} Lista ordenada de poderes.
 */
async function buscarPoderesGuilda(url) {
  try {
    // TODO: Realize o fetch com verificação de status HTTP (200 OK)
    // TODO: Trate respostas 4xx e 5xx lançando erro com mensagem descritiva
    // TODO: Retorne o array de poderes ordenado pelo poder (decrescente)
  } catch (erro) {
    console.error("Falha ao conjurar feitiço de consulta:", erro.message);
    throw erro;
  }
}`,
    criterio_aceite:
      'A função deve usar async/await com try/catch, verificar res.ok rejeitando respostas HTTP de erro, tratar exceções de rede e retornar a Promise resolvida com os poderes ordenados por nível de poder (decrescente).',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    total_conclusoes: 11,
  },
  {
    id: 24,
    modulo_id: 4,
    modulo_titulo: 'Módulo 4 — JavaScript',
    titulo: 'O Oráculo do Cache e Debounce de Busca',
    explicacao:
      'Quando implementamos campos de busca em tempo real com consulta a APIs externas (como a sincronização de perfis do GitHub no CodeQuest, RF12), dois padrões de engenharia de software são vitais:\n1. Debounce: Adia a execução da chamada de rede até que o usuário pare de digitar por um intervalo (ex: 300ms), cancelando o temporizador pendente via clearTimeout() a cada nova tecla pressionada.\n2. Cache em Memória (Map): Armazena respostas anteriores indexadas pelo termo buscado. Se o usuário digitar um termo já consultado, a resposta é entregue instantaneamente sem consumir requisições nem limites de taxa da API externa.\nA fusão desses padrões garante altíssima responsividade da interface e economia brutal de recursos de infraestrutura.',
    enunciado:
      'Crie a função de alta ordem criarBuscadorComDebounceECache(funcaoBuscaApi, delayMs) que gerencia consultas de heróis. Ela deve manter um Map interno de cache e retornar uma função que recebe o termo de busca. Se o termo já estiver no cache, retorna o valor imediatamente resolvido em Promise; caso contrário, aguarda o período de debounce sem novas chamadas, executa funcaoBuscaApi(termo), armazena no cache e retorna o resultado.',
    codigo_inicial: `/**
 * Fábrica de busca otimizada com Debounce e Cache em memória.
 * @param {Function} funcaoBuscaApi - Função assíncrona original de busca.
 * @param {number} delayMs - Tempo de espera em milissegundos.
 * @returns {Function} Função otimizada para uso em inputs.
 */
function criarBuscadorComDebounceECache(funcaoBuscaApi, delayMs = 300) {
  const cache = new Map();
  let temporizador = null;

  return function (termo) {
    // TODO: Verifique cache e implemente o debounce com clearTimeout/setTimeout
  };
}`,
    criterio_aceite:
      'Retornar valor em cache sem invocar a API externa para termos repetidos; reiniciar o temporizador se nova chamada ocorrer antes do delay; retornar Promise resolvida com o resultado da busca.',
    dificuldade: 'dificil',
    criado_em: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    total_conclusoes: 8,
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
    proximoIdMissao: 25,
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
 * RF14a: Catálogo público de missões filtrável por módulo e por dificuldade.
 */
export async function listarMissoesPublicas(filtros?: {
  dificuldade?: string;
  modulo_id?: number;
}): Promise<MissaoAdmin[]> {
  try {
    const { prisma } = await import('./db');
    const where: any = {};
    if (filtros?.dificuldade && filtros.dificuldade !== '') {
      where.dificuldade = filtros.dificuldade;
    }
    if (filtros?.modulo_id && Number(filtros.modulo_id) > 0) {
      where.modulo_id = Number(filtros.modulo_id);
    }
    const missoesDb = await prisma.missao.findMany({
      where,
      orderBy: { id: 'asc' },
    });
    if (missoesDb && missoesDb.length > 0) {
      return missoesDb.map((m) => ({
        ...m,
        criado_em: m.criado_em.toISOString(),
      })) as unknown as MissaoAdmin[];
    }
  } catch (err) {
    // Fallback silencioso para memória
  }

  let resultado = [...store.missoes];

  if (filtros?.dificuldade && filtros.dificuldade !== '') {
    resultado = resultado.filter((m) => m.dificuldade === filtros.dificuldade);
  }

  if (filtros?.modulo_id && Number(filtros.modulo_id) > 0) {
    resultado = resultado.filter((m) => m.modulo_id === Number(filtros.modulo_id));
  }

  return resultado.sort((a, b) => a.id - b.id);
}

export async function obterMissaoPorId(id: number): Promise<MissaoAdmin | null> {
  try {
    const { prisma } = await import('./db');
    const missaoDb = await prisma.missao.findUnique({
      where: { id },
    });
    if (missaoDb) {
      return {
        ...missaoDb,
        criado_em: missaoDb.criado_em.toISOString(),
      } as unknown as MissaoAdmin;
    }
  } catch (err) {
    // Fallback
  }

  const missao = store.missoes.find((m) => m.id === id);
  return missao ? { ...missao } : null;
}

export function listarModulos() {
  return [
    {
      id: 1,
      ordem: 1,
      titulo: 'Módulo 1 — Programação em Blocos',
      tecnologia: 'Blocos / Lógica',
      descricao: 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.',
    },
    {
      id: 2,
      ordem: 2,
      titulo: 'Módulo 2 — Python',
      tecnologia: 'Python',
      descricao: 'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.',
    },
    {
      id: 3,
      ordem: 3,
      titulo: 'Módulo 3 — HTML e CSS',
      tecnologia: 'HTML/CSS',
      descricao: 'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.',
    },
    {
      id: 4,
      ordem: 4,
      titulo: 'Módulo 4 — JavaScript',
      tecnologia: 'JavaScript',
      descricao: 'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.',
    },
  ];
}

/**
 * RN05: Apenas usuários com perfil Administrador podem criar missões oficiais.
 */
export async function cadastrarMissaoAdmin(params: {
  modulo_id: number;
  titulo: string;
  explicacao?: string | null;
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
    explicacao: params.explicacao?.trim() || null,
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

/**
 * Registra a submissão e conclusão de uma missão (RF15).
 * Incrementa o total de conclusões e concede 50 XP à ficha do herói.
 */
export async function registrarConclusaoMissao(
  missaoId: number,
  codigoSolucao?: string
): Promise<{ sucesso: boolean; mensagem: string; xp_ganho: number; total_conclusoes: number }> {
  const missao = store.missoes.find((m) => m.id === missaoId);
  if (!missao) {
    return {
      sucesso: false,
      mensagem: 'Missão não encontrada.',
      xp_ganho: 0,
      total_conclusoes: 0,
    };
  }

  missao.total_conclusoes = (missao.total_conclusoes || 0) + 1;

  return {
    sucesso: true,
    mensagem: `Desafio "${missao.titulo}" forjado e validado com sucesso! +50 XP adicionados à sua ficha.`,
    xp_ganho: 50,
    total_conclusoes: missao.total_conclusoes,
  };
}


