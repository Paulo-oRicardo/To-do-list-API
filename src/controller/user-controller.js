
const userModel = require('../model/user-model');

function userController(app, banco){
   app.get('/user', (req, res)=> {
     const users = banco.user;
      res.send(users)
    })

    app.post('/user', (req, res)=> {
      // const {name, email, password} = req.body
      const body = req.body;
      let user = new userModel(body.nome, body.email, body.password);
      
      if(body.nome && body.email && body.password){
        console.log(JSON.stringify(user));
        banco.user.push(user)
        res.send(user)
      
      };
      res.send("erro ai ógit ")
    })

};
module.exports = userController