const express = require('express');
const routes = express.Router();

// Profile dates routes
const profile = {
    name: "Thiago",
    avatar: "https://github.com/devthiagolinch.png",
    "monthly-budget": "3000",
    "days-per-week": "5",
    "hours-per-day": "5",
    "vacation-per-year": "4",
    "value-hour": 75
};

const jobs = [
    {
        id: "1",
        name: "Pizzario Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        createdAt: Date.now(),
    },
    {
        id: "2",
        name: "oneTwo Projects",
        "daily-hours": 3,
        "total-hours": 47,
        createdAt: Date.now(),
    }
]

// function para calculo de time dos projetos
function restingDays(job) {
     // ajustes do jobs
        // calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //toFixed fucniona para "arredondar" o valor da divisao
        
        // Para ter o dia exato de creat do job
        // function que ira fazer os milissegundos do createdAt se tornarem data real
        const createdDate = new Date(job.createdAt)
        
        // Tempo de entrega
        // getDate = o dia do mes exato | Number() para transformar o remainingDays em numero novamente
        // conta sera do dia do mes que estamos + quantos dias que restam para a entrega = dia de entrega
        const dueDay = createdDate.getDate() + Number(remainingDays)

        // Criando a data do futuro = data de vencimetno do projeto
        // setDate = nova data
        const dueDate = createdDate.setDate(dueDay)

        // diferenca do tempo em milissegundos para dias restantes do projeto
        // tudo esta em milissegundos, entao preciso passar para dia em dayDiff divido por DayinMs
        const timeDiffInMs = dueDate - Date.now()
        // transformar Ms em Dias
        // aqui temos quando Ms temos em um dia para transformar o timeDiffInMs total em days
        const dayInMs = 1000 * 60 * 60 *24
        // Math.floor para transformar tudo em number e arredondar para baixo | .toFixed() arredonda para cima
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        //restam x dias
        return dayDiff
}


// Create a base route for routes
// const basePath = __dirname + "/views"
// Porem o EJS ja conhece a rota para as view, e nao precisa dessa linha

// req, respose
// routes.get('/', (req, res) =>  res.sendFile(basePath + "/index.html"))
//tirar a "/", o .html e o "basePath", pois ejs ja sabe e trocar "sendFile" por "render"
// pois o ejs nao precisa do sendFile

// Vai precisar configurar uma rota para o ejs chegar no src/views
const views = __dirname + "/views/";

routes.get('/', (req, res) =>  {
    const updateJobs = jobs.map((job) => {
        // ajustes do job
        const remaining = restingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
            ...job, // espalhamento JS, pegar os dados e jogar aqui dentro
            remaining,
            status,
            budget: profile['value-hour'] * job['total-hours']
        }
    })

    res.render(views + "index", { jobs:updateJobs })
})


routes.get('/job', (req, res) =>  res.render(views + "job"))
routes.post('/job', (req, res) =>  {
    const job = req.body
    job.createdAt = new Date() // atribuindo nova data
    const lastId = jobs[jobs.length - 1]?.id || 1;// atribuindo o valor do Id focando no array, para isso subtraio 1. Caso o objeto nao exita "?.id" ele cioloca 1 como resutlado.

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now(),//atribuindo a data de hoje
    })
    return res.redirect('/')
}) // rota para enviar as info do forms do novo job
routes.get('/job/edit', (req, res) =>  res.render(views + "job-edit"))
routes.get('/profile', (req, res) =>  res.render(views + "profile", { profile }))

module.exports = routes;