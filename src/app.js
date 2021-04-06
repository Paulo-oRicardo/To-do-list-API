const express = require('express');
const app = express()
// const {routes} = require("./src/routes/index");
const banco = require("./infra/bd")
const userController = require("./controller/user-controller")
const taskController = require("./controller/task-controller")
const port = 3000;


app.use((req,res,next) =>{
  console.log(`[INFO]: uma requisição ${req.method} ${req.path}`)
  next()
})

userController(app,banco)
taskController(app,banco)
app.use(express.json());

app.listen(port, ()=>{
  console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`)
})