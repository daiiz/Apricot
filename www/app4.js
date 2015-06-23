var a = apricot.api;

window.addEventListener('apricot-ready', function(e) {
  for(var i = 0; i < 30; i++) {
    a.Dom('scrollHeaderPanel_3').innerHTML += "<h1>Hello "+ i +"</h1>";
  }

  a.Dom('scrollHeaderPanel_2').innerHTML = '<div class="t">Material Design</div>';
  a.Behavior.AddScrollHeaderPanelObserver('scrollHeaderPanel_0', 'scrollHeaderPanel_2', 'scrollHeaderPanel_3', 'b', true);
}, false);
