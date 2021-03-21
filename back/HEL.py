#DB
def getEmail(id):
    return id
def getPassword(pw):
    return pw
def getImg(img):
    # get image from DB
    return img
def getTxt(txt):
    # get txt from DB
    return txt
def getRmark(name):
    # name에 해당하는 소견서 저장 위치 반환
    return name+".txt"
def uploadRemark():
    return 1
def uploadTxt():
    return 1
def uploadImg():
    return 1
def getListFromDB(user):
    dic = {'환자A CT영상' : '73%','환자B X-ray영상' : '13%','환자C CT영상' : '100%'}
    return dic
def readFile(name):
    fname = getRmark(name)
    f = open(fname,'r')
    return f.read()
#logic
def uploadDicom():
    return 1