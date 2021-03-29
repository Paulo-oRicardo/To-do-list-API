const express = require('express');
const app = express()

const port = 3000;
 
app.get('/user', (req, res)=> {
   res.send('Rota ativida com GET e recurso user: Valores de user devem ser retornados')
})
 
app.listen(port, ()=>{
  console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`)
})