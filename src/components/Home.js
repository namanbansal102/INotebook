import React, { useState, useEffect } from 'react';
import Notes from './Notes';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } 
  }, []);

  return  (
    <div className="container">
      <AddNote />
      <Notes />
    </div>
  ) 
};

export default Home;
