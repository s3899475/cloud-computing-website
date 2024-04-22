const API_URL = 'localhost:5000';

export async function authenticate(username, password) {
  //const response = await
  fetch('/authenticate', {
    method: 'POST',
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
}

export async function register(username, password) {
  const response = fetch('/register', {
    method: 'POST',
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
}

export async function getSubs() {
  const response = await fetch('/subs')
  
  if (!response.ok) {
    console.log('error getting subs');
    return [];
  }

  const data = await response.json();
  return data.subs;
}

export async function addSub(new_song) {
  fetch('/subs',
    {
      method: 'POST',
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify(new_song)
    }
  )
}

export async function removeSub(song) {
  fetch('/subs',
    {
      method: 'DELETE',
      body: JSON.stringify(song.title),
      headers: {
        "Content-Type": "application/json"
      },
    }
  )
}

export async function search(query) {
  const response = await fetch('/search', {
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