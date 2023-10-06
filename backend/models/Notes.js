const mongoose=require('mongoose')
const { Schema } = mongoose;


const noteSchema=new Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
        

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true,
        default:"General"
    },
    
    
})
module.exports=mongoose.model('Notes',noteSchema)