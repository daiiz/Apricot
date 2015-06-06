#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz, mathharachan, risingsun_33178.

import sys

DIR_ORIGINAL = 'original'
DIR_WWW ='www'

def loadRecipeFile():
    parts = []
    # 実行時に第一引数に与えられたレシピファイルを読み取る
    recipefile = '{}/{}'.format(DIR_ORIGINAL, sys.argv[1])
    f = open(recipefile, 'r')
    for line in f:
        line = line.split(';')[0]
        if len(line) > 1:
            parts.append(line.strip())
    f.close()
    return parts

# HTMLの基本タグを配列にして返す
def createBasicTags(title):
    tags = {"before": [], "after": []}
    # 基本CSSスタイル
    sty = '.apricot{} body{}'.format('{position: absolute; outline: none;-webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0)}', '{margin: 0 0 0 0;}')
    tags["before"] = [
      '<!doctype html>',
      '<html>',
      '<head>',
      '<meta charset="utf-8" />',
      '<link rel="stylesheet" href="apricot.css">',
      '<title>{}</title>'.format(title),
      '<style>{}</style>'.format(sty),
      '</head>',
      '<body>'
    ]
    tags['after'] = [
      '<div id="apricot_workspace"></div>',
      '<script src="apricot.js"></script>',
      '<script src="apricot_init.js"></script>',
      '<script src="app.js"></script>',
      '<script src="Html.js"></script>',
      '<script src="apricot_manifest.js"></script>'
      '</body>',
      '</html>'
    ]
    return tags

if __name__ == '__main__':
    # 統合ターゲットリストを取得
    targets = loadRecipeFile()
    # 基本タグ配列を生成
    basics = createBasicTags("index")

    # HTMLを出力
    htmldoc = ''
    for tag in basics['before']:
        htmldoc += tag

    # パーツを1つずつ読み取り追加する
    for part in targets:
        # 表示／非表示情報
        display_class = 'element-hidden'
        # TODO: jsと一本化
        if part[-1] == '*':
            display_class = 'element-visible'
            part = part[:-1].strip()
        f = open('tmp/{}.div'.format(part), 'r')
        htmldoc += '\n<div id="{}" class="apricot {}">'.format(part, display_class)
        htmldoc += f.read()
        htmldoc += '\n</div>'
        f.close()

    for tag in basics['after']:
        htmldoc += tag

    print(htmldoc)
