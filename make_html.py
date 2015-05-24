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
PATH_STJ_FILE = '{}/{}.stj'

# stjファイルのパスを返す
def getPathStj(partname):
    return PATH_STJ_FILE.format(DIR_ORIGINAL, partname)

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

# px値を返す
def getPxValue(base, diff):
    # base、diffから'px'を除去する
    base = str(base).replace('px', '').strip()
    diff = str(diff).replace('px', '').strip()
    # diff[0]が符号であれば、baseにdiff加算した値を採用する
    # diffが符号なしの場合は、diffの値を採用する
    if diff[0] == '+' or diff[0] == '-':
        diff = int(base) + int(diff)
    return str(diff) + 'px'

# uファイルとstjを統合したスタイルを生成する
# stjファイルの内容を優先する
def makeStyleSet(u_sty, stj):
    style_set = {}
    u_sty += ';'
    u_sty_arr = u_sty.split(';')
    # 一行ずつ記録する
    # 対象となるのは background, top, left, width, height のみ
    for usty in u_sty_arr:
        if len(usty) > 0:
            prop = usty.split(':')[0].strip()
            value = usty.split(':')[1].strip()
            style_set[prop] = value.replace(',', '**')
    # stjを解析する
    ############ BackgroundColor ############
    a = getPropValue(stj, 'BackgroundColor')
    if a != '': style_set['background'] = a.replace(',', '**')
    ############ Cursor ############
    a = getPropValue(stj, 'Cursor')
    if a != '': style_set['cursor'] = a
    ############ Height ############
    a = getPropValue(stj, 'Height')
    if a != '': style_set['height'] = getPxValue(style_set['height'], a)
    ############ Width ############
    a = getPropValue(stj, 'Width')
    if a != '': style_set['width'] = getPxValue(style_set['width'], a)
    ############ Left ############
    a = getPropValue(stj, 'Left')
    if a != '': style_set['left'] = getPxValue(style_set['left'], a)
    ############ Top ############
    a = getPropValue(stj, 'Top')
    if a != '': style_set['top'] = getPxValue(style_set['top'], a)
    ############ Zindex ############
    a = getPropValue(stj, 'Zindex')
    if a != '': style_set['z-index'] = a
    ############ Display ############
    a = getPropValue(stj, 'Display')
    if a != '': style_set['display'] = a
    ############ ShadowLevel ############
    a = getPropValue(stj, 'ShadowLevel')
    if a != '':
        if a == '0':
            a = ""
        elif a == '1':
            a = "rgba(0, 0, 0, 0.098) 0px 2px 4px, rgba(0, 0, 0, 0.098) 0px 0px 3px"
        elif a == '2':
            a = "0 2px 10px 0 rgba(0, 0, 0, 0.16)"
        elif a == '3':
            a = "0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        elif a == '4':
            a = "0 17px 50px 0 rgba(0, 0, 0, 0.19)"
        elif a == '5':
            a = "0 25px 55px 0 rgba(0, 0, 0, 0.21)"
        else:
            a = "0 40px 77px 0 rgba(0, 0, 0, 0.22)"
    if a != '': style_set['box-shadow'] = a.replace(',', '**')
    ############ FontSize ############
    a = getPropValue(stj, 'FontSize')
    if a != '':
        if a == 'large':
            a = '24px'
    if a != '': style_set['font-size'] = a
    ############ FontColor ############
    a = getPropValue(stj, 'FontColor')
    if a != '': style_set['color'] = a.replace(',', '**')
    ############ FontFamily ############
    a = getPropValue(stj, 'FontFamily')
    if a != '': style_set['font-family'] = a.replace(',', '**')
    ############ FontWeight ############
    a = getPropValue(stj, 'FontWeight')
    if a != '': style_set['font-weight'] = a

    # style属性に埋め込める形に整形する
    style_set = str(style_set).replace(', ', '; ')  #これダメrbgaの,も影響を受ける
    style_set = style_set.replace("'", '').replace('"', '')
    style_set = style_set.replace("{", '"').replace('}', '"')
    style_set = style_set.replace("**", ',')

    return style_set

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

    if stjs.has_key("{}_{}".format(part_name, part_id)) == True:
       stj = stjs["{}_{}".format(part_name, part_id)]
       # タグ名を決定する
       if stj.has_key('Role') == True:
           role = stj['Role']
           ############ ブラウザ標準ボタン ############
           if role == 'html-button':
               name = 'button'
               text = getPropValue(stj, 'Text')
               tag = getTag('button', {"keyv": {
                   "id": "{}_{}".format(part_name, part_id),
                   "style": '{}'.format(makeStyleSet(u_sty, stj)),
                   "title": part_id,
               }, "inner": text}, True)
           ############ ブラウザ標準インプット ############
           elif role == 'html-input':
               name = 'input'
               text = getPropValue(stj, 'Text')
               ph = getPropValue(stj, 'Placeholder')
               tag = getTag('input', {"keyv": {
                   "id": "{}_{}".format(part_name, part_id),
                   "style": '{}'.format(makeStyleSet(u_sty, stj)),
                   "title": part_id,
                   "placeholder": ph
               }}, False)
           ############ ブラウザ標準イメージ ############
           elif role == 'html-img':
               name = 'img'
               localsrc = getPropValue(stj, 'LocalFile')
               # TODO: 画像fileコピー
               tag = getTag('img', {"keyv": {
                   "id": "{}_{}".format(part_name, part_id),
                   "style": '{}'.format(makeStyleSet(u_sty, stj)),
                   "title": part_id,
                   "src": localsrc
               }}, False)
           ############ ブラウザWebview ############
           elif role == 'html-webview':
               name = 'webview'
               src = getPropValue(stj, 'URL')
               tag = getTag(name, {"keyv": {
                   "id": "{}_{}".format(part_name, part_id),
                   "style": '{}'.format(makeStyleSet(u_sty, stj)),
                   "title": part_id,
                   "src": src
               }}, True)
           ############ divタグ ############
           else:
               text = getPropValue(stj, 'Text')
               tag = getTag('div', {"keyv": {
                   "id": "{}_{}".format(part_name, part_id),
                   "style": '{}'.format(makeStyleSet(u_sty, stj)),
                   "title": part_id,
               }, "inner": text}, True)
       ############ divタグ ############
       else:
           text = getPropValue(stj, 'Text')
           tag = getTag('div', {"keyv": {
                "id": "{}_{}".format(part_name, part_id),
                "style": '{}'.format(makeStyleSet(u_sty, stj)),
                "title": part_id,
           }, "inner": text}, True)
    ############ divタグ ############
    else:
        tag = getTag('div', {"keyv": {
             "id": "{}_{}".format(part_name, part_id),
             "style": '"{}"'.format(u_sty),
             "title": part_id,
        }, "inner": ''}, True)

    return tag;

# stjファイルを読み取る
def loadStjFile(partname):
    res = {}
    now_reading = None
    stj_file_path = getPathStj(partname)
    f = open(stj_file_path)
    # 一行ずつ読み取り、JSONに格納する
    for line in f:
       # 行頭行末の余計な空白を除去する
       line = line.strip()
       if len(line) > 0:
           if line[0] == '[':
               # part_idは一文字であることが保証されている
               part_id = '{}_{}'.format(part_name, line[1])
               res[part_id] = {}
               now_reading = res[part_id]
           else:
               # コメントを含まない部分を取得
               param_value = line.split(';')[0]
               # パラメータ名とその値を取得
               if len(param_value) > 0:
                   param = param_value.split(':')[0].strip()
                   value = (param_value[param_value.find(':') + 1:]).strip()
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
    stjs = loadStjFile(part_name)
    for part in parts:
        # パーツの割り当てIDを取得
        a = part['var']
        rgb = str(colors['v' + a])
        # rgbaの表現補正
        rgbx = len(rgb.split(','))
        if(rgbx == 3): rgb = rgb.replace('rgba', 'rgb')
        # az,uファイルから得られる基本スタイル
        sty = 'top: {}px; left: {}px; width: {}px; height :{}px; background: {};'.format(part['top'], part['left'], part['width'], part['height'], rgb)
        # stjファイルの内容を反映させる
        element_tag = makeTag(stjs, a, sty)
        divs.append(element_tag)
    return divs

part_name = ''
if __name__ == '__main__':
    # miファイル（現uファイル）を取得
    mi_path = get_mi_path()
    # mi_path: tmp/パーツ名.u
    j = load_json(mi_path)
    # パーツデータを取得
    parts = j['parts']
    # デフォルトカラー情報を取得
    colors = j['colors']
    # パーツ名を取得する
    part_name = mi_path.split('.')[0].split('/')[1]
    # div配列を生成
    divs = createDivTags(parts, colors)

    # HTMLを出力
    htmldoc = ''
    for tag in divs:
        htmldoc += tag

    print(htmldoc)
