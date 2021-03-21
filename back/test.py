import work
from PIL import Image

# work.editRmark("test","test\nbbbbbb")

# print(work.readRmark('test'))

# dic = work.showWorkList('user')
# print(dic)
# for i in dic:
#     print(i,dic[i])


 
# 이미지 열기
im = Image.open('UI.png')
 
# 이미지 크기 출력
print(im.size)