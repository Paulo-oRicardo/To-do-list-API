module.exports = class UsuariosDAO{
   constructor(bd){
     this.bd = bd
   };
   listaUsuarios(){
       return new Promise((res, rej)=>{
         this.bd.all(`SELECT * FROM USUARIOS`, (err, rowns)=>{
            if(err)
            rej(err)
             else
             res(rowns)
          })

      }) //? O controlador que toma a decisão, então try e catch lá
   }
   listForEmail(email) {
      return new Promise((res, rej) => {
        this.bd.all("SELECT * FROM USUARIOS WHERE EMAIL = (?)", [email],
        (err, usuarios) => {
          if (err) {
            rej(err);
          } else {
            res(usuarios);
          }
        });
      });
    }
   insereUsuario(user){
      return new Promise((res, rej)=>{
         this.bd.run( "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)"
         ,[user.name, user.email, user.password]
         ,(err)=>{
           if(err)
            rej(`Erro ao inserir: ${err}`)
           else
            res({mensagem:"Inserido com sucesso"})
         })
      })
   }
   alteraUsuario(usuario, body) {
      return new Promise((res, rej) => {
         this.bd.run(
            "UPDATE USUARIOS SET NOME = (?), SENHA = (?) WHERE EMAIL = (?)",
            [body.NOME, body.SENHA, usuario],
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
deletaUsuario(usuario) {
   return new Promise((res, rej) => {
     this.bd.run(
       "DELETE FROM USUARIOS WHERE ID = (?)",
       [usuario],
       (err) => {
         if (err) {
           rej("Erro ao deletar usuário");
         } else {
           res("Usuário deletado com sucesso!");
         }
       }
     );
   });
 }
}
