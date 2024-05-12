import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const {setUser} = useContext(UserContext);
  async function LoginUser(ev) {
    ev.preventDefault();
    try { 
      const userInfo = await axios.post('/login', {email, password}, {withCredentials: true});
      setUser(userInfo.data);
      alert("Login Successful");
      setRedirect(true);
    }
    catch (e) {
      alert(e);
    }
  }

  if(redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-center'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={LoginUser}>
          <input type='email'
            placeholder="Email@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input type='password'
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className='primary'>Login</button>
          <div><Link to={'/register'}>Register Here</Link></div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage