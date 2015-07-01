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
            apricot.api.Designs.Visible(tag, value);
            break;
        case "FontScale":
            apricot.api.Designs.FontScale(tag, value);
            break;
        case "Content":
            apricot.api.Designs.Content(tag, value);
            break;
        case "ClassName":
            apricot.api.Designs.ClassName(tag, value);
            break;
        case "Dataset":
            apricot.api.Designs.Dataset(tag, value);
            break;
        case "Top":
            apricot.api.Designs.Top(tag, value);
            break;
        case "Left":
            apricot.api.Designs.Left(tag, value);
            break;
        case "FullWidth":
            apricot.api.Designs.FullWidth(tag, value);
            break;
        case "Src":
            apricot.api.Designs.Src(tag, value);
            break;
        case "ShadowLevel":
            apricot.api.Designs.ShadowLevel(tag, value);
            break;
        case "Cardboard":
            apricot.api.Designs.Cardboard(tag, value);
            break;
        default:
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
      if(tag.title == undefined) {
        tag.title = apricot.querySelector('#', id).title;
      }
      // classを設定する
      tag.className = apricot.querySelector('#', id).className;
      // タグを描画する
      apricot.querySelector('#', 'apricot_workspace').innerHTML = '';
      apricot.querySelector('#', 'apricot_workspace').appendChild(tag);
      tag = apricot.querySelector('#', 'apricot_workspace').innerHTML;
      apricot.querySelector('#', 'apricot_workspace').innerHTML = '';
      apricot.querySelector('#', id).outerHTML = tag;
      apricot.querySelector('#', id_init).id = id;
      tag = apricot.querySelector('#', id);
      // CSS Styles 及び Apricot Design を適用する
      tag = apricot.init.applyDesign((brick.design || {}), tag);
    }

  }

}
