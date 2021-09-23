const express = require('express');
const routes = express.Router();

// Create a base route for routes
// const basePath = __dirname + "/views"
// Porem o EJS ja conhece a rota para as view, e nao precisa dessa linha

// req, respose
// routes.get('/', (req, res) =>  res.sendFile(basePath + "/index.html"))
//tirar a "/", o .html e o "basePath", pois ejs ja sabe e trocar "sendFile" por "render"
// pois o ejs nao precisa do sendFile

// Vai precisar configurar uma rota para o ejs chegar no src/views

const views = __dirname + "/views/";

routes.get('/', (req, res) =>  res.render(views + "index"))
routes.get('/job', (req, res) =>  res.render(views + "job"))
routes.get('/job/edit', (req, res) =>  res.render(views + "job-edit"))
routes.get('/profile', (req, res) =>  res.render(views + "profile"))

module.exports = routes;