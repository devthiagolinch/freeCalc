const Database = require('../db/config')

/* let data = [
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
] */

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM  jobs`)

        await db.close();

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }));
    },

    // aqui estou pucadno do controller os dados para fazer a atualização no array
    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)

        await db.close()
    },

    // Aqui estou puxando do Controller do Job o ID necessario para fazer a action delete
    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`) 

        await db.close()
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at} 
            );
        `)

        await db.close()
    },
};