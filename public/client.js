var getIMGPromise = function(url) {
  var promise = new RSVP.Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.send();
    function handler() {
      if (this.readyState === this.DONE) {

        if (this.status === 200) { resolve(this.response); }
        else { reject(this); }

      }
    }
  });
  return promise;
};

var images = [
                'pics/1.jpg',
                'pics/2.jpg',
                'pics/3.jpg'
              ];

var promises = images.map(function getPromisesForImages(imgURL) {
  return getIMGPromise(imgURL);
});

RSVP.all(promises).then(function(images) {
    // posts contains an array of results for the given promises
    console.log('all done', images);
}).then(null, function(error) {
  // handle errors in either of the two requests
  console.log('failed to load '+error);
});
