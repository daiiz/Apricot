// User test

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;

  if(info.brick.id == 'base5_1') {
    apricot.api.ToggleParts('panel')
  }

}, false);
