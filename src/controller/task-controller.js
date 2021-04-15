const taskModel = require("../model/task-model");

function taskController(app, banco){
  app.get('/task', (req, res)=> {
     const task = banco.task;
     res.send(task)
   })
   app.post('/task', (req, res)=> {
    const body = req.body;
    let task = new taskModel(body.id, body.title, body.description, body.status, body.data);
    if(body.id && body.title && body.description && body.status && body.data){
      console.log(JSON.stringify(task));
      banco.task.push(task)
      res.send(task)
    
    };
    res.send("Deu erro ai ó ")
  })
  
  app.delete('/task/:id',(req,res) => {
    const task = banco.task
    
    for(let i = 0; i<task.length; i++){
      if(req.params.id == task[i].id){
        user.splice(i,1)
    }
    }
    // const users = user.find(users => {users.email == req.params.email})
    // console.log(users)
    // remove (users)
    res.send({mensagem: `Usuário com email ${req.params.id} passado pelo paramêtro foi deletado`})
  })
}
module.exports = taskController