-- ========================================================
-- CodeQuest - Seed de Módulos e 24 Missões Oficiais
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

SELECT setval(pg_get_serial_sequence('modulos', 'id'), COALESCE(MAX(id), 1)) FROM modulos;

-- Inserção das 24 Missões Oficiais da Trilha (6 por módulo com explicações conceituais)

-- Missão 1: O Despertar dos Blocos Mágicos (Módulo 1 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  1,
  1,
  'O Despertar dos Blocos Mágicos',
  'Antes de conjurar algoritmos complexos, todo aprendiz deve compreender que a programação é uma sequência ordenada e finita de instruções que transformam entradas em saídas previsíveis. No paradigma visual de blocos, o fluxo de execução é controlado por duas estruturas vitais:
1. Estruturas de Repetição (enquanto / while): Avaliam continuamente uma condição lógica. Enquanto a condição for verdadeira (caminhoLivre() == true), o bloco interno é executado repetidamente.
2. Estruturas de Decisão (se / if): Permitem que o herói reaja a imprevistos no ambiente, executando ações especiais (como desarmar uma armadilha) apenas quando uma contingência é detectada.
Compreender o encadeamento correto de repetição e decisão é a fundação para evitar loops infinitos e travamentos em qualquer linguagem moderna.',
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
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 2: A Coleta das Gemas Elementais (Módulo 1 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  2,
  1,
  'A Coleta das Gemas Elementais',
  'Muitas vezes conhecemos de antemão o número exato de repetições necessárias. Para isso, utilizamos Laços Contados (laço para / for), acompanhados de uma Variável Acumuladora:
1. Contador de Passos (para pilar de 1 até N): Uma variável de controle que incrementa a cada ciclo até atingir o limite estipulado.
2. Variável Acumuladora (totalGemas = totalGemas + 1): Armazena e preserva o estado ao longo das iterações da jornada.
Dominar laços contados evita erros clássicos de "deslocamento por um" (off-by-one errors) e garante que o processamento termine exatamente após o último elemento planejado.',
  'Uma ponte suspensa de 5 pilares arcanos estende-se sobre o abismo do esquecimento. Em cada pilar repousa uma gema elemental brilhante. Construa um algoritmo em blocos com um laço contado de 1 a 5: para cada pilar, o herói deve avançar, conjurar o feitiço de coleta e incrementar a variável acumuladora gemasColetadas. Ao final da ponte, retorne o total acumulado.',
  '// Coleta das Gemas com Laço Contado
let gemasColetadas = 0;

para (let pilar = 1; pilar <= 5; pilar++) {
  andarFrente();
  coletarGema();
  gemasColetadas = gemasColetadas + 1;
}

notificarGuilda("Total de gemas coletadas:", gemasColetadas);',
  'O herói deve percorrer exatamente os 5 pilares da ponte e acumular 5 gemas no inventário ao final da travessia sem passos redundantes.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 3: O Labirinto das Bifurcações Rúnicas (Módulo 1 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  3,
  1,
  'O Labirinto das Bifurcações Rúnicas',
  'Quando o herói se depara com decisões com mais de dois desfechos possíveis, o simples se/senão torna-se insuficiente. Entram em cena as Estruturas Condicionais Encadeadas (se / senão-se / senão) e os Operadores Lógicos (E, OU, NÃO):
- se (if): Avalia o primeiro caso prioritário.
- senão-se (else if): Avalia casos secundários caso o primeiro seja falso.
- senão (else): O caminho padrão executado se nenhuma das alternativas anteriores for satisfeita.
Em sistemas reais, isso é análogo ao tratamento de múltiplos estados de conexão HTTP ou permissões de usuário (estudante, professor, moderador, admin).',
  'O herói chega à Câmara dos Três Portais Rúnicos. Cada bifurcação emite uma aura mágica diferente que exige um feitiço específico: se a luz emitida for azul (gelo), deve conjurar Chama Arcana; senão se a luz for vermelha (fogo), deve conjurar Orbe de Gelo; caso contrário (luz neutra), deve conjurar Escudo de Vento e passar em silêncio. Escreva a lógica para desarmar 4 bifurcações consecutivas.',
  '// Estrutura Condicional Encadeada
funcao resolverBifurcacao(corLuz) {
  se (corLuz === "azul") {
    conjurarChamaArcana();
  } senao se (corLuz === "vermelha") {
    conjurarOrbeGelo();
  } senao {
    conjurarEscudoVento();
  }
  avancarProximaCamara();
}',
  'O algoritmo deve identificar corretamente as cores emitidas pelas 4 bifurcações, conjurando a magia exata para cada uma sem sofrer penalidade de vida.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 4: O Desarme dos Autômatos de Guarda (Módulo 1 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  4,
  1,
  'O Desarme dos Autômatos de Guarda',
  'A repetição desnecessária de código é um dos maiores problemas na engenharia de software (princípio DRY: Don''t Repeat Yourself). Para combater isso na programação visual, agrupamos rotinas em Procedimentos e Funções Modulares:
1. Declaração do Procedimento: Define um bloco reutilizável com um nome descritivo e parâmetros de entrada.
2. Parâmetros: Valores passados para o procedimento que personalizam seu comportamento interno.
3. Invocação (Chamada): O herói reutiliza a mesma lógica para desarmar múltiplos autômatos sem duplicar blocos na tela.',
  'Dois autômatos colossais guardam os portões da cidadela: um feito de ferro e outro de cristal. Cada um exige uma sequência de giros rúnicos de acordo com seu material. Crie um procedimento modular desarmarAutomato(tipo) que recebe o material como parâmetro e realiza a sequência adequada, invocando-o para ambos os guardas.',
  '// Procedimento Modular Reutilizável
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
desarmarAutomato("cristal");',
  'A lógica de desarme deve estar encapsulada em um único procedimento reutilizável com parâmetros, sendo executada com sucesso contra os dois autômatos.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 5: A Travessia das Pontes Móveis (Módulo 1 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  5,
  1,
  'A Travessia das Pontes Móveis',
  'No desenvolvimento de sistemas reativos, frequentemente lidamos com Estados Transitórios e Sincronização Temporal. Uma ação não pode ocorrer antes que o ambiente externo atinja um estado seguro:
1. Condições Compostas (E / &&): Exigem que múltiplos predicados sejam verdadeiros simultaneamente (ponteAbaixada() E tempoRestante >= 3).
2. Espera Ativa Controlada (aguardar()): Pausa temporária enquanto a condição de travessia não estiver madura.
Essa lógica modela requisições que aguardam disponibilidade de recursos ou controle de fluxo em sistemas distribuídos.',
  'O herói precisa atravessar 3 pontes levadiças mágicas que abrem e fecham em intervalos cronometrados. O algoritmo deve verificar se a ponte está abaixada e se há pelo menos 3 segundos de tempo seguro antes de iniciar o passo. Se o tempo for insuficiente, o herói deve aguardar o próximo ciclo.',
  '// Sincronização com Pontes Móveis
para (let p = 1; p <= 3; p++) {
  enquanto (!ponteAbaixada() || obterTempoRestante() < 3) {
    aguardar(1);
  }
  atravessarPonte();
}',
  'O herói deve cruzar as 3 pontes levadiças sem cair no abismo, garantindo travessia estritamente quando ponteAbaixada() for true e tempoRestante >= 3.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 6: O Guardião do Labirinto de Espelhos (Módulo 1 - dificil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  6,
  1,
  'O Guardião do Labirinto de Espelhos',
  'Algoritmos clássicos de navegação autônoma em labirintos utilizam a Regra da Mão Direita (Wall Follower). Em qualquer labirinto 2D simplesmente conexo, manter a mão direita encostada na parede garante que o viajante encontrará a saída sem entrar em ciclos eternos.
Prioridade de decisão da máquina de estados a cada célula:
1. Se houver caminho livre à direita: virar à direita e avançar.
2. Senão, se o caminho à frente estiver livre: avançar.
3. Senão, se houver caminho à esquerda: virar à esquerda e avançar.
4. Caso esteja em um beco sem saída: dar meia-volta (180°).
Esse algoritmo introduz os fundamentos de inteligência artificial simbólica e robótica móvel.',
  'O mago supremo desafia você a escapar do temido Labirinto de Espelhos de Algoritmia. Escreva um algoritmo autônomo baseado na Regra da Mão Direita que permita ao autômato navegar por corredores complexos e becos sem saída até encontrar o portal de teletransporte.',
  '// Algoritmo Autônomo da Regra da Mão Direita
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
}',
  'O autômato deve encontrar a saída do labirinto em no máximo 40 passos sem colidir e sem ficar preso em becos sem saída.',
  'dificil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 7: O Cálculo do Dano Crítico (Módulo 2 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  7,
  2,
  'O Cálculo do Dano Crítico',
  'Python é uma linguagem de altíssima legibilidade e tipagem dinâmica forte. A partir da PEP 484, o ecossistema adotou amplamente Type Hints (anotações de tipo) que tornam o código autodocumentado e seguro.
Pontos fundamentais desta missão:
1. Assinatura de Função: Definida com def nome_funcao(arg: tipo) -> tipo_retorno:.
2. Docstrings (PEP 257): Documentação em bloco com aspas triplas descrevendo argumentos e retorno.
3. Cálculos Aritméticos e Arredondamento: Operações de multiplicação (*), soma (+) e arredondamento com round() ou int().
4. Condicionais e Função max(): Assegurar que o valor retornado respeite limites mínimos (por exemplo, nunca ser negativo com max(0, valor)).',
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
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 8: O Filtro de Poções do Boticário (Módulo 2 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  8,
  2,
  'O Filtro de Poções do Boticário',
  'A manipulação de coleções de dados é o coração de qualquer aplicação backend. Em Python, a técnica mais idiomática e eficiente para filtrar e transformar listas é a List Comprehension (compreensão de listas):
resultado = [expressao for item in colecao if condicao]
Neste desafio, trabalhamos com uma lista de dicionários (list[dict]). Para ordenar strings alfabeticamente, usamos a função embutida sorted(lista) ou o método lista.sort(). Escrever código pythônico significa priorizar compreensões de listas em vez de loops for manuais com múltiplos .append().',
  'O boticário de Valfenda precisa catalogar seu estoque de poções para a guilda. Crie a função filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str] que recebe uma lista de poções (onde cada poção possui "nome": str, "nivel": int e "em_estoque": bool) e retorna uma lista ordenada alfabeticamente contendo apenas os nomes das poções que estão em estoque (em_estoque == True) e cujo nível seja maior ou igual a nivel_minimo.',
  'def filtrar_pocoes_disponiveis(inventario: list[dict], nivel_minimo: int) -> list[str]:
    """Filtra poções disponíveis em estoque que atendem ao nível mínimo exigido.
    
    Args:
        inventario: Lista de dicionários com chaves ''nome'', ''nivel'', ''em_estoque''.
        nivel_minimo: Nível mínimo de maestria exigido (inteiro).
    
    Returns:
        Lista alfabética contendo os nomes das poções selecionadas.
    """
    # TODO: Use list comprehension para filtrar e ordene alfabeticamente com sorted()
    pass',
  'Retornar lista ordenada alfabeticamente com os nomes das poções onde em_estoque é True e nivel >= nivel_minimo; retornar lista vazia caso nenhuma poção atenda aos critérios.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 9: O Grimório de Fichas e Dicionários (Módulo 2 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  9,
  2,
  'O Grimório de Fichas e Dicionários',
  'Dicionários em Python (dict) são estruturas de associação chave-valor implementadas como tabelas hash de altíssimo desempenho O(1).
Nesta missão, exploramos:
1. Acesso Seguro com .get(): Evita exceções KeyError fornecendo um valor padrão se a chave não existir.
2. Agregações com sum() e len(): Métodos matemáticos nativos para calcular médias aritméticas.
3. Identificação de Extremos (max(..., key=...)): A função max() aceita um argumento de função key (como lambda x: x["poder"]) para localizar o herói com maior pontuação em uma única linha elegante.',
  'O escriba da guilda precisa de um relatório executivo sobre as fichas de personagens cadastradas. Implemente resumo_guilda(fichas: list[dict]) -> dict que recebe uma lista de fichas de personagens (cada uma contendo "nome", "classe", "poder" e "ativo") e retorna um dicionário com: "total_ativos" (contagem de fichas com ativo=True), "poder_medio" (média aritmética do poder das fichas ativas com 1 casa decimal) e "campeao_nome" (nome do personagem ativo de maior poder). Se não houver fichas ativas, retorne {"total_ativos": 0, "poder_medio": 0.0, "campeao_nome": None}.',
  'def resumo_guilda(fichas: list[dict]) -> dict:
    """Calcula estatísticas agregadas das fichas ativas da guilda.
    
    Args:
        fichas: Lista de personagens contendo ''nome'', ''classe'', ''poder'', ''ativo''.
    
    Returns:
        Dicionário com ''total_ativos'', ''poder_medio'' e ''campeao_nome''.
    """
    # TODO: Filtre personagens ativos e calcule as agregações necessárias
    pass',
  'O dicionário retornado deve conter as 3 chaves exatas; calcular o poder médio com 1 casa decimal de precisão e retornar valores neutros padrão caso a lista esteja vazia ou sem fichas ativas.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 10: A Criptografia das Runas Antigas (Módulo 2 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  10,
  2,
  'A Criptografia das Runas Antigas',
  'A criptografia clássica por substituição (como a famosa Cifra de César) é um excelente exercício para compreender a representação binária e numérica de textos.
Conceitos chave em Python:
1. Função ord(c): Retorna o código numérico ASCII/Unicode de um caractere (ex: ord("A") == 65).
2. Função chr(n): Converte o código numérico de volta para o caractere original (ex: chr(65) == "A").
3. Aritmética Modular (% 26): Garante que o deslocamento do alfabeto seja circular — passar de "Z" retorna para "A".
4. Imutabilidade de Strings: Em Python, textos são imutáveis; strings cifradas são construídas acumulando caracteres ou utilizando "".join(...).',
  'Para proteger mensagens contra espiões de Mordor, a guilda utiliza a Cifra de César. Crie a função cifrar_mensagem_runica(texto: str, deslocamento: int) -> str que aplica o deslocamento numérico a todas as letras (maiúsculas e minúsculas), preservando pontuações, números e espaços inalterados. Lembre-se de manter a caixa original de cada letra.',
  'def cifrar_mensagem_runica(texto: str, deslocamento: int) -> str:
    """Aplica a Cifra de César rúnica ao texto preservando espaços e pontuações.
    
    Args:
        texto: Mensagem original a ser codificada.
        deslocamento: Chave de translação do alfabeto (inteiro).
    
    Returns:
        Texto cifrado com caixa de caracteres preservada.
    """
    # TODO: Itere sobre os caracteres, aplique a rotação modular e retorne o texto
    pass',
  'Manter maiúsculas e minúsculas no lugar correto, não alterar espaços nem pontuações, e calcular o ciclo modular corretamente para deslocamentos positivos ou maiores que 26.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 11: O Validador de Nomes de Aventureiro (Módulo 2 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  11,
  2,
  'O Validador de Nomes de Aventureiro',
  'Validação de dados é uma exigência crítica de integridade e segurança de sistemas (RN08 e RNF02). Em Python, utilizamos o módulo embutido re (Expressões Regulares) e Exceções Customizadas:
1. Expressão Regular (re.match): Permite testar padrões estruturados em uma linha (ex: ^[A-Z][a-zA-Z0-9_]{1,49}$).
2. Lançamento de Erros com raise: Interrompe o fluxo anômalo disparando uma exceção clara (ValueError) para o chamador.
3. Tratamento Defensivo: Previne inserções corrompidas ou ataques de injeção em camadas posteriores do banco.',
  'Implemente a função validar_nome_heroi(nome: str) -> bool para validar nomes de aventureiros segundo as regras da guilda: o nome deve ter entre 2 e 50 caracteres; deve iniciar obrigatoriamente com letra maiúscula (A-Z); pode conter apenas letras, números e underscores (_); e não pode conter espaços. Se o nome for válido, retorne True. Se for inválido, levante uma exceção ValueError contendo uma mensagem descritiva do motivo da recusa.',
  'import re

def validar_nome_heroi(nome: str) -> bool:
    """Valida o identificador do aventureiro conforme as regras da guilda.
    
    Raises:
        ValueError: Se o nome infringir as regras de formato ou tamanho.
    """
    # TODO: Valide tamanho, início com maiúscula e caracteres permitidos
    pass',
  'Retornar True para identificadores como "Goku_99" ou "Aragorn"; lançar ValueError descritivo para nomes curtos (< 2), iniciados em minúsculas ou com símbolos inválidos.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 12: A Batalha de Turnos Orientada a Objetos (Módulo 2 - dificil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  12,
  2,
  'A Batalha de Turnos Orientada a Objetos',
  'A Programação Orientada a Objetos (POO) é o paradigma fundamental de grandes arquiteturas de software. Em Python, classes encapsulam atributos (dados) e métodos (comportamentos).
Pilares aplicados nesta missão:
1. Encapsulamento: Atributos inicializados no construtor __init__.
2. Herança: Uma subclasse Mago(Personagem) herda todos os métodos da classe mãe.
3. Sobrescrita de Métodos (Polimorfismo): Subclasses adaptam comportamentos (como o cálculo de ataque) mantendo a mesma interface pública.
4. Invariantes de Estado: Garantir que a vida de um guerreiro nunca atinja valores negativos, estabelecendo vida = max(0, vida - dano).',
  'Construa um mini-motor de combate em POO. Crie a classe base Personagem com os atributos nome (str), vida (int) e ataque (int), e o método receber_dano(quantidade: int) que reduz a vida sem deixá-la abaixo de 0. Crie a subclasse Mago(Personagem) que adiciona o atributo mana (int) e o método lancar_magia(alvo: Personagem) -> int: se tiver ao menos 10 pontos de mana, consome 10 de mana e desfere dano igual a ataque * 2 no alvo; caso contrário, realiza ataque normal (ataque * 1) sem gastar mana.',
  'class Personagem:
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
        pass',
  'A herança deve ser implementada com super().__init__; a vida do alvo nunca pode ser inferior a zero; e o consumo de mana e dano duplo devem ser executados apenas quando mana >= 10.',
  'dificil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 13: O Estandarte Semântico do Herói (Módulo 3 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  13,
  3,
  'O Estandarte Semântico do Herói',
  'O HTML5 introduziu elementos que carregam significado estrutural e contextual, superando a era das "div soups" (páginas compostas exclusivamente por dezenas de tags <div> aninhadas).
Elementos semânticos indispensáveis:
1. <section> e <article>: Representam seções temáticas independentes e autossuficientes do documento.
2. <header> e <footer>: Delimitam o cabeçalho de introdução e o rodapé de autoria.
3. <figure> e <figcaption>: Agrupam ilustrações, fotos ou brasões com sua legenda contextual.
4. <dl>, <dt> e <dd>: Lista de definição ideal para exibir pares chave-valor (como "Classe: Mago" e "Poder: 92").
O uso semântico é o primeiro requisito para conformidade com normas de acessibilidade digital e indexação em mecanismos de busca.',
  'Construa a estrutura semântica em HTML5 de um cartão de herói da guilda. O cartão deve ser envolvido por uma tag <article class="heroi-card">, possuir um <header> com título <h2> para o nome do herói, uma tag <figure> com a imagem do brasão e legenda <figcaption>, e uma lista de definições <dl> apresentando os atributos "Universo", "Classe" e "Poder de Combate". A imagem deve conter um atributo alt acessível e descritivo.',
  '<!-- Cartão Semântico de Personagem -->
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
</article>',
  'Utilizar exclusivamente elementos semânticos de HTML5 (<article>, <header>, <figure>, <figcaption>, <dl>), incluir atributo alt descritivo e evitar divs vazias no esqueleto principal.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 14: O Mural das Cores Acessíveis da Taverna (Módulo 3 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  14,
  3,
  'O Mural das Cores Acessíveis da Taverna',
  'Acessibilidade na web não é opcional — é um direito de todos os usuários. As diretrizes internacionais WCAG 2.1 (nível AA) exigem uma taxa mínima de contraste de cores de 4.5:1 para textos normais e 3:1 para textos grandes (acima de 18pt ou 14pt em negrito).
Recursos modernos de CSS:
1. Variáveis CSS (Custom Properties): Declaradas com --nome-da-variavel no escopo :root, facilitam a manutenção de temas.
2. Estados de Foco Visível (:focus-visible): Essenciais para usuários que navegam por teclado (Tab), desenhando um contorno nítido no elemento ativo.
3. Cálculo de Luminância: Combinar fundos escuros (como #0f172a) com textos claros de alto contraste (como #f8fafc).',
  'Desenvolva a folha de estilo de um painel de avisos da taverna com variáveis CSS globais no :root. Defina variáveis para --bg-card, --text-primary, --cor-destaque e --borda-foco. Garanta que a combinação de cores atenda à razão de contraste mínima de 4.5:1 (WCAG AA) e estilize o botão de ação do painel com :focus-visible exibindo um outline nítido de pelo menos 2px.',
  ':root {
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
}',
  'Declarar variáveis no :root, assegurar taxa de contraste >= 4.5:1 entre texto e fundo, e definir regra :focus-visible nítida no botão.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 15: O Estandarte Responsivo da Guilda (Módulo 3 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  15,
  3,
  'O Estandarte Responsivo da Guilda',
  'O design responsivo garante que a interface da guilda seja impecável tanto em smartphones quanto em monitores ultrawide. O CSS Flexbox é o modelo de caixa ideal para distribuir espaço ao longo de um eixo único (linha ou coluna):
1. display: flex: Transforma o contêiner em um flex container.
2. justify-content e align-items: Controlam o alinhamento nos eixos principal e transversal.
3. Media Queries (@media (max-width: 640px)): Redefinem regras quando a largura da viewport atinge um ponto de quebra (breakpoint), alternando flex-direction: column para que os dados empilhem elegantemente em telas compactas.',
  'Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa o cartão com classe .guilda-card utilizando Flexbox para que no computador os elementos fiquem lado a lado com espaçamento proporcional (gap: 1.5rem), e em dispositivos com tela de até 640px eles se reorganizem verticalmente em coluna única com alinhamento centralizado.',
  '/* Layout Flexbox Responsivo */
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
}',
  'Utilizar display: flex com gap, incluir media query em 640px com flex-direction: column e garantir ausência de barra de rolagem horizontal indesejada.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 16: O Inventário em Grade Mágica (Módulo 3 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  16,
  3,
  'O Inventário em Grade Mágica',
  'Enquanto o Flexbox é ideal para eixos unidimensionais, o CSS Grid Layout é o padrão moderno definitivo para grades bidimensionais (linhas e colunas simultâneas).
A fórmula mágica da responsividade com Grid:
grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
- repeat(): Repete a definição de colunas.
- auto-fill: Cria tantas colunas quantas couberem na largura atual.
- minmax(120px, 1fr): Cada coluna terá no mínimo 120px e expandirá proporcionalmente (1 fração) para ocupar o espaço livre. Dessa forma, a grade se adapta a qualquer tela sem uma única media query.',
  'Construa a grade de inventário da mochila de itens mágicos do aventureiro. O contêiner .mochila-grid deve utilizar CSS Grid para acomodar slots de itens de no mínimo 120px de largura com preenchimento responsivo (repeat(auto-fill, minmax(120px, 1fr))). Cada slot .item-slot deve ter aspecto quadrado, fundo escuro, borda suave e efeito de elevação no :hover com transição suave (transform: translateY(-4px)).',
  '/* Mochila de Inventário com CSS Grid */
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
}',
  'Aplicar display: grid com repeat(auto-fill, minmax(120px, 1fr)), gap uniforme, proporção quadrada (aspect-ratio: 1/1) e transição fluida no :hover.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 17: O Formulário Encantado de Alistamento (Módulo 3 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  17,
  3,
  'O Formulário Encantado de Alistamento',
  'Formulários acessíveis conectam o usuário ao servidor de maneira confiável e sem barreiras. Em HTML/CSS, acessibilidade em formulários repousa em 3 pilares:
1. Associação Explícita (<label for="id">): O leitor de tela anuncia o rótulo ao focar no campo, e o clique no rótulo foca o input.
2. Agrupamento Semântico (<fieldset> e <legend>): Agrupa campos logicamente relacionados (ex: dados do herói).
3. Pseudoclasses de Estado CSS (:focus, :invalid): Fornecem feedback visual instantâneo do estado de validação sem sobressaltos.',
  'Crie a marcação e o estilo de um formulário de cadastro de ficha de herói da guilda. O formulário deve conter um <fieldset> com <legend>, campo de texto para Nome do Herói vinculado explicitamente ao seu <label>, campo <select> para escolha do Universo, e campo de e-mail com validação nativa (type="email" e required). Estilize os campos com bordas nítidas e realce de foco (:focus) sem remover o contorno acessível.',
  '<form class="form-alistamento">
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
</form>',
  'Todos os campos de entrada devem ter labels vinculados via atributo for e id correspondente; utilizar fieldset e legend; campos obrigatórios identificados e estilização adequada de foco.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 18: A Barra de Vida e Mana com Animações CSS (Módulo 3 - dificil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  18,
  3,
  'A Barra de Vida e Mana com Animações CSS',
  'Animações CSS adicionam vida e polimento à experiência do usuário, tornando feedbacks imediatos e naturais. Para criar efeitos como alerta de perigo crítico ou regeneração de energia, combinamos:
1. A Regra @keyframes: Define quadros-chave da animação ao longo do tempo (de 0% a 100%).
2. Aceleração por Hardware: Usar propriedades como transform e opacity em vez de alterar margin ou width durante animações contínuas, mantendo 60 quadros por segundo sem causar repaint excessivo.
3. Propriedade animation: Configura nome, duração, curva de aceleração (ease-in-out) e contagem de iterações (infinite).',
  'Implemente as barras de status do herói (Vida e Mana). Crie uma animação em CSS chamada pulso-critico com @keyframes que faz a barra de vida pulsar (alternando a opacidade entre 0.6 e 1.0 e leve escala de 1.02) quando a classe .perigo estiver presente, sinalizando que os pontos de vida do personagem estão abaixo de 20%.',
  '/* Animação de Pulso Crítico */
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
}',
  'Definir a animação @keyframes pulso-critico com alternância de opacidade/transform, aplicar ao elemento com a classe perigo e garantir fluidez visual sem sobrecarregar a renderização.',
  'dificil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 19: A Forja de Atributos com ES6+ (Módulo 4 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  19,
  4,
  'A Forja de Atributos com ES6+',
  'O JavaScript moderno (ECMAScript 2015 / ES6+) transformou a linguagem, introduzindo recursos fundamentais para código limpo e seguro:
1. Desestruturação de Objetos (const { nome, poder } = heroi): Permite extrair propriedades sem repetir o nome do objeto várias vezes.
2. Operador Spread (...heroi): Cria cópias rasas de objetos permitindo Imutabilidade (um dos pilares do React e de aplicações modernas), alterando propriedades sem mutar a referência original.
3. Template Literals (`Herói: ${nome}`): Facilita concatenação de strings com expressões dinâmicas interpoladas.
4. Arrow Functions (const fn = () => ...): Sintaxe compacta e léxica para funções.',
  'Na forja mágica, os atributos de um herói são aprimorados. Crie a função atualizarPoderHeroi(heroi, bonusPoder) que recebe um objeto de personagem { id, nome, classe, poder } e um valor numérico de bônus. A função deve retornar um NOVO objeto (sem alterar o objeto original recebido) contendo todos os atributos originais copiados via spread, o poder recalculado limitado ao teto de 100 (conforme a regra de negócio RN01), e um novo campo statusTexto formatado como: "O herói [nome] da classe [classe] possui [novoPoder] de poder!".',
  '/**
 * Atualiza o poder do herói com imutabilidade e teto RN01.
 * @param {{ id: number, nome: string, classe: string, poder: number }} heroi
 * @param {number} bonusPoder
 * @returns {object} Novo objeto com dados atualizados.
 */
function atualizarPoderHeroi(heroi, bonusPoder) {
  // TODO: Use destructuring, spread operator e limite em 100 (RN01)
}',
  'A função não deve mutar o objeto recebido como argumento, deve respeitar a constraint RN01 com poder <= 100, e retornar o campo statusTexto com a interpolação solicitada.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 20: O Manipulador do Domínio do DOM (Módulo 4 - facil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  20,
  4,
  'O Manipulador do Domínio do DOM',
  'O DOM (Document Object Model) é a representação orientada a objetos da página web que permite ao JavaScript interagir dinamicamente com o HTML.
Conceitos essenciais de manipulação do DOM:
1. Seleção de Elementos (document.querySelector): Localiza elementos usando a mesma sintaxe de seletores CSS (#id, .classe).
2. Escuta de Eventos (addEventListener("click", handler)): Registra ouvintes para reagir a interações do usuário de forma desacoplada.
3. Manipulação de Classes (element.classList.add / toggle): A melhor prática para alterar o visual de um componente sem injetar estilos inline.
4. Controle de Propriedades: Desabilitar botões (button.disabled = true) para evitar múltiplos cliques acidentais.',
  'Implemente a função conectarBotaoEquipar(botaoId, displayId) que seleciona o botão de ação e o elemento de status da armadura. Ao ocorrer o clique no botão, o script deve: atualizar o texto do display para "Armadura Lendária Equipada!", adicionar a classe CSS .ativo ao display, e alterar a propriedade disabled do botão para true para impedir novos cliques.',
  'function conectarBotaoEquipar(botaoId, displayId) {
  const botao = document.querySelector(`#${botaoId}`);
  const display = document.querySelector(`#${displayId}`);

  if (!botao || !display) return;

  botao.addEventListener("click", () => {
    // TODO: Atualize o texto, adicione a classe ''ativo'' e desabilite o botão
  });
}',
  'Localizar os elementos pelo ID, anexar o ouvinte de evento click, alternar classe usando classList.add("ativo"), atualizar o textContent e setar disabled = true no botão.',
  'facil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 21: O Grimório dos Métodos de Array (Módulo 4 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  21,
  4,
  'O Grimório dos Métodos de Array',
  'Em JavaScript profissional, laços imperativos (for e while) são frequentemente substituídos por Métodos Funcionais de Array que não possuem efeitos colaterais:
1. array.filter(item => boolean): Cria um novo array apenas com os elementos que atendem ao predicado lógico.
2. array.map(item => transformacao): Transforma cada elemento da lista aplicando uma função e retornando um novo array de mesmo tamanho.
3. array.reduce((acumulador, item) => ..., valorInicial): Reduz todo o array a um único valor acumulado (como somas, contagens ou médias).
A combinação dessas três funções permite encadear transformações de dados de forma declarativa e legível.',
  'O conselho dos magos necessita auditar o poder dos membros da guilda. Escreva a função auditarMembrosGuilda(membros) que recebe um array de objetos de heróis ({ nome: string, ativo: boolean, poder: number }) e retorna um objeto estatístico contendo: nomesAtivos (array contendo apenas os nomes dos membros com ativo === true em letras maiúsculas via .map()), totalPoderAtivo (a soma do poder de todos os membros ativos via .reduce()) e mediaPoderAtivo (média aritmética do poder dos membros ativos arredondada em número inteiro).',
  'function auditarMembrosGuilda(membros) {
  // TODO: Use .filter(), .map() e .reduce() para gerar o resumo estatístico
}',
  'Usar obrigatoriamente os métodos filter, map e reduce da API de Array do JavaScript; retornar o objeto com as 3 chaves solicitadas e tratar listas vazias sem gerar divisão por zero.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 22: O Guardião dos Formulários e Eventos Assíncronos (Módulo 4 - medio)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  22,
  4,
  'O Guardião dos Formulários e Eventos Assíncronos',
  'O comportamento nativo de envio de formulários no navegador é disparar uma requisição HTTP síncrona que recarrega a página inteira. Em SPAs (Single Page Applications) e aplicações modernas com Next.js:
1. event.preventDefault(): Impede o comportamento padrão do navegador permitindo que o JavaScript assuma o controle do fluxo.
2. Validação Pré-Envio no Cliente: Economiza requisições verificando campos vazios ou formatos inválidos antes de chamar o backend.
3. Feedback de Carregamento: Atualizar o estado visual do botão (exibindo "Salvando..." ou um spinner) melhora sensivelmente a experiência do usuário (UX).',
  'Implemente a função configurarEnvioSeguro(formElement, servicoEnvio) que adiciona o listener de submissão ao formulário. O script deve interceptar o envio com e.preventDefault(), validar se os campos de texto do formulário não estão vazios, desabilitar o botão de submit alterando seu texto para "Enviando...", invocar a função assíncrona servicoEnvio com os dados extraídos, e reabilitar o botão ao término do processo.',
  'function configurarEnvioSeguro(formElement, servicoEnvio) {
  formElement.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    // TODO: Valide os campos, desabilite o botão e invoque servicoEnvio()
  });
}',
  'Invocar preventDefault no evento de submit, validar inputs antes do disparo, gerenciar o estado disabled e texto de loading no botão, e capturar eventuais falhas com bloco try/finally.',
  'medio'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 23: O Feitiço da API Assíncrona (Módulo 4 - dificil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  23,
  4,
  'O Feitiço da API Assíncrona',
  'A comunicação com APIs REST externas é a base da computação em nuvem. A Web API moderna fornece a função fetch(), que opera com Promises e a sintaxe intuitiva async/await.
Armadilhas comuns e boas práticas com fetch():
1. O mito de que fetch() falha em erros 404/500: O fetch nativo não rejeita a Promise quando a API responde com código HTTP de erro (como 404 Not Found ou 500 Internal Server Error). Ele só rejeita em falhas catastróficas de rede.
2. A verificação de res.ok: É mandatório checar se res.ok é verdadeiro (status HTTP entre 200 e 299). Se for falso, devemos disparar um throw new Error(...) explicitamente.
3. Ordenação de Arrays (.sort()): Para ordenar números de forma decrescente: array.sort((a, b) => b.poder - a.poder).',
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
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

-- Missão 24: O Oráculo do Cache e Debounce de Busca (Módulo 4 - dificil)
INSERT INTO missoes (id, modulo_id, titulo, explicacao, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  24,
  4,
  'O Oráculo do Cache e Debounce de Busca',
  'Quando implementamos campos de busca em tempo real com consulta a APIs externas (como a sincronização de perfis do GitHub no CodeQuest, RF12), dois padrões de engenharia de software são vitais:
1. Debounce: Adia a execução da chamada de rede até que o usuário pare de digitar por um intervalo (ex: 300ms), cancelando o temporizador pendente via clearTimeout() a cada nova tecla pressionada.
2. Cache em Memória (Map): Armazena respostas anteriores indexadas pelo termo buscado. Se o usuário digitar um termo já consultado, a resposta é entregue instantaneamente sem consumir requisições nem limites de taxa da API externa.
A fusão desses padrões garante altíssima responsividade da interface e economia brutal de recursos de infraestrutura.',
  'Crie a função de alta ordem criarBuscadorComDebounceECache(funcaoBuscaApi, delayMs) que gerencia consultas de heróis. Ela deve manter um Map interno de cache e retornar uma função que recebe o termo de busca. Se o termo já estiver no cache, retorna o valor imediatamente resolvido em Promise; caso contrário, aguarda o período de debounce sem novas chamadas, executa funcaoBuscaApi(termo), armazena no cache e retorna o resultado.',
  '/**
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
}',
  'Retornar valor em cache sem invocar a API externa para termos repetidos; reiniciar o temporizador se nova chamada ocorrer antes do delay; retornar Promise resolvida com o resultado da busca.',
  'dificil'
)
ON CONFLICT (id) DO UPDATE SET
  modulo_id = EXCLUDED.modulo_id,
  titulo = EXCLUDED.titulo,
  explicacao = EXCLUDED.explicacao,
  enunciado = EXCLUDED.enunciado,
  codigo_inicial = EXCLUDED.codigo_inicial,
  criterio_aceite = EXCLUDED.criterio_aceite,
  dificuldade = EXCLUDED.dificuldade;

SELECT setval(pg_get_serial_sequence('missoes', 'id'), COALESCE(MAX(id), 1)) FROM missoes;
