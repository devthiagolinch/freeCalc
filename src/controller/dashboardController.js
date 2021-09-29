const Job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
    async index(req, res) {
        const jobs = Job.get();
        // aqui estou pedindo ao model Profile para pegar (get) dados
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length,
        }

        // total de hoas por dia de cada job em progresso
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            // ajustes do job
            const remaining = jobUtils.restingDays(job) // para puxar de services essa function de restingDays
            const status = remaining <= 0 ? 'done' : 'progress';

            // status = done
            // statusCount[done] +=1, ou seja, esta colocando
            // +1 em done dentro de statusCount, ja que dentro de status
            // doi definido como done apos a verificacao
            // somando a quantidade de status
            statusCount[status] += 1;

            // "jogar" em jobTotalHours a soma apenas de todos os projetos que estejam em 'progress'
            // esse modo de fazer o if eh o ternario
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
            // ou seja aqui eu vou puxar apenas a hora de trabalho do dia dos projetos que estao em progress
            // se estiver em done ele nao sera contado

            // a = a +1
            // a += 1
            // para quando preciso somar o conteudo de uma variavel
            // e colocar de volta nessa mesma variavel
    
            return {
                ...job, // espalhamento JS, pegar os dados e jogar aqui dentro
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // qtd de horas que quero trabalhar - qtd de horas de projetos em andamento
        const freeHours = profile["hours-per-day"] - jobTotalHours;
    
        return res.render("index", { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    
    }
}