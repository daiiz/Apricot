#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz.
# 

import sys
import os.path
import commands
from PIL import Image

DIR_ORIGINAL = 'original'
DIR_WWW ='www'

def loadRecipeFile(recipefile):
    parts = []
    f = open(recipefile, 'r')
    for line in f:
        line = line.split(';')[0]
        if len(line) > 1:
            parts.append(line.strip())
    f.close()
    return parts

def exeCommand(command_str):
    commands.getoutput(command_str)

def get_img_wh(path):
    img = Image.open(path)
    imgInfo = {
      "size_h": img.size[1],
      "size_w": img.size[0],
    }
    return imgInfo

if __name__ == '__main__':
    # レシピファイルの名前
    recipefilename = sys.argv[1]
    # レシピファイルのパス
    recipefile = '{}/{}'.format(DIR_ORIGINAL, recipefilename)
    # ビルドターゲットの画像名（拡張子なし）をレシピファイルから読み込む
    targets = loadRecipeFile(recipefile)

    # パーツファイル（divファイル）を生成する
    for target in targets:
        if target[-1] == '*':
            target = target[:-1].strip()
            img_wh = get_img_wh("{}/{}.png".format(DIR_ORIGINAL, target))
            # background.js のウィンドウサイズ部分を上書きする
            f = open('{}/background.js'.format(DIR_WWW), 'r')
            new_file = ""
            bg_window_size = "/**/  width: {}, maxWidth: {}, height: {}, maxHeight: {}, /* by Apricot */\n"
            for line in f:
                if line[0] == '/':
                    line = bg_window_size.format(img_wh["size_w"], img_wh["size_w"], img_wh["size_h"], img_wh["size_h"])
                new_file += line
            f.close();
            f = open('{}/background.js'.format(DIR_WWW), 'w')
            f.write(new_file)
            f.close()
        exeCommand('sh build.sh {}'.format(target))

    # レシピファイルに基いて、パーツファイルを実行ファイル（index.html）に統合する
    # ユーザーJSスクリプトのファイル名も渡す
    user_js_finename =  sys.argv[2] or "user_app_script"
    exeCommand('python make_index_html.py {} {} > {}/index.html'.format(recipefilename, user_js_finename, DIR_WWW))

    # Chrome アプリを起動する(for mac)
    # exeCommand('python lib/launch_chrome_app.py run {}'.format(DIR_WWW))
