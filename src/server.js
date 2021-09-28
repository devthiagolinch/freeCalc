const express = require('express'); //biblioteca para criar o servidor
const server = express(); //vai criar as rotas, os caminhos
const routes = require("./routes");
const path = require("path")

server.set('view engine', 'ejs'); // 

server.use(express.static("Public"));

// Mudar a locacion da pasta views
// o set vai configurar a views como padrao
// usando o path como forma de caminho ate onde a pasta esta
server.set('views', path.join(__dirname, 'views'))

// usaro  body no rewq.
server.use(express.urlencoded({extended: true}))

server.use(routes);


server.listen(3000, () => {console.log('rodando')});