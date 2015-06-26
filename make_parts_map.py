#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 daiz.
#

import sys
import os.path
import json

useVars = list('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

# 画像のdiv-map-fileのパスが有効であることを確認して返す
def get_dm_path():
    if len(sys.argv) == 2:
        dm_path = sys.argv[1]
        if os.path.exists(dm_path):
            return dm_path
    return None

# パーツデータを格納するオブジェクトを生成
def init_parts_map(max):
    parts = []
    for i in range(0, max+1):
        part = {"var": useVars[i], "left": 0, "top": 0, "width": 0, "height": 0}
        parts.append(part)
    return parts

# パーツデータを構築する
def generate_parts_map(partsMapObj, divMap):
    max = len(partsMapObj)
    next_start_y = 0

    for i,line in enumerate(divMap):
        divMap[i] = ''.join(line)

    # left, top, width を求める
    for i in range(0, max):
        var = useVars[i]
        part = partsMapObj[i]
        # div-map-fileを一行ずつ探索
        wflag = False  # 分割の開始点を見つけると True になる
        hflag = False  # 分割のwidthの記録が完了すると True になる
        for y in range(0, len(divMap)):
            line = divMap[y]
            if (len(line) == 0) or (hflag == True):
                break
            # 左端から右端に向かって一行を探索する
            for x in range(0, len(line)):
                char = line[x] #''.join(line)[x]
                # いま見ている文字列が var と等しいかどうか
                if char == var:
                    # 分割の開始点を見つけた
                    if wflag == False:
                        wflag = True
                        part['left'] = x
                        part['top'] = y

                    if hflag == False:
                        part['width'] += 1
                elif wflag == True:
                    break

            if wflag == True:
                # width の記録が完了した
                hflag = True
                break

    # height を求める
    for i in range(0, max):
        part = partsMapObj[i]
        var = part['var']
        left = part['left']
        top = part['top']
        # 開始点と同じ列で、yを増やしていくとき、x値が等しい間実行
        # このループを抜けたとき、heightが求まっている
        for y in range(top, len(divMap)):
            #print (divMap[y], left, var)
            if divMap[y] == '\n':
                break
            char = divMap[y][left]
            if char == var:
                part['height'] += 1
            else:
                break

    return partsMapObj

# defaultColor を求める
def get_color_info(divMapLines):
   colors = {}
   for line in divMapLines:
       if ':' in line:
           rgbvar = 'v' + line.split(':')[0].strip()
           rgb = line.split(':')[1].strip()
           colors[rgbvar] = rgb
   return colors

# JSON形式で出力する
def output_json(parts_map, color_map):
    j = {}
    j["parts"] = parts_map
    j["colors"] = color_map
    #print(json.dumps(j, sort_keys = False, indent = 4))
    print(json.dumps(j))

# div-map-fileを一行ずつ読み込む
def load_div_map(dm_path):
    f = open(dm_path)
    flines = f.readlines()
    f.close()
    # 最後の行を読むことで分割数が分かる
    div_num = int(flines[len(flines) - 1])
    # パーツマップオブジェクトを初期化
    parts_map_obj = init_parts_map(div_num)
    # パーツマップオブジェクトを生成
    parts_map = generate_parts_map(parts_map_obj, flines)
    # defaultColor を求める
    color_map = get_color_info(flines)
    # JSON形式で出力する
    output_json(parts_map, color_map)

if __name__ == '__main__':
    dmfile = get_dm_path()
    load_div_map(dmfile)
