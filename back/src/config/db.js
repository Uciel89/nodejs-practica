const {Sequelize} = require('sequelize');

// Parametros de conección a nuestra base de datos
const databese = 'codetunes'; 
const username = 'root';
const password = '231Redragon564.';
const host = 'localhost';

// Objeto sequlize para autenticarnos en nuestra BD
const sequelize = new Sequelize(databese, username, password, {
    host,
    dialect: 'mysql'
})

// Conexión propiamente dicha
const connectToDB = async () => {
    try {
        await sequelize.authenticate();    
        console.log('Conectado a la BD');
    } catch (error) {
        console.error(error);
    }
}

// Exportamos los modulos anteriores
module.exports = {
    sequelize, connectToDB
}