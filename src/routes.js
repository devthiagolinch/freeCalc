const express = require('express');
const routes = express.Router();
const profileController = require('./controller/profileController')
const Profile = require('./model/profile')


// Vai precisar configurar uma rota para o ejs chegar no src/views
// nao usarresmos mais essa linha pois no server resolvemos isso
// const views = __dirname + "/views/";

// Job informations(data | Controllers | services)
const Job = {
    data: [
        {
            id: 1,
            name: "Pizzario Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now(),
        },
        {
            id: 2,
            name: "oneTwo Projects",
            "daily-hours": 3,
            "total-hours": 47,
            createdAt: Date.now(),
        },
    ],
    
    controllers:{
        index(req, res){
            const updateJobs = Job.data.map((job) => {
                // ajustes do job
                const remaining = Job.services.restingDays(job) // para puxar de services essa function de restingDays
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job, // espalhamento JS, pegar os dados e jogar aqui dentro
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })
        
            return res.render("index", { jobs: updateJobs })

        },

        create(req,res){
            return res.render("job")
        },

        update(req,res){
            // puxa o id do job para jogar na http
            const jobId = req.params.id
            // busncar o job pelo id dele
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })
            res.redirect("/job/" + jobId)
        },

        save(req, res){
            const lastId = Job.data[Job.data.length - 1]?.id || 0;// atribuindo o valor do Id focando no array, para isso subtraio 1. Caso o objeto nao exita "?.id" ele cioloca 1 como resutlado.

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now(),//atribuindo a data de hoje
            })
            return res.redirect('/')
        },

        show(req, res) {

            // puxa o id do job para jogar na http
            const jobId = req.params.id
            // busncar o job pelo id dele
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if (!job) {
                return res.send('Job not found')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render("job-edit", { job })
        },

        delete(req, res) {
            // puxa o id do job para jogar na http
            const jobId = req.params.id

            // O filter tem uma function igual a do finder,
            // porem ele ao encontrar o objeto que eu quero ele vai tirar/filtar.
            // Se ele encontrar um objeto errado ele filtra/mantem.
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            // Quando esse filter for false, ou seja, job.id for igual ao jobId ele vai tirar o job.

            return res.redirect('/')
        },
    },

    services: {
        // function para calculo de time dos projetos
        restingDays(job) {
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
       },

       calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }
}


// Create a base route for routes
// const basePath = __dirname + "/views"
// Porem o EJS ja conhece a rota para as view, e nao precisa dessa linha

// req, respose
// routes.get('/', (req, res) =>  res.sendFile(basePath + "/index.html"))
//tirar a "/", o .html e o "basePath", pois ejs ja sabe e trocar "sendFile" por "render"
// pois o ejs nao precisa do sendFile

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save) // rota para enviar as info do forms do novo job
routes.get('/job/:id', Job.controllers.show) // rota para enviar as info do jobs para o job-edit com id especifica
routes.post('/job/:id', Job.controllers.update) // rota para enviar as info do forms do job atualizado para o "db"
routes.post('/job/delete/:id', Job.controllers.delete) // rota para enviar as info do job que sera deletado e deletar ele
routes.get('/profile', profileController.index) // rota para enviar os dados do usuario para o profile index
routes.post('/profile', profileController.update) // rota para enviar os dados do usuario atualizados para o "DB"

module.exports = routes;