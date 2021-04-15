const userModel = require("../model/user-model");

const banco ={
   user:[new userModel("Charlie", "Charlie@aqui.com","1234")],
   task:[]
}

module.exports = banco;