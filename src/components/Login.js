import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";


export default function Login() {
  
  const [changeEma, setchangeEma] = useState("")
  const [changePass, setchangePass] = useState("")
  const changeEmail=(e)=>{setchangeEma(e.target.value)}
  const changePassword=(e)=>{setchangePass(e.target.value)}
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    } 
  }, []);
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log("Login Function is Running");
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:changeEma,password:changePass})
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}
