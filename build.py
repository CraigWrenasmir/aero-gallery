import json,re
items=json.load(open('items.json'))
OVR={'029':'Under the Sea','031':'Green & Growing','060':'Green & Growing','061':'Green & Growing','013':'Green & Growing'}
ORDER=['Robot Pets','Bubbles & Water','Under the Sea','Gadgets','Lagoons','Blue Skies','Green & Growing','Up High']
TITLES={'100':'Sony Aibo robot dog','107':'Tamagotchi','110':'Tamagotchi','114':'Wii Remote and Nunchuk','115':'Nintendo Wii','116':'Red Wii Mini','117':'Wii Remote and Classic Controller','118':'Wii Remotes','119':'Wii Remote','123':'Colourful iMac G3 computers','124':'Zune music players','126':'iDog robot dogs','127':'Wind-up tin robot','128':'Zoomer robot dog','131':'Game Boy Advance SP (blue)','132':'Game Boy Advance SP (pink)','133':'Game Boy Advance (milky blue)','134':'Silver PSP','135':'PSP Go'}
for it in items:
    it['cat']=OVR.get(it['id'],it['cat'])
    t=it['title']
    t=re.sub(r'\s*-\s*Flickr\s*-.*$','',t); t=re.sub(r'\s*\(\d{6,}\)','',t); t=re.sub(r'\s*\(Unsplash[^)]*\)','',t)
    t=re.sub(r'^(DZ6 \d+|\d{3}b|\d{4}-\d\d-\d\d)\s+','',t); t=re.sub(r'\s+-\s+(panoramio|geograph\.org\.uk).*$','',t)
    it['title']=TITLES.get(it['id'],t.strip())
    it['artist']=re.sub(r'\s+',' ',it['artist'])
# interleave categories for a varied "All" view
by={c:[i for i in items if i['cat']==c] for c in ORDER}
mixed=[]
while any(by.values()):
    for c in ORDER:
        if by[c]: mixed.append(by[c].pop(0))
s=open('src.html').read()
s=s.replace('/*ITEMS*/[]',json.dumps(mixed,ensure_ascii=False)).replace('/*RIPPLE*/[]',json.dumps(['024','038','070','089']))
open('index.html','w').write(s); print(len(mixed))
