const Profile = require('../model/profile')
const jobUtils = require('../utils/jobUtils')
const Job = require('../model/job');

module.exports = {
    create(req,res){
        return res.render("job")
    },

    update(req,res){
        // puxa o id do job para jogar na http
        const jobId = req.params.id

        const jobs = Job.get()

        // busncar o job pelo id dele
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }



        const newJob = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        Job.update(newJob)

        res.redirect("/")
    },

    save(req, res){
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0;// atribuindo o valor do Id focando no array, para isso subtraio 1. Caso o objeto nao exita "?.id" ele cioloca 1 como resutlado.

        jobs.push({
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

        // aqui estou puxando do model os dados para usar aqui
        const jobs = Job.get()

        // busncar o job pelo id dele
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('Job not found')
        }

        const profile = Profile.get()

        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    delete(req, res) {
        // puxa o id do job para jogar na http
        const jobId = req.params.id

        // O filter tem uma function igual a do finder,
        // porem ele ao encontrar o objeto que eu quero ele vai tirar/filtar.
        // Se ele encontrar um objeto errado ele filtra/mantem.
        //Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
        // Quando esse filter for false, ou seja, job.id for igual ao jobId ele vai tirar o job.

        // Com a refatoração agora eu só preciso passar o id que no model será feito o resto
        Job.delete(jobId)

        return res.redirect('/')
    },
}