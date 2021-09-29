let data = [
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
]

module.exports = {
    get(){
        return data;
    },

    // aqui estou pucadno do controller os dados para fazer a atualização no array
    update(newJob) {
        data = newJob;
    },

    // Aqui estou puxando do Controller do Job o ID necessario para fazer a action delete
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    },

    create(newJob) {
        data.push(newJob)
    }
}