module.exports = {
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