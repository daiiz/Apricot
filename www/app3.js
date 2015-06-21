var a = apricot.api;


var work_copyHeaderImgId;
window.addEventListener('apricot-ready', function(e) {
  for(var i = 0; i < 30; i++) {
    a.Dom('scrollHeaderPanel_3').innerHTML += "<h1>Hello</h1>";
  }
  a.Dom('scrollHeaderPanel_2').innerHTML = '<div id="t">Scroll Header Panel</div>';
  a.Behavior.AddScrollHeaderPanelObserver('scrollHeaderPanel_0', 'scrollHeaderPanel_2', 'scrollHeaderPanel_3', 'a');
}, false);
