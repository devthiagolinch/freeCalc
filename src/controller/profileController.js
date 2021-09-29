const Profile = require('../model/profile');

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res){
        // req.body para pegar os dados
        const data = req.body

        // definir quantas semanas tem um ano: 52 semanas
        const weeksPerYear = 52

        // remover as semanas de ferias do ano para pegar
        // quantas semanas tem um mes
        const weekesPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // total de horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weekesPerMonth

        // qual o valor da minha hora
        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": data["value-hour"]
        })

        return res.redirect("/profile")
    },
}