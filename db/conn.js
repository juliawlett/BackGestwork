require('dotenv').config();
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { //alterar nome do banco
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2')  // Adicione isso para garantir que o sequelize use o mysql2

})

try{
    sequelize.authenticate()
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

} catch(error){
    console.error('Não foi possível conectar ao banco de dados:', error);
}

module.exports = sequelize