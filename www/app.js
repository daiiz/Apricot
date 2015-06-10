// User test

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  if(apricot.api.CheckId(info.brick.id, 'base5_1')) {
    apricot.api.ToggleDrawerFromLeft('panel', '.5');
  }

  if(apricot.api.CheckId(info.brick.id, 'base5_6')) {
    /*
    var c = apricot.api.DuplicateBrick('base5_1');
    apricot.api.ShowBrick(c);
    apricot.api.MoveBrickTo(100, 100, c);
    */
    //apricot.api.MovePartsTo(150, 200, "card_0");
    var new_id = apricot.api.CopyBrickInParts('base5_5', 'card_0');
    //apricot.api.ToggleExpandBrick(new_id, "center center");
  }

  if(apricot.api.CheckId(info.brick.id, 'base5_7')) {
    apricot.api.ToggleExpandBrick(document.getElementById("base5_5").getElementsByClassName('apricot')[0].id, "center center");
  }


}, false);
