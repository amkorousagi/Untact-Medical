# 받은작업
import HEL
import os
def continueWork():
    return 0
def newWork():
    return 1
def getWork():
    #get work from DB
    return 1

def compareWork():
    return 1
def saveWork():
    return 1

def showWorkList(user):
    #[작업이름][작업 진행율%]
    dic = HEL.getListFromDB(user)
    return dic

def readRmark(name):
    return HEL.readFile(name)

def editRmark(name,str):
    fname = HEL.getRmark(name)
    if os.path.exists(fname):
        os.remove(fname)
    
    f = open(fname,'w')
    f.write(str)
    f.close()
    return 1