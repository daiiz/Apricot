/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

var apricot = apricot || {};
apricot.API = {};
apricot.API.v1 = {};

/* APIのデフォルトバージョンを指定 */
apricot.api = apricot.API.v1;

/**
 * ユーザーが呼び出し可能なAPIは
 * 名前の先頭を大文字にする
 */

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
  var new_id = target.id + '__c' + Math.floor(Math.random()*100000);
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
  var cns = apricot.querySelector('#', id).className;
  cns = apricot.split(' ', null, cns);
  cns.push(classname);
  cns = apricot.join(' ', cns);
  apricot.querySelector('#', id).className = cns;
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

//////// Apricot Ready. ////////
window.addEventListener('load', function(e) {
  apricot.log("Apricot is ready.");
  apricot.setEventsListeners();
}, false);
