const fs = require('fs');
const path = require('path');

const seedSqlPath = path.resolve(__dirname, 'sql/seed.sql');
let seedSql = fs.readFileSync(seedSqlPath, 'utf8');

const courseLessons = require('./src/lib/course-lessons.json');

let sqlBuffer = `

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
`;

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

function escapeJson(obj) {
  if (obj === null || obj === undefined) return 'NULL';
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

for (const [modIdStr, aulas] of Object.entries(courseLessons)) {
  const modId = Number(modIdStr);
  for (const aula of aulas) {
    sqlBuffer += `INSERT INTO aulas (id, modulo_id, numero, titulo, subtitulo, tempo_estimado, xp_recompensa, resumo, objetivos, secoes, conceitos_chave) VALUES (\n`;
    sqlBuffer += `  ${escapeSql(aula.id)},\n`;
    sqlBuffer += `  ${modId},\n`;
    sqlBuffer += `  ${aula.numero},\n`;
    sqlBuffer += `  ${escapeSql(aula.titulo)},\n`;
    sqlBuffer += `  ${escapeSql(aula.subtitulo)},\n`;
    sqlBuffer += `  ${escapeSql(aula.tempoEstimado)},\n`;
    sqlBuffer += `  ${aula.xpRecompensa || 40},\n`;
    sqlBuffer += `  ${escapeSql(aula.resumo)},\n`;
    sqlBuffer += `  ${escapeJson(aula.objetivos)},\n`;
    sqlBuffer += `  ${escapeJson(aula.secoes)},\n`;
    sqlBuffer += `  ${escapeJson(aula.conceitosChave)}\n`;
    sqlBuffer += `) ON CONFLICT (id) DO UPDATE SET\n`;
    sqlBuffer += `  titulo = EXCLUDED.titulo,\n`;
    sqlBuffer += `  subtitulo = EXCLUDED.subtitulo,\n`;
    sqlBuffer += `  resumo = EXCLUDED.resumo,\n`;
    sqlBuffer += `  secoes = EXCLUDED.secoes,\n`;
    sqlBuffer += `  conceitos_chave = EXCLUDED.conceitos_chave;\n\n`;

    for (const atv of aula.sequenciaAtividades || []) {
      sqlBuffer += `INSERT INTO atividades (id, aula_id, modulo_id, ordem, titulo, descricao_passo, tipo, missao_id, dificuldade, xp, dica, template_codigo, criterio_aceite, instrucoes_passo_a_passo) VALUES (\n`;
      sqlBuffer += `  ${escapeSql(atv.id)},\n`;
      sqlBuffer += `  ${escapeSql(aula.id)},\n`;
      sqlBuffer += `  ${modId},\n`;
      sqlBuffer += `  ${atv.ordem},\n`;
      sqlBuffer += `  ${escapeSql(atv.titulo)},\n`;
      sqlBuffer += `  ${escapeSql(atv.descricaoPasso)},\n`;
      sqlBuffer += `  ${escapeSql(atv.tipo || 'conceitual')},\n`;
      sqlBuffer += `  ${atv.missaoId ? atv.missaoId : 'NULL'},\n`;
      sqlBuffer += `  ${escapeSql(atv.dificuldade || 'facil')},\n`;
      sqlBuffer += `  ${atv.xp || 15},\n`;
      sqlBuffer += `  ${escapeSql(atv.dica || null)},\n`;
      sqlBuffer += `  ${escapeSql(atv.templateCodigo || null)},\n`;
      sqlBuffer += `  ${escapeSql(atv.criterioAceite)},\n`;
      sqlBuffer += `  ${escapeJson(atv.instrucoesPassoAPasso || [])}\n`;
      sqlBuffer += `) ON CONFLICT (id) DO UPDATE SET\n`;
      sqlBuffer += `  titulo = EXCLUDED.titulo,\n`;
      sqlBuffer += `  descricao_passo = EXCLUDED.descricao_passo,\n`;
      sqlBuffer += `  criterio_aceite = EXCLUDED.criterio_aceite;\n\n`;
    }
  }
}

const marker = '-- ========================================================\n-- Usuário Padrão';
const markerIdx = seedSql.indexOf(marker);

if (markerIdx !== -1) {
  const baseSql = seedSql.substring(0, markerIdx);
  fs.writeFileSync(seedSqlPath, baseSql.trim() + '\n' + sqlBuffer, 'utf8');
  console.log('Updated sql/seed.sql with the latest aulas and atividades successfully!');
} else {
  fs.writeFileSync(seedSqlPath, seedSql.trim() + '\n' + sqlBuffer, 'utf8');
  console.log('Appended aulas and atividades to sql/seed.sql successfully!');
}
