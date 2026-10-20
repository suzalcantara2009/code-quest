# CodeQuest — Especificação Técnica Final (Spec)

> **Documento de Especificação Técnica e Arquitetural do Projeto CodeQuest**  
> Elaborado rigorosamente conforme o template de 8 seções normativas do Anexo A da apostila de desenvolvimento.  
> **Status:** Versão Final Atualizada — Alinhada com o Schema Prisma, Rotas, Telas e Catálogo Oficial de Missões.

---

## 1. Objetivo

O **CodeQuest** é uma plataforma web gamificada projetada para resolver a falta de engajamento e a estagnação de desenvolvedores júniores e estudantes de TI em portfólios estáticos tradicionais (ex.: perfis simples do GitHub, arquivos README sem interação). 

A plataforma transforma o aprendizado prático de desenvolvimento de software em uma jornada de RPG (*Role-Playing Game*). Cada usuário gerencia uma **Ficha de Personagem** cujo atributo de **Poder de Combate (0–100)** evolui de maneira verificável e transparente por meio de dois pilares complementares:
1. **Conclusão de Missões Pedagógicas Práticas**: Desafios algorítmicos e de código estruturados em uma Trilha de Aprendizagem de 4 módulos encadeados (Programação em Blocos, Python, HTML5/CSS3 e JavaScript ES6+);
2. **Atividade Real e Verificada no GitHub**: Integração com a API do GitHub com cache relacional persistido, extraindo métricas públicas (repositórios, linguagens e estrelas acumuladas).

Além da progressão individual do estudante, o CodeQuest oferece ecossistemas completos para educadores (Salas de Aula Virtuais com acompanhamento de turmas), moderadores (Tribunal de Denúncias contra condutas abusivas) e administradores (Curadoria oficial de desafios didáticos e auditoria inviolável em conformidade com a LGPD).

---

## 2. Usuários

O sistema possui 5 perfis de usuários com níveis hierárquicos e permissões estritas de acesso:

1. **Visitante (Não Autenticado)**:
   - Navega pela vitrine pública de personagens ativos.
   - Aplica buscas textuais por nome/classe combinadas com filtros por universo.
   - Consulta o ranking público dos desenvolvedores mais poderosos.
   - Visualiza a ementa dos módulos da trilha de aprendizagem.

2. **Estudante / Desenvolvedor Júnior**:
   - Cria e autentica conta via e-mail/senha ou login social OAuth do GitHub.
   - Confirma seu endereço de e-mail e aceita obrigatoriamente os Termos de Uso e Política de Privacidade (LGPD).
   - Cadastra, visualiza, edita e arquiva/restaura sua própria ficha de personagem (respeitando a regra de no máximo 1 ficha ativa por conta).
   - Vincula seu nome de usuário do GitHub para enriquecer os atributos da ficha.
   - Percorre a Trilha de Aprendizagem, consulta o catálogo de missões com filtros por módulo e dificuldade, copia códigos iniciais e submete resoluções.
   - Denuncia personagens com nomes ou condutas impróprias e acompanha o status de sua denúncia.
   - Exerce o direito de portabilidade de dados pessoais via exportação em formato legível (JSON).

3. **Professor / Educador**:
   - Possui todos os privilégios do perfil Estudante.
   - Cria salas de aula virtuais temáticas com códigos de acesso alfanuméricos exclusivos.
   - Matricula e gerencia alunos em turmas, remove matrículas e acompanha a matriz de progresso pedagógico da turma.
   - Atribui desafios personalizados e exporta relatórios de desempenho em formato estruturado (CSV).

4. **Moderador de Conteúdo**:
   - Acessa a câmara de moderação e o painel de denúncias pendentes.
   - Analisa denúncias de fichas impróprias, deferindo-as como *procedentes* (com arquivamento compulsório da ficha) ou rejeitando-as como *improcedentes*, sempre com justificativa formal registrada em auditoria inviolável.
   - É impedido pelas regras de negócio de analisar denúncias vinculadas à sua própria ficha.

5. **Administrador / Curador Oficial**:
   - Acesso irrestrito a todas as áreas administrativas da plataforma.
   - Forja, cadastra, edita e gerencia as missões e módulos oficiais da Trilha Pedagógica.
   - Consulta e filtra as crônicas completas do log de auditoria imutável por ficha, autor, tipo de ação e período temporal.
   - Acompanha o painel de métricas agregadas do ecossistema (total de contas, personagens ativos, conclusões de missões e denúncias).
   - Executa suspensão e reativação disciplinar de contas de usuário e a exclusão definitiva por solicitação LGPD.
   - Reverte arquivamentos decorrentes de deliberações disciplinares de moderação.

---

## 3. Casos de Uso Principais

* **UC01 — Autenticação e Gestão de Conta**: Cadastro de usuário com validação de senha, aceite de termos de privacidade LGPD, confirmação de e-mail, login seguro com cookie `HttpOnly`, logout de sessão única ou encerramento global de sessões ativas.
* **UC02 — Recuperação Segura de Acesso**: Solicitação de redefinição de senha com limitação de taxa (*rate limit*), token criptográfico de uso único com expiração em 1 hora e gravação de tentativa bloqueada em auditoria.
* **UC03 — Gestão da Ficha de Personagem**: Criação de personagem com nome, classe, universo temático (7 opções permitidas), poder inicial (0–100) e username do GitHub, garantindo unicidade de 1 ficha ativa por usuário.
* **UC04 — Ciclo de Vida da Ficha (Arquivamento e Restauração)**: Exclusão lógica (`ativo = false`) com confirmação explícita em modal; restauração de personagem arquivado arquivando automaticamente o personagem ativo prévio na mesma transação.
* **UC05 — Busca e Navegação no Mural Público**: Listagem paginada (10 itens/página) de personagens ativos, com ordenação padrão por nome e filtros combinados por texto e universo.
* **UC06 — Consulta de Métricas do GitHub**: Exibição resiliente de repositórios, linguagens e estrelas a partir de cache relacional (`github_cache`, expiração de 1h), tolerando falhas externas e timeout de 3 segundos sem travar a interface.
* **UC07 — Navegação pela Trilha Pedagógica**: Acesso não-linear aos 4 módulos encadeados (Blocos → Python → HTML/CSS → JavaScript), permitindo consultar ementas e competências técnicas.
* **UC08 — Consulta e Filtro do Catálogo de Missões**: Filtragem dos desafios práticos por módulo e por dificuldade (Fácil, Médio, Difícil), visualizando enunciados, código template e critérios de aceite.
* **UC09 — Submissão e Registro de Conclusão de Missão**: Submissão da resolução do desafio, gravação única por ficha na tabela `missoes_concluidas` e feedback visual instantâneo com toast e atualização de poder.
* **UC10 — Curadoria Oficial de Missões**: Administrador cadastra novos desafios no catálogo oficial com título, enunciado, código template, critério de validação e nível de dificuldade, gerando log em auditoria.
* **UC11 — Moderação de Conteúdo e Tribunal de Denúncias**: Estudante denuncia ficha ofensiva; moderador examina o motivo e decide pela procedência (arquivando a ficha) ou improcedência, com justificativa obrigatória.
* **UC12 — Reversão Administrativa de Moderação**: Administrador analisa ficha arquivada por denúncia e, se justificado, restaura seu status ativo, privilégio negado a moderadores comuns.
* **UC13 — Consulta ao Log Inviolável de Auditoria**: Administrador filtra o histórico completo de mutações do banco de dados por ficha, autor, tipo de ação e janela temporal (24h, 7d, 30d).
* **UC14 — Gestão de Salas de Aula Virtuais**: Professor cria sala virtual, gera código de acesso único, matricula/remove alunos e acompanha a matriz de resolução de missões.
* **UC15 — Privacidade e Portabilidade LGPD**: Usuário exporta todos os seus dados cadastrais, fichas, auditorias e histórico de missões em arquivo JSON legível.

---

## 4. Requisitos Funcionais

### Módulo A — Conta e Autenticação
* **RF01a** — Cadastro e login por e-mail e senha com hash seguro (`bcryptjs` com custo $\ge 10$), sessão persistida via cookie seguro (`HttpOnly`, `Secure`, `SameSite=Strict`), bloqueio temporário após 5 tentativas incorretas consecutivas e fluxo de "esqueci minha senha" com token de uso único (expiração de 1 hora) limitado a 1 solicitação a cada 2 minutos por e-mail/IP. *(MVP)*
* **RF01b** — Login social via OAuth do GitHub com suporte a contas sem senha prévia, associando a conta automaticamente à ficha existente caso haja `usuario_github` idêntico. *(V2)*
* **RF01c** — Verificação obrigatória de e-mail com token temporário; contas pendentes de confirmação em até 7 dias têm bloqueado o acesso a mutações de ficha (criar, editar, arquivar, restaurar). *(MVP)*
* **RF01d** — Edição cadastral dos dados da conta (nome, e-mail e senha) pelo próprio usuário logado; alterar o e-mail exige nova verificação de segurança antes de liberar autenticações futuras. *(MVP)*
* **RF01e** — Encerramento de sessão atual (`/api/auth/logout`) e opção "Encerrar todas as sessões", que revoga todos os refresh tokens ativos do usuário na tabela `sessoes`. *(MVP)*
* **RF01f** — Aceite obrigatório dos Termos de Uso e da Política de Privacidade no momento do cadastro (checkbox não pré-marcado), gravando `timestamp` e a versão do termo aceito em conformidade com a LGPD. *(MVP)*
* **RF01g** — Exclusão da própria conta mediante reautenticação explícita de senha, disparando a rotina de anonimização e exclusão definitiva prevista na LGPD. *(V2)*

### Módulo B — Ficha de Personagem
* **RF02** — Cadastro de ficha de personagem contendo: `nome` (2 a 100 caracteres), `universo` (lista fechada), `classe`, `poder` (0 a 100), `data_nascimento` (opcional), `email` de exibição (opcional) e `usuario_github` (opcional). Bloqueado se o usuário já possuir outra ficha ativa. *(MVP)*
* **RF03** — Restrição estrita de universos permitidos aos 7 valores canônicos: **Marvel**, **DC**, **Star Wars**, **Tolkien**, **D&D**, **Anime** e **Games**. *(MVP)*
* **RF04** — Validação bidirecional (cliente com schemas Zod e servidor nas rotas de API), com retenção de campos preenchidos e indicação visual de erro caso ocorra falha. *(MVP)*
* **RF05** — Exclusão lógica (arquivamento) da ficha via `ativo = false`, exigindo confirmação explícita em modal antes da efetivação e removendo o personagem da vitrine pública. *(MVP)*
* **RF06** — Restauração de ficha arquivada; se o usuário já possuir outra ficha ativa no momento da restauração, a ficha ativa atual é arquivada automaticamente na mesma transação. *(MVP)*

### Módulo C — Navegação, Listagem e Busca
* **RF07** — Listagem paginada (10 personagens por página) no mural de personagens ativos, exibindo nome, classe, universo, avatar do GitHub e barra de poder. *(MVP)*
* **RF07a** — Seletor de ordenação alternativa na listagem pública: ordenação por nome (padrão alfabético), por poder (decrescente) ou por data de criação (mais recentes primeiro). *(V2)*
* **RF08** — Mecanismo de busca textual por nome e classe, combinável em tempo real com filtro por universo temático, exibindo estado vazio amigável quando nenhum resultado for retornado. *(MVP)*
* **RF09** — Área restrita e dedicada para visualização das fichas arquivadas do próprio usuário (`/fichas/arquivadas`), com ação de restauração imediata. *(MVP)*

### Módulo D — Integração com a API do GitHub
* **RF10** — Validação do formato do nome de usuário do GitHub no cliente e no servidor através de expressão regular oficial (`^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$`). *(MVP)*
* **RF11** — Exibição de métricas públicas sincronizadas da conta do GitHub vinculada: avatar oficial, contagem de repositórios públicos, linguagens mais utilizadas e total de estrelas acumuladas. *(MVP)*
* **RF12** — Timeout de 3 segundos na consulta externa à API do GitHub e persistência em cache relacional (`github_cache`) com validade de 1 hora; em caso de falha externa ou limite de taxa atingido, o sistema mantém os dados cadastrais da ficha e exibe aviso amigável sem quebrar a renderização. *(MVP)*
* **RF12a** — Revalidação assíncrona do cache expirado em segundo plano: a interface exibe as métricas cacheadas com indicador visual de sincronização sem bloquear o carregamento da página. *(V2)*
* **RF12b** — Botão manual "Atualizar" na visualização da ficha para revalidação imediata do cache do GitHub, limitado por taxa a 1 uso por usuário a cada 5 minutos. *(V2)*

### Módulo E — Trilha de Aprendizagem e Catálogo Oficial de Missões
* **RF13** — Trilha pedagógica estruturada em 4 módulos sequenciais navegáveis: **Módulo 1 — Programação em Blocos**, **Módulo 2 — Python**, **Módulo 3 — HTML e CSS** e **Módulo 4 — JavaScript**. *(MVP)*
* **RF13a** — Exibição das competências técnicas, ementa detalhada e percentual de progresso concluído em cada módulo. *(V2)*
* **RF14** — Catálogo oficial de missões pedagógicas contendo título, módulo vinculado, enunciado do desafio, template de código inicial, critério de aceite e nível de dificuldade. *(V2)*
* **RF14a** — Interface do catálogo de missões (`/missoes`) com filtros combinados em tempo real por nível de dificuldade (Fácil, Médio, Difícil) e por módulo da trilha. *(V2)*
* **RF15** — Submissão de solução de missões com registro único por ficha na tabela `missoes_concluidas`, impedindo submissões duplicadas e incrementando o poder de combate do personagem. *(V2)*
* **RF15a** — Validação automática de submissões via Webhook do GitHub com verificação obrigatória de assinatura criptográfica HMAC SHA-256 no header `X-Hub-Signature-256`, rejeitando payloads adulterados ou sem assinatura válida. *(V2)*
* **RF15b** — Consulta ao histórico individual de missões completadas pelo desenvolvedor na visualização detalhada da ficha e na tela da missão. *(V2)*

#### Catálogo Oficial das 4 Missões Iniciais da Trilha

1. **Missão 1 (Módulo 1 — Programação em Blocos)**:
   - **ID**: `1` | **Módulo**: `1` (Programação em Blocos)
   - **Título**: *O Despertar dos Blocos Mágicos*
   - **Dificuldade**: `facil` (Fácil)
   - **Enunciado**: *Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.*
   - **Código Inicial (Template)**:
     ```text
     // Algoritmo Visual de Blocos
     enquanto (caminhoLivre()) {
       andarFrente();
       se (detectarArmadilha()) {
         desarmarArmadilha();
       }
     }
     se (alcancouBau()) {
       abrirBau();
     }
     ```
   - **Critério de Aceite**: *O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.*

2. **Missão 2 (Módulo 2 — Python)**:
   - **ID**: `2` | **Módulo**: `2` (Python)
   - **Título**: *O Cálculo do Dano Crítico*
   - **Dificuldade**: `facil` (Fácil)
   - **Enunciado**: *Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função `calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int` que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.*
   - **Código Inicial (Template)**:
     ```python
     def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:
         """Calcula o dano final desferido pelo herói contra criaturas sombrias.
         
         Args:
             ataque_base: Força inicial do golpe (inteiro >= 0).
             multiplicador: Fator crítico (float >= 1.0).
             bonus: Valor adicional concedido por runas e equipamentos.
         
         Returns:
             Dano total resultante em número inteiro não-negativo.
         """
         # TODO: Implemente a lógica do cálculo de dano aqui
         pass
     ```
   - **Critério de Aceite**: *A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.*

3. **Missão 3 (Módulo 3 — HTML e CSS)**:
   - **ID**: `3` | **Módulo**: `3` (HTML e CSS)
   - **Título**: *O Estandarte Responsivo da Guilda*
   - **Dificuldade**: `medio` (Médio)
   - **Enunciado**: *Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa a estrutura semântica em HTML5 de um cartão de herói com a tag `<section class="guilda-card">`, contendo cabeçalho com o nome e classe, uma área de avatar/brasão e a lista de atributos de poder (0–100). Em seguida, aplique regras CSS (Flexbox ou CSS Grid) para que em telas menores que 640px os elementos se reorganizem verticalmente em coluna única e com contraste mínimo de cores atendendo ao padrão WCAG AA.*
   - **Código Inicial (Template)**:
     ```html
     <!-- Estandarte do Herói da Guilda -->
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
     </style>
     ```
   - **Critério de Aceite**: *Uso exclusivo de tags HTML5 semânticas (<section>, <header>, <dl>), layout responsivo adaptável com media query em 640px e taxa de contraste de cores acessível (mínimo 4.5:1 para texto normal).*

4. **Missão 4 (Módulo 4 — JavaScript)**:
   - **ID**: `4` | **Módulo**: `4` (JavaScript)
   - **Título**: *O Feitiço da API Assíncrona*
   - **Dificuldade**: `dificil` (Difícil)
   - **Enunciado**: *Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona `buscarPoderesGuilda(url: string)` em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando `fetch()`, validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com `!res.ok`), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.*
   - **Código Inicial (Template)**:
     ```javascript
     /**
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
     }
     ```
   - **Critério de Aceite**: *A função deve usar async/await com try/catch, verificar res.ok rejeitando respostas HTTP de erro, tratar exceções de rede e retornar a Promise resolvida com os poderes ordenados por nível de poder (decrescente).*

### Módulo F — Gamificação, Poder e Ranking
* **RF16** — Algoritmo de cálculo de poder dinâmico equilibrado combinando a soma ponderada de missões completadas com a atividade verificada no GitHub, mantendo o resultado estritamente no intervalo [0, 100]. *(Futuro)*
* **RF17** — Ranking público paginado dos heróis mais poderosos com ordenação por poder decrescente e filtros por universo e período. *(Futuro)*
* **RF17a** — Sistema de badges e conquistas desbloqueáveis por marcos de código (primeira missão superada, 7 dias seguidos de commits, mestre de módulo). *(Futuro)*

### Módulo G — Auditoria e Moderação
* **RF18** — Gravação obrigatória, automática e inviolável em banco de dados (`auditoria`) de toda operação de criação, edição, arquivamento e restauração de fichas. *(MVP)*
* **RF18a** — Painel de Crônicas de Auditoria (`/admin/auditoria`) acessível por administradores com filtros combinados por ficha, autor, tipo de ação e período (24 horas, 7 dias, 30 dias). *(V2)*
* **RF19** — Envio de denúncia por estudantes autenticados contra personagens que apresentem ofensas, preconceito ou spam, registrando denunciante, motivo e estado inicial `pendente`. *(V2)*
* **RF19a** — Análise pelo moderador no tribunal (`/admin/denuncias`): deferimento como *procedente* (arquiva automaticamente a ficha acusada) ou indeferimento como *improcedente*, com justificativa de texto obrigatória registrada em auditoria. O moderador é impedido de deliberar sobre a própria ficha. *(V2)*
* **RF19b** — Acompanhamento em tempo real do status de denúncias efetuadas pelo estudante denunciante. *(V2)*

### Módulo H — Salas de Aula Virtuais
* **RF20** — Espaço do Educador (`/salas`): criação de salas de aula virtuais com geração de código alfanumérico único de acesso compartilhado com os alunos. *(V2)*
* **RF20a** — Ingresso de estudantes na sala mediante preenchimento do código de acesso com registro em `sala_alunos`. *(V2)*
* **RF20b** — Desmatrícula e remoção de alunos da sala pelo professor proprietário da turma. *(V2)*
* **RF20c** — Exportação tabular (CSV) de relatório de progresso e missões concluídas pelos alunos matriculados na sala. *(V2)*

### Módulo I — Privacidade e Direitos do Titular (LGPD)
* **RF21** — Configurações de privacidade na conta para ocultar e-mail pessoal e controlar visibilidade no ranking público. *(V2)*
* **RF21a** — Exportação completa dos dados pessoais do titular em formato JSON legível (`/api/usuarios/exportar-dados`), atendendo ao direito de portabilidade do Art. 18 da LGPD. *(V2)*

### Módulo J — Gestão Administrativa
* **RF22** — Painel central administrativo (`/admin`) exibindo cards de métricas em tempo real: total de contas cadastradas, fichas ativas, missões na trilha e denúncias pendentes. *(V2)*
* **RF23** — Suspensão e reativação disciplinar de contas de usuário por administradores (`/admin/usuarios`), bloqueando autenticações sem exclusão de dados. *(V2)*

---

## 5. Requisitos Não Funcionais, Regras de Negócio e Interface

### Regras de Negócio (RN)
* **RN01** — O atributo `poder` deve se manter estritamente entre 0 e 100, imposto por validação no servidor e constraint `CHECK (poder BETWEEN 0 AND 100)` no banco.
* **RN02** — O campo `universo` aceita exclusivamente os 7 valores permitidos: Marvel, DC, Star Wars, Tolkien, D&D, Anime e Games.
* **RN03** — O arquivamento de fichas é exclusivamente lógico (`ativo = FALSE`); instruções de mutação exigem cláusula `WHERE id = :id`.
* **RN04** — Registros da tabela `auditoria` são estritamente de leitura exclusiva (*append-only*) — nenhuma operação de `UPDATE` ou `DELETE` é permitida.
* **RN05** — Apenas usuários autenticados com papel `admin` podem criar, editar ou alterar as missões e módulos oficiais da plataforma.
* **RN06** — Cada usuário pode ter no máximo **1 (uma) ficha ativa** simultaneamente. A criação ou restauração de uma ficha enquanto outra está ativa arquiva automaticamente a anterior na mesma transação.
* **RN07** — O endereço de e-mail deve ser estritamente único por usuário, garantido por validação e constraint `UNIQUE` no banco de dados.
* **RN08** — O `nome` da ficha deve ter entre 2 e 100 caracteres, não podendo ser composto exclusivamente por espaços em branco ou símbolos isolados.
* **RN09** — Um mesmo `usuario_github` não pode estar associado simultaneamente a mais de uma ficha ativa em contas diferentes.
* **RN10** — Denúncias julgadas procedentes por moderadores provocam o arquivamento automático da ficha; a reversão desse arquivamento exige deliberação estrita de um Administrador.
* **RN11** — Sessões expiram após 30 minutos de inatividade do usuário, independentemente da expiração nominal do token JWT/cookie.
* **RN12** — Contas com e-mail não verificado após 7 dias do cadastro têm bloqueadas todas as ações de escrita em personagens (criar, editar, arquivar, restaurar).
* **RN13** — Uma missão do catálogo oficial só pode ser deletada do banco se nenhuma ficha a tiver concluído; caso já tenha conclusões registradas em `missoes_concluidas`, ela pode apenas ser inativada para novas submissões.

### Requisitos Não Funcionais (RNF)
* **RNF01** — Armazenamento seguro de senhas através de hash criptográfico `bcryptjs` com custo mínimo de 10 rounds; senhas em texto plano são proibidas.
* **RNF02** — Validação integral no servidor para todas as rotas de API, espelhando e complementando as validações do cliente com Zod.
* **RNF03** — Prevenção de SQL Injection através de consultas parametrizadas (*prepared statements*) via Prisma ORM.
* **RNF04** — Escape automático contra XSS no front-end React/Next.js e sanitização de inputs; proteção contra falsificação de requisições (CSRF).
* **RNF05** — Proibição estrita de credenciais e chaves secretas no código-fonte; uso obrigatório de variáveis de ambiente (`DATABASE_URL`, `SESSION_SECRET`, etc.).
* **RNF06** — Exclusão definitiva LGPD com expurgo ou anonimização imediata de dados pessoais, revogação de tokens de sessão e cancelamento de resets pendentes.
* **RNF07** — Verificação rigorosa de autorização no servidor: apenas o proprietário da ficha ou um administrador podem executar mutações sobre ela.
* **RNF08** — Resiliência na API do GitHub com timeout estrito de 3 segundos e cache em banco relacional (`github_cache`) válido por 1 hora.
* **RNF09** — Arquitetura de deploy contínuo (CI/CD) via GitHub conectado à Vercel com execução nativa em funções Serverless e banco gerenciado Neon PostgreSQL.
* **RNF10** — Políticas de backup automatizado diário com retenção mínima de 7 dias (Recovery Point Objective $\le$ 24h).
* **RNF11** — Registro seguro de erros 5xx no servidor sem exposição de stack traces ou detalhes sensíveis ao usuário final.
* **RNF12** — Minimização de dados: coleta restrita às necessidades operacionais e pedagógicas da plataforma em conformidade com a LGPD.
* **RNF13** — Mitigação de abuso e ataques de força bruta com *rate limiting* nas rotas públicas e de autenticação.
* **RNF14** — HTTPS obrigatório em todas as conexões com cabeçalho `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
* **RNF15** — Cabeçalhos HTTP de segurança obrigatórios configurados no `next.config.mjs`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` e `Referrer-Policy: strict-origin-when-cross-origin`.
* **RNF16** — Desempenho: tempo de resposta do servidor inferior a 1 segundo no percentil 95 para rotas de listagem e consulta em cache.
* **RNF17** — Registros de log estruturados em formato JSON com identificadores de rastreamento para depuração.
* **RNF18** — Compatibilidade completa com os navegadores modernos (Google Chrome, Mozilla Firefox, Microsoft Edge e Safari).
* **RNF19** — Idioma e localização padrão em Português do Brasil (pt-BR) em todas as telas, mensagens de feedback e erros.

### Requisitos de Interface (RI)
* **RI01** — Retenção de estado: os formulários preservam os dados já preenchidos caso ocorra erro de validação.
* **RI02** — Diálogo modal com foco gerenciado e backdrop com blur para confirmação de ações destrutivas (arquivamento de ficha, suspensão de conta).
* **RI03** — Estados vazios amigáveis com ilustrações/ícones temáticos em buscas sem retorno ou catálogos vazios.
* **RI04** — Design responsivo fluido com Tailwind CSS adaptado para dispositivos móveis, tablets e telas widescreen.
* **RI05** — Acessibilidade visual com alto contraste cromático atendendo aos critérios WCAG AA e navegação completa por teclado.
* **RI06** — Indicadores visuais animados (spinners e skeletons) durante requisições assíncronas.
* **RI07** — Mensagens de erro contextuais e específicas exibidas diretamente abaixo de cada campo do formulário.
* **RI08** — Sinalização visual explícita com asterisco vermelho em campos de preenchimento obrigatório.
* **RI09** — Feedback visual flutuante (Toast com auto-dismiss em 4 segundos) após operações bem-sucedidas.
* **RI10** — Componentes de paginação com exibição explícita da página atual, total de páginas e manutenção de filtros ativos na navegação.

---

## 6. Modelo de Dados

### 6.1 Relacionamentos entre Entidades
* `usuarios` (1) — (N) `fichas`: um usuário pode criar múltiplas fichas, mas **no máximo uma ativa por vez**.
* `usuarios` (1) — (N) `tokens_reset_senha`: tokens com expiração para redefinição segura de credenciais.
* `usuarios` (1) — (N) `sessoes`: controle de refresh tokens para encerramento de sessões ativas.
* `usuarios` (1) — (N) `auditoria`: rastreamento do autor de cada mutação.
* `fichas` (1) — (N) `auditoria`: crônicas das ações sofridas por cada personagem.
* `fichas` (1) — (1) `github_cache`: relacionamento indireto por chave natural (`usuario_github`).
* `modulos` (1) — (N) `missoes`: cada módulo encadeia seus desafios oficiais.
* `fichas` (N) — (N) `missoes`, via `missoes_concluidas`: registro imutável com chave única `UNIQUE(ficha_id, missao_id)`.
* `fichas` (1) — (N) `denuncias`: denúncias submetidas por estudantes e julgadas por moderadores.
* `usuarios` (1) — (N) `salas` (professor) e `usuarios` (N) — (N) `salas` via `sala_alunos` (estudantes matriculados).

### 6.2 Diagrama Entidade-Relacionamento (Mermaid)

```mermaid
erDiagram
    USUARIOS ||--o{ FICHAS : "possui"
    USUARIOS ||--o{ TOKENS_RESET_SENHA : "solicita"
    USUARIOS ||--o{ AUDITORIA : "autor de"
    FICHAS ||--o{ AUDITORIA : "registrada em"
    FICHAS ||--o{ MISSOES_CONCLUIDAS : "completa"
    MISSOES ||--o{ MISSOES_CONCLUIDAS : "concluida por"
    MODULOS ||--o{ MISSOES : "contem"
    USUARIOS ||--o{ SESSOES : "autentica"
    FICHAS ||--o{ DENUNCIAS : "recebe"
    USUARIOS ||--o{ DENUNCIAS : "denuncia / modera"
    USUARIOS ||--o{ SALAS : "leciona"
    USUARIOS ||--o{ SALA_ALUNOS : "matricula-se"
    SALAS ||--o{ SALA_ALUNOS : "contem"

    USUARIOS {
        int id PK
        varchar nome
        varchar email UK
        varchar senha_hash
        varchar github_oauth_id UK
        varchar tipo
        int tentativas_login
        timestamp bloqueado_ate
        boolean email_verificado
        timestamp termos_aceitos_em
        varchar termos_versao
        timestamp criado_em
    }
    SESSOES {
        int id PK
        int usuario_id FK
        varchar refresh_token_hash
        timestamp criado_em
        timestamp expira_em
        boolean revogado
    }
    TOKENS_RESET_SENHA {
        int id PK
        int usuario_id FK
        varchar token_hash
        timestamp expira_em
        boolean usado
        timestamp criado_em
    }
    GITHUB_CACHE {
        varchar usuario_github PK
        text avatar_url
        int repos_publicos
        jsonb linguagens
        int total_estrelas
        timestamp atualizado_em
    }
    FICHAS {
        int id PK
        int usuario_id FK
        varchar nome
        varchar universo
        varchar classe
        int poder
        date data_nascimento
        varchar email
        varchar usuario_github
        boolean ativo
        timestamp criado_em
        timestamp atualizado_em
    }
    MODULOS {
        int id PK
        int ordem UK
        varchar titulo
        varchar tecnologia
        text descricao
    }
    MISSOES {
        int id PK
        int modulo_id FK
        varchar titulo
        text enunciado
        text codigo_inicial
        text criterio_aceite
        varchar dificuldade
        timestamp criado_em
    }
    MISSOES_CONCLUIDAS {
        int id PK
        int ficha_id FK
        int missao_id FK
        timestamp data_conclusao
    }
    DENUNCIAS {
        int id PK
        int ficha_id FK
        int denunciante_id FK
        int moderador_id FK
        text motivo
        varchar status
        timestamp criado_em
        timestamp resolvido_em
    }
    SALAS {
        int id PK
        int professor_id FK
        varchar nome
        varchar codigo_acesso UK
        timestamp criado_em
    }
    SALA_ALUNOS {
        int id PK
        int sala_id FK
        int aluno_id FK
        timestamp entrou_em
    }
    AUDITORIA {
        int id PK
        int ficha_id FK
        int autor_id FK
        varchar acao
        text detalhes
        timestamp data_hora
    }
```

### 6.3 Schema DDL em PostgreSQL

```sql
-- 1. Tabela de Usuários / Autenticação
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),
    github_oauth_id VARCHAR(50) UNIQUE,
    tipo VARCHAR(20) DEFAULT 'estudante' CHECK (tipo IN ('estudante', 'professor', 'moderador', 'admin')),
    tentativas_login INT DEFAULT 0,
    bloqueado_ate TIMESTAMP,
    email_verificado BOOLEAN DEFAULT FALSE,
    termos_aceitos_em TIMESTAMP,
    termos_versao VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_metodo_login CHECK (senha_hash IS NOT NULL OR github_oauth_id IS NOT NULL)
);

-- 2. Tokens de Recuperação de Senha
CREATE TABLE IF NOT EXISTS tokens_reset_senha (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expira_em TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Sessões e Refresh Tokens Ativos
CREATE TABLE IF NOT EXISTS sessoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_em TIMESTAMP NOT NULL,
    revogado BOOLEAN DEFAULT FALSE
);

-- 4. Cache Persistido de Métricas do GitHub
CREATE TABLE IF NOT EXISTS github_cache (
    usuario_github VARCHAR(39) PRIMARY KEY,
    avatar_url TEXT,
    repos_publicos INT DEFAULT 0,
    linguagens JSONB,
    total_estrelas INT DEFAULT 0,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Fichas de Personagem
CREATE TABLE IF NOT EXISTS fichas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    universo VARCHAR(30) NOT NULL CHECK (universo IN ('Marvel', 'DC', 'Star Wars', 'Tolkien', 'D&D', 'Anime', 'Games')),
    classe VARCHAR(50) NOT NULL,
    poder INT NOT NULL CHECK (poder BETWEEN 0 AND 100),
    data_nascimento DATE,
    email VARCHAR(150),
    usuario_github VARCHAR(39),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Unicidade de ficha ativa por usuário (RN06)
CREATE UNIQUE INDEX IF NOT EXISTS idx_ficha_ativa_unica_por_usuario
ON fichas (usuario_id) WHERE ativo = TRUE;

-- Unicidade de username do GitHub por ficha ativa (RN09)
CREATE UNIQUE INDEX IF NOT EXISTS idx_github_unico_em_ficha_ativa
ON fichas (usuario_github) WHERE ativo = TRUE AND usuario_github IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fichas_busca_ativa ON fichas (ativo, universo, nome);
CREATE INDEX IF NOT EXISTS idx_fichas_ranking ON fichas (ativo, poder DESC);

-- 6. Módulos da Trilha Pedagógica
CREATE TABLE IF NOT EXISTS modulos (
    id SERIAL PRIMARY KEY,
    ordem INT UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    tecnologia VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL
);

-- 7. Catálogo de Missões / Desafios
CREATE TABLE IF NOT EXISTS missoes (
    id SERIAL PRIMARY KEY,
    modulo_id INT REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    codigo_inicial TEXT,
    criterio_aceite TEXT NOT NULL,
    dificuldade VARCHAR(10) DEFAULT 'facil' CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Registro de Missões Concluídas
CREATE TABLE IF NOT EXISTS missoes_concluidas (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE CASCADE,
    missao_id INT REFERENCES missoes(id) ON DELETE CASCADE,
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ficha_id, missao_id)
);

-- 9. Denúncias de Fichas
CREATE TABLE IF NOT EXISTS denuncias (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE CASCADE,
    denunciante_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    moderador_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    motivo TEXT NOT NULL,
    status VARCHAR(15) DEFAULT 'pendente' CHECK (status IN ('pendente', 'procedente', 'improcedente')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolvido_em TIMESTAMP
);

-- 10. Salas Virtuais de Educadores
CREATE TABLE IF NOT EXISTS salas (
    id SERIAL PRIMARY KEY,
    professor_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    codigo_acesso VARCHAR(20) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sala_alunos (
    id SERIAL PRIMARY KEY,
    sala_id INT REFERENCES salas(id) ON DELETE CASCADE,
    aluno_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    entrou_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sala_id, aluno_id)
);

-- 11. Auditoria Inviolável (Append-Only)
CREATE TABLE IF NOT EXISTS auditoria (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE SET NULL,
    autor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    acao VARCHAR(50) NOT NULL,
    detalhes TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.4 Dados Iniciais de Seed (Módulos e Missões)

```sql
-- Inserção dos 4 Módulos Estruturados
INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(1, 1, 'Módulo 1 — Programação em Blocos', 'Blocos / Lógica', 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços visuais de repetição.'),
(2, 2, 'Módulo 2 — Python', 'Python', 'Sintaxe limpa, estruturas de dados, funções puras, tipagem estática e algoritmos orientados a objetos.'),
(3, 3, 'Módulo 3 — HTML e CSS', 'HTML/CSS', 'Estruturação semântica com HTML5, acessibilidade web (WCAG) e estilização responsiva com CSS Grid e Flexbox.'),
(4, 4, 'Módulo 4 — JavaScript', 'JavaScript', 'Interatividade no navegador, manipulação da árvore DOM, Promises e consumo de APIs assíncronas com fetch.')
ON CONFLICT (ordem) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  tecnologia = EXCLUDED.tecnologia,
  descricao = EXCLUDED.descricao;

-- Inserção das 4 Missões Oficiais
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(
  1, 1, 'O Despertar dos Blocos Mágicos',
  'Nas ruínas ancestrais de Algoritmia, o herói precisa atravessar um corredor repleto de armadilhas para alcançar o Baú de Runas Sagradas. Monte uma sequência algorítmica visual utilizando estruturas de repetição e verificações condicionais: enquanto o caminho à frente estiver livre, o personagem deve avançar uma casa; caso encontre um obstáculo mágico, deve desarmá-lo antes de prosseguir; ao atingir a câmara final, deve abrir o baú para coletar o fragmento de código.',
  '// Algoritmo Visual de Blocos\nenquanto (caminhoLivre()) {\n  andarFrente();\n  se (detectarArmadilha()) {\n    desarmarArmadilha();\n  }\n}\nse (alcancouBau()) {\n  abrirBau();\n}',
  'O algoritmo deve guiar o herói pelo labirinto alcançando o baú em no máximo 10 iterações, sem colidir com obstáculos e desarmando todas as armadilhas encontradas.',
  'facil'
),
(
  2, 2, 'O Cálculo do Dano Crítico',
  'Na taverna dos magos de batalha, os aventureiros necessitam de um cálculo preciso do dano de suas magias elementais contra chefes de masmorra. Escreva em Python a função calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int que recebe os pontos de ataque base, um multiplicador de acerto crítico e um bônus numérico. Se o multiplicador for estritamente superior a 1.5, o valor de bônus deve ser somado antes de aplicar o arredondamento final. O dano resultante nunca pode ser negativo e deve retornar como um número inteiro.',
  'def calcular_dano(ataque_base: int, multiplicador: float, bonus: int) -> int:\n    """Calcula o dano final desferido pelo herói contra criaturas sombrias."""\n    pass',
  'A função deve retornar um número inteiro (int), arredondar valores fracionários corretamente, aplicar o bônus apenas quando o multiplicador for maior que 1.5 e garantir resultado >= 0 em todos os casos de teste.',
  'facil'
),
(
  3, 3, 'O Estandarte Responsivo da Guilda',
  'Os arautos da guilda precisam anunciar seus guerreiros no mural público do reino com alta legibilidade em qualquer dispositivo. Construa a estrutura semântica em HTML5 de um cartão de herói com a tag <section class="guilda-card">, contendo cabeçalho com o nome e classe, uma área de avatar/brasão e a lista de atributos de poder (0–100). Em seguida, aplique regras CSS (Flexbox ou CSS Grid) para que em telas menores que 640px os elementos se reorganizem verticalmente em coluna única e com contraste mínimo de cores atendendo ao padrão WCAG AA.',
  '<!-- Estandarte do Herói da Guilda -->\n<section class="guilda-card">\n  <header class="guilda-header">\n    <h2 class="heroi-nome">Aragorn</h2>\n    <span class="heroi-classe">Guardião do Norte</span>\n  </header>\n  <div class="guilda-brasao">\n    <img src="/brasao-tolkien.svg" alt="Brasão da Casa Telcontar" />\n  </div>\n  <dl class="guilda-atributos">\n    <dt>Poder de Combate:</dt>\n    <dd class="poder-valor">88/100</dd>\n    <dt>Universo:</dt>\n    <dd>Tolkien</dd>\n  </dl>\n</section>',
  'Uso exclusivo de tags HTML5 semânticas (<section>, <header>, <dl>), layout responsivo adaptável com media query em 640px e taxa de contraste de cores acessível (mínimo 4.5:1 para texto normal).',
  'medio'
),
(
  4, 4, 'O Feitiço da API Assíncrona',
  'Para invocar os feitiços mais poderosos do reino, o grimório digital precisa consultar os tomos sagrados armazenados em uma API remota. Implemente a função assíncrona buscarPoderesGuilda(url: string) em JavaScript moderno (ES6+). A função deve realizar a requisição HTTP usando fetch(), validar se a resposta retornou status 200 (lançando exceção amigável caso ocorra erro 4xx ou 5xx com !res.ok), converter os dados para JSON, extrair o array de magias e retorná-lo ordenado de forma decrescente pelo nível de poder arcano de cada item.',
  'async function buscarPoderesGuilda(url) {\n  try {\n    // TODO: Implemente a requisição com fetch e tratamento de erros\n  } catch (erro) {\n    throw erro;\n  }\n}',
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
```

---

## 7. Critérios de Aceite (BDD)

* **Cenário 1: Cadastro com sucesso de ficha de personagem (RF02, RF03, RF10, RN01, RN02)**
  - **Dado** que o desenvolvedor está autenticado e submete o formulário com `Nome="Aragorn"`, `Universo="Tolkien"`, `Classe="Ranger"`, `Poder=88` e `usuario_github="aragorn-dev"`,
  - **Quando** o servidor processa a requisição,
  - **Então** valida os parâmetros, persiste o registro com `ativo = TRUE`, insere log `CRIACAO` na tabela `auditoria` e o novo personagem passa a ser listado no mural público com poder 88/100.

* **Cenário 2: Rejeição de universo inválido com retenção de dados (RF03, RF04, RN02, RI01)**
  - **Dado** que o usuário preenche o formulário com `Universo="Naruto"` (fora da lista fechada permitida),
  - **Quando** submete o formulário,
  - **Então** o servidor rejeita a gravação com código HTTP 422, exibe a mensagem de erro específica no campo de universo e mantém os dados já digitados intactos.

* **Cenário 3: Unicidade de ficha ativa com arquivamento transacional (RF06, RN06)**
  - **Dado** que o estudante já possui a ficha ativa "Goku" e restaura a ficha arquivada "Vegeta",
  - **Quando** a solicitação é confirmada no modal,
  - **Então** o sistema arquiva "Goku" (`ativo = FALSE`), ativa "Vegeta" (`ativo = TRUE`) na mesma transação, grava ambas as operações em auditoria e a vitrine pública exibe apenas "Vegeta" como personagem ativo daquela conta.

* **Cenário 4: Resiliência na consulta ao GitHub com fallback (RF11, RF12, RNF08)**
  - **Dado** que a API do GitHub atinge o rate limit ou excede o timeout de 3 segundos,
  - **Quando** qualquer visitante acessa o card da ficha do personagem,
  - **Então** a página exibe os dados cadastrais locais normalmente, exibe o aviso "Métricas do GitHub indisponíveis no momento" e mantém a interface funcional sem quebras.

* **Cenário 5: Rate limiting na redefinição de credenciais (RF01a, RNF13)**
  - **Dado** que um usuário solicitou um token de reset de senha há 45 segundos,
  - **Quando** tenta emitir uma nova solicitação antes de completar a janela de 2 minutos,
  - **Então** o servidor responde HTTP 429, bloqueia o disparo de novo e-mail e grava a tentativa em auditoria com ação `TENTATIVA_RESET_BLOQUEADA`.

* **Cenário 6: Navegação completa e acesso às missões da trilha (RF13, RF14, RF14a)**
  - **Dado** que o usuário acessa `/trilha`,
  - **Quando** clica no "Módulo 2 — Python",
  - **Então** a página `/trilha/2` exibe a ementa do módulo e o desafio prático "O Cálculo do Dano Crítico" com botão para acessar `/missoes/2`, mantendo a navegação rápida para os módulos 1, 3 e 4 acessível.

* **Cenário 7: Curadoria de missão oficial por Administrador (RF14, RN05)**
  - **Dado** que um usuário com perfil `admin` preenche o formulário na forja administrativa `/admin/missoes`,
  - **Quando** envia o formulário com título, módulo, enunciado, código template e critério de aceite válidos,
  - **Então** a missão é inserida no catálogo oficial da trilha, grava ação `CRIACAO_MISSAO` em auditoria e passa a ser exibida imediatamente para os estudantes em `/missoes`.

* **Cenário 8: Tribunal de Moderação e Arquivamento Disciplinar (RF19, RF19a, RN10)**
  - **Dado** que existe uma denúncia pendente contra a ficha "Spam_Bot_123",
  - **Quando** o moderador examina os fatos e aprova a denúncia como procedente com justificativa,
  - **Então** a ficha é arquivada compulsoriamente (`ativo = FALSE`), o status da denúncia muda para `procedente` e a ação `MODERACAO_ARQUIVAMENTO` é registrada em auditoria inviolável.

---

## 8. Decisão de Stack e Deploy

* **Front-end & Back-end Unificados**: **Next.js 14 (App Router)** com React 18 e TypeScript estrito (`strict: true`).  
  *Justificativa*: A unificação de front-end reativo com rotas de API Serverless no mesmo projeto elimina custos de infraestrutura separada, oferece renderização híbrida (SSR e geração estática para páginas pedagógicas) e roda de forma nativa e otimizada na nuvem da Vercel.

* **Estilização e Componentes Visuais**: **Tailwind CSS** com tokens semânticos customizados do universo RPG (`quest-dark`, `quest-surface`, `quest-border`, `quest-accent`), ícones modernos da biblioteca `lucide-react` e composição utilitária com `clsx` e `tailwind-merge`.

* **Camada de Validação**: **Zod**, garantindo validação de esquemas espelhada e consistente tanto no formulário do cliente quanto nas rotas de API do servidor (RNF02).

* **Camada de Dados & ORM**: **PostgreSQL** relacional hospedado na nuvem (Neon Database), acessado via **Prisma ORM** com instanciamento singleton para evitar esgotamento de conexões em ambientes Serverless (`src/lib/db.ts`). Para desenvolvimento e testes locais contínuos, há suporte híbrido ao data store em memória com persistência reativa (`src/lib/admin-store.ts`).

* **Destino e Estratégia de Deploy**: **Vercel** com integração e entrega contínua (CI/CD) disparada automaticamente a cada push na branch `main` do GitHub.
  - A stack foi definida previamente considerando as restrições da Vercel (arquitetura Serverless efêmera), o que motivou a decisão arquitetural de persistir o cache do GitHub (`github_cache`) e as sessões em tabelas relacionais do banco, e não na memória volátil do processo Node.js.
  - O banco de dados gerenciado em nuvem (Neon) provê conexões seguras com pooling, backups automatizados com retenção mínima de 7 dias (RNF10) e variável `DATABASE_URL` gerenciada via painel seguro da Vercel (RNF05).
