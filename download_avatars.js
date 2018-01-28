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

    cb(err,
      JSON.parse(body).forEach(function(key) {
      console.log(key.avatar_url);
      }));
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});




var url = "https://avatars2.githubusercontent.com/u/2741?v=3&s=466"
var filePath = "avatars/kvirani.jpg"




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

downloadImageByURL(url, filePath); 