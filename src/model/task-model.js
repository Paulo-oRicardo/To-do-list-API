class taskModel{
   insertTask(id,title,description,status,data){
     
      task={
         taskId:id,
         title:title,
         decription:description,
         status:status,
         data:data,
      }
   }
}
module.exports = insertTask;