const rc = require('restify-clients');

const API_URL = process.env.API_URL || 'http://localhost:5000';

module.exports = {
  rest: rc.createJsonClient(API_URL),

  checkUser: async function(user) {
    this.rest.post('/check_user', user, function(err, req, res, obj) {
      console.log(obj);
    })
  },

  getSubs: async function getSubs(username) {
    const response = await fetch(API_URL + '/get_subs',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(username)
    })
    if (!response.ok) {
      console.log('error getting subs');
      return [];
    }
    const data = await response.json();
    return data;
  },

  addSub: async function addSub(new_song) {
    fetch(API_URL + '/add_sub',
      {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(new_song)
      }
    )
  },

  removeSub: async function removeSub(song) {
    fetch(API_URL + '/subs',
      {
        method: 'DELETE',
        body: JSON.stringify(song.title),
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
  },

  search: async function search(query) {
    const response = await fetch(API_URL + '/query', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query)
    })
  
    if (!response.ok) {
      console.log('error in search');
      return [];
    }
  
    const data = await response.json();
    return data;
  }
}