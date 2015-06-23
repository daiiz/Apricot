#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz.
#

import sys
import os.path
from PIL import Image

# 末尾改行なしで出力する(print no \n)
def printnn(value):
    sys.stdout.write(str(value))

# 画像のパスが有効であることを確認して返す
def get_img_path():
    if len(sys.argv) == 2:
        img_path = sys.argv[1]
        if os.path.exists(img_path):
            return img_path
    return None

# 画像の基本情報を取得して返す
def get_img_info(path):
    img = Image.open(path)
    imgInfo = {
      "size_h": img.size[1],
      "size_w": img.size[0],
      "mode": img.mode,
      "format": img.format
    }
    return imgInfo

# 画像の色情報を二次元配列に保持する
def collect_px_rgb(path):
    img = Image.open(path)
    rgb = list(img.getdata())
    return rgb

# 画像ファイルから色情報を収集しエリアを分割する
# 補正済みの画像が与えられる
def init_colorPx():
    # rgb: 色RGB値
    # time: 連続する出現回数
    # ibv(index_begin_vertex): 連続出現開始の頂点座標[x, y]
    return {"rgb": None, "time": 0, "ibv": [0,0]}

def get_shape_vertex(array_rgb, w, h):
    # 色情報
    time = 1
    colorPx = init_colorPx()
    colorInfo = []
    # 同じ行内において、直前と同じ色であれば 0, 異なれば 1
    last_px_color = None
    for y in range(0, h):
        for x in range(0, w):
            px_color = array_rgb[w*y + x]
            if last_px_color != px_color:
                # 前色の記録
                colorPx["time"] = time
                colorInfo.append(colorPx)
                # 新色の連続開始
                colorPx = init_colorPx()
                colorPx["rgb"] = px_color
                colorPx["ibv"] = [x, y]
                time = 1
                #printnn(1)
            else:
                time += 1
                #printnn(0)
            last_px_color = px_color
        #print('')
    # 前色の記録
    colorPx["time"] = time
    colorInfo.append(colorPx)
    return colorInfo


# プログラムが保持しているカラー情報を可視化
useVars = list('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
usingColors = []
def debug_getvar(rgb):
    rgbvar = None
    for uc in usingColors:
        if uc['rgb'] == rgb:
            rgbvar = uc['rgbvar']
    if rgbvar == None:
        rgbvar = useVars[0]
        del(useVars[0])
        usingColors.append({"rgb": rgb, "rgbvar": rgbvar})
        if(len(useVars) <= 0):
            print('Err: color-overflow')
    return rgbvar

def debug_render(colorInfo, w, h):
    # t=0番目は無視
    t = 1
    tc = colorInfo[t]
    for y in range(0, h):
        for x in range(0, w):
            if tc != None and (x == tc['ibv'][0] and y == tc['ibv'][1]):
                v = debug_getvar(tc['rgb'])
                printnn(v)
                t += 1
                if(t < len(colorInfo)):
                    tc = colorInfo[t]
                else:
                    tc = None
            else:
                printnn(v)
        print('')
    printnn('\n')
    # 使用されているカラー情報を出力
    for color in usingColors:
        print("{}: rgba{}".format(color['rgbvar'], color['rgb']))
    # 最大カラー変数名を出力
    printnn('\n')
    print(len(usingColors) - 1)  # Bug?

if __name__ == '__main__':
    src = get_img_path()
    imginfo = get_img_info(src)
    if src != None:
        rgb_arr = collect_px_rgb(src)
        w = imginfo['size_w']
        h = imginfo['size_h']
        colorinfo = get_shape_vertex(rgb_arr, w, h)
        debug_render(colorinfo, w, h)
