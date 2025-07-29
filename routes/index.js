var express = require('express');
var router = express.Router();
var blogModel=require('./users');
const {GoogleGenAI, UpscaleImageResponse}=require('@google/genai')
require('dotenv').config()
router.get('/', async function(req, res) {
  var blog= await blogModel.find().sort({createdAt:-1});
  res.json(blog);

});
router.post('/newBlog',async (req,res)=>{
  var newBlog= new blogModel(req.body);
   await newBlog.save();
  res.status(201).json({ success: true, message: 'Blog saved successfully' });
});

router.post('/ai',async(req,res)=>{
  const topic=req.body.title;
          const api_Key=process.env.GEMINI_API_KEY;
    if (!api_Key) {
            console.error("Error: GEMINI_API_KEY not found in environment variables. Please check your .env file.");
            return res.status(500).json({ success: false, message: "Server configuration error: Gemini API key missing." });
        }
    const ai=new GoogleGenAI({apikey:api_Key})
    // const val=req.session.pdfText?.text || "";
    const prompt=`Write a Blog on ${topic}`
   
    async function main(){
        const ans=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt,
            config: {
      thinkingConfig: {
        thinkingBudget: 0, 
      },
    }
        });
        
        if(ans){
            console.log(ans.text);
            res.status(201).json({success:true,message:"Done",blog:ans.text});
        }
        else{console.log("Not found");}
    }
    main();
})

router.post('/delete',async(req,res)=>{
  var blog=await blogModel.findOneAndDelete({_id:req.body.id});
  res.json({sucess:true,message:'Blog Deleted successfully'});
});
router.put('/update',async(req,res)=>{
  var updatedBlog= await blogModel.findOneAndUpdate({_id:req.body.id},{title:req.body.title},{new:true});
  var blog=await blogModel.findOneAndDelete({_id:req.body.id});
  if(!updatedBlog){
    res.status(404).json({sucess:false,error:"blog not found"});
  }
  else{
      res.json({sucess:true,title:updatedBlog.title,content:updatedBlog.content,author:updatedBlog.author});
  }
});


module.exports = router;
