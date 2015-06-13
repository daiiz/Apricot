// User script

var a = apricot.api; // Apricotの最新APIセット

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  var id = info.brick.id;

  if(a.CheckId(id, 'base5_1')) {
    a.ToggleDrawerFromLeft('panel', '0.5');
  }

  if(a.CheckId(id, 'base5_6')) {
    var new_id = a.CopyBrickInParts('base5_5', 'card_0');
    a.Dom(new_id).innerHTML = "<img src='apricot.png' class='xapricot' style='width: 50px'>";
    a.ToggleExpandBrick(new_id, "left top");
  }

  if(a.CheckId(id, 'card_0')) {
    //a.CloseExpandBrick(id, "right bottom");
    a.CloseWidthBrick(id);
  }

  if(a.CheckId(id, 'base5_7')) {
  }


}, false);
