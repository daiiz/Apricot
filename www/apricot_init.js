//////// 初回起動時デザイン初期化 ////////
apricot.init.applyDesign = function(brick_design, tag) {
  var keys = Object.keys(brick_design);
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = brick_design[key];
    // 先頭文字が小文字の場合は、標準 CSS として解析
    if(key[0].match(/[a-z]/)) {
      tag.style[key] = value;
    }else {
      // Apricotの個別対応スタイル
      var v = '';
      switch (key) {
        case "Visible":
            v = (value == true) ? "visible" : "hidden";
            tag.style.visibility = v;
            break;
        case "FontScale":
            if(value == "L") {
              tag.style.fontSize = "24px";
            }
            break;
        case "Content":
            tag.innerHTML = value;
            break;
        case "ShadowLevel":
            if(value == 1) {
              v = "rgba(0, 0, 0, 0.098) 0px 2px 4px, rgba(0, 0, 0, 0.098) 0px 0px 3px";
            }else if(value == 2) {
              v = "0 2px 10px 0 rgba(0, 0, 0, 0.16)";
            }else if(value == 3) {
              v = "0 6px 20px 0 rgba(0, 0, 0, 0.19)";
            }else if(value == 4) {
              v = "0 17px 50px 0 rgba(0, 0, 0, 0.19)";
            }else if(value == 5) {
              v = "0 25px 55px 0 rgba(0, 0, 0, 0.21)";
            }else {
              v = "0 40px 77px 0 rgba(0, 0, 0, 0.22)";
            }
            tag.style.boxShadow = v;
            break;
        default:
            break;
      }
    }
  }
  return tag;
}

apricot.init.buidUI = function(manifest) {
  // パーツを把握
  var parts = Object.keys(manifest);

  // パーツを1つずつ解析
  for(var i = 0; i < parts.length; i++) {
    var part = manifest[parts[i]];
    var bricks = Object.keys(part);

    // ブリックを1つずつ解析
    for(var j = 0; j < bricks.length; j++) {
      var brick_id = bricks[j];     // brick ID
      var brick = part[brick_id];  // brick Object
      // タグ名を確定する
      var tag_name = brick.role || 'html-div';
      tag_name = tag_name.replace(/^html\-/g, '');
      // タグを生成する
      var tag = document.createElement(tag_name);
      // 属性を設定する
      var attrs = brick.property || {};
      var keys = Object.keys(attrs);
      for(var k = 0; k < keys.length; k++) {
        var key = keys[k];
        var value = attrs[key];
        tag.setAttribute(key, value);
      }
      // idを設定する
      var id = parts[i] + '_' + brick_id.split('_')[1];
      tag.setAttribute('id', id + '-init');
      // width, height, backgroundColor を継承する
      tag.style.width = apricot.querySelector('#', id).style.width;
      tag.style.height = apricot.querySelector('#', id).style.height;
      tag.style.backgroundColor = apricot.querySelector('#', id).style.backgroundColor;
      // top, left を継承する
      tag.style.top = apricot.querySelector('#', id).style.top;
      tag.style.left = apricot.querySelector('#', id).style.left;
      // CSS Styles 及び Apricot Design を適用する
      tag = apricot.init.applyDesign((brick.design || {}), tag);
      // classを設定する
      tag.className = apricot.querySelector('#', id).className;
      console.log(tag);
    }

  }

}
