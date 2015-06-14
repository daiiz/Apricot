// User script

var a = apricot.api; // Apricotの最新APIセット

window.addEventListener('apricot-ready', function(e) {
  var new_id = a.CopyBrickInParts('base5_5', 'card_0');
  a.Dom(new_id).innerHTML = a.FormatDom("<div style='padding-top:72px'><center><h1>Hello, Apricot!</h1></center></div>", new_id);
  a.ApplayAnimation("scaleShow", null, null, new_id);

  // 画像のプリロード
  a.PreloadImgs('init', [
    "pie.jpg",
    "waffle.jpg"
  ]);

}, false);

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  var id = info.brick.id;

  if(a.IsId(id, 'base5_1')) {
    a.ToggleDrawerFromLeft('panel', '0.5');
  }

  if(a.IsId(id, 'base5_6')) {
    var new_id = a.CopyBrickInParts('base5_5', 'card_0');
    a.Dom(new_id).innerHTML = a.FormatDom("<img src='apricot.png' style='width: 50px'>", new_id);
    a.ApplayAnimation("scaleShow", null, null, new_id);
  }

  if(a.IsId(id, 'card_0')) {
    a.ApplayAnimation("closeElement", null, null, id);
  }

  if(a.IsId(id, 'base5_7')) {
  }

}, false);

window.addEventListener('apricot-preloadImgs-ready', function(e) {
  var info = e.detail;
  // 新しくロードされた画像をすべて表示するサンプル
  var imgs = info.blobs[info.preloadName];
  for(var i = 0; i < imgs.length; i++) {
    var src = imgs[i].blob;
    var new_id = a.CopyBrickInParts('base5_5', 'card_0');
    a.Dom(new_id).innerHTML = a.FormatDom("<img src='"+src+"' style='width: 100%'>", new_id);
    a.ApplayAnimation("scaleShow", null, null, new_id);
  }
})
