function taskController(app, bd){
  app.get('/task', (req, res)=> {
     res.send('Rota ativida com GET e recurso user: Valores de user devem ser retornados')
   })
   app.post('/task', (req, res)=> {
    res.send('Rota POST de usuario ativada: usuário aidicionado ao banco de dados')
  })
}
module.exports = taskController