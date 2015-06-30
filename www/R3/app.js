var a = apricot.api;

window.addEventListener('apricot-ready', function(e) {
  for(var i = 0; i < 30; i++) {
    a.Dom('scrollHeaderPanel_3').innerHTML += "<h1>Hello "+ i +"</h1>";
    a.Dom('scrollHeaderPanelCopy_3').innerHTML += "<h1>Hello "+ i +"</h1>";
  }

  a.Dom('scrollHeaderPanel_2').innerHTML = '<div class="t">ScrollHeaderPanel B</div>';
  a.Dom('scrollHeaderPanelCopy_2').innerHTML = '<div class="t">ScrollHeaderPanel A</div>';

  a.Behavior.SetScrollHeaderPanelObserver('scrollHeaderPanelCopy_0', 'scrollHeaderPanelCopy_2', 'scrollHeaderPanelCopy_3', 'a', true);
  a.Behavior.SetScrollHeaderPanelObserver('scrollHeaderPanel_0', 'scrollHeaderPanel_2', 'scrollHeaderPanel_3', 'b', true);
}, false);

/* Observer切り替え操作 */
window.addEventListener('apricot-click', function(e) {
  var id = e.detail.brick.id;
  if(a.Is(id, 'scrollHeaderPanel_1')[0]) {
    // タイプAを表示する
    a.HideParts('scrollHeaderPanel');
    a.ShowParts('scrollHeaderPanelCopy');
    a.Behavior.SetScrollHeaderPanelObserver('scrollHeaderPanelCopy_0', 'scrollHeaderPanelCopy_2', 'scrollHeaderPanelCopy_3', 'a', false);

  }else if(a.Is(id, 'scrollHeaderPanelCopy_1')[0]) {
    // タイプBを表示する
    a.HideParts('scrollHeaderPanelCopy');
    a.ShowParts('scrollHeaderPanel');
    a.Behavior.SetScrollHeaderPanelObserver('scrollHeaderPanel_0', 'scrollHeaderPanel_2', 'scrollHeaderPanel_3', 'b', false);

  }
}, false);
