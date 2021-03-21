import numpy as np
import png
import pydicom
import os
import sys

def Write_data(ds,name,shape,path):

    element_list=[['StudyData',(0x0008,0x0020)],['Modality',(0x0008, 0x0060)],['StudyDescription',(0x0008, 0x1030)],\
                  ['PatientName',(0x0010, 0x0010)],['PatientID',(0x0010, 0x0020)],['PatientBirthDate',(0x0010, 0x0030)],\
                  ['PatientSex',(0x0010, 0x0040)]]
    element_list2=[['PatientAge',(0x0010, 0x1010)], ['ReferringPhysicianName',(0x0008, 0x0090)]]

    f = open(path + '/' + name + '.txt', 'w')

    print('\n'+name)

    for i in range(len(element_list)):
        data = '%-30s' % element_list[i][0]
        if (element_list[i][0] in ds) and (ds[element_list[i][1][0], element_list[i][1][1]].value != ''):
            data += str(ds[element_list[i][1][0], element_list[i][1][1]].value) +'\n'
        else:
            data += 'No data\n'
        print(data)
        f.write(data)

    print('--------------------------------------\n')
    f.write('--------------------------------------\n')

    for i in range(len(element_list2)):
        data = '%-30s' % element_list2[i][0]
        if (element_list2[i][0] in ds) and (ds[element_list2[i][1][0], element_list2[i][1][1]].value != '') :
            data += str(ds[element_list2[i][1][0], element_list2[i][1][1]].value)+'\n'
        else:
            data += 'No data\n'
        print(data)
        f.write(data)
    data = '%-30s' % 'Number of Img' + str(1 if len(shape) == 2 else shape[0])
    print(data)
    f.write(data)

    f.close()

def extract_img(input_name):
    input_path='./images/'+input_name
    ds = pydicom.dcmread(input_path)
    #print(ds)

    #make directory
    path = './' + input_name
    if not os.path.isdir(path):
        os.mkdir(path)

    shape = ds.pixel_array.shape

    #Write data txt
    Write_data(ds, input_name,shape,path)


    if len(shape)==2:
        #2차원
        # Convert to float to avoid overflow or underflow losses.
        image_2d = ds.pixel_array.astype(float)

        # Rescaling grey scale between 0-255
        image_2d_scaled = (np.maximum(image_2d, 0) / image_2d.max()) * 255.0

        # Convert to uint
        image_2d_scaled = np.uint8(image_2d_scaled)

        output_path = './'+input_name+'/'+ input_name + '.png'
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

            output_path = './'+input_name+'/'+input_name +'_'+ str(i) + '.png'
            with open(output_path, 'wb') as png_file:
                w = png.Writer(shape[2], shape[1], greyscale=True)
                w.write(png_file, image_2d_scaled)

def main(string):

    #extract_img('0012')
    extract_img(string)
    print(string)
    # extract_img('0012')
    # extract_img('0015')
    # extract_img('0020')
    # extract_img('MRBRAIN')
    # extract_img('10001')

if __name__=='__main__':
    main(sys.argv[1])
