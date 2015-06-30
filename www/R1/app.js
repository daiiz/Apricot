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
  var card = a.NewBrickExtends({
    "design": {
      "Content": "<center><h1>Hello, Apricot!</h1></center>",
      "paddingTop": "72px",
      "position": "relative", "top": "", "left": "",
      "box-sizing": "border-box",
      "Cardboard": "c",
      "borderRadius": "2px"
    }
  }, 'card_0');
  a.View.Append(card, "base_5");
  a.ApplyAnimation("scaleShow", null, null, card.id);

  // プリロードせずに画像を表示する方法
  var imgCard = a.NewBrickExtends({
      "role": "html-img",
      "design": {
        "position": "relative", "top": "", "left": "",
        "Src": "R1/pie.jpg",  // ウェブ上のコンテンツでもOK
        "box-sizing": "border-box",
        "Cardboard": "c",
        "borderRadius": "2px"
      }
    }, 'card_0');
    a.View.Append(imgCard, "base_5");
    a.ApplyAnimation("scaleShow", null, null, imgCard.id);

}, false);

window.addEventListener('apricot-click', function(e) {
  var info = e.detail;
  console.log(info);
  var id = info.brick.id;

  if(a.Is(id, 'base_1')[0]) {
    a.Behavior.ToggleDrawerFromLeft('panel', '0.5');
  }

  if(a.Is(id, 'base_6')[0]) {
    var card = a.NewBrickExtends({
      "design": {
        "Content": "<img src='R1/apricot.png' style='width: 50px'>",
        "position": "relative", "top": "", "left": "",
        "box-sizing": "border-box",
        "Cardboard": "c",
        "borderRadius": "2px"
      }
    }, 'card_0');

    a.View.Append(card, "base_5");
    a.ApplyAnimation("scaleShow", null, null, card.id);
  }

  var j = a.Has(info.brick.ids, 'card_+');
  if(j[0]) {
    var card_id = j[1][0];
    a.ApplyAnimation("closeElement", null, null, card_id);
  }

  if(a.Is(id, 'base_7')[0]) {
    // 画像のプリロード
    a.PreloadImgs('init', [
      "R1/pie.jpg",
      "R1/waffle.jpg",
      "R1/bread.jpg"
    ]);
  }

}, false);

window.addEventListener('apricot-preloadImgs-ready', function(e) {
  var info = e.detail;
  // 新しくプリロードされた画像をすべて表示するサンプル
  var imgs = info.blobs[info.preloadName];
  for(var i = 0; i < imgs.length; i++) {
    var src = imgs[i].blob;
    var imgCard = a.NewBrickExtends({
      "role": "html-img",
      "property": {
        "src": src
      },
      "design": {
        "position": "relative", "top": "", "left": "",
        "box-sizing": "border-box",
        "Cardboard": "c",
        "borderRadius": "2px"
      }
    }, 'card_0');
    a.View.Append(imgCard, "base_5");
    a.ApplyAnimation("scaleShow", null, null, imgCard.id);
  }
})
