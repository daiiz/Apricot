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
    apricot.api.MovePartsTo(150, 200, "card_0");
    apricot.api.ToggleExpandBrick("card_0", "center center");
  }


}, false);
