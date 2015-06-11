// User script
// Apricotの最新APIセット
var a = apricot.api;

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  var id = info.brick.id;

  if(a.CheckId(id, 'base5_1')) {
    a.ToggleDrawerFromLeft('panel', '0.5');
  }

  if(a.CheckId(id, 'base5_6')) {
    //a.RemoveNonvisibleBrick('card_0');
    var new_id = a.CopyBrickInParts('base5_5', 'card_0');
    a.ToggleExpandBrick(new_id, "left top");
  }

  if(a.CheckId(id, 'card_0')) {
    //a.CloseExpandBrick(id, "right bottom");
    a.CloseWidthBrick(id);
  }

  if(a.CheckId(id, 'base5_7')) {
  }


}, false);
