var a = apricot.api;

window.addEventListener('apricot-click', function(e) {

  // ドロワーパネルを開く
  if(a.Is(e.detail.brick.id, 'main_1')[0]) {
    a.Behavior.ToggleDrawerFromLeft('panel', '0.6');
  }

  // カードを追加表示する
  if(a.Has(e.detail.brick.ids, 'main_6')[0]) {
    var card = a.NewPatternExtends({
      "design": {
        "position": "relative",
        "top": "",
        "left": "",
        "marginTop": "10px",
        "marginBottom": "10px"
      }
    }, "photoCard");

    var stageId = (a.View.Height('main_4') <= a.View.Height('main_5')) ? 'main_4' : 'main_5';
    a.View.Append(card, stageId);
    a.View.Height('main_3', a.View.Height(stageId));
    a.ApplyAnimation('scaleShow', null, null, card.id);
  }

  // カードの影を変化させる
  var j = a.Has(e.detail.brick.ids, 'photoCard_+');
  if(j[0]) {
    var card = a.Dom(j[1][0]);
    var sdw = +card.elevation;
    card.elevation = (sdw > 5) ? 0 : sdw + 1;
  }
}, false);


window.addEventListener('apricot-ready', function(e) {
  a.Behavior.SetScrollHeaderPanelObserver('main_0', 'main_2', 'main_3', 'b', true);
}, false);
