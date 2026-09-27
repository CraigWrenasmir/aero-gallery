import json,re
items=json.load(open('items.json'))
OVR={'029':'Under the Sea','031':'Green & Growing','060':'Green & Growing','061':'Green & Growing','013':'Green & Growing'}
ORDER=['Bubbles & Water','Under the Sea','Lagoons','Blue Skies','Green & Growing','Up High']
for it in items:
    it['cat']=OVR.get(it['id'],it['cat'])
    t=it['title']
    t=re.sub(r'\s*-\s*Flickr\s*-.*$','',t); t=re.sub(r'\s*\(\d{6,}\)','',t); t=re.sub(r'\s*\(Unsplash[^)]*\)','',t)
    t=re.sub(r'^(DZ6 \d+|\d{3}b|\d{4}-\d\d-\d\d)\s+','',t); t=re.sub(r'\s+-\s+(panoramio|geograph\.org\.uk).*$','',t)
    it['title']=t.strip()
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
