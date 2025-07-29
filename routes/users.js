const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(`mongodb+srv://harshMongo26:${process.env.DB_PASSWORD}@blog.nlygvye.mongodb.net/?retryWrites=true&w=majority&appName=blog`);
const userSchema=mongoose.Schema({
  username:String,
  title:String,
  content:String,
  author:String,
  createdAt : {
    type:Date,
    default: new Date(),
  }

});
module.exports=mongoose.model("user",userSchema);