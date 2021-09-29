const express = require('express');
const routes = express.Router();
const profileController = require('./controller/profileController')
const Profile = require('./model/profile')
const jobController = require('./controller/jobController')
const dashboardController = require('./controller/dashboardController')

// Vai precisar configurar uma rota para o ejs chegar no src/views
// nao usarresmos mais essa linha pois no server resolvemos isso
// const views = __dirname + "/views/";


// Create a base route for routes
// const basePath = __dirname + "/views"
// Porem o EJS ja conhece a rota para as view, e nao precisa dessa linha

// req, respose
// routes.get('/', (req, res) =>  res.sendFile(basePath + "/index.html"))
//tirar a "/", o .html e o "basePath", pois ejs ja sabe e trocar "sendFile" por "render"
// pois o ejs nao precisa do sendFile

routes.get('/', dashboardController.index)
routes.get('/job', jobController.create)
routes.post('/job', jobController.save) // rota para enviar as info do forms do novo job
routes.get('/job/:id', jobController.show) // rota para enviar as info do jobs para o job-edit com id especifica
routes.post('/job/:id', jobController.update) // rota para enviar as info do forms do job atualizado para o "db"
routes.post('/job/delete/:id', jobController.delete) // rota para enviar as info do job que sera deletado e deletar ele
routes.get('/profile', profileController.index) // rota para enviar os dados do usuario para o profile index
routes.post('/profile', profileController.update) // rota para enviar os dados do usuario atualizados para o "DB"

module.exports = routes;