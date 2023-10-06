import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';

const newNoteContext = createContext(null);

export default function App() {
  const myfetcher = async () => {
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })

    console.log("json fetching running");
    const json = await response.json();
    console.log(json);
    console.log("fetching Complete running");
    return json;
  }

  const [articles, setarticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await myfetcher();
      setarticles(data);
    };

    fetchData();
  }, []);
  

  const addmyNote = async (title, description, tag) => {
    console.log("Addnote Is Running");
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })

    console.log("json fetching running");
    const data = await response.json();
    console.log(data);
    console.log("fetching Complete running");
    const mynew = [...articles, data]
    setarticles(mynew)
  }

  const deleteNote = async (id) => {
    const newNotes = articles.filter((element) => element._id !== id)
    setarticles(newNotes)
    console.log("Delete Note is Running");
    const host = "http://localhost";
    console.log("myfetcher Function running");
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })

    console.log("json fetching running");
    const json = await response.json();
    console.log(json);
    console.log("fetching Complete running");
    
  }
const token=localStorage.getItem('token')
  return (
    <newNoteContext.Provider value={{ articles, addmyNote, deleteNote,myfetcher }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Verify />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </newNoteContext.Provider>
  );
}
export { newNoteContext }
