import React,{useState} from 'react'
import '../css/verify.css'
import { Navigate } from 'react-router-dom'

export default function Verify() {
  
    const [otp, setotp] = useState("")
    const myval=(e)=>{setotp(e.target.value)}
  return (
    <>
    <div className="myc">
         
   <div className="container">
   
    <input placeholder='Enter Your Otp Here' onChange={myval} id='otp' type="text" />
    <button  className='btn btn-danger my-2'>Verify</button>
   </div>
    </div>
    </>
  )
}
