module.exports = class TaskDAO{
   constructor(bd){
      this.bd=bd
   }
   listTask() {
      return new Promise((res, rej) => {
        this.bd.all("SELECT * FROM TAREFAS", (err, tarefa) => {
          if (err) 
            rej(err);
          else 
            res(tarefa); 
        });
      });
    }
  
    listTaskForTitle(titulo) {
      return new Promise((res, rej) => {
        this.bd.all(
          "SELECT * FROM TAREFAS WHERE TITULO = (?)",
          [titulo],
          (err, titulo) => {
            if (err) 
              rej(err);
            else 
              res(titulo);
          });
      });
    }
  
    insertTask(task) {
      return new Promise((res, rej) => {
        this.bd.run(
          "INSERT INTO TAREFAS (TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES (?,?,?,?,?)",
          [
            task.title,
            task.description,
            task.status,
            task.data,
            task.id_user
          ],
          (err) => {
            if (err) 
              rej(`Falha ao inserir `);
             else 
              res("Tarefa inserida com sucesso");       
          });
      });
    }
  
    deleteTask(titulo) {
      return new Promise((res, rej) => {
        this.bd.run("DELETE FROM TAREFAS WHERE TITULO = (?)", [titulo], (err) => {
          if (err) 
            rej("Falha ao deletar tarefa");
          else 
            res("tarefa deletada com sucesso");
        });
      });
    }
  
    changesTask(id, body) {
      return new Promise((res, rej) => {
        this.bd.run(
          "UPDATE TAREFAS SET STATUS = (?), DESCRICAO = (?) WHERE ID = (?)",
          [body.STATUS, body.DESCRICAO, id],
          (err) => {
            if (err) 
              rej("Falha ao alterar tarefa "+ err);
            else 
              res("Tarefa alterado com sucesso");
          });
      });
    }
}