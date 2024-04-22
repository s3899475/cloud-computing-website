import React, { useState, useEffect } from 'react'

import * as api from './components/app_routes';
import SongGrid from './components/SongGrid';
import QueryForm from './components/QueryForm';

export default function MainPage({ user, onLogout }) {
  const [subs, setSubs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    api.getSubs()
      .then(result => setSubs(result));
  }, []);

  function handleLogoutButton(event) {
    event.preventDefault()
    onLogout();
  }

  function handleSubscribe(new_song) {
    if (!subs.find(element => element.title === new_song.title)) {
      setSubs([...subs, new_song]);
      api.addSub(new_song);
    }
  }

  function handleUnsubscribe(song) {
    setSubs(subs.filter(item => item.title !== song.title));
    api.removeSub(song);
  }

  function handleSearch(query) {
    api.search(query)
      .then(result => setSearchResult(result));
  }

  return (
    <div>
      <nav className='navbar is-dark' role='navigation'>
        <div className='navbar-menu'>
          <p className='navbar-item'>
          Username: {user.username}
          </p>
        </div>
        <div className='navbar-end'>
          <button className='button is-light' onClick={handleLogoutButton}>Logout</button>
        </div>
      </nav>
      
      <div>
        <section className="hero is-small is-info">
          <div className="hero-body">
            <p className="title">Subscriptions</p>
          </div>
        </section>
        <div className='fixed-grid has-7-cols'>
          <SongGrid songs={subs} buttonTitle='Remove' onButton={handleUnsubscribe}/>
        </div>
        <section className="hero is-small is-primary">
          <div className="hero-body">
            <p className="title">Search</p>
          </div>
        </section>
        <QueryForm onSubmit={handleSearch}/>
        <div className='fixed-grid has-7-cols'>
          <SongGrid songs={searchResult} buttonTitle='Subscribe' onButton={handleSubscribe}/>
        </div>
      </div>
    </div>
  );
}