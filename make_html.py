#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz.
# 

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

# パーツごとのdivタグを配列に格納して返す
def createDivTags(parts, colors):
    divs = []
    stjs = {}
    for part in parts:
        # パーツへの割り当てIDを取得
        brick_id = part['var']
        rgb = str(colors['v' + brick_id])
        # rgbaの表現補正
        rgbx = len(rgb.split(','))
        if(rgbx == 3): rgb = rgb.replace('rgba', 'rgb')
        # az,uファイルから得られる基本スタイル
        sty = 'top: {}px; left: {}px; width: {}px; height :{}px; background: {};'.format(part['top'], part['left'], part['width'], part['height'], rgb)
        # ブリックを生成する
        element_tag =  getTag('div', {"keyv": {
             "id": "{}_{}".format(part_name, brick_id),
             "style": '"{}"'.format(sty),
             "title": brick_id,
        }, "inner": ''}, True)
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
