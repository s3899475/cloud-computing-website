const api = require('./server_routes');

const PROCESS_PORT = process.env.PORT || 4000;

const API_URL = process.env.API_URL || 'https://0ei0c4u0yd.execute-api.us-east-1.amazonaws.com';


const API_KEY = process.env.API_KEY || '4lvLAQ9Dfq7ZGBrS05LjV2wWMlYWxwvF3CP8LT33'; // use x-api-key: theKey

const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')

const restify_client = require('restify-clients');
const { escape } = require('querystring');

const client = restify_client.createJsonClient(API_URL);

app
  .use(express.static(path.join(__dirname, '/client/build')))
  .use(express.json({ strict: false }))
  .listen(PROCESS_PORT, () => console.log(`Listening on ${PROCESS_PORT}`));

app.use(cookieParser('cookie-key'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/authenticate', (req, res) => {
  const cookie_options = {
    sameSite: true,
    //httpOnly: true,
    signed: true
  }
  
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  console.log('user');
  console.log(user);

  client.post({path: '/Production/users', headers: {'x-api-key': API_KEY , 'Content-Type': 'application/json'}},
    user,
    function(api_err, api_req, api_res, api_obj) {
      if (api_err) {
        console.log("bad password");
        console.log(api_res.body);
        res.status(400).send();
      } else {
        console.log(api_obj);
        res.cookie('user', user.username, cookie_options).send();
      }
    }
  )
});

app.post('/register', (req, res) => {
  const cookie_options = {
    sameSite: true,
    //httpOnly: true,
    signed: true
  }

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  client.post({path: '/Production/register', headers: {'x-api-key': API_KEY}},
    user,
    function(api_err, api_req, api_res, api_obj) {
      if (api_err) {
        console.log('user already exists')
        res.status(400).send();
      } else {
        console.log(api_obj);
        res.cookie('user', user.username, cookie_options).send();
      }
    }
  )
})

app.get('/subs', (req, res) => {
  if (req.signedCookies.user) {
    client.get({path: '/Production/subs?user=' + req.signedCookies.user, headers: {'x-api-key': API_KEY, 'Content-Type': 'application/json'}},
      function(api_err, api_req, api_res, api_obj) {
        console.log('get subs');
        console.log(api_obj.body.result);
        res.json(api_obj.body.result);
      }
    );
  }
})

app.post('/subs', (req, res) => {
  if (req.signedCookies.user) {
    const body = {user: req.signedCookies.user, song: req.body};
    
    console.log(body)
    client.post({path: '/Production/subs', headers: {'x-api-key': API_KEY}},
      body,
      function(api_err, api_req, api_res, api_obj) {
        console.log(api_obj);
        res.status(200).send();
      }
    )
  }
})

app.delete('/subs', (req, res) => {
  if (req.signedCookies.user) {
    console.log(req.body)
    client.del({path: '/Production/subs?user=' + req.signedCookies.user + '&title=' + escape(req.body), headers: {'x-api-key': API_KEY}},
      function(api_err, api_req, api_res) {
        res.status(200).send();
      }
    );
  }
})

app.post('/search', (req, res) => {
  if (req.signedCookies.user) {
    const body = {user: req.signedCookies.user, ...req.body};
    console.log(body);
    client.post({path: '/Production/search', headers: {'x-api-key': API_KEY, 'Content-Type': 'application/json'}},
      body,
      function(api_err, api_req, api_res, api_obj) {
        console.log('search');
        console.log(api_obj)
        res.json(api_obj.body.result);
      }
    );
  }
})