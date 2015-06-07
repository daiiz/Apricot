/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

var apricot = apricot || {};
apricot.init = {};
apricot.API = {};
apricot.API.v1 = {};

/* APIのデフォルトバージョンを指定 */
apricot.api = apricot.API.v1;

/**
 * ユーザーが呼び出し可能なAPIは
 * 名前の先頭を大文字にする
 */

/* id判定 */
apricot.api.CheckId = function(id_with_hyphen, id) {
  if(id_with_hyphen.split('-')[0] == id) return true;
  return false;
}

/**/
apricot.api.ShowScaleBrick = function(id) {

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
apricot.api.DuplicateBrick = function(id) {
  var target = apricot.querySelector('#', id);
  var new_id = target.id + '-c' + Math.floor(Math.random()*100000);
  var attrv = target.attributes;
  var attrs_len = attrv.length;

  var copied = document.createElement(target.tagName);
  for(var i = 0; i < attrs_len; i++) {
    copied.setAttribute(attrv[i].nodeName, attrv[i].nodeValue);
  }
  var parent = target.parentNode;
  copied.id = new_id;
  copied.className += ' element-visible';
  copied.className = copied.className.replace(/element\-visible/gi, 'element-hidden');

  parent.appendChild(copied);
  return new_id;
}

/* エイリアス */
/* パーツの表示・非表示切り替え（アニメーションなし） */
apricot.api.ShowParts = apricot.api.ShowBrick;
apricot.api.HideParts = apricot.api.HideBrick;
apricot.api.ToggleParts = apricot.api.ToggleBrick;
/* パーツを指定した座標まで移動させる（アニメーションなし） */
apricot.api.MovePartsTo = apricot.api.MoveBrickTo;


////////////////////////////////////////////////////////////////////////////////
/* エクスパンド */
// origin: 水平方向l,c,r * 垂直方向t,c,b


apricot.api.OpenExpandBrick = function(id, origin) {
  apricot.setStyle([
    {"opacity": 1},
    {"transition": "transform 0.3s ease"},
    {"transform-origin": origin}
  ], id);
  apricot.removeClass('element-hidden-scale', id);
  apricot.addClass('element-visible-scale', id);
};

apricot.api.CloseExpandBrick = function(id, origin) {
  apricot.setStyle([
    {"opacity": 1},
    {"transition": "transform 0.3s ease"},
    {"transform-origin": origin}
  ], id);
  apricot.addClass('element-hidden-scale', id);
  apricot.removeClass('element-visible-scale', id);
};

apricot.api.ToggleExpandBrick = function(id, origin) {
  if(origin == null) origin = 'center center';
  if(apricot.hasClass('element-hidden-scale', id)) {
    apricot.api.OpenExpandBrick(id, origin);
  }else {
    apricot.api.CloseExpandBrick(id, origin);
  }
}


////////////////////////////////////////////////////////////////////////////////
/* ドロワーパネル */
apricot.api.OpenDrawerFromLeft = function(id, sec) {
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

apricot.api.CloseDrawerFromLeft = function(id, sec) {
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

apricot.api.ToggleDrawerFromLeft = function(id, sec) {
  var obj = apricot.querySelector('#', id);
  var l = obj.style.transform || '(-1px, 0, 0)';
  var l = l.split('(')[1].split('px')[0];
  if(apricot.toNum(l) >= 0) {
    apricot.api.CloseDrawerFromLeft(id, sec);
  }else if(apricot.toNum(l) < 0){
    apricot.api.OpenDrawerFromLeft(id, sec);
  }
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

//////// Apricot 定数 ////////
apricot.C = {
  "cn": "apricot"
};

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

//////// Apricot Logger ////////
apricot.log = function(msg) {
  console.info(msg);
};

//////// Event Listeners ////////
apricot.setEventsListeners = function() {
  var events = ['click', 'change'];
  for(var e = 0; e < events.length; e++) {
    // イベントを仕掛ける
    window.addEventListener(events[e], function(info) {
      if(info.target.className.search(apricot.C.cn) != -1) {
        var en = 'apricot-' + info.type;
        // カスタムイベントを生成し、発火する
        var ev = new CustomEvent(en, {
          detail: {
            brick: {
              id: info.target.id
            },
            part: {
              id: info.target.id.split('_')[0]
            },
            fired: {
              event_name: en
            }
          }
        });
        window.dispatchEvent(ev);
      }
    }, false);
  }
  return 0;
};

//////// 初回起動時デザイン初期化 ////////
apricot.buidInitUI = function(manifest) {

}


//////// Apricot Ready. ////////
window.addEventListener('load', function(e) {
  apricot.log("Apricot is ready.");
  apricot.setEventsListeners();
  apricot.init.buidUI(apricot.manifest);
}, false);
