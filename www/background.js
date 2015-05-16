// background.js for chrome apps
chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
      width: 480,
      height: 640,
      type: 'shell',
      singleton: false
   },function(appWindow) {
   });
});
