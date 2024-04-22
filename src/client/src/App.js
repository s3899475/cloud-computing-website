import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'

import './App.css';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import * as api from './components/app_routes';

function App() {
  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin(username, password) {
    // check login correct
    api.authenticate(username, password); // will set cookie
  }

  function handleLogout(event) {
    // remove login cookie
    setCookie('user', null, { path: '/'});
  }
  
  return (
    <CookiesProvider>
      <div>{cookies.user ? <MainPage user={cookies.user} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}</div>
    </CookiesProvider>
  )
}

export default App;
