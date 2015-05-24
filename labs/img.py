# -*- coding: utf-8 -*-
from PIL import Image
from PIL import ImageOps

if __name__ == '__main__' :
    img1 = Image.open("icon3.png")
    img2 = ImageOps.grayscale(img1)
    img2.save("icon3_gray.png")
