/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

var apricot = apricot || {};
apricot.init = {};
apricot.API = {};
apricot.API.v1 = {"v": "1.0.1 beta preview"};

/* APIのデフォルトバージョンを指定 */
apricot.api = apricot.API.v1;

/**
 * ユーザーが呼び出し可能なAPIは
 * 名前の先頭を大文字にする
 */

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

//////// Apricot Ready. ////////
apricot.fireInitEvent = function() {
  var ev = new CustomEvent("apricot-load", {
    detail: {
      brick: {id: null, hasEventRootId: false},
      part: {id: null},
      fired: {event_name: "apricot-load"}
    }
  });
  window.dispatchEvent(ev);
}

window.addEventListener('load', function(e) {
  apricot.log("Apricot is ready.");
  apricot.setEventsListeners();
  apricot.init.buidUI(apricot.manifest);
  apricot.fireInitEvent();
}, false);