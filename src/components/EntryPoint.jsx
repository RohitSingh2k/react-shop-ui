import React from 'react'
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';

const EntryPoint = () => {

  const loggedIn = JSON.parse(localStorage.getItem('login'));

  return loggedIn ? <Home/> : <Login/>
}

export default EntryPoint