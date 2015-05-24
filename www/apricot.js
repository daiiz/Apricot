/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

var apricot = apricot || {};

/**
 * ユーザーが呼び出し可能なメソッドは
 * 名前の先頭を大文字にする
 */

/**
 * apricotの内部処理用メソッド
 */

//////// Apricot 定数 ////////
apricot.C = {
  "cn": "apricot"
};

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
  var events = ['click'];
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
