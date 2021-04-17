const taskModel = require("../model/task-model");
const Dao = require("../DAO/task-dao")

function taskController(app, bd){
  const taskDao = new Dao(bd)

  app.get("/task", (req, res) => {
    taskDao.listTask()
      .then(task => res.send(task))
      .catch(err => res.send(err));
  });

  app.get("/task/:title", (req, res) => {
    const title = req.params.title;
    taskDao.listTaskForTitle(title)
      .then(titulo => res.send(titulo))
      .catch(err => res.send({mensagem:`Erro: ${err} na consulta`}));
  });

  app.post("/task", (req, res) => {
    const {titulo, descricao,status,datecriacao,id_usuario} = req.body;
    const task = new taskModel(
      0, titulo, descricao, status, datecriacao, id_usuario
    );
    taskDao.insertTask(task)
      .then(tarefas => res.send({mensagem:tarefas}))
      .catch(err => res.send({mensagem:`${err}`}));
  });
  
  app.put("/task/:title", (req, res) => {
    let title= req.params.title;
    const body = req.body;
    console.log(body);
    taskDao.changesTask(title, body)
      .then(sucess => res.send({ mensagem: sucess }))
      .catch(err => res.send({ mensagem: err }));
  });

  app.delete("/task/:title", (req, res) => {
    let title = req.params.title;
    taskDao.deleteTask(title)
      .then( sucess=> res.send({ mensagem: sucess }))
      .catch(err => res.send({ mensagem: err }));
  });
}
module.exports = taskController