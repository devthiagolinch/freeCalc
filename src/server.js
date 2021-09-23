const express = require('express'); //biblioteca para criar o servidor
const server = express(); //vai criar as rotas, os caminhos
const routes = require("./routes");

server.set('view engine', 'ejs'); // 

server.use(express.static("Public"));

server.use(routes);


server.listen(3000, () => {console.log('rodando')});