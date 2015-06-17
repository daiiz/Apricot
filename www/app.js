// User script

var a = apricot.api; // Apricotの最新APIセット

function setCardStyle() {
  var stage_width = a.Dom('base_5').clientWidth;  // スクロールバーを含まない領域幅
  var sty = a.GetFlexibleWidth(2, [5, 5], stage_width, 200, 300);
  a.Dom('card_0').style.width = sty[0] + "px";
  a.Dom('card_0').style.height = sty[0] + "px";
  a.Dom('card_0').style.marginLeft = sty[1] + "px";
  a.Dom('card_0').style.marginRight = sty[2] + "px";
  a.Dom('base_5').style.paddingLeft = sty[1] + "px";
}

window.addEventListener('apricot-ready', function(e) {
  setCardStyle();
  var new_id = a.CopyBrickInParts('base_5', 'card_0');
  a.Dom(new_id).innerHTML = a.FormatDom("<div style='padding-top:72px'><center><h1>Hello, Apricot!</h1></center></div>", new_id);
  a.ApplayAnimation("scaleShow", null, null, new_id);

  // 画像のプリロード
  a.PreloadImgs('init', [
    "pie.jpg"
  ]);

}, false);

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  var id = info.brick.id;

  if(a.IsId(id, 'base_1')) {
    a.ToggleDrawerFromLeft('panel', '0.5');
  }

  if(a.IsId(id, 'base_6')) {
    var new_id = a.CopyBrickInParts('base_5', 'card_0');
    a.Dom(new_id).innerHTML = a.FormatDom("<img src='apricot.png' style='width: 50px'>", new_id);
    a.ApplayAnimation("scaleShow", null, null, new_id);
  }

  if(a.IsId(id, 'card_0')) {
    a.ApplayAnimation("closeElement", null, null, id);
  }

  if(a.IsId(id, 'base_7')) {
    // 画像のプリロード
    a.PreloadImgs('init', [
      "pie.jpg",
      "waffle.jpg",
      "bread.jpg"
    ]);
  }

}, false);

window.addEventListener('apricot-preloadImgs-ready', function(e) {
  var info = e.detail;
  // 新しくロードされた画像をすべて表示するサンプル
  var imgs = info.blobs[info.preloadName];
  for(var i = 0; i < imgs.length; i++) {
    var src = imgs[i].blob;
    var new_id = a.CopyBrickInParts('base_5', 'card_0');
    a.Dom(new_id).innerHTML = a.FormatDom("<img src='"+src+"' style='width: 100%'>", new_id);
    a.ApplayAnimation("scaleShow", null, null, new_id);
  }
})
