module.exports = class UsuariosDAO{
   constructor(bd){
     this.bd = bd
   };
  listUser(){
    return new Promise((res,rej)=>{
            this.bd.all(`SELECT * FROM USUARIOS`, (err, rowns)=>{
             if(err)
             rej('Falha ao listar os usuários aí');
              else
             res (rowns)
           })
          })
       //? O controlador que toma a decisão, então try e catch lá
   }
   listForEmail(email) {
      return new Promise((res, rej) => {
        this.bd.all("SELECT * FROM USUARIOS WHERE EMAIL = (?)", [email],
        (err, usuarios) => {
          if (err) {
           rej('Falha ao listar os usuários aí');
          } else {
            res(usuarios);
          }
        });
      });
    }
   insertUser(user){
      return new Promise((res, rej)=>{
         this.bd.run( "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)"
         ,[user.name, user.email, user.password]
         ,(err)=>{
           if(err)
            rej(`Erro ao cadastrar Usuário`)
           else
            res("Inserido com sucesso")
         })
      })
   }
   changesUser(user,{NOME, SENHA}) {
      return new Promise((res, rej) => {
         this.bd.run(
            "UPDATE USUARIOS SET NOME = (?), SENHA = (?) WHERE EMAIL = (?)",
            [NOME, SENHA, user],
            (err) => {
               if (err) {
               rej("Erro ao alterar usuário");
               } else {
               res("Usuário alterado com sucesso!");
               }
            }
         );
      })
   }
  deleteUser(user) {
   return new Promise((res, rej) => {
     this.bd.run(
       "DELETE FROM USUARIOS WHERE EMAIL = (?)",
       [user],
       (err) => {
         if (err) 
           rej("Erro ao deletar usuário");
          else 
           res("Usuário deletado com sucesso!");
       });
   });
 }
}
