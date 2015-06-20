var a = apricot.api;


var work_copyHeaderImgId;
window.addEventListener('apricot-ready', function(e) {
  for(var i = 0; i < 30; i++) {
    a.Dom('scrollHeaderPanel_2').innerHTML += "<h1>Hello</h1>";
  }
  a.Dom('scrollHeaderPanel_1').innerHTML = '<h1>Foo</h1>';

  /* pre-settings for lab2 */
  var imgHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_0').style.height)
  var toolbarTop = a.Tools.ToNum(a.Dom('scrollHeaderPanel_1').style.top);
  var toolbarHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_1').style.height);
  var contentAreaTop = a.Tools.ToNum(a.Dom('scrollHeaderPanel_2').style.top);
  a.Dom('scrollHeaderPanel_1').style.top = (toolbarTop - toolbarHeight) + 'px';
  a.Dom('scrollHeaderPanel_2').style.top = (contentAreaTop - toolbarHeight) + 'px';
  var copyHeaderImgId = a.DuplicateBrick('scrollHeaderPanel_0', 'scrollHeaderPanel');
  a.Dom('scrollHeaderPanel_0').style.backgroundColor = a.Dom('scrollHeaderPanel_1').style.backgroundColor;
  a.Dom(copyHeaderImgId).style.backgroundColor = a.Dom('scrollHeaderPanel_1').style.backgroundColor;
  a.Dom(copyHeaderImgId).style.opacity = 0;
  a.Dom(copyHeaderImgId).style.zIndex = 5;
  a.ShowBrick(copyHeaderImgId);
  a.Dom('scrollHeaderPanel_1').style.backgroundColor = "rgba(0,0,0,0)";
  work_copyHeaderImgId = copyHeaderImgId;

}, false);

/* paper-scroll-header-panel風 */
function lab1(e) {
  var imgHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_0').style.height);
  var toolbarHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_1').style.height);
  var scrolled_y = e.detail.y;
  if(scrolled_y < imgHeight) {
    a.Dom('scrollHeaderPanel_1').style.position = "absolute";
    a.Dom('scrollHeaderPanel_1').style.top = imgHeight + 'px';
    a.Dom('scrollHeaderPanel_0').style.position = "fixed";
  }else if(scrolled_y <= scrolled_y + toolbarHeight) {
    a.Dom('scrollHeaderPanel_1').style.top = 0 + 'px';
    a.Dom('scrollHeaderPanel_1').style.position = "fixed";
  }
}

function lab2(e) {
  var toolbarHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_1').style.height);
  var imgHeight = a.Tools.ToNum(a.Dom('scrollHeaderPanel_0').style.height) - toolbarHeight;
  var scrolled_y = e.detail.y;
  if(scrolled_y < imgHeight) {
    a.Dom('scrollHeaderPanel_1').style.position = "absolute";
    a.Dom('scrollHeaderPanel_1').style.top = imgHeight + 'px';
    a.Dom('scrollHeaderPanel_0').style.position = "fixed";
    a.Dom('scrollHeaderPanel_1').style.backgroundColor = "rgba(0,0,0,0)";
    a.Dom(work_copyHeaderImgId).style.opacity = e.detail.y / imgHeight;
  }else if(scrolled_y <= scrolled_y + toolbarHeight) {
    a.Dom('scrollHeaderPanel_1').style.top = 0 + 'px';
    a.Dom('scrollHeaderPanel_1').style.position = "fixed";
    a.Dom('scrollHeaderPanel_1').style.backgroundColor = a.Dom('scrollHeaderPanel_0').style.backgroundColor;
    a.Dom(work_copyHeaderImgId).style.opacity = '1.0';
  }
}

window.addEventListener('apricot-scroll', function(e) {
  lab2(e);
}, false);
