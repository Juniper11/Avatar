var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

//Ensures the user has added the arguments on the terminal
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
    JSON.parse(body).forEach(function(key, login) {

      //the callback formats the output names
      cb(key.avatar_url, `avatars/${key.login}.jpg`)
      console.log(key.avatar_url);
      console.log("------------------------------");
      });
  });
}

//Will create the avatar directory if it doesn't already exist
var dir = "./avatars/"; 
fs.stat(dir, function(err, stats) { 
  if (err || !stats.isDirectory()) {
    fs.mkdir(dir, function(err) {
      if(err) {
        throw err;
      }
    });
  }
});

// GET Request downloader function
function downloadImageByURL(url, filePath) {
  request.get(url)               
  .on('error', function (err) {                                   
    throw err; 
  })
  .on('response', function (response) {                           
  })
  //Will overwrite files downloaded with the same name
  .pipe(fs.createWriteStream(filePath));               
}
