const Profile = require('../model/profile')
const jobUtils = require('../utils/jobUtils')
const Job = require('../model/job');

module.exports = {
    create(req,res){
        return res.render("job")
    },

    async save(req, res){
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() //atribuindo a data de hoje
            });

        return res.redirect('/')
    },

    async show(req, res) {

        // puxa o id do job para jogar na http
        const jobId = req.params.id

        // aqui estou puxando do model os dados para usar aqui
        const jobs = await Job.get()

        // busncar o job pelo id dele
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('Job not found')
        }

        const profile = await Profile.get()

        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req,res){
        // puxa o id do job para jogar na http
        const jobId = req.params.id

        const jobs = await Job.get()

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

        await Job.update(newJob)

        res.redirect("/")
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