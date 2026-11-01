import cv2, numpy as np
def tele(img, rects, rad=7, grow=6):
    m=np.zeros(img.shape[:2],np.uint8)
    for x0,y0,x1,y1 in rects: m[y0:y1,x0:x1]=255
    m=cv2.dilate(m,np.ones((grow,grow),np.uint8))
    out=cv2.inpaint(img,m,rad,cv2.INPAINT_TELEA)
    soft=cv2.GaussianBlur(m,(0,0),3).astype(np.float32)[...,None]/255
    return (img*(1-soft)+out*soft).astype(np.uint8)

def estrela(img, roi, glow=9, side='both'):
    """Apaga uma estrela dourada sobre o céu: deteta-a pela cor e preenche cada linha por interpolação entre o céu à esquerda e à direita."""
    x0,y0,x1,y1=roi
    hsv=cv2.cvtColor(img[y0:y1,x0:x1],cv2.COLOR_BGR2HSV)
    m=((hsv[...,0]>=15)&(hsv[...,0]<=34)&(hsv[...,1]>=130)&(hsv[...,2]>=190)).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    if n<2: print('sem estrela em',roi); return img
    k=1+int(np.argmax(st[1:,cv2.CC_STAT_AREA])); bx,by,bw,bh,_=st[k]
    X0,Y0,X1,Y1=x0+bx-glow,y0+by-glow,x0+bx+bw+glow,y0+by+bh+3
    if side=='telea':
        mm=np.zeros(img.shape[:2],np.uint8); mm[Y0:Y1,X0:X1]=255
        tl=cv2.inpaint(img,mm,6,cv2.INPAINT_TELEA)
        soft=cv2.GaussianBlur(mm,(0,0),2).astype(np.float32)[...,None]/255
        return (img*(1-soft)+tl*soft).astype(np.uint8)
    out=img.copy().astype(np.float32); L=img.astype(np.float32)
    for y in range(Y0,Y1):
        b=L[y,X1+2:X1+8].mean(0); a=b if side=='right' else L[y,X0-8:X0-2].mean(0)
        t=np.linspace(0,1,X1-X0)[:,None]; out[y,X0:X1]=a*(1-t)+b*t
    # suaviza a zona preenchida e funde nas bordas
    mk=np.zeros(img.shape[:2],np.float32); mk[Y0:Y1,X0:X1]=1; mk=cv2.GaussianBlur(mk,(0,0),2.5)[...,None]
    bl=cv2.GaussianBlur(out,(0,0),1.5)
    return (L*(1-mk)+bl*mk).clip(0,255).astype(np.uint8)

def crop_save(img, win, name):
    x0,y0,x1,y1=win; c=img[y0:y1,x0:x1]
    assert abs((x1-x0)/(y1-y0)-16/9)<0.03,(name,(x1-x0)/(y1-y0))
    c=cv2.resize(c,(1280,720),interpolation=cv2.INTER_CUBIC if (x1-x0)<1280 else cv2.INTER_AREA)
    cv2.imwrite(name+'.png',c)
U='/mnt/user-data/uploads/'
# ── Mundo 1 ──
m1=cv2.imread(U+'Mundo_1.png')
m1=estrela(m1,(455,240,545,330),side='right'); m1=estrela(m1,(690,340,780,430),side='telea')
for r in [(1190,120,1285,215),(1525,495,1615,585)]: m1=estrela(m1,r)
for n,w in (('mundo1_n1e2',(210,225,1482,941)),('mundo1_n3e4',(400,225,1672,941)),('mundo1_n5',(600,225,1500,731))): crop_save(m1,w,n)
# ── Mundo 2 ──
m2=cv2.imread(U+'mundo_2_1.png')
for r in [(770,195,865,295),(1290,290,1390,390),(620,500,715,595),(1220,625,1320,715)]: m2=estrela(m2,r)
for n,w in (('mundo2_n6',(200,280,1375,941)),('mundo2_n7',(640,0,1672,581)),('mundo2_n8',(700,200,1672,747)),('mundo2_n9',(300,300,1400,919))): crop_save(m2,w,n)
# ── Mundo 3 ──
m3=cv2.imread(U+'mundo_3.png')
for r in [(850,15,945,115),(1180,105,1275,205),(355,285,445,385),(1360,610,1455,710)]: m3=estrela(m3,r)
for n,w in (('mundo3_n10e11',(210,300,1349,941)),('mundo3_n12e13',(700,0,1672,547)),('mundo3_n14e15',(440,310,1480,895))): crop_save(m3,w,n)
# ── Mundo 4 ──
m4=cv2.imread(U+'Mundo_4.png')
for r in [(795,60,890,160),(490,275,590,375),(645,515,740,610),(1295,590,1395,690)]: m4=estrela(m4,r)
for n,w in (('mundo4_n16e17',(210,300,1349,941)),('mundo4_n18e19',(700,0,1672,547)),('mundo4_n20',(440,330,1480,915))): crop_save(m4,w,n)
# ── Mundo secreto (sala secreta) ──
ms=cv2.imread(U+'Mundo_secreto.png')
crop_save(ms,(200,225,1472,941),'sala_secreta')
import glob
from PIL import Image
fs=sorted(glob.glob('mundo*.png'))
ims=[Image.open(f).resize((320,180)) for f in fs]
c=Image.new('RGB',(1280,180*4))
for k,i in enumerate(ims): c.paste(i,((k%4)*320,(k//4)*180))
c.save('bgs_sheet.png'); print(fs)
