#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz.
#

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
    # Apricot Manifest ファイル名
    apricot_manifest_js = sys.argv[2] + '_manifest.js'
    # ユーザーJSスクリプト・CSSのファイル名
    user_script_finename = sys.argv[2]

    tags["before"] = [
      '<!doctype html>',
      '<html>',
      '<head>',
      '<meta charset="utf-8" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">',
      '<meta name="mobile-web-app-capable" content="yes">',
      '<meta name="apple-mobile-web-app-capable" content="yes">',
      '<link rel="stylesheet" href="stj/apricot.css">',
      '<link rel="stylesheet" href="stj/apricot_animation.css">',
      '<link rel="stylesheet" href="{}.css">'.format(user_script_finename),
      # <Polymer Elements>:
      '<link rel="import" href="bower_components/paper-fab/paper-fab.html">',
      '<link rel="import" href="bower_components/paper-material/paper-material.html">',
      '<link rel="import" href="bower_components/iron-icons/iron-icons.html">',
      '<link rel="import" href="bower_components/iron-icons/iron-icons.html">',
      '<link rel="import" href="bower_components/paper-button/paper-button.html">',
      '<link rel="import" href="bower_components/paper-icon-button/paper-icon-button.html">',
      # </Polymer Elements>
      '<title>{}</title>'.format(title),
      '<style>{}</style>'.format(sty),
      '</head>',
      '<body>'
    ]

    tags['after'] = [
      '<div id="apricot_workspace"></div>',
      '<div id="apricot_workspace_preimg"><img src="#"></div>',
      '<script src="cordova.js"></script>',
      '<script src="stj/apricot.js"></script>',
      '<script src="stj/apricot_init.js"></script>',
      '<script src="{}.js"></script>'.format(user_script_finename),
      '<script src="{}"></script>'.format(apricot_manifest_js),
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
        if part[-1] == '*':
            display_class = 'element-visible'
            part = part[:-1].strip()
        # 画面横幅限界まで拡張して表示するかの情報
        display_width_expand = ''
        #if part[0] == '_':
        #    display_width_expand = 'width-expand'
        #    part = part[1:].strip()
        f = open('tmp/{}.div'.format(part), 'r')
        htmldoc += '\n<div id="{}" class="apricot {} {}">'.format(part, display_class, display_width_expand)
        htmldoc += f.read()
        htmldoc += '\n</div>'
        f.close()

    for tag in basics['after']:
        htmldoc += tag

    print(htmldoc)
