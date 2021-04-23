class taskModel{
    constructor(id,title,description,status,data,id_user){
         this.taskId= id,
         this.title= title,
         this.description= description,
         this.status= status,
         this.data= data,
         this.id_user = id_user
   }
}
module.exports = taskModel;