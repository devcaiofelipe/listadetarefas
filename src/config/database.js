module.exports = {
  username: 'root',
  password: 'docker',
  database: 'todolist',
  host: '127.0.0.1',
  dialect: 'postgres',
  define: {
    timestamps: true,
    // configura o sequelize para criar o nome das tabelas e colunas no formato
    // caixa baixa separado por underline user_groups
    underscored: true,
    underscoredAll: true
  }
} 