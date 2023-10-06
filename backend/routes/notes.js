const express=require("express")
const fetchUser=require("../middleware/fetchUser")
// const { validationResult, body } = require("express-validator");
const Notes=require("../models/Notes")
const router=express.Router();
router.post('/fetchNotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.find({ user: req.user.id });
        console.log('Notes:', notes);
    
        res.json(notes);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.post('/addNote',fetchUser,async (req,res)=>{
    const note=await Notes.create(
        {
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            tags:req.body.tag
        }
        )
        const savedNote=await note.save()
        console.log("Note is Saved Successfullt");
        res.json(savedNote)
        
})
router.put("/updateNote/:id",fetchUser,async (req,res)=>{
    const {title,description,tag}=req.body
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    try {
        
    
    const note=await Notes.findById(req.params.id)
    if(!note){
        res.status(400).send("note Does not Exist")
    }
    if(note.user.toString()!==req.user.id){
        res.status(400).send("Cannot Update")
        
    }
    
    noto=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote})
    console.log(noto);
    res.status(200).send(noto)
} catch (error) {
    console.log("Sorry😂");
    res.status(400).send("Cannot Update")
        
    }
    
})
router.delete("/deleteNote/:id",fetchUser,async (req,res)=>{
    try {
        const note=await Notes.findById(req.params.id)
    if(!note){
        res.status(400).send("note Does not Exist")
    }
    if(note.user.toString()!==req.user.id){
        res.status(400).send("Cannott Update")
        
    }
    noto =await Notes.findByIdAndDelete(req.params.id)
    res.status(200).json({"Status":"Success",note:noto})
    
} catch (error) {
    console.log("Sorry 😂");
    console.log(error);
    res.status(400).send("Cannot Delete")
    }


})
module.exports=router