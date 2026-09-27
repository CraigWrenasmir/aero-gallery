import json, urllib.request, urllib.parse, os, re, sys, time
UA={'User-Agent':'FrutigerAeroGallery/1.0 (https://github.com/CraigWrenasmir; craig)'}
def api(params):
    params.update(format='json')
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)
    return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA)))
queries=sys.argv[1:]
out=json.load(open('cand.json')) if os.path.exists('cand.json') else {}
for q in queries:
    r=api(dict(action='query',generator='search',gsrsearch='filetype:bitmap '+q,gsrnamespace=6,gsrlimit=12,
        prop='imageinfo',iiprop='url|extmetadata|size',iiurlwidth=1600))
    for p in (r.get('query',{}).get('pages',{}) or {}).values():
        ii=p['imageinfo'][0]; m=ii.get('extmetadata',{})
        if ii['width']<1400: continue
        lic=m.get('LicenseShortName',{}).get('value','')
        artist=re.sub('<[^>]+>','',m.get('Artist',{}).get('value','')).strip()
        key=re.sub(r'[^A-Za-z0-9]+','_',p['title'][5:])[:60]
        if key in out: continue
        out[key]=dict(title=p['title'],thumb=ii['thumburl'],page=ii['descriptionurl'],license=lic,artist=artist,q=q)
    time.sleep(1.5)
json.dump(out,open('cand.json','w'),indent=1)
print(len(out))
