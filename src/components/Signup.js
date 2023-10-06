import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {
  const [changeEma, setchangeEma] = useState("")
  const [name, setname] = useState("")
  const [changePass, setchangePass] = useState("")
  const changeEmail=(e)=>{setchangeEma(e.target.value)}
  const changename=(e)=>{setname(e.target.value)}
  const changePassword=(e)=>{setchangePass(e.target.value)}
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log("Sign up Function is Running");
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name,email:changeEma,password:changePass})
    })

   
    const data = await response.json()
    console.log(data);
    if(data.success){
      console.log("Success is True");
      localStorage.setItem('token',data.token)
      navigate("/home")
    }
    else{
      console.log("Sorry Unable To Login 😂😂😂😂");
      navigate("/signup")
      
    }
  }
  return (
    <>
      <div className="container my-2">
        <form onSubmit={handleSubmit}>
        <div className="form- my-2">
            <label for="exampleInputname1">Name</label>
            <input
              type="name"
              className="form-control"
              id="exampleInputEname"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              onChange={changename}
            />
            </div>
          <div className="form- my-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={changeEmail}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group my-2">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={changePassword}
            />
          </div>

          <button type="submit my-2" className="btn btn-danger">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
