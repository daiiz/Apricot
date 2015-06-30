var a = apricot.api;

window.addEventListener('apricot-click', function(e) {
  if(a.Is(e.detail.brick.id, 'scrollHeaderPanel_1')[0]) {
    a.Behavior.ToggleDrawerFromLeft('panel', '0.6');
  }
  else if(e.detail.it.dataset["me"] == "card") {
    e.detail.it.elevation += 1;
    if(e.detail.it.elevation > 5) e.detail.it.elevation = 0;
  }
}, false);

window.addEventListener('apricot-ready', function(e) {
  for(var i = 0; i < 30; i++) {
    // ボタンを生成
    var button = a.NewBrickExtends({
      role: "paper-button",
      design: {
        Content: "Hello " + i
      }
    }, null);
    // カードを生成
    var card = a.NewBrickExtends({
      role: "paper-material",
      design: {
        "ClassName": "m",
        "transform": "scale(0)",
        "Content": "foo<br>barbar<br>",
        "Dataset": {me: "card"}
      }
    }, null);
    card.appendChild(button); //これは良いのか
    var new_id = a.AppendBrick(card, 'scrollHeaderPanel_3');
    a.ApplyAnimation("scaleShow", null, null, new_id);
  }

  a.Designs.Content(a.Dom('scrollHeaderPanel_2'), '<div class="t">Material Design</div>');
  a.Behavior.SetScrollHeaderPanelObserver('scrollHeaderPanel_0', 'scrollHeaderPanel_2', 'scrollHeaderPanel_3', 'b', true);
}, false);
