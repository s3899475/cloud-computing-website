import React, { useState } from 'react';
import UserForm from './components/UserForm';
import * as api from './components/app_routes';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false);

  function handleLoginSubmit(event) {
    event.preventDefault()
    onLogin(username, password)
  }

  function handleRegisterSubmit(event) {
    event.preventDefault()
    api.register(username, password);
  }

  return (
    <div>
      <button className='button is-secondary' onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Login Page" : "Register Page"}</button>
      {isRegister ? <UserForm setUsername={setUsername} setPassword={setPassword} handleSubmit={handleRegisterSubmit} buttonTitle="Register" /> : <UserForm setUsername={setUsername} setPassword={setPassword} handleSubmit={handleLoginSubmit} buttonTitle="Login" />}
    </div>
    
  )
}