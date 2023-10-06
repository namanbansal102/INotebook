const mongoose=require('mongoose')
const mongoUri="mongodb://127.0.0.1:27017/holy"
const connectMongo=()=>{
    console.log("db function run");
    mongoose.connect(mongoUri)
        
    console.log("db function complete");
}
module.exports=connectMongo;