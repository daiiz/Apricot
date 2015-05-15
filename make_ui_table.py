#!/usr/bin/python
# -*- coding: utf-8 -*-

# Project Apricot
# Copyright (c) 2015 Daiki, Takanori.

import sys
import os.path
from PIL import Image

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

if __name__ == '__main__':
    src = get_img_path()
    if src != None:
        print(get_img_info(src))
