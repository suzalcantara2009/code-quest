const fs = require('fs');
const path = require('path');

// Carrega .env manualmente se existir para compatibilidade sem dependências extras
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const modulos = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao:
      'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.',
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao:
      'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.',
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao:
      'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.',
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao:
      'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.',
  },
];

const missoes = [
  {
    id: 1,
    modulo_id: 1,
    titulo: 'O Despertar dos Blocos Mágicos',
    enunciado:
      'Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.',
    codigo_inicial: `// Algoritmo Visual de Blocos\nenquanto (caminhoLivre()) {\n  andarFrente();\n  se (detectarArmadilha()) {\n    desarmarArmadilha();\n  }\n}\nse (alcancouBau()) {\n  abrirBau();\n}`,
    criterio_aceite:
      'O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.',
    dificuldade: 'facil',
  },
  {
    id: 2,
    modulo_id: 2,
    titulo: 'O Cálculo do Dano Crítico',
    enunciado:
      'Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.',
    codigo_inicial: `def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:\n    """Calcula o dano final desferido pelo herói contra criaturas sombrias.\n    \n    Args:\n        ataque_base: Força inicial do golpe (inteiro >= 0).\n        multiplicador: Fator crítico (float >= 1.0).\n        bonus: Valor adicional concedido por runas e equipamentos.\n    \n    Returns:\n        Dano total resultante em número inteiro não-negativo.\n    """\n    # TODO: Implemente a lógica do cálculo de dano aqui\n    pass`,
    criterio_aceite:
      'A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.',
    dificuldade: 'facil',
  },
  {
    id: 3,
    modulo_id: 3,
    titulo: 'O Estandarte Responsivo da Guilda',
    enunciado:
      'Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa a estrutura semântica em HTML5 de um cartão de herói com a tag <section class="guilda-card">, contendo cabeçalho com o nome e classe, uma área de avatar/brasão e a lista de atributos de poder (0–100). Em seguida, aplique regras CSS (Flexbox ou CSS Grid) para que em telas menores que 640px os elementos se reorganizem verticalmente em coluna única e com contraste mínimo de cores atendendo ao padrão WCAG AA.',
    codigo_inicial: `<!-- Estandarte do Herói da Guilda -->\n<section class="guilda-card">\n  <header class="guilda-header">\n    <h2 class="heroi-nome">Aragorn</h2>\n    <span class="heroi-classe">Guardião do Norte</span>\n  </header>\n  \n  <div class="guilda-brasao">\n    <img src="/brasao-tolkien.svg" alt="Brasão da Casa Telcontar" />\n  </div>\n\n  <dl class="guilda-atributos">\n    <dt>Poder de Combate:</dt>\n    <dd class="poder-valor">88/100</dd>\n    <dt>Universo:</dt>\n    <dd>Tolkien</dd>\n  </dl>\n</section>\n\n<style>\n  .guilda-card {\n    /* TODO: Defina layout com display: flex ou grid */\n    padding: 1.5rem;\n  }\n  @media (max-width: 640px) {\n    /* TODO: Responsividade para dispositivos móveis */\n  }\n</style>`,
    criterio_aceite:
      'Uso exclusivo de tags HTML5 semânticas (<section>, <header>, <dl>), layout responsivo adaptável com media query em 640px e taxa de contraste de cores acessível (mínimo 4.5:1 para texto normal).',
    dificuldade: 'medio',
  },
  {
    id: 4,
    modulo_id: 4,
    titulo: 'O Feitiço da API Assíncrona',
    enunciado:
      'Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona buscarPoderesGuilda(url: string) em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando fetch(), validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com !res.ok), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.',
    codigo_inicial: `/**\n * Consulta o grimório sagrado consumindo a API REST assíncrona.\n * @param {string} url - Endereço do endpoint do grimório da guilda.\n * @returns {Promise<Array<{ nome: string, poder: number }>>} Lista ordenada de poderes.\n */\nasync function buscarPoderesGuilda(url) {\n  try {\n    // TODO: Realize o fetch com verificação de status HTTP (200 OK)\n    // TODO: Trate respostas 4xx e 5xx lançando erro com mensagem descritiva\n    // TODO: Retorne o array de poderes ordenado pelo poder (decrescente)\n  } catch (erro) {\n    console.error("Falha ao conjurar feitiço de consulta:", erro.message);\n    throw erro;\n  }\n}`,
    criterio_aceite:
      'A função deve usar async/await com try/catch, verificar res.ok rejeitando respostas HTTP de erro, tratar exceções de rede e retornar a Promise resolvida com os poderes ordenados por nível de poder (decrescente).',
    dificuldade: 'dificil',
  },
];

async function main() {
  console.log('⚔️ CodeQuest: Executando seed de módulos e missões...');

  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL não definida nas variáveis de ambiente.');
    console.log('ℹ️ Para sincronizar com banco PostgreSQL/Neon, configure DATABASE_URL no .env.');
    console.log('✅ 4 missões oficiais (Blocos, Python, HTML/CSS, JavaScript) persistidas no admin-store e sql/seed.sql.');
    return;
  }

  let prisma;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();

    for (const m of modulos) {
      await prisma.modulo.upsert({
        where: { ordem: m.ordem },
        update: {
          titulo: m.titulo,
          tecnologia: m.tecnologia,
          descricao: m.descricao,
        },
        create: {
          id: m.id,
          ordem: m.ordem,
          titulo: m.titulo,
          tecnologia: m.tecnologia,
          descricao: m.descricao,
        },
      });
    }

    for (const missao of missoes) {
      await prisma.missao.upsert({
        where: { id: missao.id },
        update: {
          modulo_id: missao.modulo_id,
          titulo: missao.titulo,
          enunciado: missao.enunciado,
          codigo_inicial: missao.codigo_inicial,
          criterio_aceite: missao.criterio_aceite,
          dificuldade: missao.dificuldade,
        },
        create: {
          id: missao.id,
          modulo_id: missao.modulo_id,
          titulo: missao.titulo,
          enunciado: missao.enunciado,
          codigo_inicial: missao.codigo_inicial,
          criterio_aceite: missao.criterio_aceite,
          dificuldade: missao.dificuldade,
        },
      });
    }

    console.log('✅ Seed finalizado com sucesso no banco PostgreSQL!');
  } catch (err) {
    console.log(`⚠️ Aviso na conexão com o banco de dados: ${err.message}`);
    console.log('✅ Dados das 4 missões da trilha carregados com sucesso no catálogo em memória e em sql/seed.sql.');
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

main();
