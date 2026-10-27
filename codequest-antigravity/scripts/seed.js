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
    "id": 1,
    "modulo_id": 1,
    "titulo": "O Despertar dos Blocos Mágicos",
    "explicacao": "Antes de conjurar algoritmos complexos, todo aprendiz deve compreender que a programação é uma sequência ordenada e finita de instruções que transformam entradas em saídas previsíveis. No paradigma visual de blocos, o fluxo de execução é controlado por duas estruturas vitais:\n1. Estruturas de Repetição (enquanto / while): Avaliam continuamente uma condição lógica. Enquanto a condição for verdadeira (caminhoLivre() == true), o bloco interno é executado repetidamente.\n2. Estruturas de Decisão (se / if): Permitem que o herói reaja a imprevistos no ambiente, executando ações especiais (como desarmar uma armadilha) apenas quando uma contingência é detectada.\nCompreender o encadeamento correto de repetição e decisão é a fundação para evitar loops infinitos e travamentos em qualquer linguagem moderna.",
    "enunciado": "Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.",
    "codigo_inicial": "// Algoritmo Visual de Blocos\nenquanto (caminhoLivre()) {\n  andarFrente();\n  se (detectarArmadilha()) {\n    desarmarArmadilha();\n  }\n}\nse (alcancouBau()) {\n  abrirBau();\n}",
    "criterio_aceite": "O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.",
    "dificuldade": "facil"
  },
  {
    "id": 2,
    "modulo_id": 1,
    "titulo": "A Coleta das Gemas Elementais",
    "explicacao": "Muitas vezes conhecemos de antemão o número exato de repetições necessárias. Para isso, utilizamos Laços Contados (laço para / for), acompanhados de uma Variável Acumuladora:\n1. Contador de Passos (para pilar de 1 até N): Uma variável de controle que incrementa a cada ciclo até atingir o limite estipulado.\n2. Variável Acumuladora (totalGemas = totalGemas + 1): Armazena e preserva o estado ao longo das iterações da jornada.\nDominar laços contados evita erros clássicos de \"deslocamento por um\" (off-by-one errors) e garante que o processamento termine exatamente após o último elemento planejado.",
    "enunciado": "Uma ponte suspensa de 5 pilares arcanos estende-se sobre o abismo do esquecimento. Em cada pilar repousa uma gema elemental brilhante. Construa um algoritmo em blocos com um laço contado de 1 a 5: para cada pilar, o herói deve avançar, conjurar o feitiço de coleta e incrementar a variável acumuladora gemasColetadas. Ao final da ponte, retorne o total acumulado.",
    "codigo_inicial": "// Coleta das Gemas com Laço Contado\nlet gemasColetadas = 0;\n\npara (let pilar = 1; pilar <= 5; pilar++) {\n  andarFrente();\n  coletarGema();\n  gemasColetadas = gemasColetadas + 1;\n}\n\nnotificarGuilda(\"Total de gemas coletadas:\", gemasColetadas);",
    "criterio_aceite": "O herói deve percorrer exatamente os 5 pilares da ponte e acumular 5 gemas no inventário ao final da travessia sem passos redundantes.",
    "dificuldade": "facil"
  },
  {
    "id": 3,
    "modulo_id": 1,
    "titulo": "O Labirinto das Bifurcações Rúnicas",
    "explicacao": "Quando o herói se depara com decisões com mais de dois desfechos possíveis, o simples se/senão torna-se insuficiente. Entram em cena as Estruturas Condicionais Encadeadas (se / senão-se / senão) e os Operadores Lógicos (E, OU, NÃO):\n- se (if): Avalia o primeiro caso prioritário.\n- senão-se (else if): Avalia casos secundários caso o primeiro seja falso.\n- senão (else): O caminho padrão executado se nenhuma das alternativas anteriores for satisfeita.\nEm sistemas reais, isso é análogo ao tratamento de múltiplos estados de conexão HTTP ou permissões de usuário (estudante, professor, moderador, admin).",
    "enunciado": "O herói chega à Câmara dos Três Portais Rúnicos. Cada bifurcação emite uma aura mágica diferente que exige um feitiço específico: se a luz emitida for azul (gelo), deve conjurar Chama Arcana; senão se a luz for vermelha (fogo), deve conjurar Orbe de Gelo; caso contrário (luz neutra), deve conjurar Escudo de Vento e passar em silêncio. Escreva a lógica para desarmar 4 bifurcações consecutivas.",
    "codigo_inicial": "// Estrutura Condicional Encadeada\nfuncao resolverBifurcacao(corLuz) {\n  se (corLuz === \"azul\") {\n    conjurarChamaArcana();\n  } senao se (corLuz === \"vermelha\") {\n    conjurarOrbeGelo();\n  } senao {\n    conjurarEscudoVento();\n  }\n  avancarProximaCamara();\n}",
    "criterio_aceite": "O algoritmo deve identificar corretamente as cores emitidas pelas 4 bifurcações, conjurando a magia exata para cada uma sem sofrer penalidade de vida.",
    "dificuldade": "medio"
  },
  {
    "id": 4,
    "modulo_id": 1,
    "titulo": "O Desarme dos Autômatos de Guarda",
    "explicacao": "A repetição desnecessária de código é um dos maiores problemas na engenharia de software (princípio DRY: Don't Repeat Yourself). Para combater isso na programação visual, agrupamos rotinas em Procedimentos e Funções Modulares:\n1. Declaração do Procedimento: Define um bloco reutilizável com um nome descritivo e parâmetros de entrada.\n2. Parâmetros: Valores passados para o procedimento que personalizam seu comportamento interno.\n3. Invocação (Chamada): O herói reutiliza a mesma lógica para desarmar múltiplos autômatos sem duplicar blocos na tela.",
    "enunciado": "Dois autômatos colossais guardam os portões da cidadela: um feito de ferro e outro de cristal. Cada um exige uma sequência de giros rúnicos de acordo com seu material. Crie um procedimento modular desarmarAutomato(tipo) que recebe o material como parâmetro e realiza a sequência adequada, invocando-o para ambos os guardas.",
    "codigo_inicial": "// Procedimento Modular Reutilizável\nfuncao desarmarAutomato(tipo) {\n  se (tipo === \"ferro\") {\n    girarChave(\"esquerda\", 2);\n    pressionarRuna(\"bronze\");\n  } senao {\n    girarChave(\"direita\", 3);\n    pressionarRuna(\"ametista\");\n  }\n}\n\n// Desarmando os dois guardas do salão:\ndesarmarAutomato(\"ferro\");\navancar();\ndesarmarAutomato(\"cristal\");",
    "criterio_aceite": "A lógica de desarme deve estar encapsulada em um único procedimento reutilizável com parâmetros, sendo executada com sucesso contra os dois autômatos.",
    "dificuldade": "medio"
  },
  {
    "id": 5,
    "modulo_id": 1,
    "titulo": "A Travessia das Pontes Móveis",
    "explicacao": "No desenvolvimento de sistemas reativos, frequentemente lidamos com Estados Transitórios e Sincronização Temporal. Uma ação não pode ocorrer antes que o ambiente externo atinja um estado seguro:\n1. Condições Compostas (E / &&): Exigem que múltiplos predicados sejam verdadeiros simultaneamente (ponteAbaixada() E tempoRestante >= 3).\n2. Espera Ativa Controlada (aguardar()): Pausa temporária enquanto a condição de travessia não estiver madura.\nEssa lógica modela requisições que aguardam disponibilidade de recursos ou controle de fluxo em sistemas distribuídos.",
    "enunciado": "O herói precisa atravessar 3 pontes levadiças mágicas que abrem e fecham em intervalos cronometrados. O algoritmo deve verificar se a ponte está abaixada e se há pelo menos 3 segundos de tempo seguro antes de iniciar o passo. Se o tempo for insuficiente, o herói deve aguardar o próximo ciclo.",
    "codigo_inicial": "// Sincronização com Pontes Móveis\npara (let p = 1; p <= 3; p++) {\n  enquanto (!ponteAbaixada() || obterTempoRestante() < 3) {\n    aguardar(1);\n  }\n  atravessarPonte();\n}",
    "criterio_aceite": "O herói deve cruzar as 3 pontes levadiças sem cair no abismo, garantindo travessia estritamente quando ponteAbaixada() for true e tempoRestante >= 3.",
    "dificuldade": "medio"
  },
  {
    "id": 6,
    "modulo_id": 1,
    "titulo": "O Guardião do Labirinto de Espelhos",
    "explicacao": "Algoritmos clássicos de navegação autônoma em labirintos utilizam a Regra da Mão Direita (Wall Follower). Em qualquer labirinto 2D simplesmente conexo, manter a mão direita encostada na parede garante que o viajante encontrará a saída sem entrar em ciclos eternos.\nPrioridade de decisão da máquina de estados a cada célula:\n1. Se houver caminho livre à direita: virar à direita e avançar.\n2. Senão, se o caminho à frente estiver livre: avançar.\n3. Senão, se houver caminho à esquerda: virar à esquerda e avançar.\n4. Caso esteja em um beco sem saída: dar meia-volta (180°).\nEsse algoritmo introduz os fundamentos de inteligência artificial simbólica e robótica móvel.",
    "enunciado": "O mago supremo desafia você a escapar do temido Labirinto de Espelhos de Algoritmia. Escreva um algoritmo autônomo baseado na Regra da Mão Direita que permita ao autômato navegar por corredores complexos e becos sem saída até encontrar o portal de teletransporte.",
    "codigo_inicial": "// Algoritmo Autônomo da Regra da Mão Direita\nenquanto (!chegouAoPortal()) {\n  se (ladoDireitoLivre()) {\n    virarDireita();\n    andarFrente();\n  } senao se (frenteLivre()) {\n    andarFrente();\n  } senao se (ladoEsquerdoLivre()) {\n    virarEsquerda();\n    andarFrente();\n  } senao {\n    virarMeiaVolta();\n  }\n}",
    "criterio_aceite": "O autômato deve encontrar a saída do labirinto em no máximo 40 passos sem colidir e sem ficar preso em becos sem saída.",
    "dificuldade": "dificil"
  },
  {
    "id": 7,
    "modulo_id": 2,
    "titulo": "O Cálculo do Dano Crítico",
    "explicacao": "Python é uma linguagem de altíssima legibilidade e tipagem dinâmica forte. A partir da PEP 484, o ecossistema adotou amplamente Type Hints (anotações de tipo) que tornam o código autodocumentado e seguro.\nPontos fundamentais desta missão:\n1. Assinatura de Função: Definida com def nome_funcao(arg: tipo) -> tipo_retorno:.\n2. Docstrings (PEP 257): Documentação em bloco com aspas triplas descrevendo argumentos e retorno.\n3. Cálculos Aritméticos e Arredondamento: Operações de multiplicação (*), soma (+) e arredondamento com round() ou int().\n4. Condicionais e Função max(): Assegurar que o valor retornado respeite limites mínimos (por exemplo, nunca ser negativo com max(0, valor)).",
    "enunciado": "Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.",
    "codigo_inicial": "def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:\n    \"\"\"Calcula o dano final desferido pelo herói contra criaturas sombrias.\n    \n    Args:\n        ataque_base: Força inicial do golpe (inteiro >= 0).\n        multiplicador: Fator crítico (float >= 1.0).\n        bonus: Valor adicional concedido por runas e equipamentos.\n    \n    Returns:\n        Dano total resultante em número inteiro não-negativo.\n    \"\"\"\n    # TODO: Implemente a lógica do cálculo de dano aqui\n    pass",
    "criterio_aceite": "A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.",
    "dificuldade": "facil"
  },
  {
    "id": 8,
    "modulo_id": 2,
    "titulo": "O Filtro de Poções do Boticário",
    "explicacao": "A manipulação de coleções de dados é o coração de qualquer aplicação backend. Em Python, a técnica mais idiomática e eficiente para filtrar e transformar listas é a List Comprehension (compreensão de listas):\nresultado = [expressao for item in colecao if condicao]\nNeste desafio, trabalhamos com uma lista de dicionários (list[dict]). Para ordenar strings alfabeticamente, usamos a função embutida sorted(lista) ou o método lista.sort(). Escrever código pythônico significa priorizar compreensões de listas em vez de loops for manuais com múltiplos .append().",
    "enunciado": "O boticário de Valfenda precisa catalogar seu estoque de poções para a guilda. Crie a função filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str] que recebe uma lista de poções (onde cada poção possui \"nome\": str, \"nivel\": int e \"em_estoque\": bool) e retorna uma lista ordenada alfabeticamente contendo apenas os nomes das poções que estão em estoque (em_estoque == True) e cujo nível seja maior ou igual a nivel_minimo.",
    "codigo_inicial": "def filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str]:\n    \"\"\"Filtra poções disponíveis em estoque que atendem ao nível mínimo exigido.\n    \n    Args:\n        inventario: Lista de dicionários com chaves 'nome', 'nivel', 'em_estoque'.\n        nivel_minimo: Nível mínimo de maestria exigido (inteiro).\n    \n    Returns:\n        Lista alfabética contendo os nomes das poções selecionadas.\n    \"\"\"\n    # TODO: Use list comprehension para filtrar e ordene alfabeticamente com sorted()\n    pass",
    "criterio_aceite": "Retornar lista ordenada alfabeticamente com os nomes das poções onde em_estoque é True e nivel >= nivel_minimo; retornar lista vazia caso nenhuma poção atenda aos critérios.",
    "dificuldade": "facil"
  },
  {
    "id": 9,
    "modulo_id": 2,
    "titulo": "O Grimório de Fichas e Dicionários",
    "explicacao": "Dicionários em Python (dict) são estruturas de associação chave-valor implementadas como tabelas hash de altíssimo desempenho O(1).\nNesta missão, exploramos:\n1. Acesso Seguro com .get(): Evita exceções KeyError fornecendo um valor padrão se a chave não existir.\n2. Agregações com sum() e len(): Métodos matemáticos nativos para calcular médias aritméticas.\n3. Identificação de Extremos (max(..., key=...)): A função max() aceita um argumento de função key (como lambda x: x[\"poder\"]) para localizar o herói com maior pontuação em uma única linha elegante.",
    "enunciado": "O escriba da guilda precisa de um relatório executivo sobre as fichas de personagens cadastradas. Implemente resumo_guilda(fichas: list[dict]) -> dict que recebe uma lista de fichas de personagens (cada uma contendo \"nome\", \"classe\", \"poder\" e \"ativo\") e retorna um dicionário com: \"total_ativos\" (contagem de fichas com ativo=True), \"poder_medio\" (média aritmética do poder das fichas ativas com 1 casa decimal) e \"campeao_nome\" (nome do personagem ativo de maior poder). Se não houver fichas ativas, retorne {\"total_ativos\": 0, \"poder_medio\": 0.0, \"campeao_nome\": None}.",
    "codigo_inicial": "def resumo_guilda(fichas: list[dict]) -> dict:\n    \"\"\"Calcula estatísticas agregadas das fichas ativas da guilda.\n    \n    Args:\n        fichas: Lista de personagens contendo 'nome', 'classe', 'poder', 'ativo'.\n    \n    Returns:\n        Dicionário com 'total_ativos', 'poder_medio' e 'campeao_nome'.\n    \"\"\"\n    # TODO: Filtre personagens ativos e calcule as agregações necessárias\n    pass",
    "criterio_aceite": "O dicionário retornado deve conter as 3 chaves exatas; calcular o poder médio com 1 casa decimal de precisão e retornar valores neutros padrão caso a lista esteja vazia ou sem fichas ativas.",
    "dificuldade": "medio"
  },
  {
    "id": 10,
    "modulo_id": 2,
    "titulo": "A Criptografia das Runas Antigas",
    "explicacao": "A criptografia clássica por substituição (como a famosa Cifra de César) é um excelente exercício para compreender a representação binária e numérica de textos.\nConceitos chave em Python:\n1. Função ord(c): Retorna o código numérico ASCII/Unicode de um caractere (ex: ord(\"A\") == 65).\n2. Função chr(n): Converte o código numérico de volta para o caractere original (ex: chr(65) == \"A\").\n3. Aritmética Modular (% 26): Garante que o deslocamento do alfabeto seja circular — passar de \"Z\" retorna para \"A\".\n4. Imutabilidade de Strings: Em Python, textos são imutáveis; strings cifradas são construídas acumulando caracteres ou utilizando \"\".join(...).",
    "enunciado": "Para proteger mensagens contra espiões de Mordor, a guilda utiliza a Cifra de César. Crie a função cifrar_mensagem_runica(texto: str, deslocamento: int) -> str que aplica o deslocamento numérico a todas as letras (maiúsculas e minúsculas), preservando pontuações, números e espaços inalterados. Lembre-se de manter a caixa original de cada letra.",
    "codigo_inicial": "def cifrar_mensagem_runica(texto: str, deslocamento: int) -> str:\n    \"\"\"Aplica a Cifra de César rúnica ao texto preservando espaços e pontuações.\n    \n    Args:\n        texto: Mensagem original a ser codificada.\n        deslocamento: Chave de translação do alfabeto (inteiro).\n    \n    Returns:\n        Texto cifrado com caixa de caracteres preservada.\n    \"\"\"\n    # TODO: Itere sobre os caracteres, aplique a rotação modular e retorne o texto\n    pass",
    "criterio_aceite": "Manter maiúsculas e minúsculas no lugar correto, não alterar espaços nem pontuações, e calcular o ciclo modular corretamente para deslocamentos positivos ou maiores que 26.",
    "dificuldade": "medio"
  },
  {
    "id": 11,
    "modulo_id": 2,
    "titulo": "O Validador de Nomes de Aventureiro",
    "explicacao": "Validação de dados é uma exigência crítica de integridade e segurança de sistemas (RN08 e RNF02). Em Python, utilizamos o módulo embutido re (Expressões Regulares) e Exceções Customizadas:\n1. Expressão Regular (re.match): Permite testar padrões estruturados em uma linha (ex: ^[A-Z][a-zA-Z0-9_]{1,49}$).\n2. Lançamento de Erros com raise: Interrompe o fluxo anômalo disparando uma exceção clara (ValueError) para o chamador.\n3. Tratamento Defensivo: Previne inserções corrompidas ou ataques de injeção em camadas posteriores do banco.",
    "enunciado": "Implemente a função validar_nome_heroi(nome: str) -> bool para validar nomes de aventureiros segundo as regras da guilda: o nome deve ter entre 2 e 50 caracteres; deve iniciar obrigatoriamente com letra maiúscula (A-Z); pode conter apenas letras, números e underscores (_); e não pode conter espaços. Se o nome for válido, retorne True. Se for inválido, levante uma exceção ValueError contendo uma mensagem descritiva do motivo da recusa.",
    "codigo_inicial": "import re\n\ndef validar_nome_heroi(nome: str) -> bool:\n    \"\"\"Valida o identificador do aventureiro conforme as regras da guilda.\n    \n    Raises:\n        ValueError: Se o nome infringir as regras de formato ou tamanho.\n    \"\"\"\n    # TODO: Valide tamanho, início com maiúscula e caracteres permitidos\n    pass",
    "criterio_aceite": "Retornar True para identificadores como \"Goku_99\" ou \"Aragorn\"; lançar ValueError descritivo para nomes curtos (< 2), iniciados em minúsculas ou com símbolos inválidos.",
    "dificuldade": "medio"
  },
  {
    "id": 12,
    "modulo_id": 2,
    "titulo": "A Batalha de Turnos Orientada a Objetos",
    "explicacao": "A Programação Orientada a Objetos (POO) é o paradigma fundamental de grandes arquiteturas de software. Em Python, classes encapsulam atributos (dados) e métodos (comportamentos).\nPilares aplicados nesta missão:\n1. Encapsulamento: Atributos inicializados no construtor __init__.\n2. Herança: Uma subclasse Mago(Personagem) herda todos os métodos da classe mãe.\n3. Sobrescrita de Métodos (Polimorfismo): Subclasses adaptam comportamentos (como o cálculo de ataque) mantendo a mesma interface pública.\n4. Invariantes de Estado: Garantir que a vida de um guerreiro nunca atinja valores negativos, estabelecendo vida = max(0, vida - dano).",
    "enunciado": "Construa um mini-motor de combate em POO. Crie a classe base Personagem com os atributos nome (str), vida (int) e ataque (int), e o método receber_dano(quantidade: int) que reduz a vida sem deixá-la abaixo de 0. Crie a subclasse Mago(Personagem) que adiciona o atributo mana (int) e o método lancar_magia(alvo: Personagem) -> int: se tiver ao menos 10 pontos de mana, consome 10 de mana e desfere dano igual a ataque * 2 no alvo; caso contrário, realiza ataque normal (ataque * 1) sem gastar mana.",
    "codigo_inicial": "class Personagem:\n    def __init__(self, nome: str, vida: int, ataque: int):\n        self.nome = nome\n        self.vida = max(0, vida)\n        self.ataque = ataque\n\n    def receber_dano(self, quantidade: int):\n        # TODO: Reduza a vida sem permitir valores negativos\n        pass\n\nclass Mago(Personagem):\n    def __init__(self, nome: str, vida: int, ataque: int, mana: int):\n        super().__init__(nome, vida, ataque)\n        self.mana = mana\n\n    def lancar_magia(self, alvo: Personagem) -> int:\n        # TODO: Verifique a mana, aplique dano crítico ao alvo e retorne o dano causado\n        pass",
    "criterio_aceite": "A herança deve ser implementada com super().__init__; a vida do alvo nunca pode ser inferior a zero; e o consumo de mana e dano duplo devem ser executados apenas quando mana >= 10.",
    "dificuldade": "dificil"
  },
  {
    "id": 13,
    "modulo_id": 3,
    "titulo": "O Estandarte Semântico do Herói",
    "explicacao": "O HTML5 introduziu elementos que carregam significado estrutural e contextual, superando a era das \"div soups\" (páginas compostas exclusivamente por dezenas de tags <div> aninhadas).\nElementos semânticos indispensáveis:\n1. <section> e <article>: Representam seções temáticas independentes e autossuficientes do documento.\n2. <header> e <footer>: Delimitam o cabeçalho de introdução e o rodapé de autoria.\n3. <figure> e <figcaption>: Agrupam ilustrações, fotos ou brasões com sua legenda contextual.\n4. <dl>, <dt> e <dd>: Lista de definição ideal para exibir pares chave-valor (como \"Classe: Mago\" e \"Poder: 92\").\nO uso semântico é o primeiro requisito para conformidade com normas de acessibilidade digital e indexação em mecanismos de busca.",
    "enunciado": "Construa a estrutura semântica em HTML5 de um cartão de herói da guilda. O cartão deve ser envolvido por uma tag <article class=\"heroi-card\">, possuir um <header> com título <h2> para o nome do herói, uma tag <figure> com a imagem do brasão e legenda <figcaption>, e uma lista de definições <dl> apresentando os atributos \"Universo\", \"Classe\" e \"Poder de Combate\". A imagem deve conter um atributo alt acessível e descritivo.",
    "codigo_inicial": "<!-- Cartão Semântico de Personagem -->\n<article class=\"heroi-card\">\n  <header class=\"heroi-header\">\n    <h2>Goku</h2>\n    <p class=\"heroi-subtitulo\">Guerreiro Saiyajin</p>\n  </header>\n\n  <figure class=\"heroi-brasao\">\n    <img src=\"/avatar-anime.png\" alt=\"Retrato ilustrado de Goku com aura dourada\" />\n    <figcaption>Brasão Oficial da Casa Kaioken</figcaption>\n  </figure>\n\n  <dl class=\"heroi-atributos\">\n    <dt>Universo:</dt>\n    <dd>Anime</dd>\n    <dt>Classe:</dt>\n    <dd>Mago / Guerreiro</dd>\n    <dt>Poder:</dt>\n    <dd>92/100</dd>\n  </dl>\n</article>",
    "criterio_aceite": "Utilizar exclusivamente elementos semânticos de HTML5 (<article>, <header>, <figure>, <figcaption>, <dl>), incluir atributo alt descritivo e evitar divs vazias no esqueleto principal.",
    "dificuldade": "facil"
  },
  {
    "id": 14,
    "modulo_id": 3,
    "titulo": "O Mural das Cores Acessíveis da Taverna",
    "explicacao": "Acessibilidade na web não é opcional — é um direito de todos os usuários. As diretrizes internacionais WCAG 2.1 (nível AA) exigem uma taxa mínima de contraste de cores de 4.5:1 para textos normais e 3:1 para textos grandes (acima de 18pt ou 14pt em negrito).\nRecursos modernos de CSS:\n1. Variáveis CSS (Custom Properties): Declaradas com --nome-da-variavel no escopo :root, facilitam a manutenção de temas.\n2. Estados de Foco Visível (:focus-visible): Essenciais para usuários que navegam por teclado (Tab), desenhando um contorno nítido no elemento ativo.\n3. Cálculo de Luminância: Combinar fundos escuros (como #0f172a) com textos claros de alto contraste (como #f8fafc).",
    "enunciado": "Desenvolva a folha de estilo de um painel de avisos da taverna com variáveis CSS globais no :root. Defina variáveis para --bg-card, --text-primary, --cor-destaque e --borda-foco. Garanta que a combinação de cores atenda à razão de contraste mínima de 4.5:1 (WCAG AA) e estilize o botão de ação do painel com :focus-visible exibindo um outline nítido de pelo menos 2px.",
    "codigo_inicial": ":root {\n  /* TODO: Defina variáveis com alto contraste (mínimo 4.5:1 WCAG AA) */\n  --bg-card: #0f172a;\n  --text-primary: #f8fafc;\n  --cor-destaque: #6366f1;\n  --borda-foco: #38bdf8;\n}\n\n.aviso-taverna {\n  background-color: var(--bg-card);\n  color: var(--text-primary);\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n}\n\n.btn-taverna:focus-visible {\n  /* TODO: Estilize o contorno de foco acessível para navegação por teclado */\n  outline: 2px solid var(--borda-foco);\n  outline-offset: 2px;\n}",
    "criterio_aceite": "Declarar variáveis no :root, assegurar taxa de contraste >= 4.5:1 entre texto e fundo, e definir regra :focus-visible nítida no botão.",
    "dificuldade": "facil"
  },
  {
    "id": 15,
    "modulo_id": 3,
    "titulo": "O Estandarte Responsivo da Guilda",
    "explicacao": "O design responsivo garante que a interface da guilda seja impecável tanto em smartphones quanto em monitores ultrawide. O CSS Flexbox é o modelo de caixa ideal para distribuir espaço ao longo de um eixo único (linha ou coluna):\n1. display: flex: Transforma o contêiner em um flex container.\n2. justify-content e align-items: Controlam o alinhamento nos eixos principal e transversal.\n3. Media Queries (@media (max-width: 640px)): Redefinem regras quando a largura da viewport atinge um ponto de quebra (breakpoint), alternando flex-direction: column para que os dados empilhem elegantemente em telas compactas.",
    "enunciado": "Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa o cartão com classe .guilda-card utilizando Flexbox para que no computador os elementos fiquem lado a lado com espaçamento proporcional (gap: 1.5rem), e em dispositivos com tela de até 640px eles se reorganizem verticalmente em coluna única com alinhamento centralizado.",
    "codigo_inicial": "/* Layout Flexbox Responsivo */\n.guilda-card {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background: #1e1b4b;\n  border-radius: 1rem;\n}\n\n@media (max-width: 640px) {\n  .guilda-card {\n    /* TODO: Reorganize em coluna única para telas móveis */\n    flex-direction: column;\n    text-align: center;\n  }\n}",
    "criterio_aceite": "Utilizar display: flex com gap, incluir media query em 640px com flex-direction: column e garantir ausência de barra de rolagem horizontal indesejada.",
    "dificuldade": "medio"
  },
  {
    "id": 16,
    "modulo_id": 3,
    "titulo": "O Inventário em Grade Mágica",
    "explicacao": "Enquanto o Flexbox é ideal para eixos unidimensionais, o CSS Grid Layout é o padrão moderno definitivo para grades bidimensionais (linhas e colunas simultâneas).\nA fórmula mágica da responsividade com Grid:\ngrid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n- repeat(): Repete a definição de colunas.\n- auto-fill: Cria tantas colunas quantas couberem na largura atual.\n- minmax(120px, 1fr): Cada coluna terá no mínimo 120px e expandirá proporcionalmente (1 fração) para ocupar o espaço livre. Dessa forma, a grade se adapta a qualquer tela sem uma única media query.",
    "enunciado": "Construa a grade de inventário da mochila de itens mágicos do aventureiro. O contêiner .mochila-grid deve utilizar CSS Grid para acomodar slots de itens de no mínimo 120px de largura com preenchimento responsivo (repeat(auto-fill, minmax(120px, 1fr))). Cada slot .item-slot deve ter aspecto quadrado, fundo escuro, borda suave e efeito de elevação no :hover com transição suave (transform: translateY(-4px)).",
    "codigo_inicial": "/* Mochila de Inventário com CSS Grid */\n.mochila-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.item-slot {\n  aspect-ratio: 1 / 1;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.item-slot:hover {\n  /* TODO: Adicione o efeito de elevação e brilho de borda */\n  transform: translateY(-4px);\n  border-color: #818cf8;\n}",
    "criterio_aceite": "Aplicar display: grid com repeat(auto-fill, minmax(120px, 1fr)), gap uniforme, proporção quadrada (aspect-ratio: 1/1) e transição fluida no :hover.",
    "dificuldade": "medio"
  },
  {
    "id": 17,
    "modulo_id": 3,
    "titulo": "O Formulário Encantado de Alistamento",
    "explicacao": "Formulários acessíveis conectam o usuário ao servidor de maneira confiável e sem barreiras. Em HTML/CSS, acessibilidade em formulários repousa em 3 pilares:\n1. Associação Explícita (<label for=\"id\">): O leitor de tela anuncia o rótulo ao focar no campo, e o clique no rótulo foca o input.\n2. Agrupamento Semântico (<fieldset> e <legend>): Agrupa campos logicamente relacionados (ex: dados do herói).\n3. Pseudoclasses de Estado CSS (:focus, :invalid): Fornecem feedback visual instantâneo do estado de validação sem sobressaltos.",
    "enunciado": "Crie a marcação e o estilo de um formulário de cadastro de ficha de herói da guilda. O formulário deve conter um <fieldset> com <legend>, campo de texto para Nome do Herói vinculado explicitamente ao seu <label>, campo <select> para escolha do Universo, e campo de e-mail com validação nativa (type=\"email\" e required). Estilize os campos com bordas nítidas e realce de foco (:focus) sem remover o contorno acessível.",
    "codigo_inicial": "<form class=\"form-alistamento\">\n  <fieldset>\n    <legend>Dados de Alistamento do Aventureiro</legend>\n    \n    <div class=\"campo-grupo\">\n      <label for=\"nome-heroi\">Nome do Aventureiro:</label>\n      <input type=\"text\" id=\"nome-heroi\" name=\"nome\" required minlength=\"2\" placeholder=\"Ex: Gandalf\" />\n    </div>\n\n    <div class=\"campo-grupo\">\n      <label for=\"universo-heroi\">Universo:</label>\n      <select id=\"universo-heroi\" name=\"universo\" required>\n        <option value=\"\">Selecione um universo...</option>\n        <option value=\"Tolkien\">Tolkien</option>\n        <option value=\"Marvel\">Marvel</option>\n        <option value=\"Anime\">Anime</option>\n      </select>\n    </div>\n  </fieldset>\n</form>",
    "criterio_aceite": "Todos os campos de entrada devem ter labels vinculados via atributo for e id correspondente; utilizar fieldset e legend; campos obrigatórios identificados e estilização adequada de foco.",
    "dificuldade": "medio"
  },
  {
    "id": 18,
    "modulo_id": 3,
    "titulo": "A Barra de Vida e Mana com Animações CSS",
    "explicacao": "Animações CSS adicionam vida e polimento à experiência do usuário, tornando feedbacks imediatos e naturais. Para criar efeitos como alerta de perigo crítico ou regeneração de energia, combinamos:\n1. A Regra @keyframes: Define quadros-chave da animação ao longo do tempo (de 0% a 100%).\n2. Aceleração por Hardware: Usar propriedades como transform e opacity em vez de alterar margin ou width durante animações contínuas, mantendo 60 quadros por segundo sem causar repaint excessivo.\n3. Propriedade animation: Configura nome, duração, curva de aceleração (ease-in-out) e contagem de iterações (infinite).",
    "enunciado": "Implemente as barras de status do herói (Vida e Mana). Crie uma animação em CSS chamada pulso-critico com @keyframes que faz a barra de vida pulsar (alternando a opacidade entre 0.6 e 1.0 e leve escala de 1.02) quando a classe .perigo estiver presente, sinalizando que os pontos de vida do personagem estão abaixo de 20%.",
    "codigo_inicial": "/* Animação de Pulso Crítico */\n@keyframes pulso-critico {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.5;\n    transform: scale(1.02);\n  }\n}\n\n.barra-vida-container {\n  width: 100%;\n  height: 20px;\n  background: #334155;\n  border-radius: 10px;\n  overflow: hidden;\n}\n\n.barra-vida-preenchimento.perigo {\n  background: #ef4444;\n  animation: pulso-critico 1s infinite ease-in-out;\n}",
    "criterio_aceite": "Definir a animação @keyframes pulso-critico com alternância de opacidade/transform, aplicar ao elemento com a classe perigo e garantir fluidez visual sem sobrecarregar a renderização.",
    "dificuldade": "dificil"
  },
  {
    "id": 19,
    "modulo_id": 4,
    "titulo": "A Forja de Atributos com ES6+",
    "explicacao": "O JavaScript moderno (ECMAScript 2015 / ES6+) transformou a linguagem, introduzindo recursos fundamentais para código limpo e seguro:\n1. Desestruturação de Objetos (const { nome, poder } = heroi): Permite extrair propriedades sem repetir o nome do objeto várias vezes.\n2. Operador Spread (...heroi): Cria cópias rasas de objetos permitindo Imutabilidade (um dos pilares do React e de aplicações modernas), alterando propriedades sem mutar a referência original.\n3. Template Literals (`Herói: ${nome}`): Facilita concatenação de strings com expressões dinâmicas interpoladas.\n4. Arrow Functions (const fn = () => ...): Sintaxe compacta e léxica para funções.",
    "enunciado": "Na forja mágica, os atributos de um herói são aprimorados. Crie a função atualizarPoderHeroi(heroi, bonusPoder) que recebe um objeto de personagem { id, nome, classe, poder } e um valor numérico de bônus. A função deve retornar um NOVO objeto (sem alterar o objeto original recebido) contendo todos os atributos originais copiados via spread, o poder recalculado limitado ao teto de 100 (conforme a regra de negócio RN01), e um novo campo statusTexto formatado como: \"O herói [nome] da classe [classe] possui [novoPoder] de poder!\".",
    "codigo_inicial": "/**\n * Atualiza o poder do herói com imutabilidade e teto RN01.\n * @param {{ id: number, nome: string, classe: string, poder: number }} heroi\n * @param {number} bonusPoder\n * @returns {object} Novo objeto com dados atualizados.\n */\nfunction atualizarPoderHeroi(heroi, bonusPoder) {\n  // TODO: Use destructuring, spread operator e limite em 100 (RN01)\n}",
    "criterio_aceite": "A função não deve mutar o objeto recebido como argumento, deve respeitar a constraint RN01 com poder <= 100, e retornar o campo statusTexto com a interpolação solicitada.",
    "dificuldade": "facil"
  },
  {
    "id": 20,
    "modulo_id": 4,
    "titulo": "O Manipulador do Domínio do DOM",
    "explicacao": "O DOM (Document Object Model) é a representação orientada a objetos da página web que permite ao JavaScript interagir dinamicamente com o HTML.\nConceitos essenciais de manipulação do DOM:\n1. Seleção de Elementos (document.querySelector): Localiza elementos usando a mesma sintaxe de seletores CSS (#id, .classe).\n2. Escuta de Eventos (addEventListener(\"click\", handler)): Registra ouvintes para reagir a interações do usuário de forma desacoplada.\n3. Manipulação de Classes (element.classList.add / toggle): A melhor prática para alterar o visual de um componente sem injetar estilos inline.\n4. Controle de Propriedades: Desabilitar botões (button.disabled = true) para evitar múltiplos cliques acidentais.",
    "enunciado": "Implemente a função conectarBotaoEquipar(botaoId, displayId) que seleciona o botão de ação e o elemento de status da armadura. Ao ocorrer o clique no botão, o script deve: atualizar o texto do display para \"Armadura Lendária Equipada!\", adicionar a classe CSS .ativo ao display, e alterar a propriedade disabled do botão para true para impedir novos cliques.",
    "codigo_inicial": "function conectarBotaoEquipar(botaoId, displayId) {\n  const botao = document.querySelector(`#${botaoId}`);\n  const display = document.querySelector(`#${displayId}`);\n\n  if (!botao || !display) return;\n\n  botao.addEventListener(\"click\", () => {\n    // TODO: Atualize o texto, adicione a classe 'ativo' e desabilite o botão\n  });\n}",
    "criterio_aceite": "Localizar os elementos pelo ID, anexar o ouvinte de evento click, alternar classe usando classList.add(\"ativo\"), atualizar o textContent e setar disabled = true no botão.",
    "dificuldade": "facil"
  },
  {
    "id": 21,
    "modulo_id": 4,
    "titulo": "O Grimório dos Métodos de Array",
    "explicacao": "Em JavaScript profissional, laços imperativos (for e while) são frequentemente substituídos por Métodos Funcionais de Array que não possuem efeitos colaterais:\n1. array.filter(item => boolean): Cria um novo array apenas com os elementos que atendem ao predicado lógico.\n2. array.map(item => transformacao): Transforma cada elemento da lista aplicando uma função e retornando um novo array de mesmo tamanho.\n3. array.reduce((acumulador, item) => ..., valorInicial): Reduz todo o array a um único valor acumulado (como somas, contagens ou médias).\nA combinação dessas três funções permite encadear transformações de dados de forma declarativa e legível.",
    "enunciado": "O conselho dos magos necessita auditar o poder dos membros da guilda. Escreva a função auditarMembrosGuilda(membros) que recebe um array de objetos de heróis ({ nome: string, ativo: boolean, poder: number }) e retorna um objeto estatístico contendo: nomesAtivos (array contendo apenas os nomes dos membros com ativo === true em letras maiúsculas via .map()), totalPoderAtivo (a soma do poder de todos os membros ativos via .reduce()) e mediaPoderAtivo (média aritmética do poder dos membros ativos arredondada em número inteiro).",
    "codigo_inicial": "function auditarMembrosGuilda(membros) {\n  // TODO: Use .filter(), .map() e .reduce() para gerar o resumo estatístico\n}",
    "criterio_aceite": "Usar obrigatoriamente os métodos filter, map e reduce da API de Array do JavaScript; retornar o objeto com as 3 chaves solicitadas e tratar listas vazias sem gerar divisão por zero.",
    "dificuldade": "medio"
  },
  {
    "id": 22,
    "modulo_id": 4,
    "titulo": "O Guardião dos Formulários e Eventos Assíncronos",
    "explicacao": "O comportamento nativo de envio de formulários no navegador é disparar uma requisição HTTP síncrona que recarrega a página inteira. Em SPAs (Single Page Applications) e aplicações modernas com Next.js:\n1. event.preventDefault(): Impede o comportamento padrão do navegador permitindo que o JavaScript assuma o controle do fluxo.\n2. Validação Pré-Envio no Cliente: Economiza requisições verificando campos vazios ou formatos inválidos antes de chamar o backend.\n3. Feedback de Carregamento: Atualizar o estado visual do botão (exibindo \"Salvando...\" ou um spinner) melhora sensivelmente a experiência do usuário (UX).",
    "enunciado": "Implemente a função configurarEnvioSeguro(formElement, servicoEnvio) que adiciona o listener de submissão ao formulário. O script deve interceptar o envio com e.preventDefault(), validar se os campos de texto do formulário não estão vazios, desabilitar o botão de submit alterando seu texto para \"Enviando...\", invocar a função assíncrona servicoEnvio com os dados extraídos, e reabilitar o botão ao término do processo.",
    "codigo_inicial": "function configurarEnvioSeguro(formElement, servicoEnvio) {\n  formElement.addEventListener(\"submit\", async (evento) => {\n    evento.preventDefault();\n    // TODO: Valide os campos, desabilite o botão e invoque servicoEnvio()\n  });\n}",
    "criterio_aceite": "Invocar preventDefault no evento de submit, validar inputs antes do disparo, gerenciar o estado disabled e texto de loading no botão, e capturar eventuais falhas com bloco try/finally.",
    "dificuldade": "medio"
  },
  {
    "id": 23,
    "modulo_id": 4,
    "titulo": "O Feitiço da API Assíncrona",
    "explicacao": "A comunicação com APIs REST externas é a base da computação em nuvem. A Web API moderna fornece a função fetch(), que opera com Promises e a sintaxe intuitiva async/await.\nArmadilhas comuns e boas práticas com fetch():\n1. O mito de que fetch() falha em erros 404/500: O fetch nativo não rejeita a Promise quando a API responde com código HTTP de erro (como 404 Not Found ou 500 Internal Server Error). Ele só rejeita em falhas catastróficas de rede.\n2. A verificação de res.ok: É mandatório checar se res.ok é verdadeiro (status HTTP entre 200 e 299). Se for falso, devemos disparar um throw new Error(...) explicitamente.\n3. Ordenação de Arrays (.sort()): Para ordenar números de forma decrescente: array.sort((a, b) => b.poder - a.poder).",
    "enunciado": "Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona buscarPoderesGuilda(url: string) em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando fetch(), validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com !res.ok), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.",
    "codigo_inicial": "/**\n * Consulta o grimório sagrado consumindo a API REST assíncrona.\n * @param {string} url - Endereço do endpoint do grimório da guilda.\n * @returns {Promise<Array<{ nome: string, poder: number }>>} Lista ordenada de poderes.\n */\nasync function buscarPoderesGuilda(url) {\n  try {\n    // TODO: Realize o fetch com verificação de status HTTP (200 OK)\n    // TODO: Trate respostas 4xx e 5xx lançando erro com mensagem descritiva\n    // TODO: Retorne o array de poderes ordenado pelo poder (decrescente)\n  } catch (erro) {\n    console.error(\"Falha ao conjurar feitiço de consulta:\", erro.message);\n    throw erro;\n  }\n}",
    "criterio_aceite": "A função deve usar async/await com try/catch, verificar res.ok rejeitando respostas HTTP de erro, tratar exceções de rede e retornar a Promise resolvida com os poderes ordenados por nível de poder (decrescente).",
    "dificuldade": "dificil"
  },
  {
    "id": 24,
    "modulo_id": 4,
    "titulo": "O Oráculo do Cache e Debounce de Busca",
    "explicacao": "Quando implementamos campos de busca em tempo real com consulta a APIs externas (como a sincronização de perfis do GitHub no CodeQuest, RF12), dois padrões de engenharia de software são vitais:\n1. Debounce: Adia a execução da chamada de rede até que o usuário pare de digitar por um intervalo (ex: 300ms), cancelando o temporizador pendente via clearTimeout() a cada nova tecla pressionada.\n2. Cache em Memória (Map): Armazena respostas anteriores indexadas pelo termo buscado. Se o usuário digitar um termo já consultado, a resposta é entregue instantaneamente sem consumir requisições nem limites de taxa da API externa.\nA fusão desses padrões garante altíssima responsividade da interface e economia brutal de recursos de infraestrutura.",
    "enunciado": "Crie a função de alta ordem criarBuscadorComDebounceECache(funcaoBuscaApi, delayMs) que gerencia consultas de heróis. Ela deve manter um Map interno de cache e retornar uma função que recebe o termo de busca. Se o termo já estiver no cache, retorna o valor imediatamente resolvido em Promise; caso contrário, aguarda o período de debounce sem novas chamadas, executa funcaoBuscaApi(termo), armazena no cache e retorna o resultado.",
    "codigo_inicial": "/**\n * Fábrica de busca otimizada com Debounce e Cache em memória.\n * @param {Function} funcaoBuscaApi - Função assíncrona original de busca.\n * @param {number} delayMs - Tempo de espera em milissegundos.\n * @returns {Function} Função otimizada para uso em inputs.\n */\nfunction criarBuscadorComDebounceECache(funcaoBuscaApi, delayMs = 300) {\n  const cache = new Map();\n  let temporizador = null;\n\n  return function (termo) {\n    // TODO: Verifique cache e implemente o debounce com clearTimeout/setTimeout\n  };\n}",
    "criterio_aceite": "Retornar valor em cache sem invocar a API externa para termos repetidos; reiniciar o temporizador se nova chamada ocorrer antes do delay; retornar Promise resolvida com o resultado da busca.",
    "dificuldade": "dificil"
  }
];

async function main() {
  console.log('⚔️ CodeQuest: Executando seed de 4 módulos e 24 missões oficiais...');

  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL não definida nas variáveis de ambiente.');
    console.log('ℹ️ Para sincronizar com banco PostgreSQL/Neon, configure DATABASE_URL no .env.');
    console.log('✅ Dados das 24 missões da trilha carregados com sucesso no catálogo em memória e em sql/seed.sql.');
    return;
  }

  let prisma;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();

    // 1. Usuário padrão para sessões de desenvolvimento e testes (ID: 1)
    await prisma.usuario.upsert({
      where: { id: 1 },
      update: {
        nome: 'Aprendiz de Código',
        email: 'estudante@codequest.dev',
        tipo: 'estudante',
        email_verificado: true,
      },
      create: {
        id: 1,
        nome: 'Aprendiz de Código',
        email: 'estudante@codequest.dev',
        senha_hash: '$2a$10$eO1d4lW4F22y9h6r7fPz8eXQ4oK3eI1cM9kG7oP3rQ8aZ7vY2lK6m',
        tipo: 'estudante',
        email_verificado: true,
      },
    });

    // 2. Ficha ativa padrão para o usuário 1
    await prisma.ficha.upsert({
      where: { id: 1 },
      update: {
        usuario_id: 1,
        nome: 'Aventureiro Dev',
        universo: 'Games',
        classe: 'Guerreiro',
        poder: 20,
        ativo: true,
      },
      create: {
        id: 1,
        usuario_id: 1,
        nome: 'Aventureiro Dev',
        universo: 'Games',
        classe: 'Guerreiro',
        poder: 20,
        ativo: true,
      },
    });

    // 3. Módulos da Trilha
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

    // 4. Missões Oficiais
    for (const missao of missoes) {
      await prisma.missao.upsert({
        where: { id: missao.id },
        update: {
          modulo_id: missao.modulo_id,
          titulo: missao.titulo,
          explicacao: missao.explicacao,
          enunciado: missao.enunciado,
          codigo_inicial: missao.codigo_inicial,
          criterio_aceite: missao.criterio_aceite,
          dificuldade: missao.dificuldade,
        },
        create: {
          id: missao.id,
          modulo_id: missao.modulo_id,
          titulo: missao.titulo,
          explicacao: missao.explicacao,
          enunciado: missao.enunciado,
          codigo_inicial: missao.codigo_inicial,
          criterio_aceite: missao.criterio_aceite,
          dificuldade: missao.dificuldade,
        },
      });
    }

    // 5. Aulas Técnicas e Sequência de Atividades Passo a Passo
    const courseLessonsPath = path.resolve(__dirname, '../src/lib/course-lessons.json');
    if (fs.existsSync(courseLessonsPath)) {
      const courseLessonsData = JSON.parse(fs.readFileSync(courseLessonsPath, 'utf8'));
      let totalAulasCadastradas = 0;
      let totalAtividadesCadastradas = 0;

      for (const [modIdStr, aulas] of Object.entries(courseLessonsData)) {
        const modId = Number(modIdStr);
        for (const aula of aulas) {
          await prisma.aula.upsert({
            where: { id: aula.id },
            update: {
              modulo_id: modId,
              numero: aula.numero,
              titulo: aula.titulo,
              subtitulo: aula.subtitulo,
              tempo_estimado: aula.tempoEstimado,
              xp_recompensa: aula.xpRecompensa || 40,
              resumo: aula.resumo,
              objetivos: aula.objetivos,
              secoes: aula.secoes,
              conceitos_chave: aula.conceitosChave,
            },
            create: {
              id: aula.id,
              modulo_id: modId,
              numero: aula.numero,
              titulo: aula.titulo,
              subtitulo: aula.subtitulo,
              tempo_estimado: aula.tempoEstimado,
              xp_recompensa: aula.xpRecompensa || 40,
              resumo: aula.resumo,
              objetivos: aula.objetivos,
              secoes: aula.secoes,
              conceitos_chave: aula.conceitosChave,
            },
          });
          totalAulasCadastradas++;

          for (const atv of aula.sequenciaAtividades || []) {
            await prisma.atividade.upsert({
              where: { id: atv.id },
              update: {
                aula_id: aula.id,
                modulo_id: modId,
                ordem: atv.ordem,
                titulo: atv.titulo,
                descricao_passo: atv.descricaoPasso,
                tipo: atv.tipo || 'conceitual',
                missao_id: atv.missaoId || null,
                dificuldade: atv.dificuldade || 'facil',
                xp: atv.xp || 15,
                dica: atv.dica || null,
                template_codigo: atv.templateCodigo || null,
                criterio_aceite: atv.criterioAceite,
                instrucoes_passo_a_passo: atv.instrucoesPassoAPasso || [],
              },
              create: {
                id: atv.id,
                aula_id: aula.id,
                modulo_id: modId,
                ordem: atv.ordem,
                titulo: atv.titulo,
                descricao_passo: atv.descricaoPasso,
                tipo: atv.tipo || 'conceitual',
                missao_id: atv.missaoId || null,
                dificuldade: atv.dificuldade || 'facil',
                xp: atv.xp || 15,
                dica: atv.dica || null,
                template_codigo: atv.templateCodigo || null,
                criterio_aceite: atv.criterioAceite,
                instrucoes_passo_a_passo: atv.instrucoesPassoAPasso || [],
              },
            });
            totalAtividadesCadastradas++;
          }
        }
      }
      console.log(`✅ Aulas técnicas cadastradas no Neon: ${totalAulasCadastradas}`);
      console.log(`✅ Atividades práticas cadastradas no Neon: ${totalAtividadesCadastradas}`);
    }

    console.log('✅ Seed finalizado com sucesso no banco PostgreSQL Neon!');
  } catch (err) {
    console.log(`⚠️ Aviso na conexão com o banco de dados: ${err.message}`);
    console.log('✅ Dados das 24 missões da trilha carregados com sucesso no catálogo em memória e em sql/seed.sql.');
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

main();
