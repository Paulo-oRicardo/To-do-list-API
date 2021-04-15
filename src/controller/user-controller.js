
const { request } = require('express');
const userModel = require('../model/user-model');
const UserDao = require('../DAO/usuario-dao')

function userController(app, bd){
  const Userdao = new UserDao(bd)
   app.get('/user/:email', (req, res)=> {
    //  const users = banco.user;
      // res.send(users)
      const user = banco.user
      const users = user.find(users => users.email == req.params.email)
      console.log(users)
      res.send(users)
      // user.forEach(element=>{
      //   console.log(element.email)
      //   if(element.email == req.params.email){
      //     res.send(element)
      //   }
      //   res.send("Ocorreu um erro")
      // })
      // for(let i =0; i<user.length;i++ ){
      //   console.log(user[i].email)
      //   if(req.params.email == user[i].email){
      //     res.send(user[i])
      //   }
      //   res.send("Ocorreu um erro")
      // }
    })
   
    app.get('/user',(req, res)=> {
      Userdao.listaUsuarios()
      .then(users =>{
      res.status(200).send(users)
      }).catch(err=>{res.send({mensagem:`Deu erro ai ${err}`})})
      })

    app.post('/user', (req, res)=> {
      // const {name, email, password} = req.body
      const {name, email,password} = req.body;
      let user = new userModel(0, name, email, password);
      Userdao.insereUsuario(user)
      .then(insertUser => {
        res.status(201).send({mesage:"Usuario inserido com sucesso"})
      }).catch(err =>{
        res.send({mesage: `Olha esse erro aqui: ${err}`})
      })
      // let user = new userModel(body.id, body.name, body.email, body.password);
      // console.log(JSON.stringify(user));
      // if(body.name && body.email && body.password){
      //   console.log(JSON.stringify(user));
      //   banco.user.push(user)
      //   res.send(user)
      
      // };
      // res.send("Deu erro ai ó ")
    })

    app.put('/user/:email',(req,res) => {
        const user = banco.user
        const users = user.find(users =>{ 
          users.email == req.params.email
          users.email = request.body.email
        })
        res.send(users)
    })

    app.delete('/user/:email',(req,res) => {
      const user = banco.user
      
      for(let i = 0; i<user.length; i++){
        if(req.params.email == user[i].email){
          user.splice(i,1)
      }
      }
      // const users = user.find(users => {users.email == req.params.email})
      // console.log(users)
      // remove (users)
      res.send({mensagem: `Usuário com email ${req.params.email} passado pelo paramêtro foi deletado`})
    })

};
module.exports = userController