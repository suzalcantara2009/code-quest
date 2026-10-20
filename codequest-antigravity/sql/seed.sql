-- ========================================================
-- CodeQuest - Seed de Módulos e Missões Oficiais
-- Baseado na Seção 4 (Módulo E, RF13, RF14, RF14a) e Seção 6 do spec.md
-- ========================================================

-- Inserção dos 4 Módulos Estruturados da Trilha Pedagógica (RF13)
INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(1, 1, 'Módulo 1 — Programação em Blocos', 'Blocos / Lógica', 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.')
ON CONFLICT (ordem) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  tecnologia = EXCLUDED.tecnologia,
  descricao = EXCLUDED.descricao;

INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(2, 2, 'Módulo 2 — Python', 'Python', 'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.')
ON CONFLICT (ordem) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  tecnologia = EXCLUDED.tecnologia,
  descricao = EXCLUDED.descricao;

INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(3, 3, 'Módulo 3 — HTML e CSS', 'HTML/CSS', 'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.')
ON CONFLICT (ordem) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  tecnologia = EXCLUDED.tecnologia,
  descricao = EXCLUDED.descricao;

INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(4, 4, 'Módulo 4 — JavaScript', 'JavaScript', 'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.')
ON CONFLICT (ordem) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  tecnologia = EXCLUDED.tecnologia,
  descricao = EXCLUDED.descricao;

-- Ajusta sequência de IDs de modulos se necessário
SELECT setval(pg_get_serial_sequence('modulos', 'id'), COALESCE(MAX(id), 1)) FROM modulos;

-- Inserção das 4 Missões Oficiais da Trilha (RF14, RF14a)
-- Missão 1: Blocos (Fácil)
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  1,
  1,
  'O Despertar dos Blocos Mágicos',
  'Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.',
  '// Algoritmo Visual de Blocos
enquanto (caminhoLivre()) {
  andarFrente();
  se (detectarArmadilha()) {
    desarmarArmadilha();
  }
}
se (alcancouBau()) {
  abrirBau();
}',
  'O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 2: Python (Fácil)
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  2,
  2,
  'O Cálculo do Dano Crítico',
  'Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.',
  'def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:
    """Calcula o dano final desferido pelo herói contra criaturas sombrias.
    
    Args:
        ataque_base: Força inicial do golpe (inteiro >= 0).
        multiplicador: Fator crítico (float >= 1.0).
        bonus: Valor adicional concedido por runas e equipamentos.
    
    Returns:
        Dano total resultante em número inteiro não-negativo.
    """
    # TODO: Implemente a lógica do cálculo de dano aqui
    pass',
  'A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 3: HTML e CSS (Médio)
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  3,
  3,
  'O Estandarte Responsivo da Guilda',
  'Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa a estrutura semântica em HTML5 de um cartão de herói com a tag <section class="guilda-card">, contendo cabeçalho com o nome e classe, uma área de avatar/brasão e a lista de atributos de poder (0–100). Em seguida, aplique regras CSS (Flexbox ou CSS Grid) para que em telas menores que 640px os elementos se reorganizem verticalmente em coluna única e com contraste mínimo de cores atendendo ao padrão WCAG AA.',
  '<!-- Estandarte do Herói da Guilda -->
<section class="guilda-card">
  <header class="guilda-header">
    <h2 class="heroi-nome">Aragorn</h2>
    <span class="heroi-classe">Guardião do Norte</span>
  </header>
  
  <div class="guilda-brasao">
    <img src="/brasao-tolkien.svg" alt="Brasão da Casa Telcontar" />
  </div>

  <dl class="guilda-atributos">
    <dt>Poder de Combate:</dt>
    <dd class="poder-valor">88/100</dd>
    <dt>Universo:</dt>
    <dd>Tolkien</dd>
  </dl>
</section>

<style>
  .guilda-card {
    /* TODO: Defina layout com display: flex ou grid */
    padding: 1.5rem;
  }
  @media (max-width: 640px) {
    /* TODO: Responsividade para dispositivos móveis */
  }
</style>',
  'Uso exclusivo de tags HTML5 semânticas (<section>, <header>, <dl>), layout responsivo adaptável com media query em 640px e taxa de contraste de cores acessível (mínimo 4.5:1 para texto normal).',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 4: JavaScript (Difícil)
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  4,
  4,
  'O Feitiço da API Assíncrona',
  'Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona buscarPoderesGuilda(url: string) em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando fetch(), validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com !res.ok), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.',
  '/**
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
}',
  'A função deve usar async/await com try/catch, verificar res.ok rejeitando respostas HTTP de erro, tratar exceções de rede e retornar a Promise resolvida com os poderes ordenados por nível de poder (decrescente).',
  'dificil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Ajusta sequência de IDs de missoes se necessário
SELECT setval(pg_get_serial_sequence('missoes', 'id'), COALESCE(MAX(id), 1)) FROM missoes;
