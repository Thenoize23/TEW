/* Mix Check: loudness, dynamics, peak, mono and spectral balance of a bounce,
   measured against a subgenre, entirely inside the browser. The audio is never
   uploaded.

   Shared by /analyze/ and the landing page. The host page provides the markup
   (ids: genre, st-mix, st-master, drop, file, bar, status, err, input-card,
   results, v-title, v-text, metrics, bands, n-name, n-desc, lock-line, n-cta,
   again) and, optionally, an element #mixcheck-root with:
     data-app        where the app lives        (default ../app/)
     data-packs      steps-packs.js to lazy-load (default ../app/steps-packs.js)
     data-page       sent with the GA4 events    (default analyze)
     data-keep-input "1" keeps the drop zone visible after a run
   Language comes from <html lang>, which the host page keeps up to date. */
(function(){
'use strict';

/* ══════════════════════════════════════════════════════════════
   SUBGENRE REFERENCE TARGETS
   Typical ranges, not laws.
     lufs / plr : [min, max]
     low        : how much louder the sub+bass region sits compared to the
                  400 Hz - 2 kHz band, in dB. This is the number that says
                  "this record has weight" and it survives level changes.
   ══════════════════════════════════════════════════════════════ */
var REF = {
  'trap':              {lufs:[-8,-5],  plr:[6,10], low:[8,17]},
  'latin-trap':        {lufs:[-8,-5],  plr:[6,10], low:[8,17]},
  'drill':             {lufs:[-8,-5],  plr:[6,10], low:[8,17]},
  'phonk':             {lufs:[-8,-5],  plr:[5,9],  low:[9,18]},
  'reggaeton':         {lufs:[-8,-5],  plr:[6,10], low:[7,16]},
  'dembow':            {lufs:[-8,-5],  plr:[6,10], low:[7,16]},
  'perreo':            {lufs:[-8,-5],  plr:[6,10], low:[7,16]},
  'boom-bap':          {lufs:[-11,-8], plr:[8,12], low:[4,13]},
  'lo-fi-hip-hop':     {lufs:[-14,-10],plr:[9,14], low:[2,11]},
  'progressive-house': {lufs:[-9,-6],  plr:[6,10], low:[6,14]},
  'tech-house':        {lufs:[-9,-6],  plr:[6,10], low:[7,15]},
  'deep-house':        {lufs:[-10,-7], plr:[7,11], low:[6,14]},
  'techno':            {lufs:[-9,-6],  plr:[6,10], low:[7,16]},
  'melodic-techno':    {lufs:[-10,-7], plr:[7,11], low:[6,14]},
  'drum-and-bass':     {lufs:[-8,-5],  plr:[5,9],  low:[8,17]},
  'dubstep':           {lufs:[-8,-5],  plr:[5,9],  low:[9,18]},
  'future-bass':       {lufs:[-9,-6],  plr:[6,10], low:[5,13]},
  'trance':            {lufs:[-9,-6],  plr:[6,10], low:[4,12]},
  'hardstyle':         {lufs:[-7,-4],  plr:[4,8],  low:[6,14]}
};
var GENRE_LABEL = {
  'reggaeton':'Reggaeton','dembow':'Dembow','perreo':'Perreo','latin-trap':'Latin Trap',
  'trap':'Trap','drill':'Drill','boom-bap':'Boom Bap','lo-fi-hip-hop':'Lo-fi Hip Hop','phonk':'Phonk',
  'progressive-house':'Progressive House','tech-house':'Tech House','deep-house':'Deep House',
  'techno':'Techno','melodic-techno':'Melodic Techno','drum-and-bass':'Drum & Bass',
  'dubstep':'Dubstep','future-bass':'Future Bass','trance':'Trance','hardstyle':'Hardstyle'
};
var URBAN = ['reggaeton','dembow','perreo','latin-trap','trap','drill','boom-bap','lo-fi-hip-hop','phonk'];
var ELECTRONIC = ['progressive-house','tech-house','deep-house','techno','melodic-techno',
                  'drum-and-bass','dubstep','future-bass','trance','hardstyle'];

/* A mix (pre-master) is judged on its own terms: quieter, more dynamic,
   headroom left for the master. Spectral balance stays the same. */
var MIX_LUFS = [-20,-12], MIX_PLR = [11,20];

/* ── i18n ───────────────────────────────────────────────────── */
var T = {
  en:{
    reading:'Reading file...', decoding:'Decoding audio...', measuring:'Measuring loudness...',
    spectrum:'Analysing spectrum...', done:'Done',
    errDecode:'Could not decode that file. Try a WAV or MP3 export.',
    errBig:'That file is over 100 MB. Bounce a shorter section or use MP3.',
    errNone:'No audio in that file.',
    loudness:'Loudness', dynamics:'Dynamics', peak:'Peak', mono:'Mono compatibility',
    target:'Target', yours:'yours',
    sub:'Sub', bass:'Bass', lowmid:'Low mids', mid:'Mids', himid:'High mids', air:'Air',
    quiet:'This is quieter than the subgenre sits. On a playlist next to other tracks it will feel small.',
    loud:'This is louder than the subgenre sits. Check whether the limiter is eating your transients.',
    okLoud:'Loudness is where this subgenre lives.',
    squashed:'Almost no dynamic range left. This is the sound of a limiter working too hard: the drums stop hitting.',
    dyn:'Plenty of range. If it feels weak next to references, that is level, not compression.',
    okDyn:'Dynamic range is in the normal band for this subgenre.',
    clip:'Peaks are over the line. This will clip on some systems and on lossy encoding.',
    okPeak:'Peak level is safe.',
    headroom:'Leave the peaks near -6 dBFS in a mix. You are giving mastering nothing to work with.',
    monoBad:'Your low end collapses in mono. On a phone, a club sub or a Bluetooth speaker this loses power.',
    monoWarn:'Some phase cancellation in the low end. Worth checking the sub in mono.',
    monoOk:'Holds up in mono.',
    lowThin:'The low end is thinner than the subgenre. The track will not feel like it belongs.',
    lowFat:'More low end energy than the subgenre carries. It will sound muddy on small speakers.',
    vGood:'Nothing here is broken.', vFix:'One thing is holding this back.', vFixN:'%n things are holding this back.',
    vGoodT:'This reads like a finished %s %s. The numbers sit inside the range for the subgenre.',
    vFixT:'Everything else reads fine for %s. This is the one that will be heard.',
    vFixTn:'Start with this one — it is the one that will be heard first.',
    nextGeneric:'Bus compression', nextGenericD:'Glue the mix together before you touch the master chain.',
    lockPack:'The full step — and the other %n in your %s pack — live inside the app. Free account, no card.',
    lockPlain:'The full step lives inside the app. Free account, no card.',
    dbNote:'Each band, in dB against the 400 Hz - 2 kHz body of the track.'
  },
  es:{
    reading:'Leyendo archivo...', decoding:'Decodificando audio...', measuring:'Midiendo volumen...',
    spectrum:'Analizando espectro...', done:'Listo',
    errDecode:'No se pudo decodificar ese archivo. Prueba con un WAV o MP3.',
    errBig:'Ese archivo pasa de 100 MB. Exporta un tramo más corto o usa MP3.',
    errNone:'No hay audio en ese archivo.',
    loudness:'Volumen', dynamics:'Dinámica', peak:'Pico', mono:'Compatibilidad mono',
    target:'Objetivo', yours:'el tuyo',
    sub:'Sub', bass:'Graves', lowmid:'Medios bajos', mid:'Medios', himid:'Medios altos', air:'Aire',
    quiet:'Suena más bajo de lo que vive el subgénero. En una playlist junto a otros temas se va a sentir pequeño.',
    loud:'Suena más alto de lo que vive el subgénero. Revisa si el limitador se está comiendo los transitorios.',
    okLoud:'El volumen está donde vive este subgénero.',
    squashed:'Casi no queda rango dinámico. Es el sonido de un limitador trabajando de más: la batería deja de pegar.',
    dyn:'Rango de sobra. Si se siente flojo al lado de las referencias, es nivel, no compresión.',
    okDyn:'El rango dinámico está en la banda normal del subgénero.',
    clip:'Los picos se pasan de la línea. Va a clipear en algunos sistemas y al codificar con pérdida.',
    okPeak:'El nivel de pico está a salvo.',
    headroom:'En una mezcla deja los picos cerca de -6 dBFS. Así no le dejas margen al mastering.',
    monoBad:'Tus graves se caen en mono. En un teléfono, en un sub de club o en un altavoz Bluetooth pierde fuerza.',
    monoWarn:'Hay algo de cancelación de fase en los graves. Vale la pena revisar el sub en mono.',
    monoOk:'Aguanta en mono.',
    lowThin:'Los graves están más flacos que el subgénero. El tema no va a sentirse parte de él.',
    lowFat:'Más energía grave de la que carga el subgénero. Va a sonar embarrado en altavoces pequeños.',
    vGood:'Aquí no hay nada roto.', vFix:'Una cosa está frenando este tema.', vFixN:'%n cosas están frenando este tema.',
    vGoodT:'Esto se lee como un %s de %s terminado. Los números caen dentro del rango del subgénero.',
    vFixT:'Todo lo demás se lee bien para %s. Esta es la que se va a notar.',
    vFixTn:'Empieza por esta: es la que se va a notar primero.',
    nextGeneric:'Compresión de bus', nextGenericD:'Pega la mezcla antes de tocar la cadena de master.',
    lockPack:'El paso completo — y los otros %n de tu pack de %s — viven dentro de la app. Cuenta gratis, sin tarjeta.',
    lockPlain:'El paso completo vive dentro de la app. Cuenta gratis, sin tarjeta.',
    dbNote:'Cada banda, en dB contra el cuerpo del tema (400 Hz - 2 kHz).'
  }
};
function lang(){ return document.documentElement.lang === 'es' ? 'es' : 'en'; }
function t(k){ return T[lang()][k]; }

/* ── DOM ────────────────────────────────────────────────────── */
var $ = function(id){ return document.getElementById(id); };
var genreSel = $('genre'), drop = $('drop'), fileIn = $('file'),
    bar = $('bar'), barI = bar.firstElementChild, statusEl = $('status'),
    errEl = $('err'), results = $('results'), inputCard = $('input-card');
var stage = 'mix';

/* The page hosting the checker: /analyze/ (the defaults) or the landing page,
   which carries it in the hero and keeps the drop zone on screen after a run. */
var root = $('mixcheck-root');
function cfg(k, d){ return (root && root.getAttribute('data-' + k)) || d; }
var CFG = {
  app: cfg('app', '../app/'),
  packs: cfg('packs', '../app/steps-packs.js'),
  page: cfg('page', 'analyze'),
  keepInput: cfg('keep-input', '') === '1'
};

/* The step packs weigh 160 KB. /analyze/ loads them up front; a page that
   does not only fetches them once somebody actually drops a file. */
var packsPromise = null;
function packsReady(){
  if (window.STEP_PACKS) return Promise.resolve();
  if (!packsPromise){
    packsPromise = new Promise(function(resolve){
      var s = document.createElement('script');
      s.src = CFG.packs;
      s.onload = s.onerror = function(){ resolve(); };
      document.head.appendChild(s);
    });
  }
  return packsPromise;
}

(function fillGenres(){
  function group(label, keys){
    var og = document.createElement('optgroup'); og.label = label;
    keys.forEach(function(k){
      var o = document.createElement('option'); o.value = k; o.textContent = GENRE_LABEL[k];
      og.appendChild(o);
    });
    genreSel.appendChild(og);
  }
  group('Urban', URBAN);
  group('Electronic', ELECTRONIC);
  genreSel.value = 'trap';
})();

$('st-mix').addEventListener('click', function(){ setStage('mix'); });
$('st-master').addEventListener('click', function(){ setStage('master'); });
function setStage(s){
  stage = s;
  $('st-mix').setAttribute('aria-pressed', s === 'mix');
  $('st-master').setAttribute('aria-pressed', s === 'master');
}

/* ══════════════════════════════════════════════════════════════
   DSP
   ══════════════════════════════════════════════════════════════ */

/* Iterative radix-2 FFT, in place. re/im are Float32Array of length n (power of 2). */
function fft(re, im){
  var n = re.length, i, j = 0, k, m, tr, ti, wr, wi, ur, ui, ang, step;
  for (i = 1; i < n; i++){
    var bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j){ tr = re[i]; re[i] = re[j]; re[j] = tr; ti = im[i]; im[i] = im[j]; im[j] = ti; }
  }
  for (step = 2; step <= n; step <<= 1){
    ang = -2 * Math.PI / step;
    wr = Math.cos(ang); wi = Math.sin(ang);
    for (i = 0; i < n; i += step){
      ur = 1; ui = 0;
      for (k = 0; k < step / 2; k++){
        m = i + k + step / 2;
        tr = re[m] * ur - im[m] * ui;
        ti = re[m] * ui + im[m] * ur;
        re[m] = re[i + k] - tr; im[m] = im[i + k] - ti;
        re[i + k] += tr; im[i + k] += ti;
        var nur = ur * wr - ui * wi;
        ui = ur * wi + ui * wr; ur = nur;
      }
    }
  }
}

/* ITU-R BS.1770-4 K-weighting, applied with the browser's own biquads. */
function kWeight(buffer){
  var oac = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
    buffer.numberOfChannels, buffer.length, buffer.sampleRate);
  var src = oac.createBufferSource(); src.buffer = buffer;
  var shelf = oac.createBiquadFilter();
  shelf.type = 'highshelf'; shelf.frequency.value = 1500; shelf.gain.value = 4;
  var hp = oac.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 38; hp.Q.value = 0.5;
  src.connect(shelf); shelf.connect(hp); hp.connect(oac.destination);
  src.start(0);
  return oac.startRendering();
}

/* Integrated loudness with the two-stage gate. */
function integratedLufs(buf){
  var sr = buf.sampleRate, nch = Math.min(buf.numberOfChannels, 2);
  var blk = Math.round(sr * 0.4), hop = Math.round(blk / 4);
  var chans = [];
  for (var c = 0; c < nch; c++) chans.push(buf.getChannelData(c));
  var blocks = [];
  for (var start = 0; start + blk <= buf.length; start += hop){
    var sum = 0;
    for (var c2 = 0; c2 < nch; c2++){
      var d = chans[c2], s = 0;
      for (var i = start; i < start + blk; i++) s += d[i] * d[i];
      sum += s / blk;
    }
    blocks.push(sum);
  }
  if (!blocks.length) return null;
  function loud(ms){ return -0.691 + 10 * Math.log10(ms + 1e-12); }
  var kept = blocks.filter(function(b){ return loud(b) > -70; });
  if (!kept.length) return null;
  var mean = kept.reduce(function(a,b){ return a + b; }, 0) / kept.length;
  var rel = loud(mean) - 10;
  var kept2 = kept.filter(function(b){ return loud(b) > rel; });
  if (!kept2.length) kept2 = kept;
  var mean2 = kept2.reduce(function(a,b){ return a + b; }, 0) / kept2.length;
  return loud(mean2);
}

/* Sample peak, plus a 4x linear-interpolated estimate of true peak. */
function peakDb(buf){
  var pk = 0, nch = buf.numberOfChannels;
  for (var c = 0; c < nch; c++){
    var d = buf.getChannelData(c);
    for (var i = 0; i < d.length - 1; i++){
      var a = Math.abs(d[i]); if (a > pk) pk = a;
      var n1 = d[i], n2 = d[i+1];
      for (var f = 1; f < 4; f++){
        var v = Math.abs(n1 + (n2 - n1) * (f / 4));
        if (v > pk) pk = v;
      }
    }
  }
  return 20 * Math.log10(pk + 1e-12);
}

/* Averaged spectrum + mono correlation + how much low end sits in the sides. */
function spectrum(buf){
  var N = 8192, sr = buf.sampleRate;
  var L = buf.getChannelData(0);
  var R = buf.numberOfChannels > 1 ? buf.getChannelData(1) : L;
  var win = new Float32Array(N);
  for (var i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));

  var frames = Math.min(120, Math.max(8, Math.floor(buf.length / N)));
  var step = Math.max(N, Math.floor((buf.length - N) / frames));
  var magM = new Float64Array(N / 2), magS = new Float64Array(N / 2), used = 0;
  var re = new Float32Array(N), im = new Float32Array(N);
  var reS = new Float32Array(N), imS = new Float32Array(N);
  var sLL = 0, sRR = 0, sLR = 0;

  for (var off = 0; off + N <= buf.length && used < frames; off += step){
    for (var j = 0; j < N; j++){
      var l = L[off + j], r = R[off + j];
      re[j] = ((l + r) / 2) * win[j]; im[j] = 0;
      reS[j] = ((l - r) / 2) * win[j]; imS[j] = 0;
      sLL += l * l; sRR += r * r; sLR += l * r;
    }
    fft(re, im); fft(reS, imS);
    for (var k = 0; k < N / 2; k++){
      magM[k] += re[k] * re[k] + im[k] * im[k];
      magS[k] += reS[k] * reS[k] + imS[k] * imS[k];
    }
    used++;
  }
  var corr = (sLL > 0 && sRR > 0) ? sLR / Math.sqrt(sLL * sRR) : 1;

  /* Energy per band, divided by the number of bins in it: a band's average
     level, not its total. Summing raw energy would put 95% in the low bands
     for any record ever made, because music falls off with frequency. */
  var edges = [20, 60, 120, 400, 2000, 6000, 16000];
  var bands = new Array(6).fill(0), counts = new Array(6).fill(0);
  var lowMid = 0, lowSide = 0;
  for (var b = 0; b < N / 2; b++){
    var f = b * sr / N;
    if (f < 20 || f > 16000) continue;
    for (var g = 0; g < 6; g++){
      if (f >= edges[g] && f < edges[g + 1]){ bands[g] += magM[b]; counts[g]++; break; }
    }
    if (f < 120){ lowMid += magM[b]; lowSide += magS[b]; }
  }
  var db = bands.map(function(v, i){
    return 10 * Math.log10((counts[i] ? v / counts[i] : 0) + 1e-20);
  });
  /* Everything is expressed against the 400 Hz - 2 kHz band, where the
     record's body lives. That makes the shape comparable between tracks
     regardless of how loud the file is. */
  var midRef = db[3];
  var rel = db.map(function(d){ return d - midRef; });
  var lowRel = 10 * Math.log10(
    (Math.pow(10, db[0] / 10) + Math.pow(10, db[1] / 10)) / 2 + 1e-20) - midRef;
  return {
    bandsRel: rel,
    lowRel: lowRel,
    corr: corr,
    lowSideRatio: lowMid > 0 ? lowSide / (lowMid + lowSide) : 0
  };
}

/* Chrome and Firefox cannot decode AIFF, which is what Logic bounces by
   default. Uncompressed AIFF (and AIFF-C "NONE"/"sowt") is plain PCM behind
   two chunks, so it is read here; anything else goes to decodeAudioData. */
function decodeAiff(ab, ac){
  var v = new DataView(ab);
  if (ab.byteLength < 12 || v.getUint32(0) !== 0x464F524D) return null;          /* FORM */
  var kind = v.getUint32(8);
  if (kind !== 0x41494646 && kind !== 0x41494643) return null;                   /* AIFF / AIFC */
  var p = 12, ch = 0, frames = 0, bits = 0, rate = 0, little = false, data = -1;
  while (p + 8 <= ab.byteLength){
    var id = v.getUint32(p), size = v.getUint32(p + 4), body = p + 8;
    if (id === 0x434F4D4D){                                                      /* COMM */
      ch = v.getUint16(body); frames = v.getUint32(body + 2); bits = v.getUint16(body + 6);
      var ex = v.getUint16(body + 8) & 0x7FFF;                                   /* 80-bit float rate */
      rate = (v.getUint32(body + 10) * 4294967296 + v.getUint32(body + 14)) * Math.pow(2, ex - 16383 - 63);
      if (kind === 0x41494643 && size >= 22){
        var comp = v.getUint32(body + 18);
        if (comp === 0x736F7774) little = true;                                  /* sowt */
        else if (comp !== 0x4E4F4E45) return null;                               /* compressed */
      }
    } else if (id === 0x53534E44){                                               /* SSND */
      data = body + 8 + v.getUint32(body);
    }
    p = body + size + (size & 1);
  }
  if (!ch || !frames || data < 0 || !rate || [8, 16, 24, 32].indexOf(bits) === -1) return null;
  var bps = bits / 8;
  frames = Math.min(frames, Math.floor((ab.byteLength - data) / (bps * ch)));
  var buf = ac.createBuffer(ch, frames, Math.round(rate));
  var out = [];
  for (var c = 0; c < ch; c++) out.push(buf.getChannelData(c));
  var scale = Math.pow(2, bits - 1), o = data;
  for (var i = 0; i < frames; i++){
    for (var c2 = 0; c2 < ch; c2++){
      var s;
      if (bits === 16) s = v.getInt16(o, little);
      else if (bits === 24) s = little
          ? (v.getUint8(o) | (v.getUint8(o + 1) << 8) | (v.getInt8(o + 2) << 16))
          : ((v.getInt8(o) << 16) | (v.getUint8(o + 1) << 8) | v.getUint8(o + 2));
      else if (bits === 32) s = v.getInt32(o, little);
      else s = v.getInt8(o);
      out[c2][i] = s / scale;
      o += bps;
    }
  }
  return buf;
}
function decodeFile(ab, ac){
  var aiff = null;
  try{ aiff = decodeAiff(ab, ac); }catch(_){ aiff = null; }
  return aiff ? Promise.resolve(aiff) : ac.decodeAudioData(ab);
}

/* ══════════════════════════════════════════════════════════════
   FLOW
   ══════════════════════════════════════════════════════════════ */
drop.addEventListener('click', function(){ fileIn.click(); });
drop.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') fileIn.click(); });
fileIn.addEventListener('change', function(){ if (fileIn.files[0]) run(fileIn.files[0]); });
['dragenter','dragover'].forEach(function(ev){
  drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.add('over'); });
});
['dragleave','drop'].forEach(function(ev){
  drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.remove('over'); });
});
drop.addEventListener('drop', function(e){
  if (e.dataTransfer.files && e.dataTransfer.files[0]) run(e.dataTransfer.files[0]);
});
$('again').addEventListener('click', function(){
  results.style.display = 'none';
  inputCard.style.display = 'block';
  statusEl.textContent = ''; bar.style.display = 'none'; fileIn.value = '';
  if (CFG.keepInput) inputCard.scrollIntoView({behavior: 'smooth', block: 'center'});
  else window.scrollTo({top: 0, behavior: 'smooth'});
});

function fail(msg){
  errEl.textContent = msg; errEl.style.display = 'block';
  bar.style.display = 'none'; statusEl.textContent = '';
  drop.classList.remove('busy');
  try{ gtag('event','analyze_error',{message: msg.slice(0,90), page: CFG.page}); }catch(_){}
}
function progress(p, label){
  bar.style.display = 'block'; barI.style.width = p + '%'; statusEl.textContent = label;
  drop.classList.toggle('busy', p < 100);
}

function run(file){
  errEl.style.display = 'none';
  if (file.size > 100 * 1024 * 1024) return fail(t('errBig'));
  try{ gtag('event','analyze_start',{genre: genreSel.value, stage: stage, page: CFG.page}); }catch(_){}
  packsReady();

  progress(8, t('reading'));
  var fr = new FileReader();
  fr.onerror = function(){ fail(t('errDecode')); };
  fr.onload = function(){
    progress(26, t('decoding'));
    var AC = window.AudioContext || window.webkitAudioContext;
    var ac = new AC();
    decodeFile(fr.result, ac).then(function(buf){
      if (!buf || !buf.length) { ac.close(); return fail(t('errNone')); }
      progress(48, t('measuring'));
      setTimeout(function(){
        kWeight(buf).then(function(kbuf){
          var lufs = integratedLufs(kbuf);
          var pk = peakDb(buf);
          progress(72, t('spectrum'));
          setTimeout(function(){
            var sp = spectrum(buf);
            progress(100, t('done'));
            ac.close();
            packsReady().then(function(){ render(lufs, pk, sp, buf); });
          }, 40);
        }).catch(function(){ ac.close(); fail(t('errDecode')); });
      }, 40);
    }).catch(function(){ ac.close(); fail(t('errDecode')); });
  };
  fr.readAsArrayBuffer(file);
}

/* ── verdict building ───────────────────────────────────────── */
function judge(v, lo, hi){ return v < lo ? 'low' : (v > hi ? 'high' : 'ok'); }
function fmt(n, d){ return (n >= 0 ? '+' : '') + n.toFixed(d === undefined ? 1 : d); }

function render(lufs, pk, sp, buf){
  var g = genreSel.value, ref = REF[g], isMaster = stage === 'master';
  var lufsT = isMaster ? ref.lufs : MIX_LUFS;
  var plrT  = isMaster ? ref.plr  : MIX_PLR;
  var plr = pk - lufs;
  var issues = [];
  var cards = [];

  /* loudness */
  var jl = judge(lufs, lufsT[0], lufsT[1]);
  cards.push({
    name: t('loudness'), val: lufs.toFixed(1) + ' LUFS',
    tgt: t('target') + ': ' + lufsT[0] + ' … ' + lufsT[1],
    state: jl === 'ok' ? 'ok' : 'warn',
    note: jl === 'low' ? t('quiet') : (jl === 'high' ? t('loud') : t('okLoud'))
  });
  if (jl === 'low')  issues.push({w: isMaster ? 3 : 1, key: 'loud', txt: t('quiet')});
  if (jl === 'high') issues.push({w: 3, key: 'loud', txt: t('loud')});

  /* dynamics */
  var jd = judge(plr, plrT[0], plrT[1]);
  cards.push({
    name: t('dynamics'), val: plr.toFixed(1) + ' dB',
    tgt: t('target') + ': ' + plrT[0] + ' … ' + plrT[1] + ' (PLR)',
    state: jd === 'low' ? 'bad' : (jd === 'ok' ? 'ok' : 'warn'),
    note: jd === 'low' ? t('squashed') : (jd === 'high' ? t('dyn') : t('okDyn'))
  });
  if (jd === 'low') issues.push({w: 5, key: 'dyn', txt: t('squashed')});

  /* peak */
  var pkLimit = isMaster ? -0.3 : -3;
  var pkState = pk > pkLimit ? 'bad' : 'ok';
  var pkNote = pk > pkLimit ? t('clip') : (!isMaster && pk > -4 ? t('headroom') : t('okPeak'));
  cards.push({
    name: t('peak'), val: pk.toFixed(1) + ' dB',
    tgt: t('target') + ': < ' + pkLimit + ' dB',
    state: pkState, note: pkNote
  });
  if (pk > pkLimit) issues.push({w: 4, key: 'peak', txt: t('clip')});

  /* mono */
  var mState, mNote;
  if (sp.lowSideRatio > 0.35 || sp.corr < 0){ mState = 'bad'; mNote = t('monoBad'); issues.push({w: 4, key: 'mono', txt: t('monoBad')}); }
  else if (sp.lowSideRatio > 0.2 || sp.corr < 0.2){ mState = 'warn'; mNote = t('monoWarn'); issues.push({w: 2, key: 'mono', txt: t('monoWarn')}); }
  else { mState = 'ok'; mNote = t('monoOk'); }
  cards.push({
    name: t('mono'), val: fmt(sp.corr, 2),
    tgt: t('target') + ': > +0.20',
    state: mState, note: mNote
  });

  /* low end vs subgenre */
  var jlow = judge(sp.lowRel, ref.low[0], ref.low[1]);
  if (jlow === 'low')  issues.push({w: 3, key: 'low', txt: t('lowThin')});
  if (jlow === 'high') issues.push({w: 3, key: 'low', txt: t('lowFat')});

  /* paint metric cards */
  $('metrics').innerHTML = cards.map(function(c){
    return '<div class="m"><div class="m-top"><span class="m-name">' + c.name +
           '</span><span class="dot ' + c.state + '"></span></div>' +
           '<div class="m-val">' + c.val + '</div>' +
           '<div class="m-tgt">' + c.tgt + '</div>' +
           '<div class="m-note">' + c.note + '</div></div>';
  }).join('');

  /* Spectral shape, in dB against the mids. Zero sits at the centre of the
     bar, so a band reads as "louder than the body" or "quieter than it". */
  var names = [t('sub'), t('bass'), t('lowmid'), t('mid'), t('himid'), t('air')];
  var SCALE = 24; /* the bar spans -24 dB … +24 dB */
  function place(dbv){
    var clamped = Math.max(-SCALE, Math.min(SCALE, dbv));
    return {left: ((Math.min(0, clamped) + SCALE) / (SCALE * 2)) * 100,
            width: (Math.abs(clamped) / (SCALE * 2)) * 100};
  }
  $('bands').innerHTML = sp.bandsRel.map(function(d, i){
    var p = place(d);
    return '<div class="band"><span class="band-n">' + names[i] + '</span>' +
           '<span class="band-b"><u style="left:50%;opacity:.35"></u>' +
           '<i style="margin-left:' + p.left.toFixed(1) + '%;width:' +
           Math.max(1.5, p.width).toFixed(1) + '%"></i></span>' +
           '<span class="band-v">' + (d >= 0 ? '+' : '') + d.toFixed(1) + '</span></div>';
  }).join('') +
  '<div class="band" style="margin-top:14px"><span class="band-n" style="color:var(--paper)">' +
  (lang() === 'es' ? 'Peso grave' : 'Low-end weight') + '</span>' +
  (function(){
    var p = place(sp.lowRel);
    var lo = ((ref.low[0] + SCALE) / (SCALE * 2)) * 100;
    var hi = ((ref.low[1] + SCALE) / (SCALE * 2)) * 100;
    return '<span class="band-b"><i style="margin-left:' + p.left.toFixed(1) + '%;width:' +
      Math.max(1.5, p.width).toFixed(1) + '%;background:' +
      (jlow === 'ok' ? 'var(--ok)' : 'var(--warn)') + '"></i>' +
      '<u style="left:' + lo.toFixed(1) + '%"></u><u style="left:' + hi.toFixed(1) + '%"></u></span>';
  })() +
  '<span class="band-v" style="color:var(--paper)">' +
  (sp.lowRel >= 0 ? '+' : '') + sp.lowRel.toFixed(1) + '</span></div>' +
  '<div class="m-note">' + t('dbNote') + ' &nbsp;·&nbsp; ' + t('target') + ' ' + GENRE_LABEL[g] + ': +' +
  ref.low[0] + ' … +' + ref.low[1] + ' dB · ' + t('yours') + ': ' +
  (sp.lowRel >= 0 ? '+' : '') + sp.lowRel.toFixed(1) + ' dB' +
  (jlow === 'low' ? ' — ' + t('lowThin') : (jlow === 'high' ? ' — ' + t('lowFat') : '')) + '</div>';

  /* headline */
  issues.sort(function(a, b){ return b.w - a.w; });
  var vt = $('v-title'), vx = $('v-text');
  var label = GENRE_LABEL[g];
  var stageWord = lang() === 'es' ? (isMaster ? 'master' : 'mezcla') : (isMaster ? 'master' : 'mix');
  if (!issues.length){
    vt.textContent = t('vGood');
    vx.textContent = t('vGoodT').replace('%s', stageWord).replace('%s', label);
  } else {
    vt.textContent = issues.length === 1 ? t('vFix')
                   : t('vFixN').replace('%n', issues.length);
    vx.textContent = issues[0].txt + ' ' +
                     (issues.length === 1 ? t('vFixT').replace('%s', label) : t('vFixTn'));
  }

  /* next step, pulled from the subgenre's own pack */
  var step = pickStep(g, issues.length ? issues[0].key : null);
  var total = packSize(g);
  $('n-name').textContent = step.name;
  $('n-desc').textContent = teaser(step.desc);
  $('lock-line').textContent = (step.generic || total < 2)
      ? t('lockPlain')
      : t('lockPack').replace('%n', total - 1).replace('%s', label);
  $('n-cta').href = CFG.app + '?signup=1&src=mixcheck&genre=' + encodeURIComponent(label) +
                    '&step=' + encodeURIComponent(step.name);
  gate = {genre: g, step: step.name};

  if (!CFG.keepInput) inputCard.style.display = 'none';
  results.style.display = 'block';
  results.scrollIntoView({behavior: 'smooth', block: 'start'});

  try{
    gtag('event','analyze_done',{
      genre: g, stage: stage, page: CFG.page, issues: issues.length,
      top_issue: issues.length ? issues[0].key : 'none', step: step.name,
      lufs: Math.round(lufs * 10) / 10, plr: Math.round(plr * 10) / 10
    });
  }catch(_){}
}

/* What the last result showed, so a click on the gate is readable in GA4. */
var gate = {genre: '', step: ''};
$('n-cta').addEventListener('click', function(){
  try{ gtag('event','step_gate_click', {genre: gate.genre, step: gate.step}); }catch(_){}
});

/* Enough of the step to see it is a real instruction, not enough to act on it. */
function teaser(s){
  var w = String(s || '').split(/\s+/);
  return w.length <= 7 ? String(s || '') : w.slice(0, 7).join(' ') + '…';
}

/* How many steps this subgenre's pack carries, to say what is behind the gate. */
function packSize(genreKey){
  var packs = window.STEP_PACKS || {};
  var pack = packs[genreKey] || packs[(window.SUBGENRE_ALIASES || {})[genreKey]];
  if (!pack) return 0;
  var n = 0;
  for (var k in pack){
    if (Object.prototype.hasOwnProperty.call(pack, k) && pack[k] && pack[k].length) n += pack[k].length;
  }
  return n;
}

/* Map a problem to a real step out of this subgenre's pack, so the
   diagnosis lands on the checklist the app already keeps. */
function pickStep(genreKey, issueKey){
  /* Words that actually appear in the packs, in both languages — a mono
     problem lands on "Phone & Car Check", not on the first step of the mix. */
  var WORDS = {
    dyn:   ['glue','bus','compress','compres','pegamento','dinam'],
    loud:  ['loudness','target','limiter','limitador','sonoridad','volumen','objetivo'],
    peak:  ['peak','headroom','limiter','limitador','pico','margen','export'],
    mono:  ['phone','car','mono','phase','fase','telefono','carro','width','stereo','check','prueba'],
    low:   ['808','kick','sub','bass','bajo','bombo','graves','low end'],
    'null':['reference','referencia','balance']
  };
  /* Where to look first depends on what broke. */
  var ORDER = {
    loud: ['mastering','mix','production','songwriting'],
    peak: ['mastering','mix','production','songwriting']
  };
  var l = lang();
  var packs = window.STEP_PACKS || {};
  var pack = packs[genreKey] || packs[(window.SUBGENRE_ALIASES || {})[genreKey]];
  var order = ORDER[issueKey] || ['mix','mastering','production','songwriting'];
  var words = WORDS[issueKey || 'null'] || WORDS['null'];

  if (pack){
    for (var oi = 0; oi < order.length; oi++){
      var phase = pack[order[oi]];
      if (!phase) continue;
      /* the step's own name wins over a word buried in its description */
      for (var pass = 0; pass < 2; pass++){
        for (var i = 0; i < phase.length; i++){
          var st = phase[i], loc = st[l] || st.en;
          var hay = (pass === 0 ? (loc.name || '')
                                : (loc.name || '') + ' ' + (loc.desc || '')).toLowerCase();
          for (var w = 0; w < words.length; w++){
            if (hay.indexOf(words[w]) !== -1) return {name: loc.name, desc: loc.desc};
          }
        }
      }
    }
    /* No match: say so with the generic step instead of handing back
       whatever happens to sit first in the list. */
  }
  return {name: t('nextGeneric'), desc: t('nextGenericD'), generic: true};
}
})();
