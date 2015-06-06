// User test

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  if(info.brick.id == 'base5_1') {
    apricot.api.ToggleParts('panel');
  }

  if(info.brick.id == 'base5_6') {
    var c = apricot.api.DuplicateBrick('base5_1');
    apricot.api.ShowBrick(c);
    apricot.api.MoveBrickTo(100, 100, c);
  }
}, false);
