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


def ceu(img, rect, strip, ylim=None, feather=6):
    """Cobre `rect` (letreiro) com o céu: para cada linha usa a cor mediana de uma faixa de céu limpa (`strip`=(x0,x1)).
    As linhas abaixo de `ylim` repetem a cor dessa linha. Mistura suave nas bordas."""
    x0,y0,x1,y1=rect; sx0,sx1=strip; L=img.astype(np.float32)
    prof=np.median(L[:,sx0:sx1],axis=1)            # cor do céu por linha
    prof=cv2.GaussianBlur(prof.reshape(-1,1,3),(1,0),sigmaX=0,sigmaY=6).reshape(-1,3)
    out=L.copy()
    for y in range(y0,y1):
        yy=y if ylim is None else min(y,ylim)
        out[y,x0:x1]=prof[yy]
    mk=np.zeros(img.shape[:2],np.float32); mk[y0:y1,x0:x1]=1; mk=cv2.GaussianBlur(mk,(0,0),feather)[...,None]
    rng=np.random.default_rng(3); ruido=rng.normal(0,1.2,L.shape).astype(np.float32)
    return (L*(1-mk)+(out+ruido)*mk).clip(0,255).astype(np.uint8)
def nuvem(img, cx, cy, w, h, alpha=0.92):
    """Nuvem suave (para disfarçar um corte)."""
    m=np.zeros(img.shape[:2],np.float32)
    rng=np.random.default_rng(7)
    for k in range(7):
        ox=int(rng.uniform(-w/2.6,w/2.6)); oy=int(rng.uniform(-h/4,h/4)); rw=int(w/2.4*rng.uniform(.6,1)); rh=int(h/2*rng.uniform(.6,1))
        cv2.ellipse(m,(cx+ox,cy+oy),(rw,rh),0,0,360,1.0,-1)
    m=cv2.GaussianBlur(m,(0,0),h/5)[...,None]*alpha
    cloud=np.array([252,250,246],np.float32)[None,None,:]
    return (img.astype(np.float32)*(1-m)+cloud*m).clip(0,255).astype(np.uint8)

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
m1=ceu(m1,(22,0,775,225),(782,802))
for n in ('mundo1_n1e2','mundo1_n3e4','mundo1_n5'): crop_save(m1,(0,0,1672,941),n)
# ── Mundo 2 ──
m2=cv2.imread(U+'mundo_2_1.png')
for r in [(770,195,865,295),(1290,290,1390,390),(620,500,715,595),(1220,625,1320,715)]: m2=estrela(m2,r)
m2=ceu(m2,(20,0,642,196),(645,652),ylim=174)
m2=ceu(m2,(108,190,594,284),(645,652),ylim=174)
m2=nuvem(m2,448,282,190,56)
for n in ('mundo2_n6','mundo2_n7','mundo2_n8','mundo2_n9'): crop_save(m2,(0,0,1672,941),n)
# ── Mundo 3 ──
m3=cv2.imread(U+'mundo_3.png')
for r in [(850,15,945,115),(1180,105,1275,205),(355,285,445,385),(1360,610,1455,710)]: m3=estrela(m3,r)
m3=ceu(m3,(20,0,682,198),(688,724))
m3=ceu(m3,(104,190,604,280),(688,724),ylim=196)
for n in ('mundo3_n10e11','mundo3_n12e13','mundo3_n14e15'): crop_save(m3,(0,0,1672,941),n)
# ── Mundo 4 ──
m4=cv2.imread(U+'Mundo_4.png')
for r in [(795,60,890,160),(490,275,590,375),(645,515,740,610),(1295,590,1395,690)]: m4=estrela(m4,r)
m4=ceu(m4,(26,26,700,210),(704,726))
m4=ceu(m4,(110,198,630,294),(704,726),ylim=200)
for n in ('mundo4_n16e17','mundo4_n18e19','mundo4_n20'): crop_save(m4,(0,0,1672,941),n)
# ── Mundo secreto (sala secreta) ──
ms=cv2.imread(U+'Mundo_secreto.png')
ms=ceu(ms,(26,12,700,196),(704,730))
crop_save(ms,(0,0,1672,941),'sala_secreta')
import glob
from PIL import Image
fs=sorted(glob.glob('mundo*.png'))
ims=[Image.open(f).resize((320,180)) for f in fs]
c=Image.new('RGB',(1280,180*4))
for k,i in enumerate(ims): c.paste(i,((k%4)*320,(k//4)*180))
c.save('bgs_sheet.png'); print(fs)
