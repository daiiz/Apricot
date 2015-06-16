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
        case "Top":
            if(value[0] == '+' || value[1] == '-') {
              var top = apricot.toNum(value);
              var top = apricot.toNum(tag.style.top) + top;
              tag.style.top = apricot.toPx(top);
            }
            break;
        case "Left":
            if(value[0] == '+' || value[1] == '-') {
              var left = apricot.toNum(value);
              var left = apricot.toNum(tag.style.left) + left;
              tag.style.left = apricot.toPx(left);
            }
            break;
        case "FullWidth":
            if(value == true) {
              tag.style.width = apricot.toPx(window.innerWidth * 1);
            }
            break;
        case "Src":
            if(apricot.isChromeApp) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', value, true);
              xhr.responseType = 'blob';
              xhr.onload = function(e) {
                var blob_url = window.URL.createObjectURL(this.response);
                tag.src = blob_url;
              }
              xhr.send();
            }else {
              tag.src = value;
            }
            break;
        case "ShadowLevel":
            if(value == 0) {
              v = "none";
            }else if(value == 1) {
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
        case "Cardboard":
            tag.style.overflow = "hidden";
            if(value == 'a') {
            }
            else if(value == 'b') {
              tag.style.borderWidth = "1px";
              tag.style.borderStyle = "solid";
              tag.style.borderColor = "#d8d8d8";
              tag.style.borderBottomWidth = "2px";
              tag.style.borderTopWidth = 0;
            }else if(value == 'c') {
              tag.style.boxShadow =  "0px 1px 1px #BBB4A5";
              tag.style.borderTopWidth =  0;
            }
            break;
      }
    }
  }
  return tag;
}

//////// 初回起動時デザイン初期化 ////////
apricot.init.buidUI = function(manifest) {
  // パーツを把握
  if(manifest == null) manifest = {};
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
      var id_init = id + "-init";
      tag.setAttribute('id', id_init);
      // width, height, backgroundColor を継承する
      tag.style.width = apricot.querySelector('#', id).style.width;
      tag.style.height = apricot.querySelector('#', id).style.height;
      tag.style.backgroundColor = apricot.querySelector('#', id).style.backgroundColor;
      // top, left を継承する
      tag.style.top = apricot.querySelector('#', id).style.top;
      tag.style.left = apricot.querySelector('#', id).style.left;
      tag.title = apricot.querySelector('#', id).title;
      // classを設定する
      tag.className = apricot.querySelector('#', id).className;
      // タグを描画する
      apricot.querySelector('#', 'apricot_workspace').innerHTML = '';
      apricot.querySelector('#', 'apricot_workspace').appendChild(tag);
      tag = apricot.querySelector('#', 'apricot_workspace').innerHTML;
      apricot.querySelector('#', id).outerHTML = tag;
      apricot.querySelector('#', id_init).id = id;
      tag = apricot.querySelector('#', id);
      // CSS Styles 及び Apricot Design を適用する
      tag = apricot.init.applyDesign((brick.design || {}), tag);

    }

  }

}
