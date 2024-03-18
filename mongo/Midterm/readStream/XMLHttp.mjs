function get(url) {
    return new Promise(function(fulfill, reject) { 
      console.log('getting ', url);
      req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
          fulfill(req.responseText);
        } else {
          reject('got bad status code ' + req.status); 
        }
      });
      // also reject for error event listener!
      req.send();
    });
}
