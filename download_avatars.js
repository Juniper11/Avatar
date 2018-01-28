var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent' : 'request',
      'Authorization' : secrets
    }
};
  request(options, function(err, res, body) {
    if (err) {
      return;
    }
    JSON.parse(body).forEach(function(key, index) {
      cb(key.avatar_url, `avatars/kvirani${index}.jpg`)
      console.log(key.avatar_url);
      console.log("adding ava------------------------------");
      });
  });
}


getRepoContributors("jquery", "jquery", downloadImageByURL);




//var url = "https://avatars2.githubusercontent.com/u/2741?v=3&s=466"
//var filePath = "avatars/kvirani.jpg"




function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
  .on('error', function (err) {                                   // Note 2
    throw err; 
  })
  .on('response', function (response) {                           // Note 3
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Status Message: ', response.statusMessage);
    console.log('Response Headers: ', response.headers['content-type'])
  })
  .pipe(fs.createWriteStream(filePath));               // Note 4


}

//downloadImageByURL(url, filePath); 