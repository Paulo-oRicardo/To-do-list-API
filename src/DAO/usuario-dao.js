module.exports = class UsuariosDAO{
   constructor(bd){
     this.bd = bd
   };
   listaUsuarios(){
       return new Promise((resolve, reject)=>{
         this.bd.all(`SELECT * FROM USUARIOS`, (err, rowns)=>{
            if(err)
            reject(err)
             else
             resolve(rowns)
          })

      }) //? O controlador que toma a decisão, então try e catch lá
   }

   insereUsuario(user){
      return new Promise((resolve, reject)=>{
         this.bd.run( "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)"
         ,[user.name, user.email, user.password]
         ,(err)=>{
           if(err)
            reject(`Erro ao inserir: ${err}`)
           else
            resolve({mensagem:"Inserido com sucesso"})
      })
   })
}
}
