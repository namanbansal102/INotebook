import React, { useContext,useState } from 'react'
import { newNoteContext } from '../App'

export default function AddNote() {
  

    const [myval, setmyval] = useState("")
    const [myvaltwo, setmyvaltwo] = useState("")
    const [myvaltag, setmyvaltag] = useState("")
    const {addmyNote}=useContext(newNoteContext)
    const onChange=(e)=>{
        setmyval(e.target.value)
        console.log(e.target.value);    
    }
    const onChangetwo=(e)=>{
        setmyvaltwo(e.target.value)
        console.log(e.target.value);


    }
    const onChangetag=(e)=>{
        setmyvaltag(e.target.value)
        console.log(e.target.value);


    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("Handle Submit running");
        console.log(myval,myvaltwo,myvaltag);
        addmyNote(myval,myvaltwo,myvaltag)
    }
  return (
    <form>
    <div className="form-group my-2">
      <label for="title">Title</label>
      <input type="text" className="form-control"  onChange={onChange} id="title"  placeholder="Enter Title"/>
    </div>
    <div className="form-group my-2">
      <label for="description">Description</label>
      <input type="text" className="form-control" onChange={onChangetwo}  id="description" placeholder="Description"/>
    </div>
    <div className="form-group my-2">
      <label for="tag">Tag</label>
      <input type="text" onChange={onChangetag}  className="form-control" id="tag" placeholder="Tag"/>
    </div>
    <button onClick={handleSubmit} className="btn btn-danger my-2">Add Note</button>
  </form>
  )
}
