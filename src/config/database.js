require('../bootstrap');

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage:  './__tests__/dbtest.sqlite',
  define: {
    timestamps: true,
    // configura o sequelize para criar o nome das tabelas e colunas no formato
    // caixa baixa separado por underline user_groups
    underscored: true,
    underscoredAll: true
  }
}