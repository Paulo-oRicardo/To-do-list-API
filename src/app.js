const express = require('express');
const app = express()
const bd = require('./infra/db-sqlite')
const cors = require('cors')
// const {routes} = require("./src/routes/index");

const userController = require("./controller/user-controller")
const taskController = require("./controller/task-controller")
const port = 8080;

// bd.all("SELECT * FROM USUARIOS", (err, rows)=>{
//   if(err){
//      throw new Error(`Erro ao rodas consulta`)
//   }else{
//     console.log(rows)
//   }})

app.use((req,res,next) =>{
  console.log(`[INFO]: uma requisição ${req.method} ${req.path}`)
  next()
})
app.use(cors())
app.use(express.json());
userController(app,bd)
taskController(app,bd)


app.listen(port, ()=>{
  console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`)
})