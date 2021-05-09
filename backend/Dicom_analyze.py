import numpy as np
import png
import pydicom
import os
import sys
import json
from collections import OrderedDict

def Write_data_json(ds,name,shape,path):
    file_data=OrderedDict()
    element_list=[['PatientID',(0x0010, 0x0020)],['PatientName',(0x0010, 0x0010)],['PatientAge',(0x0010, 0x1010)],\
                ['PatientBirthDate',(0x0010, 0x0030)],['PatientSex',(0x0010, 0x0040)],['StudyDate',(0x0008,0x0020)],\
                ['Modality',(0x0008, 0x0060)],['StudyDescription',(0x0008, 0x1030)],['ReferringPhysicianName',(0x0008, 0x0090)]]
   
    for i in range(len(element_list)):
        if (element_list[i][0] in ds) and (ds[element_list[i][1][0], element_list[i][1][1]].value != ''):
            file_data[element_list[i][0]]=str(ds[element_list[i][1][0], element_list[i][1][1]].value)
        else:
            file_data[element_list[i][0]]="No data"

    file_data['NumberOfImg']=str(1 if len(shape) == 2 else shape[0])
    file_data['URL']=os.path.dirname(os.path.realpath(__file__))+path[1:]

    #
    file_data['StudyID']=name

    file_name= name +'/data.json'
    with open(file_name,'w',encoding="utf-8") as make_file:
        json.dump(file_data,make_file,ensure_ascii=False,indent="\t")

def Write_data_txt(ds,name,shape,path):
    element_list=[['PatientID',(0x0010, 0x0020)],['PatientName',(0x0010, 0x0010)],['PatientAge',(0x0010, 0x1010)],\
                ['PatientBirthDate',(0x0010, 0x0030)],['PatientSex',(0x0010, 0x0040)],['StudyDate',(0x0008,0x0020)],\
                ['Modality',(0x0008, 0x0060)],['StudyDescription',(0x0008, 0x1030)],['ReferringPhysicianName',(0x0008, 0x0090)]]
   
    f = open(path + '/' + name + '.txt', 'w')

    #print('\n'+name)

    for i in range(len(element_list)):
        data = '%-30s' % element_list[i][0]
        if (element_list[i][0] in ds) and (ds[element_list[i][1][0], element_list[i][1][1]].value != ''):
            data += str(ds[element_list[i][1][0], element_list[i][1][1]].value) +'\n'
        
        else:
            data += 'No data\n'
        #print(data)
        f.write(data)

    data = '%-30s' % 'NumberOfImg' + str(1 if len(shape) == 2 else shape[0]) +'\n'
    #print(data)
    f.write(data)
    data = '%-30s' % 'URL' + os.path.dirname(os.path.realpath(__file__))+path[1:]
    #print(data)
    f.write(data)
    f.close()

def extract_img(dicomPath, imagePath):
    input_path=dicomPath
    ds = pydicom.dcmread(input_path)

    #make directory
    path = imagePath
    if not os.path.isdir(path):
        os.mkdir(path)
    
    shape = ds.pixel_array.shape

    #Write data txt
    # Write_data_txt(ds, input_name,shape,path)
    Write_data_json(ds, imagePath,shape,path)

    if len(shape)==2:
        #2차원
        # Convert to float to avoid overflow or underflow losses.
        image_2d = ds.pixel_array.astype(float)

        # Rescaling grey scale between 0-255
        image_2d_scaled = (np.maximum(image_2d, 0) / image_2d.max()) * 255.0

        # Convert to uint
        image_2d_scaled = np.uint8(image_2d_scaled)

        #output_path = './'+input_name+'/'+ input_name + '.png'
        output_path = imagePath + "/1." + "png"
        with open(output_path, 'wb') as png_file:
            w = png.Writer(shape[1], shape[0], greyscale=True)
            w.write(png_file, image_2d_scaled)

    elif len(shape)==3:
        #3차원
        # Convert to float to avoid overflow or underflow losses.
        image_3d = ds.pixel_array.astype(float)
        for i in range(shape[0]):
            image_2d=image_3d[i]
            # Rescaling grey scale between 0-255
            image_2d_scaled = (np.maximum(image_2d, 0) / image_2d.max()) * 255.0

            # Convert to uint
            image_2d_scaled = np.uint8(image_2d_scaled)

            #output_path = './'+input_name+'/'+input_name +'_'+ str(i) + '.png'
            #output_path = './'+input_name+'/'+ str(i+1) + '.png'
            output_path = imagePath+'/'+ str(i+1) + '.png'
            with open(output_path, 'wb') as png_file:
                w = png.Writer(shape[2], shape[1], greyscale=True)
                w.write(png_file, image_2d_scaled)
    #return path+'./'+input_name+'.json'

def main(dicomPath, imagePath):

    #extract_img('0012')
    json_path=extract_img(dicomPath, imagePath)
    #print(string)
    # extract_img('0012')
    # extract_img('0015')
    # extract_img('0020')
    # extract_img('MRBRAIN')
    # extract_img('10001')
    return "json_path"

if __name__=='__main__':
    main(sys.argv[1],sys.argv[2])
