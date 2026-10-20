/**
 * CodeQuest - Guias Didáticos de Sintaxe de Programação
 * Fornece a base teórica e de sintaxe de cada linguagem para a Trilha Pedagógica (Módulos 1 a 4).
 * Usado na página do módulo (/trilha/[moduloId]) e no editor de missões (/missoes/[id]).
 */

export interface TopicoSintaxe {
  id: string;
  titulo: string;
  conceito: string;
  explicacao: string;
  exemplo_codigo: string;
  dica_pro: string;
}

export interface EntradaDicionario {
  comando: string;
  sintaxe: string;
  exemplo: string;
  descricao: string;
}

export interface GuiaLinguagem {
  modulo_id: number;
  linguagem: string;
  icone_nome: string;
  titulo: string;
  descricao: string;
  introducao: string;
  topicos: TopicoSintaxe[];
  dicionario_rapido: EntradaDicionario[];
}

export const GUIAS_SINTAXE: Record<number, GuiaLinguagem> = {
  // ========================================================
  // MÓDULO 1: PROGRAMAÇÃO EM BLOCOS & LÓGICA DE PROGRAMAÇÃO
  // ========================================================
  1: {
    modulo_id: 1,
    linguagem: 'Blocos & Pseudocódigo',
    icone_nome: 'Blocks',
    titulo: 'Fundamentos de Lógica e Pseudocódigo Visual',
    descricao:
      'Aprenda os conceitos primordiais que sustentam toda a computação moderna: algoritmos, variáveis, tomadas de decisão e repetições.',
    introducao:
      'Antes de digitar código em linguagens formais, todo programador precisa dominar o Pensamento Computacional. Um algoritmo é simplesmente uma receita: um conjunto finito e ordenado de instruções claras que transformam dados de entrada em uma solução previsível. Na programação em blocos e pseudocódigo, representamos essas instruções de forma direta e visual.',
    topicos: [
      {
        id: 'variaveis',
        titulo: '1. Variáveis e Atribuição de Valores',
        conceito: 'Variáveis são como baús mágicos que armazenam valores na memória do computador para uso posterior.',
        explicacao:
          'Para criar uma variável, damos um nome descritivo a ela e atribuímos um valor inicial usando o símbolo `=`. O valor pode ser um número (ex: vida, pontos), um texto entre aspas (ex: "Guerreiro") ou um valor lógico verdadeiro/falso (booleano).',
        exemplo_codigo: `// Criando variáveis para o herói:
let nivelHeroi = 1;
let nomeGuerreiro = "Aragorn";
let estaVivo = true;

// Atualizando o valor de uma variável:
nivelHeroi = nivelHeroi + 1; // Agora nivelHeroi vale 2`,
        dica_pro:
          'Utilize nomes de variáveis no padrão camelCase (ex: pontosDeVida) que indiquem com clareza o que está guardado.',
      },
      {
        id: 'condicionais',
        titulo: '2. Estruturas Condicionais (Decisões com "se" / "senão")',
        conceito: 'Permitem que o programa tome caminhos diferentes baseando-se em condições verdadeiras ou falsas.',
        explicacao:
          'A instrução `se (condição)` avalia um teste lógico. Se o teste for verdadeiro, o bloco interno executa. Se for falso, o programa pula para o `senão-se` (para testar outra condição) ou para o `senão` (o caminho padrão).',
        exemplo_codigo: `se (vidaAtual <= 0) {
  declararDerrota();
} senao se (vidaAtual < 30) {
  usarPocaoDeCura();
} senao {
  atacarMonstro();
}`,
        dica_pro:
          'Nunca esqueça de cobrir o caso padrão no "senão" para evitar que o personagem fique sem ação em situações imprevistas.',
      },
      {
        id: 'lacos-enquanto',
        titulo: '3. Laço "Enquanto" (While) — Repetição Condicional',
        conceito: 'Executa um conjunto de passos repetidamente ENQUANTO uma condição continuar sendo verdadeira.',
        explicacao:
          'Ideal para labirintos e situações onde você não sabe de antemão quantas vezes precisará agir. Cuidado com loops infinitos: a condição interna precisa eventualmente se tornar falsa para o laço terminar!',
        exemplo_codigo: `// Enquanto o caminho à frente estiver desimpedido:
enquanto (caminhoLivre() && !chegouAoPortal()) {
  andarFrente();
  se (detectarArmadilha()) {
    desarmarArmadilha();
  }
}`,
        dica_pro:
          'Garanta que dentro do laço ocorra uma ação que modifique o estado (como andar ou desarmar) para não travar o jogo.',
      },
      {
        id: 'lacos-para',
        titulo: '4. Laço "Para" (For) — Repetição com Contador Fixo',
        conceito: 'Executa um bloco de código um número exato e conhecido de vezes.',
        explicacao:
          'Quando sabemos que devemos avançar exatamente 5 pilares ou golpear 3 vezes, usamos o laço contado. Uma variável de controle inicia em um valor, é incrementada a cada passo e para ao atingir a meta.',
        exemplo_codigo: `// Percorrendo exatamente 5 pilares da ponte:
para (let pilar = 1; pilar <= 5; pilar++) {
  andarFrente();
  coletarGema();
  notificar("Gema coletada no pilar: " + pilar);
}`,
        dica_pro:
          'Lembre-se da regra do deslocamento por um (off-by-one): se começar em 1 e usar <= 5, o loop executará exatamente 5 vezes.',
      },
      {
        id: 'funcoes',
        titulo: '5. Procedimentos e Funções Modulares',
        conceito: 'Agrupam sequências de comandos em um único bloco nomeado para evitar código duplicado (princípio DRY).',
        explicacao:
          'Em vez de escrever a mesma lógica de desarme 10 vezes pelo mapa, você cria a função `desarmarArmadilha(tipo)` e simplesmente a invoca sempre que necessário, passando parâmetros.',
        exemplo_codigo: `// Declarando o procedimento reutilizável:
funcao desarmarGuarda(tipoMaterial) {
  se (tipoMaterial === "ferro") {
    girarChave("esquerda", 2);
  } senao {
    girarChave("direita", 3);
  }
}

// Invocando em diferentes momentos do mapa:
desarmarGuarda("ferro");
avancar();
desarmarGuarda("cristal");`,
        dica_pro:
          'Funções tornam o código muito mais fácil de ler, testar e corrigir em masmorras mais complexas.',
      },
    ],
    dicionario_rapido: [
      {
        comando: 'andarFrente()',
        sintaxe: 'andarFrente();',
        exemplo: 'andarFrente();',
        descricao: 'Move o personagem 1 casa para frente no labirinto.',
      },
      {
        comando: 'virarDireita() / virarEsquerda()',
        sintaxe: 'virarDireita();',
        exemplo: 'virarDireita();',
        descricao: 'Gira a orientação do herói em 90 graus no sentido indicado.',
      },
      {
        comando: 'caminhoLivre()',
        sintaxe: 'caminhoLivre() -> boolean',
        exemplo: 'se (caminhoLivre()) { ... }',
        descricao: 'Retorna true se a casa frontal estiver sem bloqueios ou paredes.',
      },
      {
        comando: 'detectarArmadilha()',
        sintaxe: 'detectarArmadilha() -> boolean',
        exemplo: 'se (detectarArmadilha()) { desarmar(); }',
        descricao: 'Retorna true se houver uma armadilha ou runa mágica perigosa na casa atual.',
      },
    ],
  },

  // ========================================================
  // MÓDULO 2: PYTHON (Sintaxe Limpa & Algoritmos)
  // ========================================================
  2: {
    modulo_id: 2,
    linguagem: 'Python 3',
    icone_nome: 'Code',
    titulo: 'Manual de Sintaxe e Fundamentos do Python',
    descricao:
      'Descubra a elegância, a tipagem dinâmica e a legibilidade do Python: funções puras, listas, dicionários e orientação a objetos.',
    introducao:
      'Python é uma das linguagens mais populares e versáteis do planeta. Sua filosofia ("The Zen of Python") prioriza código limpo, legível e explícito. Em Python, a estrutura de blocos não usa chaves `{}` nem palavras `end`, mas sim a **indentação obrigatória** com 4 espaços!',
    topicos: [
      {
        id: 'tipos-indentacao',
        titulo: '1. Variáveis, Tipos Primitivos e Indentação',
        conceito: 'Python é dinamicamente tipado, mas fortemente tipado: cada dado possui um tipo bem definido.',
        explicacao:
          'Os tipos primitivos fundamentais são `int` (inteiros), `float` (números decimais), `str` (textos entre aspas) e `bool` (`True` ou `False`). O Python infere o tipo automaticamente.',
        exemplo_codigo: `# Variáveis em Python
nome = "Frodo"          # str
nivel = 15              # int
poder = 88.5            # float
ativo = True            # bool

# Indentação com 4 espaços obrigatória:
if nivel >= 10:
    print(f"Herói experiente: {nome}")
    pontos_bonus = nivel * 2`,
        dica_pro:
          'Nunca misture espaços com teclas Tab na indentação. Sempre utilize 4 espaços para manter consistência absoluta.',
      },
      {
        id: 'funcoes-typehints',
        titulo: '2. Funções com "def" e Type Hints (PEP 484)',
        conceito: 'Funções são definidas com a palavra-chave "def" e retornam valores com "return".',
        explicacao:
          'As Type Hints documentam os tipos esperados nos argumentos e no retorno da função, tornando o código mais profissional, seguro e fácil de debugar.',
        exemplo_codigo: `def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:
    """Calcula o dano final do ataque aplicando multiplicador e bônus."""
    dano_total = ataque_base * multiplicador
    if multiplicador > 1.5:
        dano_total += bonus
    
    # max(0, ...) garante que o dano nunca seja negativo:
    return max(0, int(round(dano_total)))

# Invocando a função:
resultado = calcular_dano(100, 2.0, 30)
print(resultado) # Saída: 230`,
        dica_pro:
          'Utilize sempre docstrings com aspas triplas logo abaixo do `def` para documentar o propósito e os parâmetros.',
      },
      {
        id: 'listas-comprehensions',
        titulo: '3. Listas e List Comprehensions',
        conceito: 'Listas armazenam sequências ordenadas de elementos. List Comprehensions oferecem sintaxe pythônica para filtragem.',
        explicacao:
          'Uma List Comprehension substitui loops tradicionais por uma única expressão concisa: `[expressao for item in lista if condicao]`. Para ordenar uma lista, usamos `sorted(lista)`.',
        exemplo_codigo: `pocoes = [
    {"nome": "Poção de Mana", "nivel": 5, "em_estoque": True},
    {"nome": "Elixir da Vida", "nivel": 10, "em_estoque": False},
    {"nome": "Antídoto Menor", "nivel": 1, "em_estoque": True},
]

# Filtrando apenas disponíveis com nível >= 3:
nomes = [p["nome"] for p in pocoes if p["em_estoque"] and p["nivel"] >= 3]
nomes_ordenados = sorted(nomes)
print(nomes_ordenados) # ['Poção de Mana']`,
        dica_pro:
          'Prefira List Comprehensions a laços for com `.append()`. Elas são mais rápidas e consideradas o padrão idiomático da linguagem.',
      },
      {
        id: 'dicionarios',
        titulo: '4. Dicionários (dict) e Métodos Chave-Valor',
        conceito: 'Dicionários mapeiam chaves exclusivas para valores (tabelas hash de busca ultra-rápida O(1)).',
        explicacao:
          'Criados com chaves `{"chave": valor}`. Métodos úteis incluem `.get(chave, padrao)` para busca segura sem estourar `KeyError`, `.items()` para iterar sobre chave e valor, e funções nativas como `sum()` e `len()`.',
        exemplo_codigo: `heroi = {
    "nome": "Gandalf",
    "classe": "Mago",
    "poder": 98,
    "ativo": True
}

# Acesso seguro com valor padrão se a chave não existir:
titulo = heroi.get("titulo", "Aventureiro da Guilda")

# Agregando listas de dicionários:
fichas = [{"poder": 80}, {"poder": 90}, {"poder": 100}]
poder_total = sum(f["poder"] for f in fichas)
poder_medio = poder_total / len(fichas) # 90.0`,
        dica_pro:
          'Para encontrar o item com maior valor em uma lista de dicionários em uma linha, use `max(fichas, key=lambda f: f["poder"])`.',
      },
      {
        id: 'poo-classes',
        titulo: '5. Classes e Programação Orientada a Objetos (POO)',
        conceito: 'Classes funcionam como moldes que encapsulam atributos (dados) e métodos (comportamentos).',
        explicacao:
          'O método construtor `__init__` inicializa a instância. O parâmetro `self` representa o próprio objeto. A herança permite que uma subclasse (`Mago`) herde tudo da classe mãe (`Personagem`) chamando `super().__init__()`.',
        exemplo_codigo: `class Personagem:
    def __init__(self, nome: str, vida: int, ataque: int):
        self.nome = nome
        self.vida = max(0, vida)
        self.ataque = ataque

    def receber_dano(self, quantidade: int):
        self.vida = max(0, self.vida - quantidade)

class Mago(Personagem):
    def __init__(self, nome: str, vida: int, ataque: int, mana: int):
        super().__init__(nome, vida, ataque)
        self.mana = mana

    def lancar_magia(self, alvo: Personagem) -> int:
        if self.mana >= 10:
            self.mana -= 10
            dano = self.ataque * 2
            alvo.receber_dano(dano)
            return dano
        return self.ataque`,
        dica_pro:
          'Sempre chame `super().__init__()` na primeira linha do construtor da subclasse para inicializar os atributos da classe herdada.',
      },
    ],
    dicionario_rapido: [
      {
        comando: 'def funcao(arg: int) -> int:',
        sintaxe: 'def nome_funcao(parametros):',
        exemplo: 'def somar(a: int, b: int) -> int:\n    return a + b',
        descricao: 'Define uma função com assinatura, anotações de tipo e escopo.',
      },
      {
        comando: 'list comprehension',
        sintaxe: '[item for item in lista if condicao]',
        exemplo: '[x * 2 for x in numeros if x > 0]',
        descricao: 'Cria uma nova lista transformada e filtrada a partir de um iterável.',
      },
      {
        comando: 'try / except / raise',
        sintaxe: 'try: ... except Exception as e: ...',
        exemplo: 'if poder < 0:\n    raise ValueError("Poder inválido")',
        descricao: 'Tratamento de exceções e lançamento de erros de validação de regras de negócio.',
      },
      {
        comando: 'ord(c) e chr(n)',
        sintaxe: 'ord("A") -> 65 | chr(65) -> "A"',
        exemplo: 'codigo = ord("B") - 65',
        descricao: 'Converte caractere para seu código ASCII numérico e vice-versa (essencial para cifras).',
      },
    ],
  },

  // ========================================================
  // MÓDULO 3: HTML E CSS (Web Semântica, Acessibilidade & Layout)
  // ========================================================
  3: {
    modulo_id: 3,
    linguagem: 'HTML5 & CSS3',
    icone_nome: 'FileCode',
    titulo: 'Estruturação Semântica, WCAG e Design Responsivo',
    descricao:
      'Aprenda a construir interfaces web profissionais, com tags semânticas acessíveis, CSS Flexbox, CSS Grid e conformidade WCAG AA.',
    introducao:
      'O HTML fornece a estrutura e o significado (semântica) da informação na web, enquanto o CSS cuida da apresentação visual e responsividade. Criar páginas modernas exige ir além de divs genéricas: devemos adotar tags que facilitem a leitura por robôs e tecnologias assistivas (leitores de tela) e folhas de estilo flexíveis que se adaptem a qualquer tamanho de tela.',
    topicos: [
      {
        id: 'html-semantico',
        titulo: '1. Elementos Semânticos do HTML5',
        conceito: 'Tags semânticas revelam o propósito do conteúdo para os navegadores e leitores de tela.',
        explicacao:
          'Substitua <div> genéricas por tags expressivas:\n- `<article>`: Para cartões e publicações independentes.\n- `<header>` e `<footer>`: Cabeçalhos e rodapés de seções.\n- `<figure>` e `<figcaption>`: Para imagens, brasões e avatares com legenda.\n- `<dl>`, `<dt>`, `<dd>`: Lista de definição perfeita para exibir pares como "Classe: Guerreiro" e "Poder: 95".',
        exemplo_codigo: `<article class="heroi-card">
  <header>
    <h2>Legolas</h2>
    <span class="classe">Arqueiro Élfico</span>
  </header>

  <figure>
    <img src="/avatar-elfo.png" alt="Retrato do elfo Legolas empunhando seu arco dourado" />
    <figcaption>Brasão da Floresta das Trevas</figcaption>
  </figure>

  <dl>
    <dt>Universo:</dt>
    <dd>Tolkien</dd>
    <dt>Poder de Combate:</dt>
    <dd>91/100</dd>
  </dl>
</article>`,
        dica_pro:
          'O atributo `alt` nas tags `<img>` é obrigatório para acessibilidade. Descreva o que a imagem representa, e não apenas o nome do arquivo.',
      },
      {
        id: 'wcag-variaveis',
        titulo: '2. Acessibilidade (WCAG AA) e Variáveis CSS (:root)',
        conceito: 'O padrão internacional WCAG 2.1 AA exige contraste mínimo de 4.5:1 para texto normal e foco visível.',
        explicacao:
          'Variáveis CSS (Custom Properties) centralizam paletas de cores no escopo global `:root`. O estado `:focus-visible` garante que usuários que navegam usando a tecla Tab visualizem um anel de foco destacado.',
        exemplo_codigo: `:root {
  --bg-dark: #0f172a;
  --text-light: #f8fafc; /* Contraste 15:1 contra bg-dark (WCAG AAA) */
  --cor-marca: #6366f1;
  --anel-foco: #38bdf8;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-light);
}

/* Indicador de foco acessível para navegação por teclado */
button:focus-visible, a:focus-visible {
  outline: 2px solid var(--anel-foco);
  outline-offset: 2px;
}`,
        dica_pro:
          'Nunca remova o contorno de foco com `outline: none` sem fornecer um estilo substituto visível de alto contraste.',
      },
      {
        id: 'flexbox',
        titulo: '3. CSS Flexbox — Layout Unidimensional Moderno',
        conceito: 'Flexbox organiza e distribui elementos dinamicamente ao longo de um eixo (linha ou coluna).',
        explicacao:
          'Basta definir `display: flex` no contêiner pai. Propriedades fundamentais:\n- `flex-direction`: `row` (horizontal) ou `column` (vertical).\n- `justify-content`: Alinha itens no eixo principal (`center`, `space-between`).\n- `align-items`: Alinha no eixo transversal (`center`, `stretch`).\n- `gap`: Espaçamento uniforme e limpo entre os filhos sem usar margens manuais.',
        exemplo_codigo: `.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

/* Media Query para telas móveis */
@media (max-width: 640px) {
  .card-container {
    flex-direction: column; /* Empilha verticalmente no celular */
    text-align: center;
  }
}`,
        dica_pro:
          'Sempre adicione `flex-wrap: wrap` ou uma media query em pontos de quebra para evitar transbordamento (scroll horizontal) em telas pequenas.',
      },
      {
        id: 'css-grid',
        titulo: '4. CSS Grid — Grade Bidimensional Responsiva',
        conceito: 'Controla simultaneamente linhas e colunas, ideal para galerias, inventários e murais de cards.',
        explicacao:
          'A fórmula definitiva para grades responsivas sem precisar de dezenas de media queries é `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))`. O navegador calcula automaticamente quantas colunas de no mínimo 120px cabem no espaço!',
        exemplo_codigo: `.mochila-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.item-slot {
  aspect-ratio: 1 / 1; /* Força proporção quadrada perfeita */
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 0.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.item-slot:hover {
  transform: translateY(-4px); /* Elevação suave ao passar o mouse */
  border-color: #6366f1;
}`,
        dica_pro:
          'A combinação de `repeat(auto-fill, minmax(...))` com `aspect-ratio: 1/1` cria slots de inventário perfeitos que se ajustam fluidamente.',
      },
    ],
    dicionario_rapido: [
      {
        comando: 'display: flex',
        sintaxe: 'display: flex; gap: 1rem; justify-content: space-between;',
        exemplo: '.linha { display: flex; align-items: center; }',
        descricao: 'Ativa o modelo flexbox para alinhamento em linha ou coluna única.',
      },
      {
        comando: 'display: grid',
        sintaxe: 'grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));',
        exemplo: '.grade { display: grid; gap: 1rem; }',
        descricao: 'Cria uma grade bidimensional fluida e responsiva sem media queries.',
      },
      {
        comando: '@media (max-width: 640px)',
        sintaxe: '@media (max-width: 640px) { ... }',
        exemplo: '@media (max-width: 640px) { .box { flex-direction: column; } }',
        descricao: 'Aplica regras CSS específicas quando a largura da tela for inferior a 640px.',
      },
      {
        comando: '<label for="id"> e <input id="id">',
        sintaxe: '<label for="nome">Nome:</label><input id="nome" required />',
        exemplo: '<label for="email">E-mail</label><input type="email" id="email" />',
        descricao: 'Associação obrigatória para formulários acessíveis recomendada pela WCAG.',
      },
    ],
  },

  // ========================================================
  // MÓDULO 4: JAVASCRIPT INTERATIVO (ES6+, DOM & APIs)
  // ========================================================
  4: {
    modulo_id: 4,
    linguagem: 'JavaScript (ES6+)',
    icone_nome: 'Layers',
    titulo: 'JavaScript Moderno, Manipulação do DOM e APIs REST',
    descricao:
      'Dê vida e inteligência às suas aplicações com ES6+, Arrow Functions, métodos funcionais de array e requisições assíncronas com fetch e async/await.',
    introducao:
      'JavaScript é a linguagem de programação oficial da web moderna. O padrão ECMAScript (ES6+) revolucionou a linguagem com recursos poderosos para código declarativo, assíncrono e imutável. No CodeQuest, você aprende a manipular a interface dinâmica, tratar dados de APIs REST e aplicar boas práticas de desenvolvimento frontend e backend.',
    topicos: [
      {
        id: 'es6-sintaxe',
        titulo: '1. Declarações Modernas (const/let), Arrow Functions e Imutabilidade',
        conceito: 'Prefira sempre "const" para variáveis cujo identificador não muda e "let" para reatribuições.',
        explicacao:
          'Evite `var` (que possui escopo global perigoso). Arrow Functions `(a, b) => a + b` são enxutas e mantêm o `this` léxico. O operador spread `{ ...heroi }` cria cópias rasas, garantindo o princípio da **imutabilidade**.',
        exemplo_codigo: `// Imutabilidade com Spread Operator (...) e Template Literals:
function atualizarPoderHeroi(heroi, bonusPoder) {
  const { nome, classe, poder } = heroi; // Desestruturação
  const novoPoder = Math.min(100, poder + bonusPoder); // Teto RN01

  return {
    ...heroi,
    poder: novoPoder,
    statusTexto: \`O herói \${nome} da classe \${classe} possui \${novoPoder} de poder!\`,
  };
}`,
        dica_pro:
          'Nunca altere diretamente um objeto que você recebeu como parâmetro (`heroi.poder = 100`). Sempre retorne um novo objeto com spread `{ ...heroi }`.',
      },
      {
        id: 'dom-eventos',
        titulo: '2. Manipulação do DOM e Eventos',
        conceito: 'O DOM é a interface que permite ao JavaScript ler e alterar elementos HTML e reagir a cliques e toques.',
        explicacao:
          'Com `document.querySelector("#id")` selecionamos elementos. Com `addEventListener("click", callback)` escutamos interações. Com `classList.add("ativo")` alteramos o visual de forma desacoplada.',
        exemplo_codigo: `function configurarBotaoEquipar() {
  const botao = document.querySelector("#btn-equipar");
  const statusDisplay = document.querySelector("#status-arma");

  if (!botao || !statusDisplay) return;

  botao.addEventListener("click", () => {
    statusDisplay.textContent = "Espada Vorpal Equipada!";
    statusDisplay.classList.add("arma-ativa");
    botao.disabled = true; // Previne múltiplos cliques
  });
}`,
        dica_pro:
          'Sempre verifique se o elemento retornado por `querySelector` não é nulo antes de tentar anexar listeners ou alterar propriedades.',
      },
      {
        id: 'metodos-array',
        titulo: '3. Métodos Funcionais de Array (filter, map, reduce)',
        conceito: 'Manipulação de listas declarativa sem usar loops for imperativos com efeitos colaterais.',
        explicacao:
          '- `.filter()`: Filtra elementos que atendem ao teste booleano.\n- `.map()`: Transforma cada item retornando um novo array de mesmo tamanho.\n- `.reduce()`: Condensa toda a lista em um único acumulador (soma, média, etc.).',
        exemplo_codigo: `const membros = [
  { nome: "Aragorn", ativo: true, poder: 88 },
  { nome: "Boromir", ativo: false, poder: 75 },
  { nome: "Gandalf", ativo: true, poder: 98 },
];

// 1. Filtrando apenas ativos:
const ativos = membros.filter((m) => m.ativo);

// 2. Mapeando apenas nomes em maiúsculas:
const nomesAtivos = ativos.map((m) => m.nome.toUpperCase());

// 3. Somando o poder total via reduce:
const poderTotal = ativos.reduce((acumulado, m) => acumulado + m.poder, 0);
const poderMedio = Math.round(poderTotal / ativos.length);`,
        dica_pro:
          'Ao usar `.reduce()`, sempre forneça o valor inicial do acumulador (ex: `, 0`) para evitar erros em listas vazias.',
      },
      {
        id: 'async-fetch',
        titulo: '4. Requisições Assíncronas com fetch() e async/await',
        conceito: 'Comunicação assíncrona com servidores e APIs REST externas através de Promises.',
        explicacao:
          'A palavra `async` marca uma função que opera com Promises. O `await` aguarda a resposta sem travar a interface do usuário. **Atenção:** `fetch` só rejeita em quedas de rede! Se o servidor retornar 404 ou 500, `res.ok` será `false` e você deve lançar um erro explicitamente com `throw new Error()`.',
        exemplo_codigo: `async function buscarPoderesGuilda(url) {
  try {
    const resposta = await fetch(url);
    
    // Verificação obrigatória de status HTTP 2xx:
    if (!resposta.ok) {
      throw new Error(\`Falha na requisição da guilda: Status \${resposta.status}\`);
    }

    const magias = await resposta.json();
    
    // Ordenação decrescente por poder arcano:
    return magias.sort((a, b) => b.poder - a.poder);
  } catch (erro) {
    console.error("Erro ao consultar grimório remoto:", erro.message);
    throw erro; // Repassa para tratamento na UI
  }
}`,
        dica_pro:
          'Sempre envolva chamadas com `await fetch` em blocos `try/catch` para capturar falhas de conexão de forma resiliente.',
      },
    ],
    dicionario_rapido: [
      {
        comando: 'const { a, b } = objeto',
        sintaxe: 'const { propriedade } = obj;',
        exemplo: 'const { nome, poder } = heroi;',
        descricao: 'Desestruturação: extrai propriedades de objetos diretamente em variáveis.',
      },
      {
        comando: '{ ...objeto, novoCampo: 1 }',
        sintaxe: 'const novo = { ...original, alterado: valor };',
        exemplo: 'const atualizado = { ...ficha, poder: 100 };',
        descricao: 'Operador Spread: copia atributos de forma imutável sem alterar o original.',
      },
      {
        comando: 'array.filter((item) => bool)',
        sintaxe: 'const filtrados = array.filter(fn);',
        exemplo: 'herois.filter(h => h.poder >= 80);',
        descricao: 'Retorna um novo array contendo apenas os elementos que retornam true no predicado.',
      },
      {
        comando: 'await fetch(url)',
        sintaxe: 'const res = await fetch(url); if (!res.ok) throw ...',
        exemplo: 'const dados = await (await fetch("/api/missoes")).json();',
        descricao: 'Faz requisição HTTP assíncrona para consultar ou enviar dados ao servidor.',
      },
    ],
  },
};
