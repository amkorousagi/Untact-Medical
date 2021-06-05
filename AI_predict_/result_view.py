import numpy as np
from PIL import Image

def combine_origin_result(origin,mask):
    origin_pixel=origin.load()
    mask_pixel=mask.load()
    new_img=origin.copy()
    new_img_pixel=new_img.load()

    for i in range(mask.size[0]):
        for j in range(mask.size[1]):
            if mask_pixel[i,j] > 0:
                new_img_pixel[i,j]=(255,0,0)
    return new_img