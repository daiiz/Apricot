var a = apricot.api;

window.addEventListener('apricot-click', function(e) {
  //console.log(e.detail);
  if(a.Dom(e.detail.eventOriginId).elevation > 5) a.Dom(e.detail.eventOriginId).elevation = 0;
  a.Dom(e.detail.eventOriginId).elevation++;

  //console.log(a.Is(e.detail.brick.id, 'main_1'))

  if(a.Is(e.detail.brick.id, 'main_1')[0]) {
    a.Behavior.ToggleDrawerFromLeft('panel', '0.6');
  }
  console.log(a.Has(e.detail.brick.ids, 'main*'));

  if(a.Has(e.detail.brick.ids, 'main_6')[0]) {    //e.detail.brick.ids[1] == 'main_6'
    //var card = a.Dom("photoCard").cloneNode(true);    // パーツ向けのAPI必要
    var card = a.CreatePatternExtends({
      "design": {
        "position": "relative",
        "top": "",
        "left": "",
        "height": "364px",
        "marginTop": "10px",
        "marginBottom": "10px"
      }
    }, "photoCard");
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
