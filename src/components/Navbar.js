import React from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function Navbar(props) {
  const navigate=useNavigate()
 
    const handleRemove=()=>{
      localStorage.removeItem('token')
      window.location.reload()
      
    }
  
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item dropdown">
          
        </li>
       
      </ul>
      
     { localStorage.getItem('token')?<><Link to='/login'> <button  className="btn btn-outline-success mx-2" type="submit">Log in</button></Link>
       <Link to='/signup'>
        <button className="btn btn-outline-success mx-2" type="submit">Sign up</button>
       </Link></>:<button onClick={handleRemove} className='btn btn-outline-success mx-2'>LogOut</button>}
      
    </div>
  </div>
</nav>
    </>
  )
}
