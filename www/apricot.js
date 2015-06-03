/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

var apricot = apricot || {};
apricot.api = {};

/**
 * ユーザーが呼び出し可能なAPIは
 * 名前の先頭を大文字にする
 */

apricot.api.ShowBrick = function(brick_id) {

};

/* パーツを表示する */
apricot.api.ShowParts = function(parts_id) {
  apricot.querySelector('#', parts_id).style.display = 'block';
};

/* パーツを非表示にする */
apricot.api.HideParts = function(parts_id) {
  apricot.querySelector('#', parts_id).style.display = 'none';
};

/* パーツの表示／非表示を切り替える */
apricot.api.ToggleParts = function(parts_id) {
  var state = apricot.querySelector('#', parts_id).style.display || 'block';
  if(state == 'block') {
    apricot.api.HideParts(parts_id)
  }else {
    apricot.api.ShowParts(parts_id)
  }
}


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
      if(info.target.className === apricot.C.cn) {
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
