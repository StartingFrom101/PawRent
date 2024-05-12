import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        username,
        email,
        password,
      });
      alert('Register Success');
    }
    catch (e) {
      alert(e);
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-center'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser} >
          <input type='text' placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)} />
          <input type='email' placeholder="Email@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
          <input type='password' placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
          <button className='primary'>Register</button>
          <div><Link to={'/login'}>Login Here</Link></div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage