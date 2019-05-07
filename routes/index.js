var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var client_id = '89921de5e8e04e09ae6aeaf5c29ea10f'; // Your client id
var client_secret = '8a44b76a454147feb017d2fb424ff0d3'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/* GET login page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Hitify App' });
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;
