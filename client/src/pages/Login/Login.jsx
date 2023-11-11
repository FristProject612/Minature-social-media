// import React from 'react';
import { useState } from 'react'
import '../../assets/global.css'
import Notification from '../../components/Notifications';
import { login } from '../../api/auth.js';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // stores notification message
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
      setNotification(message);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
  }

  const handleSubmit = async  (e) => {
    e.preventDefault(); 

    if(!username || !password){
      return showNotification("username or password field is empty.");
    } 

    const userPass = {
      username: username,
      password: password
    };

    const responseData = await login(userPass);
    if(responseData.status === 401){
      return showNotification(responseData.data.message);
    }

    navigate('/feed');
  }


  const handleUsername = (e) => setUsername(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  return(
    <div className="centered-content">
      {(notification) && <Notification message={notification} />}
      <div className='card'>
        <h2 className='h4 text-center mb-5'>Login</h2>
        <form onSubmit={handleSubmit}>
          <label className='form-group'>
            <p>Username</p>
            <input type="text" value={username} onChange={handleUsername} placeholder='username' className="form-control"/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} onChange={handlePassword} placeholder='password' className="form-control" />
          </label>
          <div>
          <button type="submit" className='btn btn-primary m-3'>Submit</button>
          </div>
        </form>
        <a href="/signup" className="alert-link">Don&apos;t have an account? Sign up</a>

      </div>
    </div>
  )
} 