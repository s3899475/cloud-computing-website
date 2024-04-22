import React, { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className='label'>Username:</label>
      <div className='control'>
        <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      
      <label className='label'>Password:</label>
      <div className='control'>
        <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='control'>
        <button className='button is-primary'>Register</button>
      </div>
    </form>
  )
}