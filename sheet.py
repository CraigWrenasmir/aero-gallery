import json,os
from PIL import Image,ImageDraw,ImageFont
c=json.load(open('cand.json'))
seen=set(json.load(open('seen.json'))) if os.path.exists('seen.json') else set()
keys=[k for k in c if k not in seen and os.path.exists(f'cand/{k}.jpg') and os.path.getsize(f'cand/{k}.jpg')>2000]
json.dump(keys,open('sheetkeys.json','w'))
W,H,cols=300,200,6; per=36
f=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',28)
for s in range(0,len(keys),per):
    im=Image.new('RGB',(W*cols,H*((min(per,len(keys)-s)+cols-1)//cols)),'white'); d=ImageDraw.Draw(im)
    for i,k in enumerate(keys[s:s+per]):
        try: t=Image.open(f'cand/{k}.jpg').convert('RGB')
        except: continue
        t.thumbnail((W-6,H-6)); x,y=(i%cols)*W,(i//cols)*H
        im.paste(t,(x+3,y+3)); d.rectangle([x+3,y+3,x+60,y+36],fill='black'); d.text((x+6,y+4),str(s+i),fill='yellow',font=f)
    im.save(f'sheet_{s//per}.jpg',quality=80)
print(len(keys))
