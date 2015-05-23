#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz, mathharachan, risingsun_33178.

import sys
import os.path
import json

# 定数
DIR_ORIGINAL = 'original'
DIR_WWW ='www'
PATH_STJ_FILE = '{}/stj.txt'.format(DIR_ORIGINAL)

# miファイルのパスが有効であることを確認して返す
def get_mi_path():
    if len(sys.argv) == 2:
        mi_path = sys.argv[1]
        if os.path.exists(mi_path):
            return mi_path
    return None

# JSONを読み込む
# uファイルを読む
def load_json(miPath):
    f = open(miPath, 'r')
    j = json.load(f)
    f.close()
    return j


def getPropValue(stj, prop):
    if stj.has_key(prop) == True:
        res = stj[prop]
    else:
        res = ''
    return res

# uファイルとstjを統合したスタイルを生成する
def makeStyleSet(u_sty, stj):
    pass

def getTag(name, kvs, endtag):
    # kvs: {"keyv": {"id":2, "value":2}, "inner": 2}
    tag = ''
    for i, kv in enumerate(kvs['keyv']):
        key = kvs['keyv'].keys()[i]
        value = kvs['keyv'][key]
        kv = '{}={}'.format(key, value)
        tag += kv + ' '
    tag += 'class="apricot"'
    # innerHTMLを設定
    inner = ''
    if kvs.has_key('inner') == True:
        inner = kvs['inner']
    # 閉じタグは必要か
    closetag = ''
    if endtag == True:
        closetag = '</{}>'.format(name)
    else:
        inner = ''
    # タグを生成
    tag = '<{} '.format(name) + tag + '>' + inner + closetag
    return tag

# tagを返す
# イベント仕掛けは行われない
def makeTag(stjs, part_id, u_sty):
    tag = ''

    if stjs.has_key('v' + part_id) == True:
       stj = stjs['v' + part_id]
       # タグ名を決定する
       if stj.has_key('Role') == True:
           role = stj['Role']
           ############ ブラウザ標準ボタン ############
           if role == 'html-button':
               name = 'button'
               text = getPropValue(stj, 'Text')
               tag = getTag('button', {"keyv": {
                   "id": "v{}".format(part_id),
                   "style": '"{}"'.format(u_sty),
                   "title": part_id,
               }, "inner": text}, True)
           ############ ブラウザ標準インプット ############
           elif role == 'html-input':
               name = 'input'
               text = getPropValue(stj, 'Text')
               ph = getPropValue(stj, 'Placeholder')
               tag = getTag('input', {"keyv": {
                   "id": "v{}".format(part_id),
                   "style": '"{}"'.format(u_sty),
                   "title": part_id,
                   "placeholder": ph
               }}, False)
           ############ ブラウザ標準イメージ ############
           elif role == 'html-img':
               name = 'img'
               localsrc = getPropValue(stj, 'LocalFile')
               # TODO: 画像fileコピー
               tag = getTag('img', {"keyv": {
                   "id": "v{}".format(part_id),
                   "style": '"{}"'.format(u_sty),
                   "title": part_id,
                   "src": localsrc
               }}, False)
           ############ divタグ ############
           else:
               text = getPropValue(stj, 'Text')
               tag = getTag('div', {"keyv": {
                   "id": "v{}".format(part_id),
                   "style": '"{}"'.format(u_sty),
                   "title": part_id,
               }, "inner": text}, True)
       else:
           ############ divタグ ############
           text = getPropValue(stj, 'Text')
           tag = getTag('div', {"keyv": {
                "id": "v{}".format(part_id),
                "style": '"{}"'.format(u_sty),
                "title": part_id,
           }, "inner": text}, True)
    else:
        ############ divタグ ############
        tag = getTag('div', {"keyv": {
             "id": "v{}".format(part_id),
             "style": '"{}"'.format(u_sty),
             "title": part_id,
        }, "inner": ''}, True)

    return tag;

# stjファイルを読み取る
def loadStjFile():
    res = {}
    now_reading = None
    f = open(PATH_STJ_FILE)
    # 一行ずつ読み取り、JSONに格納する
    for line in f:
       # 行頭行末の余計な空白を除去する
       line = line.strip()
       if len(line) > 0:
           if line[0] == '[':
               # part_idは一文字であることが保証されている
               part_id = 'v' + line[1]
               res[part_id] = {}
               now_reading = res[part_id]
           else:
               # コメントを含まない部分を取得
               param_value = line.split(';')[0]
               # パラメータ名とその値を取得
               param = param_value.split(':')[0].strip()
               value = param_value.split(':')[1].strip()
               if value[0] == '<' and value[1] == '<':
                   fn = param_value.split('<')[2]
                   fn = fn.split('>')[0].strip()
                   # ファイルを読み込み、その内容を値とする
                   value_f = open('{}/{}'.format(DIR_ORIGINAL, fn))
                   # TODO: 改行の取り扱いについての検討
                   value = value_f.read().replace('\n', '<br>')
                   value_f.close()
               # now_reading に書き込む
               if now_reading != None:
                   now_reading[param] = value
    f.close()
    return res

# パーツごとのdivタグを配列に格納して返す
def createDivTags(parts, colors):
    divs = []
    stjs = {}
    # マニフェストファイル(stj)の内容を読み取る
    stjs = loadStjFile()
    for part in parts:
        # パーツの割り当てIDを取得
        a = part['var']
        rgb = str(colors['v' + a])
        # rgbaの表現補正
        rgbx = len(rgb.split(','))
        if(rgbx == 3): rgb = rgb.replace('rgba', 'rgb')
        # az,uファイルから得られる基本スタイル
        sty = 'top: {}px; left: {}px; width: {}px; height :{}px; background-color: {};'.format(part['top'], part['left'], part['width'], part['height'], rgb)
        # stjファイルの内容を反映させる
        element_tag = makeTag(stjs, a, sty)
        #element_tag = '<{} class="apricot" id="v{}" style="{}" title="{}"></{}>'.format(tag['name'], a, tag['style'], a, tag['name'])
        divs.append(element_tag)
    return divs

# HTMLの基本タグを配列にして返す
def createBasicTags(title):
    tags = {"before": [], "after": []}
    # 基本CSSスタイル
    sty = '.apricot{} body{}'.format('{position: absolute; outline: none;-webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0)}', '{margin: 0 0 0 0;}')
    tags["before"] = [
      '<!doctype html>',
      '<html>',
      '<head>',
      '<meta charset="utf-8" />'
      '<title>{}</title>'.format(title),
      '<style>{}</style>'.format(sty),
      '</head>',
      '<body>'
    ]
    tags['after'] = [
      '<script></script>',
      '</body>',
      '</html>'
    ]
    return tags


if __name__ == '__main__':
    mi_path = get_mi_path()
    j = load_json(mi_path)
    # パーツデータを取得
    parts = j['parts']
    # デフォルトカラー情報を取得
    colors = j['colors']
    # div配列を生成
    divs = createDivTags(parts, colors)
    # 基本タグ配列を生成
    basics = createBasicTags(mi_path.split('.')[0])

    # HTMLを出力
    htmldoc = ''
    for tag in basics['before']:
        htmldoc += tag

    htmldoc += '<div id={} class="apricot" style="display: {}">'.format(mi_path.split('.')[0], 'block')
    for tag in divs:
        htmldoc += tag
    htmldoc += '</div>'

    for tag in basics['after']:
        htmldoc += tag

    print(htmldoc)
