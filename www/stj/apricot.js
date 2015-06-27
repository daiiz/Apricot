/**
 * Project Apricot
 * Copyright (c) 2015 daiz.
 */

var apricot = apricot || {};
apricot.init = {};
apricot.API = {};
apricot.API.v0 = {"v": "0.0.5 developer preview"};

apricot.API.v0.Tools = {};
apricot.API.v0.Designs = {};
apricot.API.v0.Behavior = {};

/* APIのデフォルトバージョンを指定 */
apricot.api = apricot.API.v0;

//////// Apricot 定数 ////////
apricot.C = {
  "cn": "apricot"
};

/**
 * ユーザーが呼び出し可能なAPIは
 * 名前の先頭を大文字にする
 */

/* ツール */
apricot.api.Tools.ToNum = function(x) {
  return apricot.toNum(x);
}
apricot.api.Tools.ToPx = function(x) {
  return apricot.toPx(x);
}

////////////////////////////////////////////////////////////////////////////////
/* manifestのDesignの動作定義 */
apricot.api.Designs.Top = function(tag, value) {
  if(value[0] == '+' || value[0] == '-') {
    var top = apricot.toNum(value);
    var top = apricot.toNum(tag.style.top) + top;
    tag.style.top = apricot.toPx(top);
  }
}
apricot.api.Designs.Left = function(tag, value) {
  if(value[0] == '+' || value[0] == '-') {
    var left = apricot.toNum(value);
    var left = apricot.toNum(tag.style.left) + left;
    tag.style.left = apricot.toPx(left);
  }
}
apricot.api.Designs.FullWidth = function(tag, value) {
  if(value == true) {
    tag.style.width = apricot.toPx(window.innerWidth * 1);
  }
}
apricot.api.Designs.Src = function(tag, value) {
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
}
apricot.api.Designs.ShadowLevel = function(tag, value) {
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
}
apricot.api.Designs.Cardboard = function(tag, value) {
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
}
apricot.api.Designs.Content = function(tag, value) {
  tag.innerHTML = value;
}
apricot.api.Designs.Visible = function(tag, value) {
  v = (value == true) ? "visible" : "hidden";
  tag.style.visibility = v;
}
apricot.api.Designs.FontScale = function(tag, value) {
  if(value == "L") {
    tag.style.fontSize = "24px";
  }else if(value == "S") {
    tag.style.fontSize = "10px";
  }
}
apricot.api.Designs.ClassName = function(tag, value) {
  if(tag.className == undefined) tag.className = "";
  tag.className += ' ' + value;
}
apricot.api.Designs.Dataset = function(tag, value) {
  var keys = Object.keys(value);
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = value[key];
    tag.dataset[key] = val;
  }
}
////////////////////////////////////////////////////////////////////////////////
///
/* 便利なイディオム */
apricot.api.Idioms = {
}

/* ブリックのDOMを返す */
apricot.api.Dom = function(id) {
  return apricot.querySelector('#', id);
}

/* 各種判定 */
apricot.api.Is = function(str, reg_exp_str) {
  var reg = new RegExp(reg_exp_str, 'gi');
  var res = (str.search(reg) != -1) ? true : false;
  return [res, str];  // [Bool, str]
}

apricot.api.Has = function(arr, reg_exp_str) {
  var res = [];
  for(var i = 0; i < arr.length; i++) {
    var str = arr[i];
    var check = apricot.api.Is(str, reg_exp_str);
    if(check[0] == true) res.push(str);
  }
  return (res.length == 0) ? [false, []] : [true, res];  // [Bool, Arr]
}

apricot.api.IsId = function(id_with_hyphen, id) {
  if(id_with_hyphen.split('-')[0] == id) return true;
  return false;
}



/* Apricotオブジェクトにアニメーションキーフレームを適用する */
apricot.api.ApplyAnimation = function(keyframe_name, animation_settings, transitions_settings, id) {
  // アニメーション制御のデフォルト値
  var default_animation_settings = [
    {"animationTimingFunction": "ease"},
    {"animationDuration": "0.4s"},
    {"animationFillMode": "forwards"}
  ];
  // トランジション制御のデフォルト値
  var default_transitions_settings = [
    {"transformOrigin": "center center"}
  ];
  // デフォルトの制御スタイルを反映
  apricot.setStyle(default_animation_settings, id);
  apricot.setStyle(default_transitions_settings, id);
  // ユーザー定義の制御スタイルを反映
  if(animation_settings != null) apricot.setStyle(animation_settings, id);
  if(transitions_settings != null) apricot.setStyle(transitions_settings, id);
  // アニメーションを反映
  apricot.removeClass('element-hidden', id);
  apricot.setStyle([{"animationName": keyframe_name}], id);
}


/* ブリックの表示・非表示切り替え（アニメーションなし） */
apricot.api.ShowBrick = function(id) {
  apricot.removeClass('element-hidden', id);
  apricot.addClass('element-visible', id);
};
apricot.api.HideBrick = function(id) {
  apricot.removeClass('element-visible', id);
  apricot.addClass('element-hidden', id);
};
apricot.api.ToggleBrick = function(id) {
  if(apricot.hasClass('element-hidden', id)) {
    apricot.api.ShowBrick(id);
  }else {
    apricot.api.HideBrick(id);
  }
};

/* ブリックを指定した座標まで移動させる（アニメーションなし） */
apricot.api.MoveBrickTo = function(left, top, id) {
  apricot.setStyle([
    {"left": apricot.toPx(left)},
    {"top": apricot.toPx(top)}
  ], id);
};

/* 特定のpattern paperを継承してコピーを生成する */
apricot.api.CreatePatternExtends = function(manifest, extends_pattern_id) {
  if(extends_pattern_id == null) return null;
  var tag = apricot.api.CreateBrickExtends(manifest, extends_pattern_id);
  var ranum = Math.floor(Math.random()*100000000)
  tag.id = extends_pattern_id + '-' + ranum;
  // 継承元の子供をコピーする
  var children = apricot.api.Dom(extends_pattern_id).children;
  for(var i = 0; i < children.length; i++) {
    var child = children[i].cloneNode(true);
    child.id = child.id + '-' + ranum;
    tag.appendChild(child);
  }
  return tag;
}


/* 特定のbrickを継承してコピーを生成する。
 * 何も継承しない場合は新規生成扱いとなる
 */
apricot.api.CreateBrickExtends = function(manifest, extends_brick_id) {
  var tag_name = undefined;
  if(extends_brick_id != null) {
    tag_name = apricot.querySelector('#', extends_brick_id).tagName;
  }
  tag_name = tag_name || manifest.role || 'html-div';
  tag_name = tag_name.replace(/^html\-/g, '');
  // タグを生成する
  var tag = document.createElement(tag_name);
  // 属性を設定する
  var attrs = manifest.property || {};
  var keys = Object.keys(attrs);
  for(var k = 0; k < keys.length; k++) {
    var key = keys[k];
    var value = attrs[key];
    tag.setAttribute(key, value);
  }
  if(extends_brick_id != null) {
    id = extends_brick_id;
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
  }else {
    // xApricot class 付与
    tag.className += "xapricot";
  }
  // CSS Styles 及び Apricot Design を適用する
  tag = apricot.init.applyDesign((manifest.design || {}), tag);
  return tag;
}

/* 特定のDOM内にbrickを追加する */
apricot.api.AppendBrick = function(dom, stage_id) {
  var stage = apricot.api.Dom(stage_id);
  var parts_name = stage_id;//.split('_')[0];
  var bricks_num = stage.childElementCount;

  /* 身代わりをレンダリング */
  var placeholder = document.createElement('div');
  placeholder.id = parts_name + '_' + bricks_num + '-init';
  stage.appendChild(placeholder);

  /* Apricot id 付与 */
  dom.id = parts_name + '_' + bricks_num;
  apricot.querySelector('#', 'apricot_workspace').innerHTML = '';
  apricot.querySelector('#', 'apricot_workspace').appendChild(dom);
  dom = apricot.querySelector('#', 'apricot_workspace').innerHTML;
  apricot.querySelector('#', 'apricot_workspace').innerHTML = '';

  apricot.querySelector('#', parts_name + '_' + bricks_num + '-init').outerHTML = dom;
  return parts_name + '_' + bricks_num;
}

/* ブリックを除去 */
apricot.api.RemoveBrick = function(id) {
  var selfelem = apricot.querySelector('#', id);
  selfelem.parentNode.removeChild(selfelem);
}

/* 非表示状態になっているハイフン付きIDを持つブリックを消去
 * 引数はid_with_hyphenの先頭id
 */
apricot.api.RemoveNonVisibleBrick = function(id) {
  var apricot_elems = document.querySelectorAll('.apricot');
  for(var i = 0; i < apricot_elems.length; i++) {
    var apricot_elem = apricot_elems[i];
    var f0 = apricot_elem.id.search('-') != -1;
    var f1 = apricot_elem.className.search('hidden') != -1;
    var f2 = apricot.api.CheckId(apricot_elem.id, id);
    if(f0 && f1 && f2) {
      apricot.api.RemoveBrick(apricot_elem.id);
    }
  }
}

/* エイリアス */
/* パーツの表示・非表示切り替え（アニメーションなし） */
apricot.api.ShowParts = apricot.api.ShowBrick;
apricot.api.HideParts = apricot.api.HideBrick;
apricot.api.ToggleParts = apricot.api.ToggleBrick;
/* パーツを指定した座標まで移動させる（アニメーションなし） */
apricot.api.MovePartsTo = apricot.api.MoveBrickTo;

////////////////////////////////////////////////////////////////////////////////
/// Behavior API
/* ドロワーパネル */
apricot.api.Behavior.OpenDrawerFromLeft = function(id, sec) {
  var obj = apricot.querySelector('#', id);
  var t = apricot.toNum(obj.firstChild.style.top);
  var l = apricot.toNum(obj.firstChild.style.left);
  // TODO: 子要素のなかで最も大きいwidthを取るようにする
  var w = apricot.toNum(obj.firstChild.style.width) || obj.firstChild.offsetWidth;  
  // 画面の左端外に追いやる
  var mw = -l-w;
  apricot.api.MovePartsTo(mw, t, id);
  // 可視化
  apricot.api.ShowParts(id);
  // アニメーションの設定
  var tf_tr3 = "translate3d("+ ((-1)*(mw)) +"px, 0, 0)";  // transform
  var tf_tra = "all "+ sec +"s ease";  // transition
  apricot.setStyle([
    {"transition": tf_tra},
    {"transform": tf_tr3}
  ], id);
}
apricot.api.Behavior.CloseDrawerFromLeft = function(id, sec) {
  var obj = apricot.querySelector('#', id);
  // 追いやる座標を取得
  var t = apricot.toNum(obj.style.top);
  var l = apricot.toNum(obj.style.left);
  // 可視化
  apricot.api.ShowParts(id);
  // アニメーションの設定
  var tf_tr3 = "translate3d("+ l +"px, 0, 0)";  // transform
  var tf_tra = "all "+ sec +"s ease";  // transition
  apricot.setStyle([
    {"transition": tf_tra},
    {"transform": tf_tr3}
  ], id);
}
apricot.api.Behavior.ToggleDrawerFromLeft = function(id, sec) {
  var obj = apricot.querySelector('#', id);
  var l = obj.style.transform || '(-1px, 0, 0)';
  var l = l.split('(')[1].split('px')[0];
  if(apricot.toNum(l) >= 0) {
    apricot.api.Behavior.CloseDrawerFromLeft(id, sec);
  }else if(apricot.toNum(l) < 0){
    apricot.api.Behavior.OpenDrawerFromLeft(id, sec);
  }
}
/* Scroll Header Panel */
apricot.C.shp = {
  "headerId": "",
  "toolbarId": "",
  "contentAreaId": "",
  "type": "",
  "observerId": "",
  "stage": "",
  "copiedHeaderImgId": ""
};
apricot.api.Behavior.AddScrollHeaderPanelObserver = function(headerId, toolbarId, contentAreaId, type, flag) {
  /* flagがfalseの場合は有効なObserverを変更するだけ */
  /* flag=falseで呼び出すことでObserverを切り替えられる */
  var a = apricot.api;
  apricot.C.shp.headerId = headerId;
  apricot.C.shp.toolbarId = toolbarId;
  apricot.C.shp.contentAreaId = contentAreaId;
  apricot.C.shp.type = type;
  apricot.C.shp.stage = headerId.split('_')[0];
  if(apricot.C.shp.copiedHeaderImgId != "") {
    a.Dom(apricot.C.shp.copiedHeaderImgId).style.opacity = 0;
  }
  /* 実際にリスナを登録する作業 */
  if(flag) {
    if(type == 'a') {
      var imgHeight = a.Tools.ToNum(a.Dom(headerId).style.height)
      var toolbarTop = a.Tools.ToNum(a.Dom(toolbarId).style.top);
      var toolbarHeight = a.Tools.ToNum(a.Dom(toolbarId).style.height);
      var contentAreaTop = a.Tools.ToNum(a.Dom(contentAreaId).style.top);
      a.Dom(toolbarId).style.top = (toolbarTop - toolbarHeight) + 'px';
      a.Dom(contentAreaId).style.top = (contentAreaTop - toolbarHeight) + 'px';
      a.Dom(headerId).style.backgroundColor = a.Dom(toolbarId).style.backgroundColor;
      var copyHeaderImgId = apricot.duplicateBrick(headerId, apricot.C.shp.stage);
      a.Dom(copyHeaderImgId).style.backgroundImage = "";
      a.Dom(copyHeaderImgId).style.backgroundColor = a.Dom(toolbarId).style.backgroundColor;
      a.Dom(copyHeaderImgId).style.opacity = 0;
      a.Dom(copyHeaderImgId).style.zIndex = 5;
      a.ShowBrick(copyHeaderImgId);
      a.Dom(toolbarId).style.backgroundColor = "rgba(0,0,0,0)";
      apricot.C.shp.copiedHeaderImgId = copyHeaderImgId;
    }
    apricot.C.shp.observerId = window.addEventListener('apricot-scroll', function(e) {
      apricot.observeScrollHeaderPanel(e);
    }, false);
  }
}
apricot.observeScrollHeaderPanel = function(e) {
  var headerId = apricot.C.shp.headerId;
  var toolbarId = apricot.C.shp.toolbarId;
  var type = apricot.C.shp.type;
  var a = apricot.api;
  if(type == 'a') {  // ヘッダ画像の透明度が変化するタイプ
    var toolbarHeight = a.Tools.ToNum(a.Dom(toolbarId).style.height);
    var imgHeight = a.Tools.ToNum(a.Dom(headerId).style.height) - toolbarHeight;
    var scrolled_y = e.detail.y;
    if(scrolled_y < imgHeight) {
      a.Dom(toolbarId).style.position = "absolute";
      a.Dom(toolbarId).style.top = imgHeight + 'px';
      a.Dom(headerId).style.position = "fixed";
      a.Dom(toolbarId).style.backgroundColor = "rgba(0,0,0,0)";
      a.Dom(apricot.C.shp.copiedHeaderImgId).style.opacity = e.detail.y / imgHeight;
      a.Designs.ShadowLevel(a.Dom(toolbarId), 0);
    }else if(scrolled_y <= scrolled_y + toolbarHeight) {
      a.Dom(toolbarId).style.top = 0 + 'px';
      a.Dom(toolbarId).style.position = "fixed";
      a.Dom(toolbarId).style.backgroundColor = a.Dom(headerId).style.backgroundColor;
      a.Dom(apricot.C.shp.copiedHeaderImgId).style.opacity = '1.0';
      a.Designs.ShadowLevel(a.Dom(toolbarId), 2);
    }
  }else if(type == 'b') {
    var imgHeight = a.Tools.ToNum(a.Dom(headerId).style.height);
    var toolbarHeight = a.Tools.ToNum(a.Dom(toolbarId).style.height);
    var scrolled_y = e.detail.y;
    if(scrolled_y < imgHeight) {
      a.Dom(toolbarId).style.position = "absolute";
      a.Dom(toolbarId).style.top = imgHeight + 'px';
      a.Dom(headerId).style.position = "fixed";
      a.Designs.ShadowLevel(a.Dom(toolbarId), 0);
    }else if(scrolled_y <= scrolled_y + toolbarHeight) {
      a.Dom(toolbarId).style.top = 0 + 'px';
      a.Dom(toolbarId).style.position = "fixed";
      a.Designs.ShadowLevel(a.Dom(toolbarId), 2);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
/* 画像のプリロード
 * 完了すると`apricot-imgs-ready`が発火する
 */
apricot.preloaded_imags_blobsrcs = {};  // {preload_name: []}
apricot.preloadImg = function(preload_name, arr_src) {
  // 再帰的に呼ばれる
  var xhr = new XMLHttpRequest();
  xhr.open('GET', arr_src[0], true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    var blob_url = window.URL.createObjectURL(this.response);
    var preImgArea = apricot.querySelector('#', 'apricot_workspace_preimg').firstChild;
    preImgArea.src = blob_url;
    preImgArea.onload = function() {
      var b = {
        "blob": blob_url,
        "width": preImgArea.width,
        "height": preImgArea.height
      }
      apricot.preloaded_imags_blobsrcs[preload_name].push(b);
      // arr_srcの先頭の要素を除去
      arr_src.shift();
      if(arr_src.length > 0) {
        apricot.preloadImg(preload_name, arr_src);
      }else {
        // すべての画像のプリロード完了
        var event_name = "apricot-preloadImgs-ready"
        var ev = new CustomEvent(event_name, {
          detail: {
            blobs: apricot.preloaded_imags_blobsrcs,
            preloadName: preload_name,
            fired: {event_name: event_name}
          }
        });
        window.dispatchEvent(ev);
      }
    }
  }
  xhr.send();
}
apricot.api.PreloadImgs = function(preload_name, arr_src) {
  var imgbox = apricot.preloaded_imags_blobsrcs;
  imgbox[preload_name] = [];
  apricot.preloadImg(preload_name, arr_src);
}

apricot.api.GetFlexibleWidth = function(column, margins, stage_width, min_width, max_width) {
  /**
  column: 標準カラム指定
  margins: margin-left, margin-right を要素に持つ配列
  stage_width: 表示領域の横幅
  min_width: multi column の場合のcolumn横幅の最小値
             この値より小さい横幅になる場合はカラムを減らす
  max_width: multi column の場合のcolumn横幅の最大値
             この値より大きい横幅になる場合はカラムを増やす
  返り値: width, margin-left, margin-right, column を要素に持つ配列
  */
  if(column == 0) column = 1;
  var c, ml, mr, m, w, W;
  c = column;
  ml = margins[0];
  mr = margins[1];
  m = ml + mr;
  W = stage_width;
  /* 標準カラムでのカードの横幅を計算 */
  w = (W - (c + 1)*m) / c;
 var flag = 0;
  if(w < min_width) flag = 1;
  else if(w > max_width) flag = 2;
  else if(min_width <= w && w <= max_width) flag = 3;
  switch(flag) {
    case 3:
        break;
    case 2:
        /**
        カラム数を増やす。 wがmax_widthを超えなくなったところで完了。
        wがmin_widthを下回った場合は、カラムを一つ減らし、余白を調整する。
        */
        while(w > max_width) {
          c++;
          w = (W - (c + 1)*m) / c;
        }
        if(w < min_width) {
          c--;
          w = (W - (c + 1)*m) / c;
          ms = W - c*w;
          m = ms / (c + 1);
          ml = m / 2;
          mr = m / 2;
        }
        break;
    case 1:
        /* カラム数を減らす */
        var i = c;
        while(1) {
          w = (W - (i + 1)*m) / i;
          if(min_width <= w || i == 1) {
            c = i;
            break;
          }
          i--;
        }
        break;

    default: break;
  }
  return [w, ml, mr, c];
}

// TODO: transitionを解除するメソッド
////////////////////////////////////////////////////////////////////////////////

/**
 * apricotの内部処理用メソッド
 */
//////// querySelector wrapper ////////
apricot.querySelector = function(selector_prefix, selector_body) {
  return apricot.Stage().querySelector(selector_prefix + selector_body);
}

//////// join wrapper ////////
apricot.join = function(splitter, arr) {
  var str = '';
  for(var i = 0; i < arr.length; i++) {
    str = str + splitter + arr[i];
  }
  return str.substring(1, str.length);
}

//////// split wrapper ////////
apricot.split = function(splitter, remove_word, str) {
  var arr = str.split(splitter);
  var res_arr = [];
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] != '' && arr[i] != remove_word) res_arr.push(arr[i]);
  }
  return res_arr;
}

//////// 属性設定 操作 ////////
apricot.setAttr = function(attr, value, id) {
  apricot.querySelector('#', id)[attr] = value;
}

//////// style属性 操作 ////////
apricot.setStyle = function(style_kv_arr, id) {
  var stys = apricot.querySelector('#', id).style || {};
  for(var i = 0; i < style_kv_arr.length; i++) {
    var add_sty = style_kv_arr[i];
    var attr = Object.keys(add_sty)[0];
    var value = add_sty[attr];
    stys[attr] = value;
  }
}

//////// class 操作 ////////
apricot.addClass = function(classname, id) {
  if(apricot.hasClass(classname, id) == false) {
    var cns = apricot.querySelector('#', id).className;
    cns = apricot.split(' ', null, cns);
    cns.push(classname);
    cns = apricot.join(' ', cns);
    apricot.querySelector('#', id).className = cns;
  }
}
apricot.removeClass = function(classname, id) {
  var cns = apricot.querySelector('#', id).className;
  cns = apricot.split(' ', classname, cns);
  cns = apricot.join(' ', cns);
  apricot.querySelector('#', id).className = cns;
}
apricot.hasClass = function(className, id) {
  var cns = apricot.querySelector('#', id).className;
  cns_original = apricot.split(' ', null, cns);
  cns_removed = apricot.split(' ', className, cns);
  // cns_original と cns_removed の長さが等しくなければ検索ヒット
  if(cns_original.length !== cns_removed.length) return true;
  return false;
}


apricot.Stage = function() {
  return document;
}

//////// Apricot Stage Element ////////
apricot.stage = function() {
  return document;
}

//////// Apricot Tool ////////
apricot.toPx = function(v) {
  v = '' + v;
  if(v.search('px') == -1) return v + 'px';
  return v;
};
apricot.toNum = function(v) {
  v = '' + v;
  return +(v.replace(/px/gi, ''));
}
apricot.isChromeApp = function() {
  if(window.chrome != undefined && window.chrome.app.window != undefined) {
    return true;
  }
  return false;
}
apricot.traceIds = function(obj) {
  var res = [];
  var i = 0;
  while(obj.tagName.toLowerCase() != "body" && obj.tagName.toLowerCase() != "html" && i < 20) {
    i += 1;
    var id = obj.id;
    var cn = obj.className || "";
    if(cn.search("apricot") != -1) {
      res.unshift(id);
    }
    obj = obj.parentElement;
  }
  return res;
}

// shpとの依存関係が解消され次第廃止予定
apricot.duplicateBrick = function(id, p_id) {
  var target = apricot.querySelector('#', id);
  var new_id = target.id + '-c' + Math.floor(Math.random()*100000);
  var attrv = target.attributes;
  var attrs_len = attrv.length;

  var copied = document.createElement(target.tagName);
  for(var i = 0; i < attrs_len; i++) {
    copied.setAttribute(attrv[i].nodeName, attrv[i].nodeValue);
  }
  var parent = apricot.querySelector('#', p_id) || target.parentNode;
  copied.id = new_id;
  copied.className += ' element-visible';
  copied.className = copied.className.replace(/element\-visible/gi, 'element-hidden');

  parent.appendChild(copied);
  return new_id;
}


//////// Apricot Logger ////////
apricot.log = function(msg) {
  console.info(msg);
};
apricot.warn = function(msg) {
  console.log(msg);
}
//////// Event Listeners ////////
apricot.setEventsListeners = function() {
  var events = ['click', 'change'];
  for(var e = 0; e < events.length; e++) {
    // イベントを仕掛ける
    window.addEventListener(events[e], function(info) {
      // Apricot Element Object は .apricot | .xapricot を有する
      //if(info.target.className.search(apricot.C.cn) != -1) {
        var event_name = 'apricot-' + info.type;
        var eri = info.target.dataset.eventRootId;
        var id = info.target.id;
        var ids = apricot.traceIds(info.target);
        var ev = new CustomEvent(event_name, {
          detail: {
            brick: {"id": ids[1], "ids": ids},
            eventOriginId: info.target.id,
            dataset: apricot.querySelector('#', ids[1]).dataset,
            fired: {event_name: event_name},
            it: info.target
          }
        });
        window.dispatchEvent(ev);
      //}
    }, false);
  }
  return 0;
};

apricot.setScrollEventListener = function() {
  window.addEventListener('scroll', function(e) {
    var ev = new CustomEvent("apricot-scroll", {
      detail: {
        x: window.scrollX,
        y: window.scrollY
      }
    });
    window.dispatchEvent(ev);
  }, false);
}

//////// Apricot Ready. ////////
apricot.fireInitEvent = function() {
  var ev = new CustomEvent("apricot-ready", {
    detail: {
      brick: {id: null, hasEventRootId: false},
      part: {id: null},
      fired: {event_name: "apricot-load"}
    }
  });
  window.dispatchEvent(ev);
}

////////////////////////////////////////////////////////////////////////////////
/// 廃止-代替リスト
apricot.api.Deprecated = [
  {"ToggleDrawerFromLeft@005": apricot.api.Behavior.ToggleDrawerFromLeft},
  {"CloseDrawerFromLeft@005": apricot.api.Behavior.CloseDrawerFromLeft},
  {"OpenDrawerFromLeft@005": apricot.api.Behavior.OpenDrawerFromLeft},
  {"DuplicateBrick@005": ""},
  {"CopyBrickInParts@005": ""},
  {"FormatDom@005": ""},
  {"IsId@005": ""}
];
////////////////////////////////////////////////////////////////////////////////



window.addEventListener('load', function(e) {
  apricot.log("Apricot is ready.");
  apricot.setEventsListeners();
  apricot.setScrollEventListener();
  apricot.init.buidUI(apricot.manifest);
  apricot.fireInitEvent();
}, false);
