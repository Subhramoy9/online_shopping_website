const mongoose=require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/amazon_clone',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected successfully');
}).catch((e)=>{
    console.log(e);
})