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


-- ========================================================
-- Usuário Padrão de Demonstração e Ficha Inicial (RF01a, RF02)
-- ========================================================
INSERT INTO usuarios (id, nome, email, senha_hash, tipo, email_verificado)
VALUES (1, 'Aprendiz de Código', 'estudante@codequest.dev', '$2a$10$eO1d4lW4F22y9h6r7fPz8eXQ4oK3eI1cM9kG7oP3rQ8aZ7vY2lK6m', 'estudante', true)
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  email = EXCLUDED.email;

INSERT INTO fichas (id, usuario_id, nome, universo, classe, poder, ativo)
VALUES (1, 1, 'Aventureiro Dev', 'Games', 'Guerreiro', 20, true)
ON CONFLICT (id) DO UPDATE SET
  poder = EXCLUDED.poder,
  ativo = EXCLUDED.ativo;

SELECT setval(pg_get_serial_sequence('usuarios', 'id'), COALESCE(MAX(id), 1)) FROM usuarios;
SELECT setval(pg_get_serial_sequence('fichas', 'id'), COALESCE(MAX(id), 1)) FROM fichas;

-- ========================================================
-- Inserção das 18 Aulas Técnicas Detalhadas da Trilha (RF13, RF13a)
-- ========================================================
INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm1-aula-1',
  1,
  1,
  'Algoritmos, Sequenciamento e Pensamento Computacional',
  'A arte de decompor problemas complexos em instruções finitas e ordenadas',
  '25 min',
  40,
  'Entenda o que são algoritmos, como computadores interpretam instruções sequenciais passo a passo e como modelar soluções visuais livres de ambiguidades.',
  '["Compreender o conceito formal de algoritmo e sua natureza sequencial e determinística.","Identificar a importância da ordem de execução de comandos (fluxo sequencial de controle).","Modelar instruções básicas de movimentação e verificação em labirintos.","Evitar ambiguidades e passos órfãos no pensamento computacional."]'::jsonb,
  '[{"titulo":"1. O que é um Algoritmo?","explicacao":"Um algoritmo é uma sequência finita, ordenada e não ambígua de passos que recebe entradas (dados ou condições do ambiente), processa essas instruções e entrega uma saída previsível.\n\nNa computação, os computadores não \"adivinham\" intenções: eles executam rigorosamente cada linha na ordem exata em que foi escrita. Se a ordem estiver invertida, mesmo comandos corretos produzirão resultados desastrosos.","analogiaRPG":"Imagine uma receita de alquimia antiga: se você beber a poção antes de purificar as ervas na caldeira, você sofrerá envenenamento em vez de regenerar seus pontos de vida!","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Sequenciamento Básico de Ações","codigo":"// Ordem de execução estrita do herói:\n1. olharAoRedor();\n2. verificarObstaculos();\n3. se (caminhoLivre()) {\n4.   darPassoFrente();\n5. }\n6. registrarPosicaoAtual();","explicacaoLinhaALinha":"Cada comando é executado de cima para baixo. O passo 4 só é acionado se a verificação da linha 3 retornar verdadeiro."},"dicaPro":"Antes de escrever qualquer código, rascunhe os passos em português claro (pseudocódigo). Se um humano não conseguir seguir seus passos, a máquina certamente falhará.","atencaoArmadilha":"Cuidado com passos implícitos: o computador não sabe que precisa \"abrir a porta\" antes de \"atravessar a porta\". Toda ação intermediária deve ser expressa."},{"titulo":"2. Decomposição e Reconhecimento de Padrões","explicacao":"O Pensamento Computacional é composto por quatro pilares fundamentais:\n1. Decomposição: Quebrar uma missão épica em subtarefas menores e administráveis.\n2. Reconhecimento de Padrões: Identificar comportamentos repetitivos no ambiente.\n3. Abstração: Focar no que é essencial e ignorar detalhes irrelevantes.\n4. Algoritmos: Construir o passo a passo final da solução.","analogiaRPG":"Para derrotar um dragão, você não ataca aleatoriamente: primeiro você esquiva do sopro de fogo (padrão), equipa a flecha de gelo (abstração da fraqueza) e atira no olho (decomposição do combate).","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Atravessando o Corredor das Ruínas","codigo":"enquanto (caminhoLivre()) {\n  andarFrente();\n  se (detectarArmadilha()) {\n    desarmarArmadilha();\n  }\n}\nabrirBau();","explicacaoLinhaALinha":"O herói caminha repetidamente enquanto houver piso livre e desarma armadilhas reativamente até encontrar o baú."},"dicaPro":"Sempre garanta que seu laço possua uma condição de parada que eventualmente se tornará falsa para evitar o temido travamento de loop infinito."}]'::jsonb,
  '[{"termo":"Algoritmo","definicao":"Sequência lógica, finita e ordenada de instruções para resolver um problema."},{"termo":"Determinismo","definicao":"Dada a mesma entrada, o algoritmo sempre produzirá a mesma saída."},{"termo":"Fluxo Sequencial","definicao":"Execução de instruções uma após a outra, de cima para baixo."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a1-p1',
  'm1-aula-1',
  1,
  1,
  'Passo 1: Identificação de Sequência Lógica',
  'Analise as instruções de desarme da runa e coloque os comandos na ordem correta antes de acionar a alavanca.',
  'conceitual',
  NULL,
  'facil',
  15,
  'Lembre-se: inspecionar o terreno vem sempre antes de pisar nele.',
  NULL,
  'Ordenar corretamente os 4 passos de travessia segura.',
  '["Verifique se a armadilha está ativa.","Se ativa, utilize o feitiço de anulação.","Avance um passo à frente.","Colete a gema na laje."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a1-p2',
  'm1-aula-1',
  1,
  2,
  'Passo 2: Pseudocódigo de Evasão de Obstáculos',
  'Escreva a estrutura mínima em blocos/pseudocódigo que avança enquanto a frente estiver desobstruída.',
  'codigo',
  NULL,
  'facil',
  25,
  'Utilize o bloco "enquanto (caminhoLivre())".',
  '// Complete o algoritmo:
enquanto (caminhoLivre()) {
  // O que fazer a cada passo?
  andarFrente();
}',
  'Conter laço enquanto com condição de caminho livre e avanço unitário.',
  '["Avalie a condição frontal com caminhoLivre().","Invoque a ação andarFrente() dentro do corpo do laço."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a1-p3',
  'm1-aula-1',
  1,
  3,
  'Passo 3: Missão Oficial #1 — O Despertar dos Blocos Mágicos',
  'Aplique o conhecimento completo na primeira missão oficial do CodeQuest no editor interativo.',
  'missao_oficial',
  1,
  'facil',
  50,
  'Desarme a armadilha condicionalmente e abra o baú no final.',
  NULL,
  'Submeter e validar com sucesso a Missão #1 no catálogo oficial.',
  '["Acesse o editor da Missão #1.","Execute os testes automatizados.","Submeta para gravar o progresso e ganhar XP."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm1-aula-2',
  1,
  2,
  'Variáveis, Tipos de Dados e Estado de Memória',
  'Armazenando dados de heróis, contadores de gemas e flags de inventário',
  '30 min',
  45,
  'Aprenda como o computador reserva espaços na memória RAM para guardar valores numéricos, textos e booleanos, e como acumular dados ao longo do tempo.',
  '["Compreender o conceito de variáveis como identificadores nomeados de memória.","Distinguir os tipos básicos: números inteiros, textos (strings) e lógicos (booleanos).","Implementar variáveis acumuladoras e contadores de passos.","Manipular atualizações de estado sem perder o valor anterior."]'::jsonb,
  '[{"titulo":"1. O Baú Mágico da Memória","explicacao":"Uma variável é como uma caixa etiquetada na memória do computador. Ela possui três características vitais:\n1. Nome (Identificador): Como nos referimos a ela (ex: `pontosDeVida`, `gemasColetadas`).\n2. Tipo: O formato do dado guardado (número, texto ou verdadeiro/falso).\n3. Valor: O conteúdo atual armazenado na caixa, que pode variar com o tempo.","analogiaRPG":"Seu inventário possui slots etiquetados: o slot \"ouro\" guarda 150 moedas. Ao comprar um escudo por 50, o novo valor do slot passa a ser 100!","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Declaração e Acumulação","codigo":"// Criando as variáveis iniciais:\nlet nomeAventureiro = \"Elessar\";\nlet nivel = 1;\nlet gemas = 0;\nlet estaEnvenenado = false;\n\n// Coletando uma gema (acumulação):\ngemas = gemas + 1; // Agora gemas vale 1!","explicacaoLinhaALinha":"A linha `gemas = gemas + 1` lê o valor atual (0), soma 1, e sobrescreve o espaço com o resultado 1."},"dicaPro":"Dê nomes claros e autoexplicativos às suas variáveis no padrão camelCase. Evite nomes como x, a, b que confundem seu eu do futuro.","atencaoArmadilha":"Não confunda o operador de atribuição `=` (que guarda um valor) com o operador de igualdade `==` ou `===` (que compara dois valores)."},{"titulo":"2. Contadores e Laços Contados (Para / For)","explicacao":"Quando precisamos repetir uma rotina um número EXATO e conhecido de vezes (por exemplo, atravessar 5 pilares), utilizamos uma variável contadora dentro de um laço `para`:\n- Início: onde o contador começa (`let pilar = 1`).\n- Condição: até onde ele vai (`pilar <= 5`).\n- Passo: como ele aumenta a cada volta (`pilar = pilar + 1`).","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Laço Contado com Acumulador","codigo":"let totalGemas = 0;\n\npara (let pilar = 1; pilar <= 5; pilar++) {\n  andarFrente();\n  coletarGema();\n  totalGemas = totalGemas + 1;\n}\n\nnotificarGuilda(\"Total coletado: \" + totalGemas);","explicacaoLinhaALinha":"O laço executa exatamente 5 vezes, incrementando a variável `totalGemas` a cada travessia."},"dicaPro":"Fique atento aos limites de início e fim: se o loop começa em 1 e vai até <= 5, ele roda 5 vezes. Se começar em 0 e for até < 5, também roda 5 vezes."}]'::jsonb,
  '[{"termo":"Variável","definicao":"Espaço nomeado na memória que guarda um valor mutável."},{"termo":"Atribuição","definicao":"Operação de gravar um valor dentro de uma variável usando o sinal =."},{"termo":"Acumulador","definicao":"Padrão de variável que incrementa seu próprio valor a cada passo."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a2-p1',
  'm1-aula-2',
  1,
  1,
  'Passo 1: Identificação de Tipos de Dados',
  'Classifique corretamente se os atributos do personagem são números, strings ou booleanos.',
  'conceitual',
  NULL,
  'facil',
  15,
  'Textos usam aspas, números são puros e booleanos são true/false.',
  NULL,
  'Mapear vida (número), classe (string) e ativo (booleano).',
  '["Analise a variável let vida = 100.","Analise a variável let classe = \"Mago\".","Analise a variável let vivo = true."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a2-p2',
  'm1-aula-2',
  1,
  2,
  'Passo 2: Simulando o Acumulador de Moedas',
  'Escreva o bloco que inicializa um baú com 0 moedas e soma 10 moedas para cada baú encontrado em um laço de 3 repetições.',
  'codigo',
  NULL,
  'facil',
  25,
  'moedas = moedas + 10 dentro do laço.',
  'let moedas = 0;
para (let i = 1; i <= 3; i++) {
  moedas = moedas + 10;
}',
  'Chegar ao valor final de 30 moedas na variável de controle.',
  '["Inicie a variável moedas com 0.","Crie o loop para de 1 a 3.","Incremente 10 a cada volta."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a2-p3',
  'm1-aula-2',
  1,
  3,
  'Passo 3: Missão Oficial #2 — A Coleta das Gemas Elementais',
  'Percorra a ponte de 5 pilares arcanos, coletando gemas e retornando o total na Missão #2.',
  'missao_oficial',
  2,
  'facil',
  50,
  'Lembre-se de acumular gemasColetadas = gemasColetadas + 1 a cada pilar.',
  NULL,
  'Atingir 5 gemas coletadas sem passos extras na Missão #2.',
  '["Abra a Missão #2 no catálogo.","Implemente a contagem com o laço for.","Submeta a solução para pontuar no ranking."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm1-aula-3',
  1,
  3,
  'Tomada de Decisão: Condicionais e Lógica Booleana',
  'Se, Senão-Se, Senão e Operadores Lógicos (E, OU, NÃO)',
  '35 min',
  50,
  'Aprenda como fazer seu programa tomar decisões inteligentes e escolher caminhos alternativos baseado no estado do mundo.',
  '["Dominar a estrutura condicional simples e encadeada (se / senão se / senão).","Compreender operadores relacionais: ==, !=, >, <, >=, <=.","Combinar múltiplos testes com operadores lógicos E (&&), OU (||) e NÃO (!).","Evitar condições redundantes e casos sem tratamento."]'::jsonb,
  '[{"titulo":"1. O Bifurcador de Destinos","explicacao":"Um computador toma decisões avaliando expressões booleanas que resultam estritamente em VERDADEIRO (`true`) ou FALSO (`false`).\n\n- `se (condição)`: Executa o bloco apenas se a condição for verdadeira.\n- `senão se (outraCondicao)`: Testa uma alternativa caso a primeira tenha sido falsa.\n- `senão`: O caminho de contingência obrigatório quando nenhuma opção anterior foi satisfeita.","analogiaRPG":"Diante de um portão encantado: se você tem a chave de ouro, o portão abre; senão se tem poder mágico > 80, você quebra o selo; senão, você deve dar meia volta.","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Decisão Encadeada nos Portais","codigo":"funcao reagirAoSinal(corLuz) {\n  se (corLuz === \"azul\") {\n    conjurarChamaArcana();\n  } senao se (corLuz === \"vermelha\") {\n    conjurarOrbeGelo();\n  } senao {\n    conjurarEscudoVento();\n  }\n}","explicacaoLinhaALinha":"Apenas um dos três blocos será executado, dependendo exclusivamente do valor passado na cor da luz."},"dicaPro":"Sempre coloque o caso mais provável ou de maior risco primeiro na cadeia de condicionais para economizar avaliações.","atencaoArmadilha":"Esquecer o bloco `senão` deixa o programa sem saber o que fazer quando um valor inesperado aparece."}]'::jsonb,
  '[{"termo":"Expressão Booleana","definicao":"Qualquer cálculo ou teste cujo resultado é true ou false."},{"termo":"Tabela Verdade","definicao":"Mapeamento de resultados para combinações de operadores E e OU."},{"termo":"Curto-Circuito","definicao":"Interrupção do teste lógico assim que o resultado final já é garantido."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a3-p1',
  'm1-aula-3',
  1,
  1,
  'Passo 1: Avaliação de Expressões Lógicas',
  'Determine se expressões como (10 > 5 && "sol" == "chuva") são true ou false.',
  'conceitual',
  NULL,
  'facil',
  15,
  'No operador &&, ambos os lados precisam ser verdadeiros.',
  NULL,
  'Avaliar 3 testes booleanos com 100% de precisão.',
  '["Avalie teste 1","Avalie teste 2","Avalie teste 3"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a3-p2',
  'm1-aula-3',
  1,
  2,
  'Passo 2: Árvore de Decisão Rúnica',
  'Monte uma função condicional que escolhe a arma certa contra cada fraqueza elemental.',
  'codigo',
  NULL,
  'medio',
  30,
  'Use se/senão-se/senão cobrindo gelo, fogo e o caso padrão.',
  'se (fraqueza === "gelo") {
  usarFogo();
} senao se (fraqueza === "fogo") {
  usarAgua();
} senao {
  usarEspadaNormal();
}',
  'Tratar os três cenários com retorno correto.',
  '["Identifique os ramos de decisão","Implemente os retornos para cada caso"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a3-p3',
  'm1-aula-3',
  1,
  3,
  'Passo 3: Missão Oficial #3 — O Labirinto das Bifurcações Rúnicas',
  'Resolva as 4 bifurcações dos portais mágicos invocando a magia exata para cada cor emitida.',
  'missao_oficial',
  3,
  'medio',
  50,
  'Azul exige Chama Arcana, Vermelha exige Orbe de Gelo, neutra exige Escudo de Vento.',
  NULL,
  'Desarmar os 4 portais sem sofrer dano na Missão #3.',
  '["Acesse a Missão #3 no editor.","Valide os testes automatizados.","Submeta a resposta final."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a3-p4',
  'm1-aula-3',
  1,
  4,
  'Passo 4: Missão Oficial #5 — A Travessia das Pontes Móveis',
  'Concentre feitiços de sincronização temporal e condições compostas (ponte abaixada E tempo restante >= 3s) para cruzar o abismo sem despencar.',
  'missao_oficial',
  5,
  'medio',
  50,
  'Utilize enquanto (!ponteAbaixada() || obterTempoRestante() < 3) { aguardar(1); } atravessarPonte();.',
  NULL,
  'Cruzar as 3 pontes levadiças sem colidir e sem cair no abismo na Missão #5.',
  '["Acesse a Missão #5 no editor.","Implemente a checagem dupla da ponte abaixada e cronômetro.","Execute o simulador e submeta para vencer o abismo."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm1-aula-4',
  1,
  4,
  'Modularização e Procedimentos Reutilizáveis (DRY)',
  'Criando blocos de funções reutilizáveis com parâmetros de entrada',
  '30 min',
  45,
  'Aprenda como dividir seu código em procedimentos reutilizáveis para nunca repetir lógica desnecessariamente (Don''t Repeat Yourself).',
  '["Compreender o princípio DRY (Don''t Repeat Yourself) na engenharia de software.","Criar procedimentos nomeados com parâmetros de entrada.","Invocar o mesmo procedimento em diferentes partes do mapa.","Facilitar a manutenção e teste de código modular."]'::jsonb,
  '[{"titulo":"1. O Fim do Código Duplicado","explicacao":"Copiar e colar o mesmo bloco de código em vários pontos é uma das piores práticas de desenvolvimento. Se você descobrir um erro, terá que consertar em todos os lugares copiados!\n\nProcedimentos e funções agrupam uma sequência de ações sob um nome descritivo. Podemos fornecer **parâmetros** para customizar seu comportamento.","analogiaRPG":"Em vez de carregar 10 pergaminhos idênticos de \"acender fogueira\", o mago aprende a magia uma única vez e a conjura sempre que precisa de calor!","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Procedimento com Parâmetro","codigo":"funcao desarmarGuarda(tipoMaterial) {\n  se (tipoMaterial === \"ferro\") {\n    girarChave(\"esquerda\", 2);\n  } senao {\n    girarChave(\"direita\", 3);\n  }\n}\n\n// Invocação limpa para guardas diferentes:\ndesarmarGuarda(\"ferro\");\ndesarmarGuarda(\"cristal\");","explicacaoLinhaALinha":"O parâmetro `tipoMaterial` altera os giros da chave sem duplicar a estrutura da função."},"dicaPro":"Cada função deve ter uma única responsabilidade clara (Princípio da Responsabilidade Única - SRP)."}]'::jsonb,
  '[{"termo":"Princípio DRY","definicao":"Don''t Repeat Yourself: cada lógica deve ter uma única representação no código."},{"termo":"Parâmetro","definicao":"Variável de entrada que a função recebe para personalizar sua execução."},{"termo":"Modularidade","definicao":"Capacidade de dividir um sistema complexo em peças autônomas acopladas."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a4-p1',
  'm1-aula-4',
  1,
  1,
  'Passo 1: Refatoração de Código Repetitivo',
  'Identifique blocos duplicados de desarme e substitua-os por uma chamada de função.',
  'conceitual',
  NULL,
  'facil',
  20,
  'Observe quais linhas são exatamente idênticas e quais recebem valores diferentes.',
  NULL,
  'Reduzir a duplicação encapsulando em um procedimento.',
  '["Encontre o trecho duplicado","Crie o nome da função","Extraia os parâmetros"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a4-p2',
  'm1-aula-4',
  1,
  2,
  'Passo 2: Criando o Procedimento com Parâmetro',
  'Escreva a declaração da função desarmarAutomato(tipo) com giros e runas específicas.',
  'codigo',
  NULL,
  'medio',
  25,
  'Trate tipo == "ferro" e o caso alternativo.',
  'funcao desarmarAutomato(tipo) {
  // Lógica de desarme parametrizada
}',
  'Função executável aceitando o argumento tipo.',
  '["Declare a assinatura","Adicione a condicional interna"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a4-p3',
  'm1-aula-4',
  1,
  3,
  'Passo 3: Missão Oficial #4 — O Desarme dos Autômatos de Guarda',
  'Desarme o autômato de ferro e o autômato de cristal usando um único procedimento modular.',
  'missao_oficial',
  4,
  'medio',
  50,
  'Invoque desarmarAutomato("ferro") e depois desarmarAutomato("cristal").',
  NULL,
  'Concluir a Missão #4 no catálogo oficial.',
  '["Abra a Missão #4","Execute a suíte de testes","Submeta a solução"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm1-aula-5',
  1,
  5,
  'Algoritmos Autônomos e Resolução de Labirintos',
  'Regra da Mão Direita e Máquinas de Estados Finitas',
  '40 min',
  60,
  'Aprenda como construir comportamentos autônomos inteligentes utilizando máquinas de estados e o algoritmo clássico da Regra da Mão Direita para escapar de qualquer labirinto 2D.',
  '["Compreender algoritmos clássicos de navegação robótica (Wall Following).","Modelar prioridades de movimentação em máquinas de estado.","Evitar becos sem saída e ciclos infinitos em labirintos.","Desenvolver algoritmos robustos de navegação autônoma."]'::jsonb,
  '[{"titulo":"1. A Regra da Mão Direita (Wall Follower)","explicacao":"Em labirintos 2D simplesmente conexos (sem ilhas ou anéis desconexos), encostar a mão direita na parede e caminhar continuamente sem nunca desgrudá-la garante matematicamente que você encontrará a saída!\n\nA prioridade de decisão do autômato a cada célula deve ser:\n1. Se o lado direito estiver livre: vire à direita e ande.\n2. Senão, se a frente estiver livre: ande em frente.\n3. Senão, se o lado esquerdo estiver livre: vire à esquerda e ande.\n4. Caso esteja em um beco sem saída: dê meia-volta.","analogiaRPG":"Nas catacumbas escuras sem tocha, o ladino desliza os dedos pela parede de pedra da direita e avança sem hesitar, sabendo que a geometria o guiará ao portal!","codigoExemplo":{"linguagem":"pseudocode","tituloSnippet":"Máquina de Estados de Navegação","codigo":"enquanto (!chegouAoPortal()) {\n  se (ladoDireitoLivre()) {\n    virarDireita();\n    andarFrente();\n  } senao se (frenteLivre()) {\n    andarFrente();\n  } senao se (ladoEsquerdoLivre()) {\n    virarEsquerda();\n    andarFrente();\n  } senao {\n    virarMeiaVolta();\n  }\n}","explicacaoLinhaALinha":"A cada ciclo, a prioridade máxima é testar a direita. Se bloqueada, tenta a frente, depois esquerda, e por fim recua."},"dicaPro":"A ordem dos `senão se` define a prioridade de decisão. Se você inverter a ordem e colocar `frenteLivre()` antes de `ladoDireitoLivre()`, o autômato ignorará bifurcações à direita e se perderá!"}]'::jsonb,
  '[{"termo":"Wall Follower","definicao":"Algoritmo de navegação que segue o contorno de paredes para resolver labirintos."},{"termo":"Máquina de Estados","definicao":"Modelo computacional que transita entre estados discretos baseado em estímulos."},{"termo":"Conectividade Simples","definicao":"Espaço topológico onde qualquer caminho fechado pode ser reduzido sem furos."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a5-p1',
  'm1-aula-5',
  1,
  1,
  'Passo 1: Mapeamento de Estados do Autômato',
  'Identifique qual ação o autômato deve tomar em 3 configurações diferentes de paredes.',
  'conceitual',
  NULL,
  'medio',
  20,
  'Lembre-se da ordem: Direita > Frente > Esquerda > Meia-volta.',
  NULL,
  'Acertar as 3 respostas da máquina de estados.',
  '["Cenário A: parede à frente e direita livre","Cenário B: beco total","Cenário C: corredor reto"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a5-p2',
  'm1-aula-5',
  1,
  2,
  'Passo 2: Implementando a Prioridade de Decisão',
  'Monte a cadeia de 4 condições encadeadas respeitando a hierarquia de navegação.',
  'codigo',
  NULL,
  'dificil',
  35,
  'Utilize se (ladoDireitoLivre()) como primeiro ramo.',
  'se (ladoDireitoLivre()) {
  virarDireita();
  andarFrente();
} // Continue...',
  'Cadeia de 4 ramos cobrindo todos os cenários.',
  '["Implemente o primeiro ramo","Adicione os dois senão-se","Finalize com meia volta no senão"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m1-a5-p3',
  'm1-aula-5',
  1,
  3,
  'Passo 3: Missão Oficial #6 — O Guardião do Labirinto de Espelhos',
  'Submeta o algoritmo completo no desafio mais desafiador do Módulo 1 e liberte o autômato.',
  'missao_oficial',
  6,
  'dificil',
  50,
  'O autômato deve encontrar a saída em no máximo 40 passos.',
  NULL,
  'Concluir a Missão #6 com sucesso no editor.',
  '["Acesse a Missão #6","Rode o simulador de passos","Submeta para ganhar a insígnia"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm2-aula-1',
  2,
  1,
  'Sintaxe Pythônica, Indentação e Tipagem Dinâmica Forte',
  'The Zen of Python, PEP 8 e manipulação de tipos primitivos',
  '30 min',
  45,
  'Conheça a filosofia do Python: por que a legibilidade conta, como a indentação com 4 espaços substitui chaves e como o Python trata inteiros, floats, strings e booleanos.',
  '["Compreender o princípio \"Readability counts\" da filosofia Zen of Python.","Dominar a indentação obrigatória de 4 espaços (PEP 8) sem misturar Tabs.","Trabalhar com tipos primitivos (int, float, str, bool) e type casting.","Formatar saídas com f-strings modernas e expressivas."]'::jsonb,
  '[{"titulo":"1. Indentação é Sintaxe!","explicacao":"Diferente de C, Java ou JavaScript, que usam chaves `{}` para delimitar blocos, o Python utiliza a **indentação obrigatória** com 4 espaços.\n\nSe uma linha estiver recuada 3 espaços em vez de 4, o interpretador lançará um `IndentationError`. Isso força todo código Python a ser visualmente limpo, organizado e uniforme em qualquer equipe do mundo.","analogiaRPG":"Em Python, a disciplina de linhas é como a postura de esgrima de um guerreiro: meio centímetro fora de equilíbrio desestabiliza todo o golpe!","codigoExemplo":{"linguagem":"python","tituloSnippet":"Estrutura Básica e f-strings","codigo":"# Variáveis primitivas\nnome_heroi: str = \"Frodo\"\nnivel: int = 15\npoder_base: float = 88.5\nativo: bool = True\n\n# Bloco condicional indentado com 4 espaços:\nif nivel >= 10:\n    bonus = nivel * 2\n    print(f\"Herói de elite: {nome_heroi} | Poder Total: {poder_base + bonus}\")","explicacaoLinhaALinha":"A linha dentro do `if` possui recuo de 4 espaços. A f-string `f\"...\"` interpola expressões entre chaves diretamente."},"dicaPro":"Configure seu editor de código para converter a tecla Tab automaticamente em 4 espaços. Nunca misture espaços e tabs no mesmo arquivo.","atencaoArmadilha":"Python é fortemente tipado: você não pode somar `\"Nível \" + 10` diretamente sem converter com `str(10)`, senão estourará um `TypeError`."}]'::jsonb,
  '[{"termo":"PEP 8","definicao":"Guia oficial de estilo de código para a linguagem Python."},{"termo":"F-Strings","definicao":"Strings literais formatadas com prefixo f\"...\" introduzidas no Python 3.6."},{"termo":"Tipagem Forte","definicao":"A linguagem impede operações inválidas entre tipos incompatíveis (ex: str + int)."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a1-p1',
  'm2-aula-1',
  2,
  1,
  'Passo 1: Correção de Erros de Indentação PEP 8',
  'Identifique e corrija um trecho de código com indentação irregular.',
  'conceitual',
  NULL,
  'facil',
  15,
  'Garanta exatamente 4 espaços para cada nível de aninhamento.',
  NULL,
  'Eliminar o IndentationError teórico.',
  '["Localize a linha desalinhada","Ajuste para 4 espaços","Verifique o fechamento do bloco"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a1-p2',
  'm2-aula-1',
  2,
  2,
  'Passo 2: Construção de F-String de Relatório de Combate',
  'Crie uma variável com f-string que exiba o nome, classe e poder de um guerreiro.',
  'codigo',
  NULL,
  'facil',
  25,
  'Utilize f"Guerreiro {nome} ({classe}) com poder {poder}".',
  'nome = "Aragorn"
classe = "Ranger"
poder = 95
mensagem = f"{nome} ({classe}) - Poder: {poder}"',
  'String formatada contendo todas as variáveis interpoladas.',
  '["Declare as variáveis","Construa a f-string","Imprima o resultado"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a1-p3',
  'm2-aula-1',
  2,
  3,
  'Passo 3: Missão Oficial #7 — O Cálculo do Dano Crítico',
  'Implemente a função de dano crítico com type hints, verificações condicionais e piso não negativo.',
  'missao_oficial',
  7,
  'facil',
  50,
  'Use round() ou int() e garanta max(0, resultado).',
  NULL,
  'Passar em todos os casos de teste da Missão #7.',
  '["Abra a Missão #7","Implemente calcular_dano()","Submeta e garanta seus pontos"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a1-p4',
  'm2-aula-1',
  2,
  4,
  'Passo 4: Missão Oficial #11 — O Validador de Nomes de Aventureiro',
  'Crie o validador de nomes de personagens verificando se a string possui entre 3 e 20 caracteres alfanuméricos e sem espaços nas extremidades.',
  'missao_oficial',
  11,
  'facil',
  40,
  'Utilize métodos nativos de string em Python como .strip(), .isalnum() e comparação de comprimento com len().',
  NULL,
  'Retornar True para nomes canônicos válidos e False para entradas maliciosas ou fora do padrão.',
  '["Acesse a Missão #11 no catálogo de desafios.","Implemente a função validar_nome_aventureiro(nome: str) -> bool.","Submeta e receba o selo de escriba oficial."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm2-aula-2',
  2,
  2,
  'Funções Puras, Parâmetros e Type Hints (PEP 484)',
  'Escrevendo funções robustas, autodocumentadas e sem efeitos colaterais',
  '35 min',
  50,
  'Aprenda como definir funções com type hints estáticos, documentar entradas e saídas com Docstrings (PEP 257) e criar funções puras previsíveis.',
  '["Definir funções usando def nome(arg: tipo) -> retorno:.","Aplicar Type Hints da PEP 484 para segurança de tipagem estática.","Escrever Docstrings profissionais no padrão PEP 257 com aspas triplas.","Compreender o conceito de funções puras e determinísticas."]'::jsonb,
  '[{"titulo":"1. O Poder das Type Hints","explicacao":"A partir do Python 3.5+, a comunidade adotou massivamente Type Hints (PEP 484). Elas não tornam o Python compilado estaticamente em tempo de execução, mas permitem que ferramentas de análise estática (mypy, linters, VS Code) detectem erros antes mesmo de você rodar o programa!\n\nAlém disso, tornam o código **autodocumentado**: quem lê a assinatura sabe exatamente o que deve passar e o que receberá de volta.","analogiaRPG":"Um grimório com Type Hints é como uma receita de poção onde está escrito: \"Requer exatamente 2 raízes de mandrágora (inteiro) e 50ml de água benta (float)\". Impossível errar o encantamento!","codigoExemplo":{"linguagem":"python","tituloSnippet":"Função com Type Hints e Docstring","codigo":"def calcular_escudo(defesa_base: int, modificador: float) -> int:\n    \"\"\"Calcula o valor do escudo de defesa mágica.\n    \n    Args:\n        defesa_base: Valor bruto da armadura (>= 0).\n        modificador: Fator elemental multiplicador (ex: 1.25).\n        \n    Returns:\n        Valor inteiro arredondado do escudo final.\n    \"\"\"\n    total = defesa_base * modificador\n    return max(0, int(round(total)))","explicacaoLinhaALinha":"A anotação `-> int` explicita o tipo devolvido. A docstring com aspas triplas explica o propósito e os argumentos."},"dicaPro":"Use sempre docstrings com aspas triplas logo na primeira linha interna da função para alimentar a ajuda automática da IDE e geradores de documentação."}]'::jsonb,
  '[{"termo":"Type Hints","definicao":"Anotações opcionais de tipo para argumentos e retorno de funções (PEP 484)."},{"termo":"Docstring","definicao":"Texto descritivo em bloco com aspas triplas que documenta módulos, classes e funções."},{"termo":"Função Pura","definicao":"Função que não altera estado externo e retorna o mesmo valor para os mesmos argumentos."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a2-p1',
  'm2-aula-2',
  2,
  1,
  'Passo 1: Anotação de Tipos em Funções Aritméticas',
  'Adicione anotações de tipo na função somar_experiencia(xp_atual, ganho).',
  'conceitual',
  NULL,
  'facil',
  15,
  'Ambos os parâmetros são int e o retorno é int.',
  NULL,
  'Assinatura com type hints válida.',
  '["Adicione : int nos argumentos","Adicione -> int no retorno"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a2-p2',
  'm2-aula-2',
  2,
  2,
  'Passo 2: Manipulação de Caracteres com ord() e chr()',
  'Converta letras em códigos ASCII numéricos e realize deslocamentos de cifra.',
  'codigo',
  NULL,
  'medio',
  25,
  'ord("A") é 65, chr(65) é "A".',
  'def deslocar_letra(letra: str, passo: int) -> str:
    codigo = ord(letra) + passo
    return chr(codigo)',
  'Deslocar caracteres alfanuméricos com precisão.',
  '["Converta com ord()","Some o passo","Reconverta com chr()"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a2-p3',
  'm2-aula-2',
  2,
  3,
  'Passo 3: Missão Oficial #8 — A Cifra de César Arcana',
  'Escreva o decodificador de mensagens da guilda implementando a rotação de caracteres na Missão #8.',
  'missao_oficial',
  8,
  'medio',
  50,
  'Mantenha maiúsculas, minúsculas e pontuações intactas.',
  NULL,
  'Concluir a descriptografia na Missão #8.',
  '["Abra a Missão #8","Implemente decifrar_mensagem()","Submeta a solução"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm2-aula-3',
  2,
  3,
  'Listas e List Comprehensions Pythônicas',
  'Filtragem e transformação declarativa de sequências sem loops for tradicionais',
  '35 min',
  50,
  'Domine o recurso mais idiomático do Python: as List Comprehensions. Aprenda a filtrar, transformar e ordenar listas em uma única linha elegante e veloz.',
  '["Manipular listas com métodos nativos: .append(), .pop(), .sort(), len().","Construir List Comprehensions: [expressao for item in lista if condicao].","Comparar legibilidade e desempenho entre loops for imperativos e comprehensions.","Ordenar elementos com sorted() e funções lambda personalizadas."]'::jsonb,
  '[{"titulo":"1. O Padrão Idiomático da Comprehension","explicacao":"Em vez de criar uma lista vazia, iterar com `for` e chamar `.append()` dentro de um `if`, o Python permite expressar tudo em uma única linha concisa:\n\n`[item_transformado for item in colecao if teste]`\n\nEssa construção é processada em nível de C internamente no interpretador CPython, tornando-a consideravelmente mais rápida que o loop imperativo manual.","analogiaRPG":"Imagine uma bolsa mágica que suga todas as poções da sala, descarta as vazias e organiza as cheias por poder em um piscar de olhos!","codigoExemplo":{"linguagem":"python","tituloSnippet":"List Comprehension em Ação","codigo":"pocoes = [\n    {\"nome\": \"Mana Maior\", \"nivel\": 5, \"disponivel\": True},\n    {\"nome\": \"Cura Menor\", \"nivel\": 1, \"disponivel\": False},\n    {\"nome\": \"Elixir Astral\", \"nivel\": 10, \"disponivel\": True},\n]\n\n# Filtrando e transformando em uma linha idiomática:\nnomes_disponiveis = [p[\"nome\"] for p in pocoes if p[\"disponivel\"] and p[\"nivel\"] >= 3]\n# Saída: [''Mana Maior'', ''Elixir Astral'']","explicacaoLinhaALinha":"A compreensão extrai `p[\"nome\"]` de cada elemento `p` onde a condição booleana for verdadeira."},"dicaPro":"Use List Comprehensions para operações diretas. Se a lógica exigir múltiplos `if` aninhados ou mais de 2 linhas, prefira um loop tradicional para não prejudicar a legibilidade."}]'::jsonb,
  '[{"termo":"List Comprehension","definicao":"Sintaxe concisa para criar listas a partir de outros iteráveis."},{"termo":"Imutabilidade Relativa","definicao":"Comprehensions criam uma nova lista sem alterar a lista original."},{"termo":"Lambda","definicao":"Função anônima de uma linha usada frequentemente como critério de ordenação em sorted()."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a3-p1',
  'm2-aula-3',
  2,
  1,
  'Passo 1: Transformação de Loop For em Comprehension',
  'Reescreva um loop tradicional de elevação ao quadrado em formato comprehension.',
  'conceitual',
  NULL,
  'facil',
  15,
  '[x**2 for x in numeros if x > 0].',
  NULL,
  'Expressão comprehension válida.',
  '["Escreva a expressão inicial","Adicione o iterador for","Adicione o filtro condicional"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a3-p2',
  'm2-aula-3',
  2,
  2,
  'Passo 2: Filtrando e Ordenando Inventário',
  'Filtre itens disponíveis com poder >= 50 e ordene alfabeticamente.',
  'codigo',
  NULL,
  'medio',
  25,
  'Utilize sorted() ao redor da lista filtrada.',
  'def ordenar_disponiveis(itens: list) -> list:
    return sorted([i["nome"] for i in itens if i.get("ativo")])',
  'Retorno ordenado dos nomes ativos.',
  '["Filtre com comprehension","Aplique sorted()","Retorne a lista"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a3-p3',
  'm2-aula-3',
  2,
  3,
  'Passo 3: Missão Oficial #9 — O Inventário de Poções',
  'Aplique comprehensions para filtrar, formatar e ordenar o estoque da alquimia na Missão #9.',
  'missao_oficial',
  9,
  'medio',
  50,
  'Retorne a lista de nomes ordenada alfabeticamente atendendo aos critérios de estoque.',
  NULL,
  'Passar na validação da Missão #9.',
  '["Abra a Missão #9","Submeta a solução pythônica","Pontue no ranking"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm2-aula-4',
  2,
  4,
  'Dicionários, Agregações e Análise de Dados',
  'Tabelas hash com dict, busca O(1) e funções nativas de agregação',
  '35 min',
  50,
  'Aprenda como os dicionários do Python funcionam por baixo do capô com tabelas hash ultra-rápidas, como usar .get() para evitar KeyErrors e calcular médias e totais com sum() e len().',
  '["Compreender o funcionamento de tabelas hash e complexidade de busca O(1).","Utilizar métodos fundamentais de dict: .get(), .items(), .keys(), .values().","Calcular agregações numéricas: sum(), min(), max() e médias aritméticas.","Evitar erros de chave ausente com valores padrão seguros."]'::jsonb,
  '[{"titulo":"1. Busca Instantânea em O(1)","explicacao":"Enquanto procurar um item em uma lista exige percorrer elemento por elemento (complexidade linear O(N)), os dicionários do Python utilizam **Tabelas Hash** que calculam o endereço de memória da chave instantaneamente (complexidade constante O(1)).\n\nIsso significa que consultar um herói por nome leva o mesmo tempo quer você tenha 10 heróis ou 1.000.000 de heróis!","analogiaRPG":"Uma lista é como procurar um tomo lendo prateleira por prateleira em uma biblioteca infinita. Um dicionário é como ter um feitiço de invocação que traz o livro exato para a sua mão em um segundo!","codigoExemplo":{"linguagem":"python","tituloSnippet":"Manipulação Segura de Dicionários","codigo":"ficha = {\n    \"nome\": \"Gandalf\",\n    \"classe\": \"Mago\",\n    \"poder\": 98,\n}\n\n# Acesso seguro que nunca lança KeyError:\ntitulo = ficha.get(\"titulo\", \"Aventureiro Desconhecido\")\n\n# Agregando listas de dicionários:\npersonagens = [{\"poder\": 80}, {\"poder\": 90}, {\"poder\": 100}]\npoder_total = sum(p[\"poder\"] for p in personagens)\npoder_medio = poder_total / len(personagens) # 90.0","explicacaoLinhaALinha":"O método `.get(chave, padrao)` retorna o valor padrão se a chave não existir. `sum(...)` calcula o total diretamente."},"dicaPro":"Para encontrar o registro com maior valor em uma linha, use `max(personagens, key=lambda p: p[\"poder\"])`."}]'::jsonb,
  '[{"termo":"Hash Table","definicao":"Estrutura de dados que mapeia chaves para valores através de uma função de dispersão."},{"termo":"Complexidade O(1)","definicao":"Tempo de execução constante independente do número total de registros."},{"termo":"KeyError","definicao":"Exceção lançada ao tentar acessar uma chave inexistente via colchetes dic[chave]."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a4-p1',
  'm2-aula-4',
  2,
  1,
  'Passo 1: Acesso Seguro com dict.get()',
  'Substitua acessos vulneráveis por acessos defensivos com valores de fallback.',
  'conceitual',
  NULL,
  'facil',
  15,
  'dict.get("campo", 0) previne travamentos.',
  NULL,
  'Eliminar potenciais KeyErrors.',
  '["Identifique os acessos diretos com colchetes","Substitua por .get()"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a4-p2',
  'm2-aula-4',
  2,
  2,
  'Passo 2: Cálculo de Média de Poder da Guilda',
  'Escreva a função que calcula a média de poder de uma lista de personagens.',
  'codigo',
  NULL,
  'medio',
  25,
  'sum(poderes) / len(lista) com tratamento para lista vazia.',
  'def media_poder(fichas: list) -> float:
    if not fichas:
        return 0.0
    return sum(f["poder"] for f in fichas) / len(fichas)',
  'Retornar média aritmética precisa ou 0.0 se vazia.',
  '["Valide a lista vazia","Some os valores com sum()","Divida pelo tamanho"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a4-p3',
  'm2-aula-4',
  2,
  3,
  'Passo 3: Missão Oficial #10 — O Grimório de Feitiços',
  'Organize feitiços por escola arcana e calcule as métricas de poder médio na Missão #10.',
  'missao_oficial',
  10,
  'medio',
  50,
  'Agrupe as magias em um dicionário de categorias.',
  NULL,
  'Concluir a categorização da Missão #10.',
  '["Abra a Missão #10","Implemente agrupar_feiticos()","Submeta a solução"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm2-aula-5',
  2,
  5,
  'Programação Orientada a Objetos (POO) e Classes',
  'Encapsulamento, métodos construtores (__init__), herança e polimorfismo',
  '40 min',
  60,
  'Aprenda como modelar o mundo real em código utilizando Classes, Métodos e Herança. Descubra o papel de self, construtores __init__ e como estender comportamentos com super().',
  '["Compreender classes como moldes para criação de instâncias de objetos.","Utilizar o método construtor __init__ e o ponteiro self.","Implementar herança de classes reutilizando a superclasse com super().__init__().","Aplicar encapsulamento de regras de combate (receber_dano, curar, atacar)."]'::jsonb,
  '[{"titulo":"1. O Molde Arcano da Criação","explicacao":"Uma classe funciona como uma planta arquitetônica (molde). A partir dela, você pode criar dezenas de instâncias concretas (objetos) com valores únicos nos seus atributos.\n\n- `__init__(self, ...)`: Método mágico executado automaticamente no instante em que o objeto nasce.\n- `self`: Representa a própria instância específica que está executando a ação.\n- `Herança`: Uma subclasse (`Guerreiro`) herda automaticamente todos os métodos da classe mãe (`Personagem`) e pode adicionar seus próprios poderes especiais.","analogiaRPG":"A classe \"Monstro\" define que todo monstro tem vida e ataque. Quando o dragão e o goblin nascem, cada um possui sua própria quantidade de vida, mas ambos sabem obedecer ao método \"atacar\"!","codigoExemplo":{"linguagem":"python","tituloSnippet":"Herança com super() em Python","codigo":"class Personagem:\n    def __init__(self, nome: str, vida: int, ataque: int):\n        self.nome = nome\n        self.vida = max(0, vida)\n        self.ataque = ataque\n\n    def receber_dano(self, quantidade: int):\n        self.vida = max(0, self.vida - quantidade)\n\nclass Paladino(Personagem):\n    def __init__(self, nome: str, vida: int, ataque: int, fe: int):\n        # Inicializa a classe herdada:\n        super().__init__(nome, vida, ataque)\n        self.fe = fe\n\n    def curar(self, quantidade: int):\n        if self.fe >= 10:\n            self.fe -= 10\n            self.vida += quantidade","explicacaoLinhaALinha":"`super().__init__()` chama o construtor de Personagem, garantindo que nome, vida e ataque sejam inicializados corretamente."},"dicaPro":"Sempre invoque `super().__init__(...)` na primeira linha do construtor de uma classe filha para evitar atributos não inicializados."}]'::jsonb,
  '[{"termo":"Classe","definicao":"Molde que encapsula atributos (dados) e métodos (comportamentos)."},{"termo":"Objeto / Instância","definicao":"Exemplar concreto criado em memória a partir de uma classe."},{"termo":"Herança","definicao":"Mecanismo que permite a uma classe herdar propriedades e métodos de outra."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a5-p1',
  'm2-aula-5',
  2,
  1,
  'Passo 1: Modelagem de Classes e Atributos',
  'Escreva a classe Arma com nome, dano e durabilidade inicializada no __init__.',
  'conceitual',
  NULL,
  'facil',
  20,
  'def __init__(self, nome, dano, durabilidade): self.nome = nome...',
  NULL,
  'Classe sintaticamente correta.',
  '["Declare class Arma:","Implemente o construtor","Armazene nos atributos de self"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a5-p2',
  'm2-aula-5',
  2,
  2,
  'Passo 2: Extensão de Subclasse com super()',
  'Crie a subclasse Mago que herda de Personagem e consome mana ao lançar feitiços.',
  'codigo',
  NULL,
  'medio',
  30,
  'Chame super().__init__() antes de definir self.mana.',
  'class Mago(Personagem):
    def __init__(self, nome: str, vida: int, ataque: int, mana: int):
        super().__init__(nome, vida, ataque)
        self.mana = mana',
  'Subclasse funcional com herança de métodos.',
  '["Crie a classe filha","Invoque super().__init__","Adicione métodos exclusivos"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m2-a5-p3',
  'm2-aula-5',
  2,
  3,
  'Passo 3: Missão Oficial #12 — O Simulador de Batalha de Guildas',
  'Implemente as classes de heróis e o motor de simulação de turnos de combate na Missão #12.',
  'missao_oficial',
  12,
  'dificil',
  50,
  'Garanta que a vida de combatentes derrotados nunca fique abaixo de 0.',
  NULL,
  'Concluir a simulação na Missão #12.',
  '["Abra a Missão #12","Implemente a lógica de turnos","Submeta a solução final"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm3-aula-1',
  3,
  1,
  'HTML5 Semântico: Estrutura, Sentido e SEO',
  'Abandonando as divs genéricas e adotando tags com significado real',
  '30 min',
  45,
  'Aprenda a construir páginas com marcação rica em significado semântico: substitua divs genéricas por <article>, <section>, <header>, <footer>, <nav> e listas de definição <dl>.',
  '["Compreender o conceito de semântica na web e seu impacto em SEO e leitores de tela.","Dominar a hierarquia correta de títulos (h1 até h6 sem saltos de nível).","Utilizar tags semânticas estruturais: <header>, <main>, <nav>, <article>, <aside>, <footer>.","Exibir pares de dados com listas de definição <dl>, <dt> e <dd>."]'::jsonb,
  '[{"titulo":"1. O que é HTML Semântico?","explicacao":"Uma tag semântica comunica claramente seu propósito tanto para o navegador quanto para o desenvolvedor e tecnologias assistivas (leitores de tela para deficientes visuais).\n\nUma `<div>` ou `<span>` não tem significado algum: servem apenas como contêineres genéricos de estilo. Já tags como `<article>`, `<nav>` ou `<figure>` explicam exatamente que tipo de informação contêm.","analogiaRPG":"Uma página cheia de divs genéricas é como uma mochila com 10 bolsos idênticos sem etiquetas. Você tem que abrir todos para saber o que tem dentro. Tags semânticas são como etiquetas mágicas luminosas que revelam imediatamente onde estão os pergaminhos, as poções e as armas!","codigoExemplo":{"linguagem":"html","tituloSnippet":"Card Semântico de Herói","codigo":"<article class=\"heroi-card\">\n  <header>\n    <h2>Legolas Verdefolha</h2>\n    <span class=\"classe\">Arqueiro Élfico</span>\n  </header>\n\n  <figure>\n    <img src=\"/avatar-legolas.jpg\" alt=\"Retrato do elfo Legolas com seu arco dourado\" />\n    <figcaption>Brasão da Floresta das Trevas</figcaption>\n  </figure>\n\n  <dl>\n    <dt>Universo:</dt>\n    <dd>Tolkien</dd>\n    <dt>Poder de Combate:</dt>\n    <dd>91 / 100</dd>\n  </dl>\n</article>","explicacaoLinhaALinha":"`<article>` isola o card como unidade independente. `<figure>` agrupa a imagem com sua legenda. `<dl>` organiza chave-valor com `<dt>` (termo) e `<dd>` (descrição)."},"dicaPro":"Cada página deve ter rigorosamente UM ÚNICO `<h1>`, que representa o título principal do documento. Nunca salte níveis de cabeçalho (ex: de h2 para h4 sem passar por h3).","atencaoArmadilha":"Nunca use tags semânticas apenas pelo visual padrão que o navegador dá (como negrito em cabeçalhos). Use-as pelo significado e controle o visual exclusivamente com CSS."}]'::jsonb,
  '[{"termo":"HTML Semântico","definicao":"Marcação que descreve o significado do conteúdo em vez de apenas sua aparência."},{"termo":"Lista de Definição (<dl>)","definicao":"Conjunto de termos (<dt>) e descrições (<dd>) ideal para fichas e estatísticas."},{"termo":"Árvore de Acessibilidade","definicao":"Estrutura gerada pelo navegador para tecnologias assistivas baseada na semântica."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a1-p1',
  'm3-aula-1',
  3,
  1,
  'Passo 1: Substituição de Divs Genéricas',
  'Identifique blocos de navegação e cabeçalho feitos com divs e troque por tags semânticas.',
  'conceitual',
  NULL,
  'facil',
  15,
  'Troque <div class="nav"> por <nav> e <div class="cabecalho"> por <header>.',
  NULL,
  'Substituição limpa sem quebrar estilos.',
  '["Localize a barra de navegação","Troque por <nav>","Ajuste os links em <ul>/<li>"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a1-p2',
  'm3-aula-1',
  3,
  2,
  'Passo 2: Construção de Lista de Definição (<dl>)',
  'Crie uma ficha de atributos usando <dl>, <dt> e <dd> para Poder, Nível e Classe.',
  'codigo',
  NULL,
  'facil',
  25,
  '<dl><dt>Classe:</dt><dd>Guerreiro</dd></dl>.',
  '<dl>
  <dt>Poder:</dt>
  <dd>85</dd>
  <dt>Classe:</dt>
  <dd>Guerreiro</dd>
</dl>',
  'Estrutura válida de lista de definição sem divs intermediárias.',
  '["Crie a tag <dl>","Adicione os pares dt/dd","Verifique a ordem dos termos"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a1-p3',
  'm3-aula-1',
  3,
  3,
  'Passo 3: Missão Oficial #13 — O Estandarte da Guilda',
  'Crie a página semântica completa com tags HTML5 acessíveis e bem estruturadas na Missão #13.',
  'missao_oficial',
  13,
  'medio',
  50,
  'Inclua <article>, <header>, <figure> e <dl> para aprovação total.',
  NULL,
  'Concluir a Missão #13 no catálogo oficial.',
  '["Abra a Missão #13","Monte o HTML semântico","Submeta a solução no editor"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm3-aula-2',
  3,
  2,
  'Acessibilidade Web (WCAG 2.1 AA) e Design Inclusivo',
  'Contraste de cores, navegação por teclado e descrições acessíveis',
  '35 min',
  50,
  'Aprenda as diretrizes fundamentais da WCAG 2.1 nível AA: como garantir taxa de contraste mínima de 4.5:1, suporte a navegação por teclado via Tab, atributos aria e foco visível (:focus-visible).',
  '["Compreender os 4 princípios da WCAG: Perceptível, Operável, Compreensível e Robusto (POUR).","Garantir contraste mínimo de 4.5:1 para texto normal e 3:1 para textos grandes.","Implementar navegação por teclado sem armadilhas de foco (keyboard traps).","Estilizar o estado :focus-visible sem remover outlines cegamente."]'::jsonb,
  '[{"titulo":"1. O Princípio da Acessibilidade como Obrigação","explicacao":"Acessibilidade não é um bônus: é um direito fundamental. Milhões de desenvolvedores e estudantes utilizam leitores de tela ou não conseguem operar um mouse tradicional devido a limitações motoras ou visuais.\n\nRegras de ouro da WCAG 2.1 AA:\n- **Contraste 4.5:1**: O texto sobre o fundo deve ter contraste suficiente para leitura confortável.\n- **Foco Visível**: Quem navega usando a tecla `Tab` precisa enxergar onde o cursor está.\n- **Alt Text Descritivo**: Toda tag `<img>` deve possuir `alt` que descreva o conteúdo (ou `alt=\"\"` se for puramente decorativa).","analogiaRPG":"Construir um castelo sem rampas de acesso e com placas invisíveis no escuro impede que guerreiros valorosos entrem na guilda para lutar ao seu lado!","codigoExemplo":{"linguagem":"css","tituloSnippet":"Variáveis de Alto Contraste e Foco Visível","codigo":":root {\n  --bg-dark: #0f172a;       /* Fundo ardósia profundo */\n  --text-light: #f8fafc;    /* Texto claro com taxa 15.8:1 (AAA) */\n  --focus-ring: #38bdf8;    /* Anel de foco azul celeste vibrante */\n}\n\n/* Indicador obrigatório de foco para navegação por teclado */\nbutton:focus-visible, a:focus-visible {\n  outline: 2px solid var(--focus-ring);\n  outline-offset: 3px;\n}","explicacaoLinhaALinha":"`outline-offset: 3px` afasta o anel de foco do botão, tornando-o imediatamente perceptível para usuários de teclado."},"dicaPro":"NUNCA use `outline: none` ou `outline: 0` sem fornecer um estilo substituto de alto contraste. Isso quebra a navegação por teclado completamente."}]'::jsonb,
  '[{"termo":"WCAG 2.1 AA","definicao":"Padrão internacional de acessibilidade web adotado por órgãos governamentais."},{"termo":"Taxa de Contraste","definicao":"Relação de luminância entre a cor do primeiro plano e a cor de fundo (mínimo 4.5:1)."},{"termo":":focus-visible","definicao":"Pseudoclasse CSS que aplica estilos apenas quando o foco é acionado via teclado."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a2-p1',
  'm3-aula-2',
  3,
  1,
  'Passo 1: Verificação de Razão de Contraste',
  'Calcule se pares de cores atendem à taxa mínima de 4.5:1 exigida pela WCAG AA.',
  'conceitual',
  NULL,
  'facil',
  15,
  'Cores escuras sobre fundos claros ou vice-versa.',
  NULL,
  'Identificar as combinações com conformidade AA.',
  '["Teste combinação 1","Teste combinação 2","Aponte o contraste mínimo"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a2-p2',
  'm3-aula-2',
  3,
  2,
  'Passo 2: Estilização de Foco Visível Seguro',
  'Adicione regras com outline e offset para botões no estado :focus-visible.',
  'codigo',
  NULL,
  'medio',
  25,
  'button:focus-visible { outline: 2px solid #38bdf8; }.',
  'button:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
}',
  'Regra CSS funcional com contorno destacado.',
  '["Defina a pseudoclasse","Configure outline","Defina offset"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a2-p3',
  'm3-aula-2',
  3,
  3,
  'Passo 3: Missão Oficial #14 — O Painel de Acessibilidade Real',
  'Aplique conformidade WCAG total em um painel com descrições alt, foco visível e contraste na Missão #14.',
  'missao_oficial',
  14,
  'medio',
  50,
  'Garanta descrições nas imagens e contraste de 4.5:1.',
  NULL,
  'Superar todos os testes de acessibilidade da Missão #14.',
  '["Abra a Missão #14","Ajuste os atributos de acessibilidade","Submeta a solução"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a2-p4',
  'm3-aula-2',
  3,
  4,
  'Passo 4: Missão Oficial #17 — O Formulário Encantado de Alistamento',
  'Estruture um formulário de cadastro 100% acessível associando etiquetas <label for> aos inputs, aria-describedby e contraste em conformidade com WCAG 2.1 AA.',
  'missao_oficial',
  17,
  'medio',
  45,
  'Todos os campos <input> devem possuir atributo id coincidente com o for do seu respectivo <label>.',
  NULL,
  'Formulário validado com árvore de acessibilidade limpa e sem erros de associação na Missão #17.',
  '["Acesse a Missão #17 no editor integrado.","Conecte todos os labels com atributos for/id e aria-required.","Submeta a solução e garanta a insígnia de acessibilidade."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm3-aula-3',
  3,
  3,
  'Layout Unidimensional Moderno com CSS Flexbox',
  'Alinhamento em linha e coluna, distribuição com gap e alinhamento transversal',
  '35 min',
  50,
  'Aprenda como dominar o CSS Flexbox: eixos principal e transversal, justify-content, align-items, flex-wrap e o fim dos hacks com float e tabelas.',
  '["Compreender o modelo flexível unidimensional e seus dois eixos (Main Axis e Cross Axis).","Distribuir itens com justify-content (center, space-between, space-around).","Alinhar no eixo transversal com align-items e align-self.","Espaçar filhos uniformemente usando a propriedade nativa gap."]'::jsonb,
  '[{"titulo":"1. O Fim dos Problemas de Centralização","explicacao":"Antigamente, centralizar um elemento horizontal e verticalmente no CSS era um pesadelo. Com Flexbox, isso é resolvido com apenas 3 linhas:\n\n```css\ndisplay: flex;\njustify-content: center; /* Alinha no eixo principal */\nalign-items: center;     /* Alinha no eixo transversal */\n```\n\nA propriedade `gap: 1rem` define o espaçamento limpo entre os filhos sem precisar aplicar margens manuais no último elemento!","analogiaRPG":"Flexbox é como a formação de infantaria da guilda: você pode ordenar que os guerreiros marchem em fila indiana (column) ou lado a lado (row), e manter a mesma distância exata entre eles automaticamente.","codigoExemplo":{"linguagem":"css","tituloSnippet":"Barra de Ferramentas Flexível","codigo":".barra-ferramentas {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n  padding: 1rem;\n}\n\n/* Em telas pequenas, quebra linha automaticamente */\n@media (max-width: 640px) {\n  .barra-ferramentas {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}","explicacaoLinhaALinha":"`space-between` empurra o primeiro item para a extrema esquerda e o último para a extrema direita. A media query reorganiza em coluna no celular."},"dicaPro":"Sempre adicione `flex-wrap: wrap` quando estiver distribuindo botões ou tags para que eles quebrem linha suavemente em vez de vazar para fora da tela."}]'::jsonb,
  '[{"termo":"Main Axis (Eixo Principal)","definicao":"Eixo definido por flex-direction (horizontal para row, vertical para column)."},{"termo":"Justify-Content","definicao":"Controla o alinhamento e distribuição de espaço ao longo do eixo principal."},{"termo":"Gap","definicao":"Espaçamento nativo e uniforme entre itens flex ou grid."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a3-p1',
  'm3-aula-3',
  3,
  1,
  'Passo 1: Identificação de Eixos no Flexbox',
  'Determine se o eixo principal é horizontal ou vertical ao mudar flex-direction.',
  'conceitual',
  NULL,
  'facil',
  15,
  'row = horizontal, column = vertical.',
  NULL,
  'Mapear os eixos corretamente.',
  '["Analise row","Analise column","Aponte o eixo de justify-content"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a3-p2',
  'm3-aula-3',
  3,
  2,
  'Passo 2: Barra de Status com Space-Between',
  'Monte uma classe .status-heroi que coloca vida à esquerda e ouro à direita.',
  'codigo',
  NULL,
  'facil',
  25,
  'display: flex; justify-content: space-between; align-items: center;.',
  '.status-heroi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}',
  'Regra CSS válida de distribuição flex.',
  '["Ative display: flex","Adicione justify-content","Configure o gap"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a3-p3',
  'm3-aula-3',
  3,
  3,
  'Passo 3: Missão Oficial #15 — O Estandarte Responsivo da Guilda',
  'Crie o estandarte com navegação flexível em coluna para smartphones e linha contínua para telas desktop com media query.',
  'missao_oficial',
  15,
  'medio',
  50,
  'Defina flex-direction: column por padrão e em @media (min-width: 768px) alterne para flex-direction: row com justify-content: space-between.',
  NULL,
  'Garantir adaptação responsiva fluida em mobile e desktop na Missão #15.',
  '["Abra a Missão #15 no editor de código.","Escreva o layout Flexbox responsivo mobile-first.","Submeta para validar o teste de renderização visual."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm3-aula-4',
  3,
  4,
  'Layout Bidimensional com CSS Grid e Design Responsivo',
  'Grades fluidas com repeat(), auto-fill, minmax() e proporções aspect-ratio',
  '40 min',
  60,
  'Aprenda a construir layouts complexos bidimensionais com CSS Grid: crie inventários que se adaptam fluidamente a qualquer resolução sem precisar de dezenas de media queries.',
  '["Compreender o modelo bidimensional (linhas e colunas simultâneas).","Dominar a fórmula mágica: repeat(auto-fill, minmax(120px, 1fr)).","Preservar proporções quadradas perfeitas com aspect-ratio: 1 / 1.","Alinhar áreas nomeadas de grid com grid-template-areas."]'::jsonb,
  '[{"titulo":"1. A Fórmula Definitiva da Grade Responsiva","explicacao":"A maior revolução do CSS moderno é a capacidade de criar grades que se adaptam à tela **sem precisar de nenhuma media query** manual!\n\n`grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));`\n\n- `repeat(auto-fill, ...)`: Diz ao navegador para colocar quantas colunas couberem no espaço disponível.\n- `minmax(140px, 1fr)`: Cada coluna terá NO MÍNIMO 140px. Se houver sobra de espaço, todas se expandirão igualmente até 1 fração (`1fr`).","analogiaRPG":"É a mochila de aventureiro perfeita: se você estiver no celular, ela exibe 2 slots por linha. Se abrir o jogo em um monitor ultrawide, os mesmos slots se organizam em 8 colunas perfeitamente alinhadas!","codigoExemplo":{"linguagem":"css","tituloSnippet":"Inventário Mágico Fluido","codigo":".mochila-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 1rem;\n}\n\n.item-slot {\n  aspect-ratio: 1 / 1; /* Força proporção perfeitamente quadrada */\n  background: #1e293b;\n  border: 1px solid #475569;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.item-slot:hover {\n  transform: translateY(-4px);\n  border-color: #6366f1;\n}","explicacaoLinhaALinha":"`aspect-ratio: 1/1` garante que a altura seja sempre idêntica à largura, criando slots quadrados perfeitos."},"dicaPro":"Combine CSS Grid para o contêiner geral da página ou inventário e CSS Flexbox dentro de cada card individual. Cada ferramenta no seu lugar certo!"}]'::jsonb,
  '[{"termo":"CSS Grid","definicao":"Sistema de layout bidimensional para alinhamento simultâneo de linhas e colunas."},{"termo":"Fraction Unit (1fr)","definicao":"Unidade de medida que representa uma fração do espaço disponível no contêiner."},{"termo":"Aspect-Ratio","definicao":"Propriedade CSS que define uma relação de proporção fixa entre largura e altura."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a4-p1',
  'm3-aula-4',
  3,
  1,
  'Passo 1: Decifrando a Função minmax()',
  'Calcule quantas colunas de minmax(100px, 1fr) cabem em um contêiner de 500px.',
  'conceitual',
  NULL,
  'facil',
  15,
  '500px divididos por 100px cabem até 5 colunas.',
  NULL,
  'Calcular corretamente o número de frações.',
  '["Divida o espaço pelo tamanho mínimo","Considere o gap entre colunas"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a4-p2',
  'm3-aula-4',
  3,
  2,
  'Passo 2: Grade de Slots Quadrados',
  'Escreva a classe .grade-inventario com repeat auto-fill e aspect-ratio.',
  'codigo',
  NULL,
  'medio',
  25,
  'grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));.',
  '.grade-inventario {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}',
  'Regra CSS válida com layout fluido.',
  '["Ative display: grid","Insira a fórmula minmax","Defina o gap"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a4-p3',
  'm3-aula-4',
  3,
  3,
  'Passo 3: Missão Oficial #16 — O Inventário em Grade Mágica',
  'Construa o inventário responsivo completo de 24 slots mágicos utilizando repeat(auto-fill, minmax(100px, 1fr)) e gap uniforme.',
  'missao_oficial',
  16,
  'dificil',
  50,
  'Evite larguras fixas com width; deixe a função minmax() calcular a fração fluida 1fr.',
  NULL,
  'Concluir a Missão #16 no catálogo oficial com grid 2D adaptativo.',
  '["Abra a Missão #16 no editor de código.","Implemente a grade responsiva com auto-fill.","Submeta a solução e confira o arranjo dos slots."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m3-a4-p4',
  'm3-aula-4',
  3,
  4,
  'Passo 4: Missão Oficial #18 — A Barra de Vida e Mana com Animações CSS',
  'Crie barras de status reativas com transições suaves (transition: width 0.4s ease-in-out) e efeito pulsante de mana usando keyframes CSS.',
  'missao_oficial',
  18,
  'medio',
  45,
  'Defina @keyframes pulso-mana { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }.',
  NULL,
  'Animações suaves e barras com transição temporal na Missão #18.',
  '["Acesse a Missão #18 no catálogo.","Declare as transições CSS e a regra de keyframes.","Submeta para inspecionar os efeitos visuais."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm4-aula-1',
  4,
  1,
  'JavaScript Moderno ES6+, Imutabilidade e Escopo',
  'Declarações const/let, Arrow Functions, Spread (...) e Desestruturação',
  '30 min',
  45,
  'Aprenda as bases do JavaScript moderno pós-ES6: por que você nunca mais deve usar "var", como arrow functions mantêm o this léxico e como manipular objetos de forma puramente imutável.',
  '["Compreender escopo de bloco com let e const versus escopo global de var.","Dominar a sintaxe de Arrow Functions: (a, b) => a + b.","Aplicar Desestruturação de objetos e arrays: const { nome, poder } = heroi.","Criar cópias imutáveis de objetos e arrays com o Spread Operator (...)."]'::jsonb,
  '[{"titulo":"1. O Princípio Sagrado da Imutabilidade","explicacao":"No desenvolvimento frontend moderno (React, Next.js, Redux), **nunca devemos alterar diretamente um objeto ou array existente** (`heroi.vida = 50`).\n\nEm vez disso, geramos um NOVO objeto contendo todas as propriedades do original com as alterações pontuais desejadas através do Spread Operator (`...`). Isso previne efeitos colaterais ocultos e permite que o motor de renderização detecte mudanças instantaneamente.","analogiaRPG":"Em vez de rasurar e riscar um pergaminho sagrado original até furar o papel, o escrivão lança um feitiço de duplicação instantânea e escreve o novo bônus na cópia preservando a integridade do original.","codigoExemplo":{"linguagem":"javascript","tituloSnippet":"Imutabilidade e Desestruturação ES6","codigo":"// Objeto original:\nconst fichaOriginal = {\n  nome: \"Aragorn\",\n  classe: \"Ranger\",\n  poder: 88,\n  equipamentos: [\"Espada\", \"Arco\"],\n};\n\n// Atualização imutável:\nconst { poder, ...restante } = fichaOriginal;\nconst fichaAtualizada = {\n  ...restante,\n  poder: Math.min(100, poder + 10), // Limite RN01\n  status: \"Bênção Arcana Ativa\",\n};","explicacaoLinhaALinha":"`{ poder, ...restante }` desestrutura o poder separando os demais campos. O novo objeto é criado sem tocar em `fichaOriginal`."},"dicaPro":"Adote a regra: use SEMPRE `const` por padrão. Só use `let` se a variável for explicitamente reatribuída dentro de um laço de repetição. E nunca use `var`."}]'::jsonb,
  '[{"termo":"Imutabilidade","definicao":"Princípio onde os dados não podem ser modificados após sua criação."},{"termo":"Spread Operator (...)","definicao":"Sintaxe que expande propriedades de um objeto ou elementos de um array."},{"termo":"Desestruturação","definicao":"Extração direta de campos de objetos ou itens de arrays em variáveis locais."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a1-p1',
  'm4-aula-1',
  4,
  1,
  'Passo 1: Desestruturação de Propriedades',
  'Extraia nome, poder e classe de uma ficha em variáveis locais com uma linha.',
  'conceitual',
  NULL,
  'facil',
  15,
  'const { nome, poder, classe } = heroi;.',
  NULL,
  'Desestruturação limpa sem repetição.',
  '["Declare a const entre chaves","Atribua o objeto de origem"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a1-p2',
  'm4-aula-1',
  4,
  2,
  'Passo 2: Clonagem Imutável com Spread Operator',
  'Retorne uma cópia do personagem incrementando o poder em 15 sem alterar o original.',
  'codigo',
  NULL,
  'medio',
  25,
  'return { ...heroi, poder: heroi.poder + 15 };.',
  'function subirPoder(heroi, bonus) {
  return {
    ...heroi,
    poder: Math.min(100, heroi.poder + bonus),
  };
}',
  'Retornar nova referência com poder atualizado.',
  '["Utilize o spread ...heroi","Sobrescreva o campo poder","Retorne o novo objeto"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a1-p3',
  'm4-aula-1',
  4,
  3,
  'Passo 3: Missão Oficial #19 — A Forja de Atributos com ES6+',
  'Implemente a função forjar_equipamento() que mescla atributos mágicos usando o spread operator (...) e desestruturação sem modificar o objeto original.',
  'missao_oficial',
  19,
  'medio',
  50,
  'Retorne { ...equipamentoBase, ...encantamento, poderFinal: calcular() } sem usar mutação direta.',
  NULL,
  'Concluir a Missão #19 com princípios estritos de imutabilidade funcional.',
  '["Acesse a Missão #19 no editor.","Aplique spread operator e desestruturação de parâmetros.","Submeta para validar os testes sem efeitos colaterais."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm4-aula-2',
  4,
  2,
  'Métodos Funcionais de Array: filter, map e reduce',
  'Processamento declarativo de dados sem efeitos colaterais e sem loops for manuais',
  '35 min',
  50,
  'Aprenda a trindade da programação funcional em JavaScript: .filter() para selecionar itens, .map() para transformar dados e .reduce() para agregar coleções em totais e médias.',
  '["Dominar .filter((item) => boolean) para selecionar subconjuntos de dados.","Dominar .map((item) => novoItem) para transformar listas mantendo o mesmo tamanho.","Dominar .reduce((acumulador, item) => ..., valorInicial) para agregações.","Encadear métodos funcionais em pipelines declarativos de alta legibilidade."]'::jsonb,
  '[{"titulo":"1. O Pipeline Declarativo de Dados","explicacao":"Em vez de escrever loops imperativos com índices manuais `for (let i = 0; i < n; i++)`, o JavaScript funcional permite encadear métodos declarativos:\n\n- `.filter()`: Testa cada item. Se o callback retornar `true`, o item entra no novo array.\n- `.map()`: Transforma cada item, gerando um novo array com as transformações.\n- `.reduce()`: Dobra e condensa toda a lista em um único valor final (soma, média ou objeto acumulado).","analogiaRPG":"É a linha de montagem da forja anã: primeiro você descarta os minérios com impurezas (filter), depois derrete e molda as lâminas perfeitas (map) e por fim reúne todas as espadas no arsenal da guilda (reduce).","codigoExemplo":{"linguagem":"javascript","tituloSnippet":"Pipeline Funcional Completo","codigo":"const guerreiros = [\n  { nome: \"Aragorn\", ativo: true, poder: 88 },\n  { nome: \"Boromir\", ativo: false, poder: 75 },\n  { nome: \"Legolas\", ativo: true, poder: 92 },\n];\n\n// 1. Apenas os ativos com poder >= 80:\nconst elite = guerreiros\n  .filter((g) => g.ativo && g.poder >= 80)\n  .map((g) => g.nome.toUpperCase());\n// [''ARAGORN'', ''LEGOLAS'']\n\n// 2. Poder total da elite via reduce:\nconst poderTotal = guerreiros\n  .filter((g) => g.ativo)\n  .reduce((acumulado, g) => acumulado + g.poder, 0);","explicacaoLinhaALinha":"No `.reduce()`, o segundo parâmetro `0` define o valor inicial obrigatório do acumulador para evitar quebras em listas vazias."},"dicaPro":"Sempre forneça o valor inicial no `.reduce()` (ex: `, 0` ou `, []`). Se a lista vier vazia de uma API e não houver valor inicial, o JavaScript lançará um `TypeError: Reduce of empty array with no initial value`."}]'::jsonb,
  '[{"termo":"Programação Declarativa","definicao":"Estilo de código focado no \"o que fazer\" em vez do \"como iterar passo a passo\"."},{"termo":"Método .map()","definicao":"Gera um novo array transformando cada elemento da lista original."},{"termo":"Método .reduce()","definicao":"Acumula todos os valores de uma lista em um único resultado escalar ou objeto."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a2-p1',
  'm4-aula-2',
  4,
  1,
  'Passo 1: Filtragem com Predicado Booleano',
  'Filtre uma lista de missões retornando apenas as de dificuldade "dificil".',
  'conceitual',
  NULL,
  'facil',
  15,
  'missoes.filter((m) => m.dificuldade === "dificil").',
  NULL,
  'Retornar apenas missões difíceis.',
  '["Invoque .filter()","Retorne o teste de igualdade"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a2-p2',
  'm4-aula-2',
  4,
  2,
  'Passo 2: Cálculo de Soma com .reduce()',
  'Escreva a função que soma o poder total de todos os integrantes de uma sala.',
  'codigo',
  NULL,
  'medio',
  25,
  'return lista.reduce((acc, item) => acc + item.poder, 0);.',
  'function somarPoderGuilda(membros) {
  return membros.reduce((acc, m) => acc + m.poder, 0);
}',
  'Retorno numérico exato da soma total com fallback para 0.',
  '["Passe o acumulador e o item","Some o poder","Defina o 0 inicial"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a2-p3',
  'm4-aula-2',
  4,
  3,
  'Passo 3: Missão Oficial #21 — O Somador de Poderes via Reduce',
  'Processe as fichas da guilda calculando estatísticas e médias usando reduce na Missão #21.',
  'missao_oficial',
  21,
  'medio',
  50,
  'Utilize reduce para agrupar e calcular a média em uma passada.',
  NULL,
  'Concluir a Missão #21 no catálogo oficial.',
  '["Abra a Missão #21","Implemente o pipeline funcional","Submeta a solução no editor"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm4-aula-3',
  4,
  3,
  'Manipulação do DOM e Gestão Reativa de Eventos',
  'querySelector, addEventListener, classes dinâmicas e formulários',
  '35 min',
  50,
  'Aprenda como o JavaScript conecta o código à tela viva do navegador: selecionando elementos pelo DOM, reagindo a cliques e formulários e alternando estilos de forma desacoplada.',
  '["Compreender a árvore de nós do DOM (Document Object Model).","Selecionar elementos de forma segura com document.querySelector e querySelectorAll.","Escutar interações do usuário com addEventListener(\"click\", callback).","Manipular estados visuais desacoplados com element.classList (add, remove, toggle)."]'::jsonb,
  '[{"titulo":"1. O DOM como Árvore Viva","explicacao":"O navegador transforma o arquivo HTML em uma árvore hierárquica de objetos chamada **DOM (Document Object Model)**. O JavaScript consegue ler, alterar, adicionar e remover qualquer nó dessa árvore em tempo real.\n\nBoas práticas de manipulação:\n- Sempre verifique se o elemento foi encontrado antes de tentar adicionar ouvintes de eventos.\n- Altere classes CSS (`classList.add(\"ativo\")`) em vez de alterar estilos inline (`element.style.color = \"red\"`).\n- Desabilite botões após o primeiro clique (`btn.disabled = true`) para prevenir envios duplos acidentais.","analogiaRPG":"O DOM é como o corpo de um golem de batalha: cada membro é um nó. O JavaScript é a centelha de consciência que diz para o braço esquerdo erguer o escudo assim que um ataque é detectado!","codigoExemplo":{"linguagem":"javascript","tituloSnippet":"Botão de Ação com Prevenção de Duplo Clique","codigo":"function configurarBotaoEquipar() {\n  const botao = document.querySelector(\"#btn-equipar\");\n  const displayArma = document.querySelector(\"#status-arma\");\n\n  // Verificação defensiva de existência do nó:\n  if (!botao || !displayArma) return;\n\n  botao.addEventListener(\"click\", () => {\n    displayArma.textContent = \"Espada Vorpal Equipada!\";\n    displayArma.classList.add(\"arma-ativa\");\n    \n    // Evita múltiplos cliques simultâneos:\n    botao.disabled = true;\n    botao.textContent = \"Equipado com Sucesso ✓\";\n  });\n}","explicacaoLinhaALinha":"`if (!botao) return` previne o temido erro `TypeError: Cannot read property addEventListener of null`."},"dicaPro":"Nunca acople o estilo diretamente no JavaScript. Mantenha as cores e animações no CSS e apenas adicione ou remova classes semânticas como `.is-open`, `.is-active` ou `.is-disabled`."}]'::jsonb,
  '[{"termo":"DOM","definicao":"Document Object Model: representação em memória da página web como árvore de objetos."},{"termo":"EventListener","definicao":"Função ouvinte que aguarda e reage a eventos como cliques, teclas ou toques."},{"termo":"ClassList","definicao":"API moderna para manipulação de classes CSS de um elemento HTML sem sobrescrever outras classes."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a3-p1',
  'm4-aula-3',
  4,
  1,
  'Passo 1: Seleção Segura de Elementos',
  'Escreva a seleção de um botão pelo ID com verificação de nulidade.',
  'conceitual',
  NULL,
  'facil',
  15,
  'const btn = document.querySelector("#meu-btn"); if (!btn) return;.',
  NULL,
  'Seleção segura sem erros de execução.',
  '["Chame querySelector","Adicione a guarda if (!btn)"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a3-p2',
  'm4-aula-3',
  4,
  2,
  'Passo 2: Alternância de Classes em Clique',
  'Crie o listener que alterna a classe "item-selecionado" ao clicar.',
  'codigo',
  NULL,
  'medio',
  25,
  'card.classList.toggle("item-selecionado");.',
  'function alternarSelecao(elemento) {
  elemento.classList.toggle("selecionado");
}',
  'Toggle funcional da classe CSS.',
  '["Acesse classList","Invoque .toggle()"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a3-p3',
  'm4-aula-3',
  4,
  3,
  'Passo 3: Missão Oficial #22 — O Seletor de Equipamentos Dinâmico',
  'Dê vida ao painel de inventário manipulando classes e exibindo o item equipado na Missão #22.',
  'missao_oficial',
  22,
  'medio',
  50,
  'Atualize o texto e classes do elemento ativo.',
  NULL,
  'Concluir a Missão #22 no catálogo oficial.',
  '["Abra a Missão #22","Conecte os eventos do DOM","Submeta a solução no editor"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a3-p4',
  'm4-aula-3',
  4,
  4,
  'Passo 4: Missão Oficial #20 — O Manipulador do Domínio do DOM',
  'Manipule a árvore viva do documento: selecione nós com querySelectorAll, alterne classes CSS de tema e renderize dinamicamente a lista de itens da guilda.',
  'missao_oficial',
  20,
  'medio',
  45,
  'Utilize elemento.classList.toggle("ativo") e createElement("li") associado a appendChild().',
  NULL,
  'Modificar nós da árvore DOM conforme os eventos disparados na Missão #20.',
  '["Abra a Missão #20 no catálogo.","Implemente os seletores e manipuladores de nós.","Submeta a solução no editor interativo."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (
  'm4-aula-4',
  4,
  4,
  'Programação Assíncrona, Promises e Fetch API',
  'Consumo resiliente de APIs REST externas com async/await e tratamento HTTP',
  '40 min',
  60,
  'Aprenda como se comunicar com servidores na nuvem: o que são Promises, como funciona o Event Loop, como consumir endpoints com fetch e async/await e como tratar falhas de rede e erros HTTP 4xx/5xx.',
  '["Compreender o modelo não-bloqueante do JavaScript e o Event Loop.","Dominar Promises e sua sintaxe moderna com async/await.","Consumir endpoints REST com fetch(url, options).","Validar respostas HTTP verificando explicitamente if (!response.ok) throw new Error()."]'::jsonb,
  '[{"titulo":"1. A Armadilha Clássica do fetch()","explicacao":"Atenção ao maior erro cometido por desenvolvedores júnior com `fetch`: **o fetch NÃO rejeita a Promise quando o servidor responde com erro 404 (Não Encontrado) ou 500 (Erro Interno)!**\n\nO `fetch` só cai no bloco `catch` se houver uma falha catastrófica de rede (como estar offline). Para erros HTTP normais, ele resolve a promise com sucesso, cabendo a você verificar obrigatoriamente se `resposta.ok` é verdadeiro!","analogiaRPG":"É como enviar um corvo mensageiro para a fortaleza inimiga: se o corvo for abatido no caminho (queda de rede), você nunca recebe a carta. Mas se o corvo chegar e voltar com uma carta dizendo \"Rejeitamos seu pedido de paz\" (HTTP 403), a entrega funcionou, mas a mensagem é de recusa!","codigoExemplo":{"linguagem":"javascript","tituloSnippet":"Consumo Robusto de API REST","codigo":"async function buscarMissoesDaGuilda(endpoint) {\n  try {\n    const resposta = await fetch(endpoint);\n\n    // Verificação OBRIGATÓRIA de status HTTP 2xx:\n    if (!resposta.ok) {\n      throw new Error(`Erro da Guilda: Código HTTP ${resposta.status}`);\n    }\n\n    const dados = await resposta.json();\n    return dados.sort((a, b) => b.poder - a.poder);\n  } catch (erro) {\n    console.error(\"[GUILDA_API_ERRO]\", erro.message);\n    throw erro; // Repassa para tratamento visual na UI\n  }\n}","explicacaoLinhaALinha":"`if (!resposta.ok)` intercepta respostas de erro (404, 500, etc.) e lança uma exceção limpa."},"dicaPro":"Sempre envolva chamadas com `await fetch` em blocos `try / catch` para manter sua aplicação viva e exibir mensagens amigáveis ao usuário em vez de uma tela branca."}]'::jsonb,
  '[{"termo":"Promise","definicao":"Objeto que representa a conclusão (ou falha) futura de uma operação assíncrona."},{"termo":"Async / Await","definicao":"Açúcar sintático para trabalhar com Promises de forma limpa e sequencial."},{"termo":"response.ok","definicao":"Booleano retornado pelo fetch que indica se o status HTTP está na faixa de sucesso (200-299)."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  subtitulo = EXCLUDED.subtitulo,
  resumo = EXCLUDED.resumo,
  secoes = EXCLUDED.secoes,
  conceitos_chave = EXCLUDED.conceitos_chave;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a4-p1',
  'm4-aula-4',
  4,
  1,
  'Passo 1: Verificação Obrigatória de response.ok',
  'Identifique por que um fetch sem verificação de resposta.ok quebrava silenciosamente em erros 404.',
  'conceitual',
  NULL,
  'facil',
  20,
  'Lembre-se: fetch não rejeita status 404 automaticamente.',
  NULL,
  'Explicar a necessidade do teste de status HTTP.',
  '["Analise a resposta HTTP","Adicione o lançamento explícito com throw"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a4-p2',
  'm4-aula-4',
  4,
  2,
  'Passo 2: Função Assíncrona com try/catch e .json()',
  'Construa a função carregarRanking() que consome a API e trata exceções.',
  'codigo',
  NULL,
  'medio',
  30,
  'const res = await fetch("/api/ranking"); if (!res.ok) throw ... return await res.json();.',
  'async function carregarRanking() {
  try {
    const res = await fetch("/api/ranking");
    if (!res.ok) throw new Error("Falha na consulta");
    return await res.json();
  } catch (err) {
    return [];
  }
}',
  'Função assíncrona resiliente com retorno seguro.',
  '["Declare com async","Use await no fetch","Trate o erro no catch"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a4-p3',
  'm4-aula-4',
  4,
  3,
  'Passo 3: Missão Oficial #23 — O Feitiço da API Assíncrona',
  'Implemente a requisição fetch assíncrona com validação de status e retorno no desafio final da trilha.',
  'missao_oficial',
  23,
  'dificil',
  50,
  'Garanta tratamento para status HTTP diferente de 200.',
  NULL,
  'Concluir a Missão #23 no catálogo oficial.',
  '["Abra a Missão #23","Implemente a requisição assíncrona","Submeta a solução final"]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (
  'atv-m4-a4-p4',
  'm4-aula-4',
  4,
  4,
  'Passo 4: Missão Oficial #24 — O Oráculo do Cache e Debounce de Busca',
  'Construa o mecanismo de busca com debounce (clearTimeout/setTimeout) e cache em memória (Map) para evitar disparos redundantes à API de missões.',
  'missao_oficial',
  24,
  'dificil',
  60,
  'Se cache.has(termo), retorne imediatamente a Promise com cache.get(termo) sem acionar nova requisição de rede.',
  NULL,
  'Concluir a Missão #24 no desafio mestre da trilha pedagógica.',
  '["Acesse a Missão #24 no catálogo oficial.","Implemente o cache em Map e o cancelamento do temporizador de debounce.","Submeta a solução e conquiste o troféu final da trilha."]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao_passo = EXCLUDED.descricao_passo,
  criterio_aceite = EXCLUDED.criterio_aceite;

