import React, { useContext } from 'react'
import { newNoteContext } from '../App'


export default function About() {
  const a=useContext(newNoteContext)
 
  return (
    <div><h1>{a.title}</h1></div>
  )
}
