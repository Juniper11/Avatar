var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

if (!process.argv[2] || !process.argv[3]) {
  console.log("Error: At least one input argument is missing");
} else {
  getRepoContributors(repoOwner, repoName, downloadImageByURL);
}

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


function downloadImageByURL(url, filePath) {

  request.get(url)               
  .on('error', function (err) {                                   
    throw err; 
  })
  .on('response', function (response) {                           
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Status Message: ', response.statusMessage);
    console.log('Response Headers: ', response.headers['content-type'])
  })
  .pipe(fs.createWriteStream(filePath));               
}
