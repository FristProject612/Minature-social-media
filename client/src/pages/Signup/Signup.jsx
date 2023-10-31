import Notification from "../../components/Notifications";
import { useState } from "react";
import { signup } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();  

  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");

  
  const showNotification = (message) => {
      setNotification(message);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      dob: dob,
      username: username,
      password: password
    }

    const isEmpty = Object.values(userData).every((value) => value === "");
    if(isEmpty){
      return showNotification("Any below field is empty.");
    }

    const responseData = await signup(userData);
    
    if(responseData.status === 409){
      return showNotification(responseData.data.message);
    }

    navigate('/login'); 
  }

  return(
    <div className="centered-content">
      {(notification) && <Notification message={notification} />}
      <div className='card'>
        <h2 className='h4 text-center mb-5'>Sign up</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)}  placeholder='First name' className="form-control my-3"/>
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' className="form-control my-3"/>
            <input type="date" value={dob.date} onChange={(e) => setDob(e.target.value)} placeholder='dob' className="form-control my-3"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className="form-control my-3"/>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' className="form-control my-3"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className="form-control my-3" />
            <button type="submit" className='btn btn-primary m-3'>Submit</button>
        </form>
        <a href="/login">Already have an account? Login</a>

      </div>
    </div>
  )
}