 // background.js for chrome apps
chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
/**/  width: 640, maxWidth: 640, height: 480, maxHeight: 480, /* by Apricot */
      singleton: false
   },function(appWindow) {
   });
});
