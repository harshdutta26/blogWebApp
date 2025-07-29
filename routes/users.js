const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));
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