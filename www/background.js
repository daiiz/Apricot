 // background.js for chrome apps
chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
/**/  width: 480, maxWidth: 480, height: 640, maxHeight: 640, /* by Apricot */
      singleton: false
   },function(appWindow) {
   });
});
