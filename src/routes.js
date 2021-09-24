const express = require('express');
const routes = express.Router();

// Profile dates routes
const profile = {
    name: "Thiago",
    avatar: "https://avatars.githubusercontent.com/u/79920937?v=4",
    "monthly-budget": "3000",
    "days-per-week": "5",
    "hours-per-day": "5",
    "vacation-per-year": "4",
};



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
routes.get('/profile', (req, res) =>  res.render(views + "profile", { profile }))

module.exports = routes;