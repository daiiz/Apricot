#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 Daiki, Takanori.

# ! DEMO !

import sys
import os.path
import json

# miファイルのパスが有効であることを確認して返す
def get_mi_path():
    if len(sys.argv) == 2:
        mi_path = sys.argv[1]
        if os.path.exists(mi_path):
            return mi_path
    return None

# JSONを読み込む
def load_json(miPath):
    f = open(miPath, 'r')
    j = json.load(f)
    return j

# パーツごとのdivタグを配列に格納して返す
def createDivTags(parts, colors):
    divs = []
    for part in parts:
        a = part['var']
        rgb = str(colors['v' + a])
        # 補正
        rgbx = len(rgb.split(','))
        if(rgbx == 3):
            rgb = rgb.replace('rgba', 'rgb')
        b = 'top: {}px; left: {}px; width: {}px; height :{}px; background-color: {};'.format(part['top'], part['left'], part['width'], part['height'], rgb)
        divtag = '<div class="apricot" id="v{}" style="{}"></div>'.format(a, b)
        divs.append(divtag)
    return divs

# HTMLの基本タグを配列にして返す
def createBasicTags(title):
    tags = {"before": [], "after": []}
    # 基本CSSスタイル
    sty = '.apricot{} body{}'.format('{position: absolute}', '{margin: 0 0 0 0}')
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

    htmldoc += '<div id={} class="apricot">'.format(mi_path.split('.')[0])
    for tag in divs:
        htmldoc += tag
    htmldoc += '</div>'

    for tag in basics['after']:
        htmldoc += tag

    print(htmldoc)
