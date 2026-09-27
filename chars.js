/* Aero Gallery - original cute characters (buddies, messenger buddies, garden pets, robot pals)
   All drawn from scratch as SVG so the gallery can show endless variations. */

/* ---------- seeded random ---------- */
function seeded(seed){
  var a = seed >>> 0;
  return function(){
    a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickR(r, arr){ return arr[Math.floor(r() * arr.length)]; }
function shade(hex, amt){
  var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  if (amt > 0){ r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= 1 + amt; g *= 1 + amt; b *= 1 + amt; }
  return '#' + [r, g, b].map(function(v){ v = Math.round(Math.max(0, Math.min(255, v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('');
}
function mix(a, b, t){
  var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
  var c = [16, 8, 0].map(function(s){ var p = (x >> s) & 255, q = (y >> s) & 255; var v = Math.round(p + (q - p) * t); return (v < 16 ? '0' : '') + v.toString(16); });
  return '#' + c.join('');
}
function svgWrap(w, h, body, bg){
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' + (bg || '') + body + '</svg>';
}
function svgURI(svg){ return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }
function gloss(id, c){ // radial glossy fill
  return '<radialGradient id="' + id + '" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="' + shade(c, .55) + '"/><stop offset=".55" stop-color="' + c + '"/><stop offset="1" stop-color="' + shade(c, -.3) + '"/></radialGradient>';
}
var HL = '<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>';
function aeroBG(w, h, seed, hue){
  var r = seeded(seed * 7 + 3), dots = '';
  for (var i = 0; i < 9; i++){
    dots += '<circle cx="' + Math.round(r() * w) + '" cy="' + Math.round(r() * h) + '" r="' + Math.round(8 + r() * 30) + '" fill="#fff" opacity="' + (0.12 + r() * 0.2).toFixed(2) + '"/>';
  }
  return '<defs><linearGradient id="bgg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(' + hue + ',85%,62%)"/><stop offset=".6" stop-color="hsl(' + (hue + 15) + ',85%,78%)"/><stop offset="1" stop-color="hsl(' + (hue + 30) + ',80%,90%)"/></linearGradient>' +
    '<radialGradient id="bgs" cx="80%" cy="10%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
    '<rect width="' + w + '" height="' + h + '" fill="url(#bgg)"/><rect width="' + w + '" height="' + h + '" fill="url(#bgs)"/>' + dots +
    '<ellipse cx="' + w / 2 + '" cy="' + (h + 30) + '" rx="' + w * .75 + '" ry="70" fill="#7ad64a"/><ellipse cx="' + w / 2 + '" cy="' + (h + 30) + '" rx="' + w * .75 + '" ry="70" fill="url(#hl)" opacity=".35"/>';
}

/* =========================================================
   1. BUDDIES (friendly people, plaza style)
   ========================================================= */
var B_SKIN = ['#ffe0c4', '#f7cfa6', '#eab58a', '#d19a6a', '#a8704a', '#7a4c2e'];
var B_HAIR = ['#2b1a10', '#5a3418', '#8a5a2b', '#d9a441', '#f2d27a', '#b83a1e', '#3d3d45', '#e8e8ee', '#3b6fd6', '#e0569a'];
var B_SHIRT = ['#e63946', '#f4822a', '#ffd23f', '#9be15d', '#2fbf4a', '#2477e0', '#6ec8f5', '#ff8cc6', '#9b5de5', '#8b5a2b', '#f5f5f5', '#333a44'];
var B_EYEC = ['#3a2a1a', '#2b5fb8', '#2f8f4e', '#7a4a1e', '#555'];
var B_FACE = ['round', 'square', 'pointy'];
var B_HAIRSTYLE = ['short', 'spiky', 'swoop', 'bowl', 'bun', 'curly', 'long', 'bob', 'cap', 'none'];
var B_EYES = ['dot', 'big', 'happy', 'sleepy', 'star'];
var B_MOUTH = ['smile', 'grin', 'o', 'flat', 'cat'];
var B_BROWS = ['arc', 'flat', 'up'];
var B_NAMES = ['Kai', 'Mia', 'Leo', 'Zoe', 'Max', 'Ava', 'Sam', 'Ivy', 'Ben', 'Lulu', 'Ned', 'Pip', 'Rex', 'Tia', 'Jay', 'Bo', 'Remy', 'Nova', 'Ollie', 'Suki', 'Taro', 'Yuna', 'Finn', 'Gus'];

function randomBuddy(seed){
  var r = seeded(seed);
  return { seed: seed, skin: pickR(r, B_SKIN), hair: pickR(r, B_HAIR), shirt: pickR(r, B_SHIRT), eyec: pickR(r, B_EYEC),
    face: pickR(r, B_FACE), style: pickR(r, B_HAIRSTYLE), eyes: pickR(r, B_EYES), mouth: pickR(r, B_MOUTH), brows: pickR(r, B_BROWS),
    blush: r() < .45, glasses: r() < .18, name: pickR(r, B_NAMES) };
}
function buddySVG(p, withBG){
  var W = 200, H = 240, s = p.skin, sd = shade(s, -.18), hc = p.hair, sh = p.shirt;
  var d = '<defs>' + HL + gloss('sk', s) + gloss('sh', sh) + gloss('hr', hc) + '</defs>';
  var back = '', front = '', face = '';
  // back hair
  if (p.style === 'long') back = '<path d="M40,84 Q34,24 100,22 Q166,24 160,84 L168,176 Q142,184 128,162 L72,162 Q58,184 32,176Z" fill="url(#hr)"/>';
  if (p.style === 'bob') back = '<path d="M38,88 Q34,24 100,22 Q166,24 162,88 L164,132 Q150,142 138,128 L62,128 Q50,142 36,132Z" fill="url(#hr)"/>';
  // body
  var body = '<path d="M60,214 L140,214 L140,236 Q130,240 120,236 L120,226 L80,226 L80,236 Q70,240 60,236Z" fill="#4a5a78"/>' +
    '<path d="M56,168 Q30,182 36,206" stroke="' + sh + '" stroke-width="18" stroke-linecap="round" fill="none"/>' +
    '<path d="M144,168 Q170,182 164,206" stroke="' + sh + '" stroke-width="18" stroke-linecap="round" fill="none"/>' +
    '<circle cx="36" cy="208" r="10" fill="' + s + '"/><circle cx="164" cy="208" r="10" fill="' + s + '"/>' +
    '<rect x="90" y="138" width="20" height="22" fill="' + sd + '"/>' +
    '<path d="M64,152 Q54,152 52,172 L48,212 Q48,220 58,220 L142,220 Q152,220 152,212 L148,172 Q146,152 136,152Z" fill="url(#sh)"/>' +
    '<path d="M66,156 Q60,158 58,172 L142,172 Q140,158 134,156Z" fill="url(#hl)" opacity=".45"/>';
  // head
  var head;
  if (p.face === 'square') head = '<path d="M46,72 Q46,34 100,34 Q154,34 154,72 L154,112 Q154,150 100,150 Q46,150 46,112Z" fill="url(#sk)"/>';
  else if (p.face === 'pointy') head = '<path d="M46,82 Q46,34 100,34 Q154,34 154,82 Q154,124 100,152 Q46,124 46,82Z" fill="url(#sk)"/>';
  else head = '<ellipse cx="100" cy="92" rx="54" ry="58" fill="url(#sk)"/>';
  var ears = '<circle cx="46" cy="98" r="11" fill="' + sd + '"/><circle cx="154" cy="98" r="11" fill="' + sd + '"/>';
  // brows
  var by = 70, bw = 'stroke="' + shade(hc === '#e8e8ee' ? '#999999' : hc, -.1) + '" stroke-width="4.5" stroke-linecap="round" fill="none"';
  if (p.brows === 'flat') face += '<path d="M68,' + by + ' L88,' + by + '" ' + bw + '/><path d="M112,' + by + ' L132,' + by + '" ' + bw + '/>';
  else if (p.brows === 'up') face += '<path d="M68,' + (by + 3) + ' L88,' + (by - 3) + '" ' + bw + '/><path d="M112,' + (by - 3) + ' L132,' + (by + 3) + '" ' + bw + '/>';
  else face += '<path d="M68,' + (by + 2) + ' Q78,' + (by - 6) + ' 88,' + (by + 2) + '" ' + bw + '/><path d="M112,' + (by + 2) + ' Q122,' + (by - 6) + ' 132,' + (by + 2) + '" ' + bw + '/>';
  // eyes
  [78, 122].forEach(function(x){
    if (p.eyes === 'big') face += '<ellipse cx="' + x + '" cy="92" rx="11" ry="12" fill="#fff"/><circle cx="' + x + '" cy="93" r="7.5" fill="' + p.eyec + '"/><circle cx="' + x + '" cy="93" r="3.6" fill="#111"/><circle cx="' + (x - 3) + '" cy="89" r="2.4" fill="#fff"/>';
    else if (p.eyes === 'happy') face += '<path d="M' + (x - 9) + ',95 Q' + x + ',83 ' + (x + 9) + ',95" stroke="#2a1d14" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
    else if (p.eyes === 'sleepy') face += '<path d="M' + (x - 9) + ',92 Q' + x + ',99 ' + (x + 9) + ',92" stroke="#2a1d14" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
    else if (p.eyes === 'star') face += '<ellipse cx="' + x + '" cy="92" rx="9" ry="11" fill="#1d2640"/><circle cx="' + (x - 3) + '" cy="87" r="3.2" fill="#fff"/><circle cx="' + (x + 3) + '" cy="97" r="1.8" fill="#fff"/><ellipse cx="' + x + '" cy="98" rx="6" ry="3" fill="' + p.eyec + '" opacity=".7"/>';
    else face += '<ellipse cx="' + x + '" cy="92" rx="5.5" ry="7.5" fill="#1f1812"/><circle cx="' + (x - 1.8) + '" cy="89" r="1.9" fill="#fff"/>';
  });
  face += '<path d="M95,110 Q100,115 105,110" stroke="' + shade(s, -.35) + '" stroke-width="3" stroke-linecap="round" fill="none"/>';
  if (p.blush) face += '<ellipse cx="66" cy="112" rx="9" ry="5" fill="#ff7b9c" opacity=".45"/><ellipse cx="134" cy="112" rx="9" ry="5" fill="#ff7b9c" opacity=".45"/>';
  // mouth
  if (p.mouth === 'grin') face += '<path d="M84,122 Q100,144 116,122Z" fill="#b8324a"/><path d="M87,123 L113,123 L111,128 L89,128Z" fill="#fff"/>';
  else if (p.mouth === 'o') face += '<ellipse cx="100" cy="128" rx="7" ry="8" fill="#b8324a"/>';
  else if (p.mouth === 'flat') face += '<path d="M90,127 L110,127" stroke="#8a3a3a" stroke-width="4" stroke-linecap="round"/>';
  else if (p.mouth === 'cat') face += '<path d="M86,124 Q93,132 100,124 Q107,132 114,124" stroke="#8a3a3a" stroke-width="4" stroke-linecap="round" fill="none"/>';
  else face += '<path d="M86,123 Q100,138 114,123" stroke="#8a3a3a" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
  if (p.glasses) face += '<g fill="none" stroke="#223" stroke-width="3.5"><circle cx="78" cy="92" r="15"/><circle cx="122" cy="92" r="15"/><path d="M93,90 Q100,85 107,90"/></g><ellipse cx="72" cy="86" rx="5" ry="3" fill="#fff" opacity=".6"/><ellipse cx="116" cy="86" rx="5" ry="3" fill="#fff" opacity=".6"/>';
  // front hair
  var hf = 'fill="url(#hr)"';
  if (p.style === 'short' || p.style === 'long') front = '<path d="M44,80 Q40,22 100,20 Q160,22 156,80 Q150,56 128,52 Q110,62 92,50 Q70,58 50,62 Q46,70 44,80Z" ' + hf + '/>';
  else if (p.style === 'spiky') front = '<path d="M44,78 L38,44 L58,50 L58,20 L78,38 L92,10 L106,36 L126,14 L130,42 L152,28 L148,54 L162,62 L156,78 Q140,58 100,58 Q60,58 44,78Z" ' + hf + '/>';
  else if (p.style === 'swoop') front = '<path d="M44,84 Q36,22 100,20 Q168,20 158,86 Q152,60 138,56 Q100,72 58,48 Q48,62 44,84Z" ' + hf + '/>';
  else if (p.style === 'bowl' || p.style === 'bob') front = '<path d="M42,82 Q40,20 100,20 Q160,20 158,82 Q130,64 100,64 Q70,64 42,82Z" ' + hf + '/>';
  else if (p.style === 'bun') front = '<circle cx="100" cy="18" r="18" ' + hf + '/><path d="M44,78 Q40,24 100,22 Q160,24 156,78 Q140,58 100,56 Q60,58 44,78Z" ' + hf + '/>';
  else if (p.style === 'curly'){
    var cs = [[50,66,14],[54,46,15],[68,32,15],[86,24,15],[104,22,15],[122,26,15],[138,36,15],[150,52,14],[152,70,13],[70,52,12],[92,44,12],[114,44,12],[132,54,12]];
    front = cs.map(function(c){ return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" ' + hf + '/>'; }).join('');
  }
  else if (p.style === 'cap') front = '<path d="M44,72 Q44,18 100,18 Q156,18 156,72Z" fill="url(#sh)"/><path d="M40,66 Q100,54 160,66 Q164,78 150,80 Q100,68 50,80 Q36,78 40,66Z" fill="' + shade(sh, -.25) + '"/><circle cx="100" cy="20" r="5" fill="' + shade(sh, -.2) + '"/><path d="M60,36 Q80,24 100,24" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/>';
  var shine = '<ellipse cx="78" cy="52" rx="26" ry="11" fill="url(#hl)" opacity=".55"/>';
  var bg = withBG ? aeroBG(W, H, p.seed || 1, 185 + ((p.seed || 1) % 60)) : '';
  return svgWrap(W, H, d + back + body + ears + head + face + front + shine, bg);
}

/* =========================================================
   2. MESSENGER BUDDIES (glossy chat-list people)
   ========================================================= */
var M_PAIRS = [['#7ed957', '#2e9e2e'], ['#6ac8ff', '#1a6fd6'], ['#ffb347', '#e0621a'], ['#ff8fc8', '#d6307a'], ['#c7a0ff', '#6a3fd6'],
  ['#fff27a', '#e0b01a'], ['#ff7a7a', '#c62828'], ['#6ef0dc', '#138a8a'], ['#d8dde6', '#7c8594'], ['#a8ff60', '#1f9e8a'], ['#8fd3ff', '#8a3fd6'], ['#ffd1a8', '#e05a8a']];
var M_ACC = ['none', 'crown', 'party', 'headphones', 'bow', 'shades', 'flower', 'beanie', 'halo', 'antenna', 'cap', 'none'];
var M_STATUS = ['online', 'online', 'away', 'busy', 'online'];
var M_NAMES = ['Bubbles', 'Aqua', 'Sprout', 'Zippy', 'Pixel', 'Breeze', 'Jelly', 'Comet', 'Minty', 'Glim', 'Puddle', 'Sunny', 'Twinkle', 'Orbit', 'Splash', 'Bloop'];
function randomMsgr(seed){
  var r = seeded(seed * 31 + 5), pr = pickR(r, M_PAIRS);
  return { seed: seed, a: pr[0], b: pr[1], acc: pickR(r, M_ACC), status: pickR(r, M_STATUS), face: r() < .7, name: pickR(r, M_NAMES) };
}
function msgrSVG(p, withBG, mood){
  var W = 200, H = 220;
  var d = '<defs>' + HL + gloss('ha', p.a) + '<linearGradient id="bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + shade(p.b, .35) + '"/><stop offset=".6" stop-color="' + p.b + '"/><stop offset="1" stop-color="' + shade(p.b, -.3) + '"/></linearGradient>' +
    '<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6a8"/><stop offset="1" stop-color="#e0a21a"/></linearGradient></defs>';
  var body = '<path d="M38,206 Q32,124 100,116 Q168,124 162,206 Q100,220 38,206Z" fill="url(#bd)"/><path d="M50,160 Q56,128 100,124 Q144,128 150,160 Q100,146 50,160Z" fill="url(#hl)" opacity=".55"/>';
  var head = '<circle cx="100" cy="80" r="44" fill="url(#ha)"/><ellipse cx="90" cy="58" rx="26" ry="14" fill="url(#hl)" opacity=".9"/>';
  var face = '';
  if (p.face){
    if (mood === 'happy') face = '<path d="M80,84 Q87,74 94,84" stroke="#1d2a3a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M106,84 Q113,74 120,84" stroke="#1d2a3a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M86,96 Q100,112 114,96Z" fill="#c2334d"/>';
    else face = '<ellipse cx="87" cy="82" rx="5" ry="6.5" fill="#1d2a3a"/><ellipse cx="113" cy="82" rx="5" ry="6.5" fill="#1d2a3a"/><circle cx="85.5" cy="79.5" r="1.8" fill="#fff"/><circle cx="111.5" cy="79.5" r="1.8" fill="#fff"/><path d="M89,97 Q100,106 111,97" stroke="#1d2a3a" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="76" cy="94" rx="6" ry="3.5" fill="#ff6f91" opacity=".4"/><ellipse cx="124" cy="94" rx="6" ry="3.5" fill="#ff6f91" opacity=".4"/>';
  }
  var acc = '';
  switch (p.acc){
    case 'crown': acc = '<path d="M72,44 L76,18 L90,34 L100,10 L110,34 L124,18 L128,44Z" fill="url(#gold)" stroke="#c98a10" stroke-width="2"/><circle cx="100" cy="30" r="4" fill="#e63946"/><circle cx="84" cy="38" r="3" fill="#2477e0"/><circle cx="116" cy="38" r="3" fill="#2fbf4a"/>'; break;
    case 'party': acc = '<path d="M100,2 L80,44 L120,44Z" fill="#ff5fa2"/><path d="M92,19 L108,19 L111,26 L89,26Z M85,33 L115,33 L118,40 L82,40Z" fill="#ffe14d"/><circle cx="100" cy="4" r="6" fill="#5fd3ff"/>'; break;
    case 'headphones': acc = '<path d="M54,84 Q52,30 100,30 Q148,30 146,84" stroke="#2b3444" stroke-width="8" fill="none"/><rect x="44" y="70" width="18" height="30" rx="8" fill="' + p.b + '" stroke="#2b3444" stroke-width="3"/><rect x="138" y="70" width="18" height="30" rx="8" fill="' + p.b + '" stroke="#2b3444" stroke-width="3"/>'; break;
    case 'bow': acc = '<path d="M126,40 L108,28 L110,52Z M126,40 L144,28 L142,52Z" fill="#ff4f8b"/><circle cx="126" cy="40" r="6" fill="#ff8fb8"/>'; break;
    case 'shades': acc = '<path d="M70,74 L96,74 Q96,92 83,92 Q70,92 70,74Z M104,74 L130,74 Q130,92 117,92 Q104,92 104,74Z" fill="#141a26"/><path d="M96,77 L104,77" stroke="#141a26" stroke-width="3"/><path d="M74,78 L82,78" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M108,78 L116,78" stroke="#fff" stroke-width="2" opacity=".7"/>'; break;
    case 'flower': acc = [0, 72, 144, 216, 288].map(function(a){ var rad = a * Math.PI / 180; return '<circle cx="' + (130 + Math.cos(rad) * 9).toFixed(1) + '" cy="' + (46 + Math.sin(rad) * 9).toFixed(1) + '" r="7" fill="#fff"/>'; }).join('') + '<circle cx="130" cy="46" r="6" fill="#ffd23f"/>'; break;
    case 'beanie': acc = '<path d="M58,66 Q58,26 100,26 Q142,26 142,66Z" fill="' + shade(p.b, -.1) + '"/><rect x="54" y="58" width="92" height="14" rx="7" fill="' + shade(p.a, .3) + '"/><circle cx="100" cy="24" r="9" fill="' + shade(p.a, .5) + '"/>'; break;
    case 'halo': acc = '<ellipse cx="100" cy="26" rx="30" ry="8" fill="none" stroke="#ffe066" stroke-width="6"/>'; break;
    case 'antenna': acc = '<path d="M100,38 L100,12" stroke="#666" stroke-width="3"/><circle cx="100" cy="10" r="7" fill="#ff5f5f"/><circle cx="98" cy="8" r="2" fill="#fff"/>'; break;
    case 'cap': acc = '<path d="M58,62 Q58,30 100,30 Q142,30 142,62Z" fill="#e63946"/><path d="M56,60 Q100,50 144,60 L170,66 Q150,72 144,68 Q100,60 56,68Z" fill="#b8202c"/>'; break;
  }
  var sc = { online: '#3ecf3e', away: '#ffae1a', busy: '#ff3b3b', offline: '#9aa3ad' }[p.status] || '#3ecf3e';
  var st = '<circle cx="160" cy="190" r="15" fill="#fff"/><circle cx="160" cy="190" r="12" fill="' + sc + '"/><ellipse cx="157" cy="185" rx="6" ry="3.5" fill="#fff" opacity=".7"/>';
  var bg = withBG ? aeroBG(W, H, p.seed + 11, 170 + (p.seed % 70)) : '';
  return svgWrap(W, H, d + body + head + face + acc + st, bg);
}

/* =========================================================
   3. GARDEN PETS (floating-orb garden critters)
   ========================================================= */
var P_COLS = ['#8fd6ff', '#b4f28a', '#ffd36e', '#ffa3c8', '#c9a8ff', '#9ff0e0', '#ffb38a', '#e8eef5', '#7db8ff', '#ff8a8a', '#d6ff7a', '#a8e6ff'];
var P_TOP = ['drop', 'drop', 'curl', 'leaf', 'horns', 'ears'];
var P_EYES = ['big', 'big', 'happy', 'sparkle'];
var P_MARK = ['none', 'none', 'spots', 'tips', 'shiny'];
var P_NAMES = ['Mochi', 'Pudding', 'Dewdrop', 'Button', 'Pebble', 'Cloudy', 'Nibbles', 'Pip', 'Sprinkle', 'Tofu', 'Marble', 'Jellybean'];
function randomPet(seed){
  var r = seeded(seed * 13 + 9);
  return { seed: seed, col: pickR(r, P_COLS), top: pickR(r, P_TOP), eyes: pickR(r, P_EYES), mark: pickR(r, P_MARK), wing: pickR(r, ['#ffffff', '#ffd6ec', '#d6f0ff', '#fff4b0']), name: pickR(r, P_NAMES) };
}
function petSVG(p, withBG, opt){
  opt = opt || {};
  var W = 200, H = 220, c = p.col, cd = shade(c, -.28);
  var d = '<defs>' + HL + gloss('pb', c) + gloss('ball', opt.ballCol || '#ffe14d') + '</defs>';
  var s = '';
  // wings behind
  s += '<path d="M66,148 Q30,118 34,154 Q44,168 66,160Z" fill="' + p.wing + '" opacity=".95"/><path d="M134,148 Q170,118 166,154 Q156,168 134,160Z" fill="' + p.wing + '" opacity=".95"/>';
  // feet + body
  s += '<ellipse cx="80" cy="200" rx="15" ry="9" fill="' + cd + '"/><ellipse cx="120" cy="200" rx="15" ry="9" fill="' + cd + '"/>';
  s += '<ellipse cx="100" cy="164" rx="38" ry="34" fill="url(#pb)"/><ellipse cx="100" cy="172" rx="24" ry="20" fill="' + shade(c, .45) + '"/>';
  s += '<ellipse cx="64" cy="166" rx="10" ry="14" fill="' + shade(c, -.1) + '" transform="rotate(25 64 166)"/><ellipse cx="136" cy="166" rx="10" ry="14" fill="' + shade(c, -.1) + '" transform="rotate(-25 136 166)"/>';
  // head top feature
  if (p.top === 'drop') s += '<path d="M76,58 Q96,6 132,22 Q112,30 124,56Z" fill="url(#pb)"/>';
  if (p.top === 'horns') s += '<path d="M66,58 L60,26 L84,48Z M134,58 L140,26 L116,48Z" fill="' + shade(c, -.15) + '"/>';
  if (p.top === 'ears') s += '<ellipse cx="62" cy="54" rx="16" ry="22" fill="url(#pb)" transform="rotate(-25 62 54)"/><ellipse cx="138" cy="54" rx="16" ry="22" fill="url(#pb)" transform="rotate(25 138 54)"/><ellipse cx="62" cy="56" rx="8" ry="13" fill="#ffb6d0" transform="rotate(-25 62 56)"/><ellipse cx="138" cy="56" rx="8" ry="13" fill="#ffb6d0" transform="rotate(25 138 56)"/>';
  // head
  s += '<ellipse cx="100" cy="96" rx="62" ry="52" fill="url(#pb)"/>';
  if (p.mark === 'tips') s += '<path d="M44,86 Q46,50 76,46 Q60,70 44,86Z M156,86 Q154,50 124,46 Q140,70 156,86Z" fill="' + shade(c, -.25) + '" opacity=".7"/>';
  if (p.mark === 'spots') s += '<circle cx="62" cy="80" r="7" fill="' + cd + '" opacity=".5"/><circle cx="140" cy="74" r="5" fill="' + cd + '" opacity=".5"/><circle cx="132" cy="120" r="6" fill="' + cd + '" opacity=".4"/>';
  if (p.top === 'curl') s += '<path d="M100,46 Q98,20 116,20 Q128,22 124,34 Q118,42 110,34" stroke="' + cd + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
  if (p.top === 'leaf') s += '<path d="M100,46 L100,30" stroke="#3a9e2e" stroke-width="4"/><path d="M100,32 Q84,6 70,24 Q84,34 100,32Z M100,32 Q116,6 130,24 Q116,34 100,32Z" fill="#6ad04a"/>';
  s += '<ellipse cx="82" cy="66" rx="30" ry="14" fill="url(#hl)" opacity=".75"/>';
  // eyes
  var ey = 98;
  [78, 122].forEach(function(x){
    if (p.eyes === 'happy' || opt.happy) s += '<path d="M' + (x - 11) + ',' + (ey + 3) + ' Q' + x + ',' + (ey - 11) + ' ' + (x + 11) + ',' + (ey + 3) + '" stroke="#1b1b2a" stroke-width="5" stroke-linecap="round" fill="none"/>';
    else {
      s += '<ellipse cx="' + x + '" cy="' + ey + '" rx="10" ry="14" fill="#1b1b2a"/>';
      if (p.eyes === 'sparkle') s += '<ellipse cx="' + x + '" cy="' + (ey + 5) + '" rx="7" ry="6" fill="#4fa8ff" opacity=".8"/>';
      s += '<circle cx="' + (x - 3) + '" cy="' + (ey - 6) + '" r="4" fill="#fff"/><circle cx="' + (x + 4) + '" cy="' + (ey + 5) + '" r="2" fill="#fff"/>';
    }
  });
  s += '<ellipse cx="62" cy="116" rx="9" ry="5" fill="#ff7ca8" opacity=".5"/><ellipse cx="138" cy="116" rx="9" ry="5" fill="#ff7ca8" opacity=".5"/>';
  s += opt.happy ? '<path d="M90,118 Q100,132 110,118Z" fill="#d23a5a"/>' : '<path d="M91,118 Q95.5,124 100,118 Q104.5,124 109,118" stroke="#1b1b2a" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
  if (p.mark === 'shiny') s += '<path d="M150,50 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4Z" fill="#fff"/><path d="M40,130 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3Z" fill="#fff"/>';
  // floating ball
  if (!opt.noBall) s += '<circle cx="100" cy="22" r="12" fill="url(#ball)"/><ellipse cx="97" cy="16" rx="6" ry="3.5" fill="#fff" opacity=".85"/>';
  var bg = withBG ? aeroBG(W, H, p.seed + 23, 150 + (p.seed % 80)) : '';
  return svgWrap(W, H, d + s, bg);
}

/* =========================================================
   4. ROBOT PALS (glossy robot animals)
   ========================================================= */
var R_BODY = ['#f4f7fb', '#f4f7fb', '#cfd8e3', '#ffc2dc', '#a9dcff', '#2a2f3a', '#c8f5a0', '#fff1a8'];
var R_LED = ['#39d0ff', '#4dff88', '#ff5fb0', '#ffb33a', '#b27bff', '#ffffff'];
var R_KIND = ['dog', 'cat', 'bunny', 'bear', 'dog', 'antenna'];
var R_EYES = ['dots', 'happy', 'hearts', 'big', 'pixel'];
var R_NAMES = ['Beep', 'Bolt', 'Chip', 'Sparky', 'Gizmo', 'Widget', 'Byte', 'Zap', 'Rivet', 'Nano', 'Blinky', 'Servo'];
function randomRobot(seed){
  var r = seeded(seed * 17 + 1);
  return { seed: seed, body: pickR(r, R_BODY), led: pickR(r, R_LED), kind: pickR(r, R_KIND), eyes: pickR(r, R_EYES), name: pickR(r, R_NAMES) };
}
function robotSVG(p, withBG, opt){
  opt = opt || {};
  var W = 220, H = 200, b = p.body, dk = shade(b, -.3), L = p.led, eyes = opt.eyes || p.eyes;
  var d = '<defs>' + HL + gloss('rb', b) + '<radialGradient id="led" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="' + L + '"/><stop offset="1" stop-color="' + L + '" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="vis" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a52"/><stop offset="1" stop-color="#05080f"/></linearGradient></defs>';
  var s = '';
  // tail
  s += '<path d="M168,128 Q196,118 192,92" stroke="' + dk + '" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="192" cy="90" r="7" fill="' + L + '"/>';
  // legs
  [62, 88, 120, 146].forEach(function(x){ s += '<rect x="' + (x - 10) + '" y="150" width="20" height="36" rx="9" fill="' + dk + '"/><rect x="' + (x - 12) + '" y="176" width="24" height="14" rx="7" fill="' + shade(b, -.12) + '"/><circle cx="' + x + '" cy="156" r="7" fill="' + shade(b, -.45) + '"/>'; });
  // body
  s += '<rect x="44" y="110" width="132" height="56" rx="28" fill="url(#rb)"/><path d="M60,116 Q110,108 160,116 Q164,128 158,128 Q110,120 62,128 Q56,128 60,116Z" fill="url(#hl)" opacity=".7"/>';
  s += '<circle cx="110" cy="140" r="9" fill="url(#led)"/><circle cx="110" cy="140" r="4" fill="#fff"/>';
  // ears
  if (p.kind === 'dog') s += '<ellipse cx="58" cy="72" rx="13" ry="26" fill="' + dk + '" transform="rotate(20 58 72)"/><ellipse cx="162" cy="72" rx="13" ry="26" fill="' + dk + '" transform="rotate(-20 162 72)"/>';
  if (p.kind === 'cat') s += '<path d="M66,50 L70,14 L96,38Z M154,50 L150,14 L124,38Z" fill="url(#rb)"/><path d="M72,42 L74,24 L88,38Z M148,42 L146,24 L132,38Z" fill="' + L + '" opacity=".8"/>';
  if (p.kind === 'bunny') s += '<ellipse cx="86" cy="18" rx="11" ry="30" fill="url(#rb)" transform="rotate(-10 86 18)"/><ellipse cx="134" cy="18" rx="11" ry="30" fill="url(#rb)" transform="rotate(10 134 18)"/><ellipse cx="86" cy="20" rx="5" ry="20" fill="' + L + '" opacity=".7" transform="rotate(-10 86 20)"/><ellipse cx="134" cy="20" rx="5" ry="20" fill="' + L + '" opacity=".7" transform="rotate(10 134 20)"/>';
  if (p.kind === 'bear') s += '<circle cx="70" cy="40" r="16" fill="url(#rb)"/><circle cx="150" cy="40" r="16" fill="url(#rb)"/><circle cx="70" cy="40" r="7" fill="' + L + '" opacity=".6"/><circle cx="150" cy="40" r="7" fill="' + L + '" opacity=".6"/>';
  if (p.kind === 'antenna') s += '<path d="M110,34 L110,8" stroke="' + dk + '" stroke-width="4"/><circle cx="110" cy="8" r="8" fill="url(#led)"/><circle cx="110" cy="8" r="4" fill="' + L + '"/>';
  // head
  s += '<rect x="58" y="32" width="104" height="84" rx="38" fill="url(#rb)"/>';
  s += '<rect x="70" y="54" width="80" height="46" rx="22" fill="url(#vis)"/><path d="M78,58 Q110,52 142,58 Q144,64 138,64 Q110,60 82,64 Q76,64 78,58Z" fill="#fff" opacity=".25"/>';
  s += '<ellipse cx="94" cy="44" rx="28" ry="8" fill="url(#hl)" opacity=".8"/>';
  // LED eyes
  [92, 128].forEach(function(x){
    var y = 78;
    if (eyes === 'happy') s += '<path d="M' + (x - 9) + ',' + (y + 4) + ' Q' + x + ',' + (y - 8) + ' ' + (x + 9) + ',' + (y + 4) + '" stroke="' + L + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    else if (eyes === 'hearts') s += '<path d="M' + x + ',' + (y + 8) + ' L' + (x - 9) + ',' + (y - 1) + ' Q' + (x - 9) + ',' + (y - 8) + ' ' + (x - 4) + ',' + (y - 8) + ' Q' + x + ',' + (y - 8) + ' ' + x + ',' + (y - 3) + ' Q' + x + ',' + (y - 8) + ' ' + (x + 4) + ',' + (y - 8) + ' Q' + (x + 9) + ',' + (y - 8) + ' ' + (x + 9) + ',' + (y - 1) + 'Z" fill="' + L + '"/>';
    else if (eyes === 'big') s += '<ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="12" fill="' + L + '"/><circle cx="' + (x - 3) + '" cy="' + (y - 4) + '" r="3" fill="#fff"/>';
    else if (eyes === 'pixel') s += '<rect x="' + (x - 8) + '" y="' + (y - 8) + '" width="7" height="7" fill="' + L + '"/><rect x="' + (x + 1) + '" y="' + (y - 8) + '" width="7" height="7" fill="' + L + '"/><rect x="' + (x - 8) + '" y="' + (y + 1) + '" width="7" height="7" fill="' + L + '"/><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="7" height="7" fill="' + L + '"/>';
    else if (eyes === 'closed') s += '<path d="M' + (x - 9) + ',' + y + ' L' + (x + 9) + ',' + y + '" stroke="' + L + '" stroke-width="5" stroke-linecap="round"/>';
    else s += '<circle cx="' + x + '" cy="' + y + '" r="12" fill="url(#led)"/><circle cx="' + x + '" cy="' + y + '" r="6" fill="' + L + '"/>';
  });
  s += '<path d="M104,94 Q110,98 116,94" stroke="' + L + '" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>';
  var bg = withBG ? aeroBG(W, H, p.seed + 41, 190 + (p.seed % 50)) : '';
  return svgWrap(W, H, d + s, bg);
}

/* =========================================================
   Characters for the gallery grid
   ========================================================= */
var CHAR_KINDS = {
  buddy: { label: 'Buddy', make: function(s){ var p = randomBuddy(s); return { svg: buddySVG(p, true), name: p.name, w: 200, h: 240 }; } },
  msgr: { label: 'Messenger buddy', make: function(s){ var p = randomMsgr(s); return { svg: msgrSVG(p, true), name: p.name, w: 200, h: 220 }; } },
  pet: { label: 'Garden pet', make: function(s){ var p = randomPet(s); return { svg: petSVG(p, true), name: p.name, w: 200, h: 220 }; } },
  robot: { label: 'Robot pal', make: function(s){ var p = randomRobot(s); return { svg: robotSVG(p, true), name: p.name, w: 220, h: 200 }; } }
};
function charItem(kind, seed){
  var m = CHAR_KINDS[kind].make(seed);
  return { id: 'c-' + kind + '-' + seed, cat: 'Characters', w: m.w, h: m.h, src: svgURI(m.svg), title: m.name + ' the ' + CHAR_KINDS[kind].label.toLowerCase(), original: true };
}
function charSet(base){
  var out = [], kinds = ['buddy', 'msgr', 'pet', 'robot'];
  for (var i = 0; i < 48; i++) out.push(charItem(kinds[i % 4], base + i * 101));
  return out;
}
function charFromId(id){
  var m = /^c-(\w+)-(\d+)$/.exec(id);
  return m && CHAR_KINDS[m[1]] ? charItem(m[1], +m[2]) : null;
}

/* sprite cache: svg string -> Image */
var _spr = {};
function sprite(svg){
  if (_spr[svg]) return _spr[svg];
  var im = new Image(); im.src = svgURI(svg); _spr[svg] = im; return im;
}
function drawSprite(im, x, y, w, h){ if (im.complete && im.naturalWidth) cx.drawImage(im, x, y, w, h); }
function beeps(notes, type, vol){
  var a = ac(); if (!a) return; var t = a.currentTime;
  notes.forEach(function(f, i){
    var o = a.createOscillator(), g = a.createGain(); o.type = type || 'square'; o.frequency.value = f;
    g.gain.setValueAtTime(0, t + i * .08); g.gain.linearRampToValueAtTime(vol || .06, t + i * .08 + .01); g.gain.exponentialRampToValueAtTime(.001, t + i * .08 + .09);
    o.connect(g); g.connect(a.destination); o.start(t + i * .08); o.stop(t + i * .08 + .1);
  });
}
function bubbleText(x, y, text){
  cx.save(); cx.font = '800 20px Nunito,sans-serif';
  var w = cx.measureText(text).width + 28, h = 38, bx = x - w / 2, by = y - h;
  cx.fillStyle = 'rgba(255,255,255,.95)'; cx.strokeStyle = 'rgba(80,160,220,.8)'; cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(bx + 16, by); cx.lineTo(bx + w - 16, by); cx.quadraticCurveTo(bx + w, by, bx + w, by + 16); cx.lineTo(bx + w, by + h - 16); cx.quadraticCurveTo(bx + w, by + h, bx + w - 16, by + h);
  cx.lineTo(x + 8, by + h); cx.lineTo(x, by + h + 10); cx.lineTo(x - 8, by + h); cx.lineTo(bx + 16, by + h); cx.quadraticCurveTo(bx, by + h, bx, by + h - 16); cx.lineTo(bx, by + 16); cx.quadraticCurveTo(bx, by, bx + 16, by);
  cx.fill(); cx.stroke();
  cx.fillStyle = '#0a4a7a'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(text, x, by + h / 2 + 1);
  cx.restore();
}
function panel(html){
  var el = document.getElementById('toyPanel'); el.innerHTML = html || ''; el.style.display = html ? 'block' : 'none';
  document.getElementById('toyTitle').style.visibility = html ? 'hidden' : ''; return el;
}

var CHAR_TOYS = [
  { id: 'plaza', name: 'Buddy Plaza', desc: 'Make buddies and watch them hang out. Tap one to say hi!', ico: '🙂', bg: 'linear-gradient(160deg,#9fe8ff,#3fb0f0 55%,#2e9e3e)' },
  { id: 'messenger', name: 'Buddy Chat', desc: 'Chat with your glossy buddies. Send a nudge!', ico: '💬', bg: 'linear-gradient(160deg,#b8ff8a,#2fbf6a 50%,#1a7fd0)' },
  { id: 'garden', name: 'Pet Garden', desc: 'Hatch cute pets, feed them fruit, pet them.', ico: '🥚', bg: 'linear-gradient(160deg,#ffe0f0,#8fe06a 50%,#2aa0c0)' },
  { id: 'robots', name: 'Robot Pals', desc: 'Tap the robot pets to make them do tricks.', ico: '🤖', bg: 'linear-gradient(160deg,#e8f4ff,#8fc8f0 50%,#5a6fd6)' }
];

var CHAR_TOYIMPL = {

/* ---------- Buddy Plaza ---------- */
plaza: function(){
  var saved = store.get('aeroBuddies', []);
  var people = [];
  var PHR = ['Hi!', 'Hello!', 'Yay!', 'Wanna play?', 'Hi Henry!', 'Cool!', '♪ La la la', 'Nice day!', 'Wheee!', '☺', 'High five!'];
  function add(p){
    var a = Math.random() * 6.28;
    people.push({ p: p, img: sprite(buddySVG(p, false)), x: Math.cos(a) * .6, y: Math.sin(a) * .6, tx: 0, ty: 0, ph: Math.random() * 6, jump: 0, say: '', sayT: 0, wait: Math.random() * 2 });
    newTarget(people[people.length - 1]);
    if (people.length > 24) people.shift();
  }
  function newTarget(o){ var a = Math.random() * 6.28, r = Math.sqrt(Math.random()) * .85; o.tx = Math.cos(a) * r; o.ty = Math.sin(a) * r; }
  function scr(o){ // plaza coords -> screen
    var cxp = W / 2, cyp = H * .62, rx = Math.min(W * .46, H * .7), ry = rx * .38;
    var sc = .75 + (o.y + 1) * .25;
    var size = Math.min(W, H) * .2 * sc;
    return { x: cxp + o.x * rx, y: cyp + o.y * ry, s: size };
  }
  saved.forEach(add);
  for (var i = people.length; i < 9; i++) add(randomBuddy(Math.floor(Math.random() * 1e9)));
  onPtr(function(x, y){
    var hit = null;
    people.slice().sort(function(a, b){ return b.y - a.y; }).some(function(o){ var s = scr(o); if (x > s.x - s.s * .45 && x < s.x + s.s * .45 && y > s.y - s.s * 1.2 && y < s.y){ hit = o; return true; } return false; });
    if (hit){ hit.jump = 1; hit.say = PHR[Math.floor(Math.random() * PHR.length)]; hit.sayT = 2.2; beeps([660, 880, 990], 'sine', .1); }
  });
  var cur = randomBuddy(Math.floor(Math.random() * 1e9));
  function openMaker(){
    var rows = [['face', 'Face', B_FACE], ['style', 'Hair', B_HAIRSTYLE], ['hair', 'Hair colour', B_HAIR], ['eyes', 'Eyes', B_EYES], ['brows', 'Eyebrows', B_BROWS], ['mouth', 'Mouth', B_MOUTH], ['skin', 'Skin', B_SKIN], ['shirt', 'Shirt', B_SHIRT], ['eyec', 'Eye colour', B_EYEC]];
    var el = panel('<div class="mk"><img id="mkImg" alt="Your buddy"><div class="mkBtns">' +
      rows.map(function(r){ return '<button class="pill" data-k="' + r[0] + '">' + r[1] + '</button>'; }).join('') +
      '<button class="pill" data-k="blush">Cheeks</button><button class="pill" data-k="glasses">Glasses</button>' +
      '<button class="pill toys" data-k="rand">🎲 Random</button><button class="pill on" data-k="add">✔ Add to plaza</button><button class="pill" data-k="close">Close</button></div></div>');
    function upd(){ document.getElementById('mkImg').src = svgURI(buddySVG(cur, true)); }
    upd();
    el.onclick = function(e){
      var b = e.target.closest ? e.target.closest('button') : null; if (!b) return; var k = b.getAttribute('data-k');
      var row = rows.filter(function(r){ return r[0] === k; })[0];
      if (row){ var i = row[2].indexOf(cur[k]); cur[k] = row[2][(i + 1) % row[2].length]; }
      else if (k === 'blush' || k === 'glasses') cur[k] = !cur[k];
      else if (k === 'rand') cur = randomBuddy(Math.floor(Math.random() * 1e9));
      else if (k === 'add'){ cur.seed = Math.floor(Math.random() * 1e9); add(cur); saved.push(cur); if (saved.length > 16) saved.shift(); store.set('aeroBuddies', saved); beeps([523, 659, 784, 1047], 'sine', .1); cur = randomBuddy(Math.floor(Math.random() * 1e9)); panel(''); return; }
      else if (k === 'close'){ panel(''); return; }
      beeps([700], 'sine', .06); upd();
    };
  }
  addBtn('✏️ Make a buddy', openMaker);
  addBtn('+ Surprise buddy', function(){ add(randomBuddy(Math.floor(Math.random() * 1e9))); beeps([523, 784], 'sine', .08); });
  return {
    stop: function(){ panel(''); },
    frame: function(dt, t){
      skyBG('#1a86d8', '#6cc8f5', '#d8f6ff'); sunGlow(W * .8, H * .08, Math.max(W, H) * .5);
      // distant hills
      cx.fillStyle = '#8fdc6a'; cx.beginPath(); cx.moveTo(0, H * .5); cx.quadraticCurveTo(W * .25, H * .36, W * .5, H * .48); cx.quadraticCurveTo(W * .75, H * .38, W, H * .47); cx.lineTo(W, H); cx.lineTo(0, H); cx.fill();
      var g = cx.createLinearGradient(0, H * .48, 0, H); g.addColorStop(0, '#6ccf45'); g.addColorStop(1, '#2f9a2a'); cx.fillStyle = g; cx.fillRect(0, H * .5, W, H);
      // plaza disc
      var pcx = W / 2, pcy = H * .62, rx = Math.min(W * .46, H * .7), ry = rx * .38;
      cx.fillStyle = 'rgba(0,60,0,.18)'; cx.beginPath(); cx.ellipse(pcx, pcy + 10, rx + 8, ry + 8, 0, 0, 7); cx.fill();
      g = cx.createRadialGradient(pcx, pcy - ry * .4, 10, pcx, pcy, rx); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#d6e8f0');
      cx.fillStyle = g; cx.beginPath(); cx.ellipse(pcx, pcy, rx, ry, 0, 0, 7); cx.fill();
      cx.strokeStyle = 'rgba(120,190,230,.6)'; cx.lineWidth = 3; cx.beginPath(); cx.ellipse(pcx, pcy, rx * .6, ry * .6, 0, 0, 7); cx.stroke();
      // fountain
      cx.fillStyle = '#bfe8ff'; cx.beginPath(); cx.ellipse(pcx, pcy, rx * .16, ry * .16, 0, 0, 7); cx.fill();
      for (var k = 0; k < 6; k++){ var fy = pcy - 20 - ((t * 60 + k * 14) % 70); cx.fillStyle = 'rgba(160,225,255,' + (0.9 - ((t * 60 + k * 14) % 70) / 80) + ')'; cx.beginPath(); cx.arc(pcx + Math.sin(k * 2 + t) * 6, fy, 5, 0, 7); cx.fill(); }
      // people
      people.forEach(function(o){
        if (o.wait > 0) o.wait -= dt; else {
          var dx = o.tx - o.x, dy = o.ty - o.y, dd = Math.sqrt(dx * dx + dy * dy);
          if (dd < .02){ o.wait = 1 + Math.random() * 3; newTarget(o); } else { o.x += dx / dd * dt * .12; o.y += dy / dd * dt * .12; o.walk = true; }
        }
        o.jump = Math.max(0, o.jump - dt * 1.6); o.sayT -= dt;
      });
      people.slice().sort(function(a, b){ return a.y - b.y; }).forEach(function(o){
        var s = scr(o), bob = o.wait > 0 ? 0 : Math.abs(Math.sin(t * 8 + o.ph)) * s.s * .05, jy = Math.sin(o.jump * Math.PI) * s.s * .45;
        cx.fillStyle = 'rgba(0,40,60,.18)'; cx.beginPath(); cx.ellipse(s.x, s.y, s.s * .32, s.s * .08, 0, 0, 7); cx.fill();
        var w = s.s, h = s.s * 1.2;
        drawSprite(o.img, s.x - w / 2, s.y - h - bob - jy, w, h);
        if (o.sayT > 0) bubbleText(s.x, s.y - h - jy - 8, o.say);
      });
    }
  };
},

/* ---------- Buddy Chat (DOM) ---------- */
messenger: function(){
  cv.style.display = 'none';
  tv.style.background = 'radial-gradient(900px 600px at 50% 0%,#dff7ff,transparent 60%),linear-gradient(180deg,#5ec2f7,#2a86d8 60%,#3fb54a)';
  var buddies = [];
  for (var i = 0; i < 8; i++) buddies.push(randomMsgr(Math.floor(Math.random() * 1e9)));
  var used = {}; buddies.forEach(function(b){ var n = b.name, k = 2; while (used[b.name]) b.name = n + ' ' + (k++); used[b.name] = 1; });
  var STAT = { online: 'Online', away: 'Away', busy: 'Busy' };
  var MSGS = ['heyyy! :)', 'whats up?', 'I just found a shiny orb!!', 'wanna play Wii later?', 'lol', 'brb getting a snack', 'did you see the dolphins?', 'my fish is called Bubbles', 'I love blue skies', 'BRB my robot dog needs a walk', 'yay a nudge!', 'hehe', 'this is the best day', '♪ listening to music ♪'];
  var REPLY = { '😊': ['😊😊', 'hehe :)', 'smiley back at ya!'], '😂': ['LOL', 'hahaha', 'that is so funny'], '😎': ['so cool 😎', 'sunglasses buddies!'], '❤️': ['aww ❤️', 'best buddies!', '❤️❤️❤️'], '👋': ['hi hi!', '👋 hello!', 'hey there!'], '🐠': ['🐠 blub blub', 'fishy!', 'I love fish'], '🤖': ['beep boop 🤖', 'ROBOT MODE ON', '🤖🤖'], '🌈': ['rainbow!!', '🌈 so pretty', 'double rainbow'] };
  var el = panel('<div class="msn"><div class="win list"><div class="wt">Buddy List</div><div class="me"><img id="meImg" alt=""><div><b>Henry</b><span class="st on">● Online</span></div></div><div id="blist"></div></div>' +
    '<div class="win chat"><div class="wt" id="ct">Chat</div><div class="who"><img id="cImg" alt=""><div><b id="cName"></b><span id="cStat"></span></div></div><div id="clog"></div>' +
    '<div class="emos">' + Object.keys(REPLY).map(function(e){ return '<button class="emo" data-e="' + e + '">' + e + '</button>'; }).join('') + '<button class="emo nudge" data-e="nudge">Nudge!</button></div></div></div>');
  el.className = 'msnWrap';
  document.getElementById('meImg').src = svgURI(msgrSVG({ seed: 1, a: '#7ed957', b: '#1a6fd6', acc: 'headphones', status: 'online', face: true }, false));
  var cur = 0;
  document.getElementById('blist').innerHTML = buddies.map(function(b, i){
    return '<button class="brow" data-i="' + i + '"><img src="' + svgURI(msgrSVG(b, false)) + '" alt=""><span><b>' + b.name + '</b><i class="st ' + b.status + '">● ' + STAT[b.status] + '</i></span></button>';
  }).join('');
  function say(who, text, mine){
    var log = document.getElementById('clog'), d = document.createElement('div');
    d.className = 'msg' + (mine ? ' mine' : ''); d.innerHTML = '<b>' + who + ' says:</b> ' + text;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  function open(i){
    cur = i; var b = buddies[i];
    document.getElementById('cImg').src = svgURI(msgrSVG(b, false, 'happy'));
    document.getElementById('cName').textContent = b.name; document.getElementById('cStat').textContent = STAT[b.status];
    document.getElementById('cStat').className = 'st ' + b.status;
    document.getElementById('ct').textContent = b.name + ' - Conversation';
    document.getElementById('clog').innerHTML = '';
    [].forEach.call(document.querySelectorAll('.brow'), function(r){ r.classList.toggle('sel', +r.getAttribute('data-i') === i); });
    setTimeout(function(){ say(b.name, MSGS[Math.floor(Math.random() * MSGS.length)]); beeps([880, 1175], 'sine', .1); }, 500);
  }
  el.onclick = function(e){
    var t = e.target.closest ? e.target.closest('button') : null; if (!t) return;
    if (t.classList.contains('brow')){ open(+t.getAttribute('data-i')); return; }
    var em = t.getAttribute('data-e'); if (!em) return;
    var b = buddies[cur];
    if (em === 'nudge'){
      say('Henry', '<i>sent a nudge!</i>', true);
      var w = el.querySelector('.chat'); w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake');
      beeps([392, 392, 523, 392], 'square', .08);
      setTimeout(function(){ say(b.name, pickR(Math.random, ['whoa!! 😲', 'hey!! nudge back!', 'haha you nudged me', 'I felt that! 😂'])); beeps([880, 1175], 'sine', .1); }, 900);
      return;
    }
    say('Henry', em, true); beeps([1047], 'sine', .07);
    setTimeout(function(){ say(b.name, pickR(Math.random, REPLY[em])); beeps([880, 1175], 'sine', .1); }, 700 + Math.random() * 600);
  };
  open(0);
  return { stop: function(){ panel(''); el.className = ''; tv.style.background = ''; cv.style.display = ''; } };
},

/* ---------- Pet Garden ---------- */
garden: function(){
  var saved = store.get('aeroPets', null);
  var pets = [], fruits = [], eggs = [], hearts = [];
  var FRUIT = ['#ff4f6a', '#ffb13a', '#ffe14d', '#7ed957', '#5fb8ff', '#c77dff', '#ff8fc8'];
  var BALL = { calm: '#ffe14d', love: '#ff6fae', wow: '#6fe0ff', swim: '#8fd6ff' };
  function makePet(p){ return { p: p, img: sprite(petSVG(p, false, { noBall: true })), happy: sprite(petSVG(p, false, { noBall: true, happy: true })), x: .5, y: .5, tx: .5, ty: .5, ph: Math.random() * 6, jump: 0, mood: 'calm', moodT: 0, wait: 1, target: null, swim: 0, held: false }; }
  function addPet(p, x, y){ var o = makePet(p); o.x = x == null ? .3 + Math.random() * .4 : x; o.y = y == null ? .55 + Math.random() * .25 : y; o.tx = o.x; o.ty = o.y; pets.push(o); if (pets.length > 8) pets.shift(); save(); return o; }
  function save(){ store.set('aeroPets', pets.map(function(o){ return o.p; })); }
  function refresh(o){ o.img = sprite(petSVG(o.p, false, { noBall: true })); o.happy = sprite(petSVG(o.p, false, { noBall: true, happy: true })); }
  // layout helpers (normalised garden coords -> screen)
  function gx(x){ return x * W; } function gy(y){ return H * .42 + y * H * .5; }
  var pond = { x: .78, y: .72, rx: .16, ry: .09 };
  var tree = { x: .16, y: .38 };
  function inPond(x, y){ var dx = (x - pond.x) / pond.rx, dy = (y - pond.y) / pond.ry; return dx * dx + dy * dy < 1; }
  function size(){ return Math.min(W, H) * .17; }
  function growFruit(){ if (fruits.filter(function(f){ return !f.fall; }).length < 5){ var a = Math.random() * 6.28, r = Math.random(); fruits.push({ x: tree.x + Math.cos(a) * .09 * r, y: .1 + Math.sin(a) * .1 * r, c: FRUIT[Math.floor(Math.random() * FRUIT.length)], fall: false, vy: 0, gy: 0 }); } }
  for (var i = 0; i < 5; i++) growFruit();
  if (saved && saved.length) saved.forEach(function(p){ addPet(p); });
  else { addPet(randomPet(Math.floor(Math.random() * 1e9))); addPet(randomPet(Math.floor(Math.random() * 1e9))); }
  var drag = null;
  onPtr(function(x, y){
    var s = size();
    // fruit on tree
    for (var i = 0; i < fruits.length; i++){ var f = fruits[i]; if (!f.fall){ var fx = gx(f.x), fy = gy(f.y); if ((fx - x) * (fx - x) + (fy - y) * (fy - y) < 30 * 30){ f.fall = true; f.gy = .52 + Math.random() * .2; f.x = Math.max(.06, Math.min(.4, f.x + (Math.random() - .3) * .15)); beeps([784, 587], 'sine', .08); pets.forEach(function(o){ o.mood = 'wow'; o.moodT = 1.2; }); return; } } }
    // eggs
    for (var e = 0; e < eggs.length; e++){ var eg = eggs[e]; if (Math.abs(gx(eg.x) - x) < s * .4 && Math.abs(gy(eg.y) - s * .3 - y) < s * .45){ eg.taps++; eg.wob = 1; beeps([500 + eg.taps * 120], 'sine', .1); return; } }
    // pets (topmost first)
    var hit = null; pets.slice().sort(function(a, b){ return b.y - a.y; }).some(function(o){ var px = gx(o.x), py = gy(o.y); if (x > px - s * .45 && x < px + s * .45 && y > py - s * 1.05 && y < py){ hit = o; return true; } return false; });
    if (hit){ drag = { o: hit, sx: x, sy: y, moved: false }; }
  }, function(x, y){
    if (!drag) return;
    if (Math.abs(x - drag.sx) + Math.abs(y - drag.sy) > 12) drag.moved = true;
    if (drag.moved){ drag.o.held = true; drag.o.x = Math.max(.05, Math.min(.95, x / W)); drag.o.y = Math.max(0, Math.min(1, (y - H * .42 + size() * .5) / (H * .5))); drag.o.swim = 0; }
  }, function(){
    if (!drag) return; var o = drag.o;
    if (!drag.moved){ o.jump = 1; o.mood = 'love'; o.moodT = 2; for (var k = 0; k < 5; k++) hearts.push({ x: gx(o.x) + (Math.random() - .5) * 40, y: gy(o.y) - size(), l: 1, v: 40 + Math.random() * 40 }); bell(1046 + Math.random() * 400, .12); }
    else { o.held = false; o.tx = o.x; o.ty = o.y; if (inPond(o.x, o.y)){ o.swim = 6; o.mood = 'swim'; o.moodT = 6; blub(); } else beeps([523], 'sine', .06); }
    drag = null;
  });
  addBtn('🥚 Hatch an egg', function(){ if (eggs.length < 2) eggs.push({ x: .35 + Math.random() * .3, y: .35 + Math.random() * .3, taps: 0, wob: 0, t: 0 }); });
  addBtn('Start over', function(){ pets.length = 0; save(); addPet(randomPet(Math.floor(Math.random() * 1e9))); });
  $('#toyTitle').textContent = 'Tap fruit to drop it. Tap a pet to pet it. Drag a pet into the pond to swim. Tap eggs to hatch!';
  return {
    frame: function(dt, t){
      skyBG('#1a86d8', '#74cdf7', '#e0f8ff'); sunGlow(W * .85, H * .1, Math.max(W, H) * .5);
      // island
      var g = cx.createLinearGradient(0, H * .4, 0, H); g.addColorStop(0, '#8fe05a'); g.addColorStop(1, '#3aa02e');
      cx.fillStyle = g; cx.beginPath(); cx.moveTo(0, H * .46); cx.quadraticCurveTo(W * .3, H * .38, W * .6, H * .44); cx.quadraticCurveTo(W * .85, H * .49, W, H * .42); cx.lineTo(W, H); cx.lineTo(0, H); cx.fill();
      // flowers
      for (var f = 0; f < 14; f++){ var fx = ((f * 137) % 100) / 100 * W, fy = H * .5 + ((f * 71) % 45) / 100 * H; cx.fillStyle = ['#fff', '#ffd6ec', '#fff4a0'][f % 3]; for (var pp = 0; pp < 5; pp++){ cx.beginPath(); cx.arc(fx + Math.cos(pp * 1.26) * 5, fy + Math.sin(pp * 1.26) * 5, 4, 0, 7); cx.fill(); } cx.fillStyle = '#ffc93a'; cx.beginPath(); cx.arc(fx, fy, 3, 0, 7); cx.fill(); }
      // pond
      var px = gx(pond.x), py = gy(pond.y), prx = pond.rx * W, pry = pond.ry * H * .5;
      g = cx.createRadialGradient(px, py - pry * .5, 5, px, py, prx); g.addColorStop(0, '#bff0ff'); g.addColorStop(1, '#2a9ed8');
      cx.fillStyle = '#e8f4c8'; cx.beginPath(); cx.ellipse(px, py, prx + 8, pry + 6, 0, 0, 7); cx.fill();
      cx.fillStyle = g; cx.beginPath(); cx.ellipse(px, py, prx, pry, 0, 0, 7); cx.fill();
      cx.strokeStyle = 'rgba(255,255,255,.6)'; cx.lineWidth = 2; for (var rr = 0; rr < 2; rr++){ var ph = (t * .5 + rr * .5) % 1; cx.globalAlpha = 1 - ph; cx.beginPath(); cx.ellipse(px, py, prx * ph, pry * ph, 0, 0, 7); cx.stroke(); } cx.globalAlpha = 1;
      // tree
      var tx = gx(tree.x), ty = gy(tree.y + .12);
      cx.fillStyle = '#9a6a3a'; cx.fillRect(tx - 10, ty - H * .2, 20, H * .2);
      var cr = Math.min(W, H) * .13;
      [[0, -1.9, 1], [-.7, -1.6, .75], [.7, -1.6, .75], [0, -2.4, .7]].forEach(function(b){ g = cx.createRadialGradient(tx + b[0] * cr - cr * .3, ty + b[1] * cr - cr * .3, 5, tx + b[0] * cr, ty + b[1] * cr, cr * b[2]); g.addColorStop(0, '#b8ff7a'); g.addColorStop(1, '#2f9a2a'); cx.fillStyle = g; cx.beginPath(); cx.arc(tx + b[0] * cr, ty + b[1] * cr, cr * b[2], 0, 7); cx.fill(); });
      if (Math.random() < dt * .25) growFruit();
      // fruits
      fruits.forEach(function(fr){ if (fr.fall && fr.y < fr.gy){ fr.vy += dt * 2.5; fr.y = Math.min(fr.gy, fr.y + fr.vy * dt); } });
      fruits.forEach(function(fr){ var col = fr.c; cx.fillStyle = col; cx.beginPath(); cx.arc(gx(fr.x), gy(fr.y), 10, 0, 7); cx.fill(); cx.fillStyle = 'rgba(255,255,255,.8)'; cx.beginPath(); cx.ellipse(gx(fr.x) - 3, gy(fr.y) - 4, 4, 2.5, -.5, 0, 7); cx.fill(); cx.fillStyle = '#3a9e2e'; cx.fillRect(gx(fr.x) - 1, gy(fr.y) - 14, 2, 5); });
      // eggs
      for (var e = eggs.length - 1; e >= 0; e--){ var eg = eggs[e]; eg.t += dt; eg.wob = Math.max(0, eg.wob - dt * 2); var s = size() * .55, ex = gx(eg.x), ey = gy(eg.y);
        cx.save(); cx.translate(ex, ey); cx.rotate(Math.sin(eg.t * 20) * eg.wob * .3 + Math.sin(eg.t * 2) * .05);
        g = cx.createRadialGradient(-s * .15, -s * .6, 2, 0, -s * .4, s * .7); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#bfe6ff');
        cx.fillStyle = g; cx.beginPath(); cx.ellipse(0, -s * .45, s * .38, s * .5, 0, 0, 7); cx.fill();
        cx.fillStyle = '#7fd0ff'; for (var q = 0; q < 3; q++){ cx.beginPath(); cx.arc(-s * .15 + q * s * .15, -s * .45 + (q % 2) * s * .15, s * .06, 0, 7); cx.fill(); }
        if (eg.taps > 2){ cx.strokeStyle = '#555'; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(-s * .3, -s * .5); cx.lineTo(-s * .1, -s * .4); cx.lineTo(0, -s * .55); cx.lineTo(s * .15, -s * .42); cx.lineTo(s * .3, -s * .5); cx.stroke(); }
        cx.restore();
        if (eg.taps >= 5){ eggs.splice(e, 1); var np = addPet(randomPet(Math.floor(Math.random() * 1e9)), eg.x, eg.y); np.jump = 1; np.mood = 'love'; np.moodT = 3; beeps([523, 659, 784, 1047, 1319], 'sine', .12); for (var k = 0; k < 10; k++) hearts.push({ x: ex + (Math.random() - .5) * 60, y: ey - 40, l: 1, v: 50 + Math.random() * 50 }); }
      }
      // pets logic
      pets.forEach(function(o){
        o.jump = Math.max(0, o.jump - dt * 1.5); o.moodT -= dt; if (o.moodT <= 0) o.mood = 'calm';
        if (o.held) return;
        if (o.swim > 0){ o.swim -= dt; o.x += Math.sin(t * .8 + o.ph) * dt * .03; if (!inPond(o.x, o.y)){ o.x = pond.x; o.y = pond.y; } if (o.swim <= 0){ o.x = pond.x - pond.rx - .04; o.tx = o.x; o.ty = o.y; } return; }
        var free = fruits.filter(function(f){ return f.fall && f.y >= f.gy - .001; });
        if (free.length){ var best = free[0], bd = 9; free.forEach(function(f){ var d2 = Math.abs(f.x - o.x) + Math.abs(f.gy - o.y); if (d2 < bd){ bd = d2; best = f; } }); o.tx = best.x; o.ty = best.gy + .02; o.target = best; }
        var dx = o.tx - o.x, dy = o.ty - o.y, dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < .015){
          if (o.target && fruits.indexOf(o.target) >= 0 && Math.abs(o.target.x - o.x) < .05){ fruits.splice(fruits.indexOf(o.target), 1); o.p.col = mix(o.p.col, o.target.c, .35); refresh(o); save(); o.jump = 1; o.mood = 'love'; o.moodT = 1.5; beeps([659, 784, 988], 'sine', .1); }
          o.target = null; o.wait -= dt; if (o.wait <= 0){ o.wait = 1 + Math.random() * 3; o.tx = .1 + Math.random() * .8; o.ty = .2 + Math.random() * .75; if (inPond(o.tx, o.ty)) o.tx = .4; }
        } else { var sp = o.target ? .18 : .07; o.x += dx / dd * dt * sp; o.y += dy / dd * dt * sp; }
      });
      pets.slice().sort(function(a, b){ return a.y - b.y; }).forEach(function(o){
        var s = size(), px2 = gx(o.x), py2 = gy(o.y), jy = Math.sin(o.jump * Math.PI) * s * .5, bob = Math.abs(Math.sin(t * 6 + o.ph)) * s * .04;
        if (o.held){ jy = s * .15 + Math.sin(t * 10) * 3; }
        if (o.swim > 0){ bob = Math.sin(t * 3 + o.ph) * 4; cx.save(); cx.beginPath(); cx.rect(px2 - s, py2 - s * 2, s * 2, s * 1.55 + 2); cx.clip(); }
        else { cx.fillStyle = 'rgba(0,50,0,.2)'; cx.beginPath(); cx.ellipse(px2, py2, s * .32, s * .08, 0, 0, 7); cx.fill(); }
        drawSprite(o.mood === 'love' ? o.happy : o.img, px2 - s / 2, py2 - s * 1.1 - jy - bob, s, s * 1.1);
        if (o.swim > 0){ cx.restore(); cx.strokeStyle = 'rgba(255,255,255,.8)'; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(px2, py2 - s * .45, s * .4, s * .08, 0, 0, 7); cx.stroke(); }
        // floating emote ball
        var by = py2 - s * 1.2 - jy - bob + Math.sin(t * 3 + o.ph) * 3;
        if (o.mood === 'love'){ cx.fillStyle = '#ff5fa2'; cx.font = (s * .22) + 'px sans-serif'; cx.textAlign = 'center'; cx.fillText('♥', px2, by + s * .06); }
        else if (o.mood === 'wow'){ glossyBall(px2, by, s * .07, 190); cx.fillStyle = '#fff'; cx.font = '900 ' + (s * .12) + 'px Nunito,sans-serif'; cx.textAlign = 'center'; cx.fillText('!', px2, by + s * .045); }
        else glossyBall(px2, by, s * .065, o.mood === 'swim' ? 195 : 52);
      });
      for (var h = hearts.length - 1; h >= 0; h--){ var ht = hearts[h]; ht.y -= ht.v * dt; ht.l -= dt * .7; if (ht.l <= 0){ hearts.splice(h, 1); continue; } cx.globalAlpha = ht.l; cx.fillStyle = '#ff5fa2'; cx.font = '28px sans-serif'; cx.textAlign = 'center'; cx.fillText('♥', ht.x, ht.y); cx.globalAlpha = 1; }
    }
  };
},

/* ---------- Robot Pals ---------- */
robots: function(){
  var bots = [], party = false, beatT = 0, beatN = 0;
  function makeBots(){ bots = []; var n = W > 700 ? 3 : 2; for (var i = 0; i < n; i++){ var p = randomRobot(Math.floor(Math.random() * 1e9)); bots.push({ p: p, img: sprite(robotSVG(p, false)), alt: null, altT: 0, jump: 0, spin: 0, ph: Math.random() * 6 }); } }
  makeBots();
  var TRICKS = ['jump', 'spin', 'eyes', 'eyes', 'jump'];
  function place(i){ var n = bots.length, s = Math.min(W / (n + .4), H * .45); return { x: W * (i + .5) / n, y: H * .66, s: s }; }
  onPtr(function(x, y){
    bots.forEach(function(b, i){ var q = place(i); if (Math.abs(x - q.x) < q.s * .5 && y > q.y - q.s * .95 && y < q.y + q.s * .1){
      var tr = TRICKS[Math.floor(Math.random() * TRICKS.length)];
      if (tr === 'jump'){ b.jump = 1; beeps([523, 784, 1047], 'square', .06); }
      else if (tr === 'spin'){ b.spin = 1; beeps([1047, 880, 660, 523], 'square', .06); }
      b.alt = sprite(robotSVG(b.p, false, { eyes: pickR(Math.random, ['hearts', 'happy', 'big', 'pixel', 'closed']) })); b.altT = 1.6;
      if (tr === 'eyes') beeps([880, 1320, 880, 1320], 'triangle', .07);
    } });
  });
  addBtn('🎶 Dance party!', function(btn){ party = !party; btn.classList.toggle('on', party); ac(); });
  addBtn('New robots', function(){ makeBots(); beeps([392, 523, 659], 'square', .05); });
  function drum(t0){
    var a = ac(); if (!a) return; var t = a.currentTime;
    var o = a.createOscillator(), g = a.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + .12);
    g.gain.setValueAtTime(.35, t); g.gain.exponentialRampToValueAtTime(.001, t + .15); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + .16);
  }
  var MEL = [523, 659, 784, 659, 587, 740, 880, 740];
  return {
    stop: function(){ party = false; },
    frame: function(dt, t){
      // glossy room
      var g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#e9f6ff'); g.addColorStop(.62, '#a9d8f5'); g.addColorStop(.62, '#ffffff'); g.addColorStop(1, '#cfe6f5');
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      if (party){
        beatT += dt; if (beatT > .42){ beatT = 0; beatN++; drum(); beeps([MEL[beatN % 8]], 'triangle', .05); }
        for (var i = 0; i < 6; i++){ cx.save(); cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = .18; cx.fillStyle = 'hsl(' + ((t * 60 + i * 60) % 360) + ',100%,60%)'; cx.beginPath(); cx.moveTo(W * (i + .5) / 6, 0); cx.lineTo(W * (i + .5) / 6 + Math.sin(t * 2 + i) * W * .3 - 60, H * .62); cx.lineTo(W * (i + .5) / 6 + Math.sin(t * 2 + i) * W * .3 + 60, H * .62); cx.fill(); cx.restore(); }
      }
      cx.fillStyle = 'rgba(255,255,255,.5)'; for (var k = 0; k < 8; k++){ cx.beginPath(); cx.arc(((k * 173 + t * 10) % (W + 100)) - 50, H * (.1 + (k % 4) * .1), 20 + (k % 3) * 14, 0, 7); cx.fill(); }
      bots.forEach(function(b, i){
        var q = place(i), s = q.s, w = s, h = s * 200 / 220;
        b.jump = Math.max(0, b.jump - dt * 1.4); b.spin = Math.max(0, b.spin - dt * 1.2); b.altT -= dt;
        var jy = Math.sin(b.jump * Math.PI) * s * .45, dance = party ? Math.abs(Math.sin(t * Math.PI / .42)) * s * .08 : Math.sin(t * 2 + b.ph) * 3;
        var sx = b.spin > 0 ? Math.cos(b.spin * Math.PI * 4) : 1, tilt = party ? Math.sin(t * Math.PI / .42 + i) * .08 : 0;
        var im = b.altT > 0 && b.alt ? b.alt : b.img;
        // reflection
        cx.save(); cx.translate(q.x, q.y + 4); cx.scale(sx, -1); cx.globalAlpha = .18; drawSprite(im, -w / 2, -h - 4 + jy, w, h); cx.restore();
        cx.fillStyle = 'rgba(0,40,80,.15)'; cx.beginPath(); cx.ellipse(q.x, q.y, w * .38 * (1 - jy / s * .6), s * .05, 0, 0, 7); cx.fill();
        cx.save(); cx.translate(q.x, q.y - jy - dance); cx.rotate(tilt); cx.scale(sx || .01, 1); drawSprite(im, -w / 2, -h, w, h); cx.restore();
        cx.font = '900 18px Nunito,sans-serif'; cx.textAlign = 'center'; cx.fillStyle = '#2a6aa0'; cx.fillText(b.p.name, q.x, q.y + s * .2);
      });
    }
  };
}
};
