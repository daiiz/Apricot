var a = apricot.api;

window.addEventListener('apricot-click', function(e) {
  if(a.IsId(e.detail.brick.id, 'main_1')) {
    a.Behavior.ToggleDrawerFromLeft('panel', '0.6');
  }
  if(e.detail.brick.ids[1] == 'main_6') {
    var card = a.Dom("photoCard").cloneNode(true);    // パーツ向けのAPI必要
    card.id = card.id + '_' + Math.floor(Math.random()*10000);
    card.style.position = "relative";
    card.style.top = "";
    card.style.left = "";
    card.style.height = "364px";
    card.style.marginTop = "9px";
    card.style.marginBottom = "9px";
    var newid = card.id;
    if((a.Dom('main_4').children || []).length <= (a.Dom('main_5').children || []).length) {
      a.Dom('main_4').appendChild(card);
      a.Dom('main_3').style.height = a.Dom('main_4').offsetHeight + "px";
    }else {
      a.Dom('main_5').appendChild(card);
      a.Dom('main_3').style.height = a.Dom('main_5').offsetHeight + "px";
    }
    a.ApplyAnimation('scaleShow', null, null, newid);
  }
}, false);


window.addEventListener('apricot-ready', function(e) {
  a.Behavior.AddScrollHeaderPanelObserver('main_0', 'main_2', 'main_3', 'b', true);
}, false);
