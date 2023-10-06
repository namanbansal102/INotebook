const connectMongo=require('./db')
const express=require('express')
const cors=require("cors")
connectMongo()
const app=express();
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require("./routes/notes"))
app.get('/',(req,res)=>{
res.send("my home running")
})
app.listen('80',()=>{
    console.log("Running on Port 80");
})