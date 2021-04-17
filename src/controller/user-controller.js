
const { request } = require('express');
const userModel = require('../model/user-model');
const Dao = require('../DAO/usuario-dao')

function userController(app, bd){
  const Userdao = new Dao(bd)
   app.get('/user/:email', (req, res)=> {
    //  const users = banco.user;
      // res.send(users)
      let email = req.params.email;
      Userdao.listForEmail(email)
      .then(usuario =>{res.send(usuario)})
      .catch(err => res.senf(`Erro: ${err}`))
    })
   
    app.get('/user',(req, res)=> {
      Userdao.listaUsuarios()
      .then(users =>{
      res.status(200).send(users)
      }).catch(err=> res.send({mensagem:`Deu erro ai ${err}`}))
      });


    app.post('/user', (req, res)=> {
      // const {name, email, password} = req.body
      const {name, email,password} = req.body;
      let user = new userModel(0, name, email, password);
      Userdao.insereUsuario(user)
      .then(insertUser => {
        res.status(201).send({mensagem:"Usuario inserido com sucesso"})
      }).catch(err =>
        res.send({mensagem: `Olha esse erro aqui: ${err}`})
      )
    });

    app.put("/user/:email", (req, res) => {
      const body = req.body;
      let email = req.params.email;
      console.log(body);
      Userdao.alteraUsuario(email,body)
      .then(mensagemSucesso => res.send({mensagem: mensagemSucesso}))
      .catch(mensagemFalha => res.send({mensagem: mensagemFalha}));
    });

    app.delete("/user/:id", (req, res) => {
      let id = req.params.id;
      Userdao.deletaUsuario(id)
      .then(mensagemSucesso => res.send({mensagem: mensagemSucesso}))
      .catch(mensagemFalha => res.send({mensagem: mensagemFalha}));
    });
};
module.exports = userController