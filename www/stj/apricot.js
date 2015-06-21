/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
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
////////////////////////////////////////////////////////////////////////////////
///
/* 便利なイディオム */
apricot.api.Idioms = {
}

/* ブリックのDOMを返す */
apricot.api.Dom = function(id) {
  return apricot.querySelector('#', id);
}

/* ユーザー定義のDOMに対してApricot APIを有効化するための整形を行う */
apricot.api.FormatDom = function(user_dom, event_root_id) {
  var d = '';
  apricot.querySelector('#', 'apricot_workspace').innerHTML = user_dom;
  var obj = apricot.querySelector('#', 'apricot_workspace').firstChild;
  // event-root-id を付与する
  // イベント発火Idはこちらが優先される
  if(event_root_id != null) {
    obj.dataset.eventRootId = event_root_id;
  }
  // 後天的Apricot要素であることを示すクラス名を付与する
  obj.className = 'xapricot ' + obj.className;

  apricot.querySelector('#', 'apricot_workspace').innerHTML = '';
  apricot.querySelector('#', 'apricot_workspace').appendChild(obj);
  return apricot.querySelector('#', 'apricot_workspace').innerHTML;
}

/* id判定 */
apricot.api.IsId = function(id_with_hyphen, id) {
  if(id_with_hyphen.split('-')[0] == id) return true;
  return false;
}

/* Apricotオブジェクトにアニメーションキーフレームを適用する */
apricot.api.ApplayAnimation = function(keyframe_name, animation_settings, transitions_settings, id) {
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


/* #idのbrickをparts#parts_id内に非表示状態でコピー生成し、
 * コピーされたbrickのidを返す。
 * 要素#idは非表示状態であることを仮定する
 */
apricot.api.CopyBrickInParts = function(parts_id, id) {
  var child_id = apricot.api.DuplicateBrick(id, parts_id);
  var child = apricot.querySelector('#', child_id);
  child.id = child_id;
  child.style.top = "";
  child.style.left = "";
  child.style.position = "relative";
  var t = child.outerHTML;
  apricot.addClass('element-hidden', child_id);
  return child_id;
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

/* コピー元の真上にブリックを複製する（アニメーションなし）
 * 複製されたブリックのidを返す。初期値では非表示状態。
 */
apricot.api.DuplicateBrick = function(id, p_id) {
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
  var w = apricot.toNum(obj.firstChild.style.width) || obj.firstChild.offsetWidth;  // TODO: 子要素のなかで最も大きいwidthを取るようにする
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
    apricot.api.CloseDrawerFromLeft(id, sec);
  }else if(apricot.toNum(l) < 0){
    apricot.api.OpenDrawerFromLeft(id, sec);
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
      var copyHeaderImgId = a.DuplicateBrick(headerId, apricot.C.shp.stage);
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
      if(info.target.className.search(apricot.C.cn) != -1) {
        var event_name = 'apricot-' + info.type;
        // カスタムイベントを生成し、発火する
        // 通常、発火元はidとなるが、要素がeventRootIdをもつ場合はこちらが優先される
        // 後者の場合、hasEventRootId を true にすることによって伝達される。
        var eri = info.target.dataset.eventRootId;
        var id = info.target.id;
        var has_eri = false;
        if(eri != undefined && eri != '') {
          id = eri;
          has_eri = true;
        }
        var ev = new CustomEvent(event_name, {
          detail: {
            brick: {id: id, hasEventRootId: has_eri},
            part: {id: info.target.id.split('_')[0]},
            fired: {event_name: event_name}
          }
        });
        window.dispatchEvent(ev);
      }
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
/// 後方互換
apricot.api.ToggleDrawerFromLeft = function(id, sec) {
  apricot.log("廃止予定のAPIです.今後は apricot.api.Behavior.ToggleDrawerFromLeft を使用してください。");
  apricot.api.Behavior.ToggleDrawerFromLeft(id, sec);
}
apricot.api.CloseDrawerFromLeft = function(id, sec) {
  apricot.log("廃止予定のAPIです.今後は apricot.api.Behavior.CloseDrawerFromLeft を使用してください。");
  apricot.api.Behavior.CloseDrawerFromLeft(id, sec);
}
apricot.api.OpenDrawerFromLeft = function(id, sec) {
  apricot.log("廃止予定のAPIです.今後は apricot.api.Behavior.OpenDrawerFromLeft を使用してください。");
  apricot.api.Behavior.OpenDrawerFromLeft(id, sec);
}

////////////////////////////////////////////////////////////////////////////////



window.addEventListener('load', function(e) {
  apricot.log("Apricot is ready.");
  apricot.setEventsListeners();
  apricot.setScrollEventListener();
  apricot.init.buidUI(apricot.manifest);
  apricot.fireInitEvent();
}, false);
