
const userModel = require('../model/user-model');
const Dao = require('../DAO/usuario-dao')

function userController(app, bd){
  const Userdao = new Dao(bd)
   app.get('/user/:email', (req, res)=> {
      let email = req.params.email;
      Userdao.listForEmail(email)
      .then(user => res.send(user))
      .catch(err => res.send({mensagem: err}))
    })
   
    app.get('/user', async (req, res)=> {
      try {
        let result = await Userdao.listUser()
        res.send(result)
      }
      catch(error){
        res.send(503).send({ mensagem: error })
      }
    });


    app.post('/user', (req, res)=> {
      const {NOME, EMAIL, SENHA} = req.body;
      let user = new userModel(0,NOME, EMAIL, SENHA);
      Userdao.insertUser(user)
      .then(insertUser => {
        res.status(201).send({mensagem:insertUser})
      }).catch(err =>
        res.send({mensagem: err})
      )
    });

    app.put("/user/:email", (req, res) => {
      const body = req.body;
      let email = req.params.email;
      Userdao.changesUser(email,body)
      .then(messageSuccess => res.send({mensagem: messageSuccess}))
      .catch(messageFailure => res.send({mensagem: messageFailure}));
    });

    app.delete("/user/:email", (req, res) => {
      let email = req.params.email;
      Userdao.deleteUser(email)
      .then(messageSuccess => res.send({mensagem: messageSuccess}))
      .catch(messageFailure => res.send({mensagem: messageFailure}));
    });
};
module.exports = userController