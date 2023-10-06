import React, { useContext } from 'react'
import { newNoteContext } from '../App'

export default function AddNote(props) {
  let {title,description,tag,id,updateNote}=props
  let {deleteNote}=useContext(newNoteContext)
  return (
    <>
    <div className="card mx-2 my-2" style={{width:"18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <h5 className='card-tag'>{tag}</h5>
    <p className="card-text">{description}</p>
    <div class="d-flex flex-row-reverse">
    <i onClick={()=>deleteNote(id)} class="fa-solid fa-trash-can p-2" style={{cursor:'pointer'}}></i>
    <i onClick={()=>{updateNote(title,description,tag,id)}} class="fa-sharp fa-regular fa-pen-to-square p-2" style={{cursor:'pointer'}}></i>
    </div>
  </div>
</div>
    </>
  )
}
