/* The Engineer's Workpad — subgenre step packs
 *
 * Each subgenre owns its four phases end to end: a Reggaeton record and a
 * Boom Bap beat are not built in the same order, so they do not share a
 * checklist. A subgenre with no pack here falls back to the generic four
 * phases defined in app/index.html.
 *
 * Shape:  S(id, EN name, EN desc, ES name, ES desc, rmsMin, rmsMax)
 * Ids are prefixed per pack (rgt-, dbw-, per-, ltr-...) so they never collide
 * with the base steps (sw*, pr*, mx*, ms*) or with each other — a project
 * keeps its ticked steps when the app is reloaded in the other language.
 *
 * Keys are normalized subgenre names: lowercase, accents stripped, spaces and
 * punctuation turned into hyphens ("Latin Trap" -> "latin-trap").
 */
(function () {
  function S(id, en, ed, es, sd, lo, hi) {
    return {
      id: id,
      en: { name: en, desc: ed },
      es: { name: es, desc: sd },
      rmsMin: lo === undefined ? null : lo,
      rmsMax: hi === undefined ? null : hi
    };
  }

  var P = {};        // packs por subgenero
  var ALIASES = {};  // grafias alternativas -> clave de pack

  // ══════════════════════════════════════════════════════════════
  //  REGGAETON
  // ══════════════════════════════════════════════════════════════
  P['reggaeton'] = {
    songwriting: [
      S('rgt-sw1', 'Concept & Hook Phrase', 'The one phrase the song is named after exists and repeats — everything else is written around it',
                   'Concepto y Frase Gancho', 'La frase que da nombre al tema existe y se repite: todo lo demas se escribe alrededor de ella'),
      S('rgt-sw2', 'Chorus First', 'The chorus is written before the verses and lands within the first 30 seconds of the arrangement plan',
                   'El Coro Primero', 'El coro esta escrito antes que los versos y entra en los primeros 30 segundos del plan de arreglo'),
      S('rgt-sw3', 'Tempo & Key', 'BPM sits in the 88-100 pocket and the key is chosen minor unless the hook demands otherwise',
                   'Tempo y Tonalidad', 'El BPM cae en el rango 88-100 y la tonalidad es menor salvo que el gancho pida otra cosa'),
      S('rgt-sw4', 'Flow & Cadence', 'The vocal cadence is mapped against the dembow — you know where the voice pushes and where it lays back',
                   'Flow y Cadencia', 'La cadencia vocal esta mapeada contra el dembow: sabes donde empuja la voz y donde se echa atras'),
      S('rgt-sw5', 'Lyrics & Ad-lib Plan', 'Verses are drafted and the ad-libs are decided as part of the writing, not improvised later',
                   'Letra y Plan de Ad-libs', 'Los versos estan escritos y los ad-libs decididos como parte de la escritura, no improvisados despues'),
      S('rgt-sw6', 'Voice Memo Test', 'The chorus survives sung over a bare dembow loop on a phone recording',
                   'Prueba de Nota de Voz', 'El coro sobrevive cantado sobre un loop de dembow pelado grabado en el telefono'),
    ],
    production: [
      S('rgt-pd1', 'Reference Track',    'A released reggaeton record is loaded at matched loudness as the sonic target',
                   'Track de Referencia', 'Un tema de reggaeton publicado esta cargado a loudness igualado como objetivo sonoro', -30, -12),
      S('rgt-pd2', 'Dembow Pattern',     'Kick on 1 and 3, snare or clap on the and of 2 and 4 — the pattern grooves before anything else is added',
                   'Patron de Dembow', 'Bombo en 1 y 3, caja o clap en el "y" de 2 y 4: el patron ya suena en pocket antes de anadir nada', -28, -10),
      S('rgt-pd3', 'Kick & 808 Marriage', 'Kick and 808 occupy different moments or different ranges — they never fight for the same hit',
                   'Matrimonio Bombo y 808', 'Bombo y 808 ocupan momentos o rangos distintos: nunca pelean por el mismo golpe', -26, -10),
      S('rgt-pd4', 'Percussion Layers',  'Shakers, guiro, timbal or conga layers give the loop its swing and its regional accent',
                   'Capas de Percusion', 'Shakers, guiro, timbal o congas dan al loop su swing y su acento regional', -26, -10),
      S('rgt-pd5', 'Chord Loop',         'A 4 or 8 bar minor loop (pluck, guitar or pad) carries the harmony without stealing the vocal space',
                   'Loop de Acordes', 'Un loop menor de 4 u 8 compases (pluck, guitarra o pad) lleva la armonia sin robarle espacio a la voz', -24, -8),
      S('rgt-pd6', 'Lead Vocal Comp',    'The lead vocal is recorded and comped: best take per line, tuned only as much as the style needs',
                   'Comp de Voz Principal', 'La voz principal esta grabada y compilada: la mejor toma por linea, afinada solo lo que el estilo pide', -22, -8),
      S('rgt-pd7', 'Doubles & Ad-libs',  'Chorus doubles are tracked and the ad-libs are recorded as their own layer, panned wide',
                   'Dobles y Ad-libs', 'Los dobles del coro estan grabados y los ad-libs registrados como capa propia, abiertos en el estereo', -22, -8),
      S('rgt-pd8', 'Vocal Chops & Hook Instrument', 'A chopped vocal or a signature instrument answers the voice in the gaps',
                   'Chops y Instrumento Gancho', 'Un chop vocal o un instrumento firma responde a la voz en los huecos', -22, -8),
      S('rgt-pd9', 'Arrangement',        'Intro is short, the chorus arrives early, and at least one section drops to voice and percussion',
                   'Arreglo', 'La intro es corta, el coro llega temprano y al menos una seccion baja a voz y percusion', -20, -6),
      S('rgt-pd10','Transitions & FX',   'Risers, impacts, filter sweeps and a beat cut before the chorus glue the sections together',
                   'Transiciones y FX', 'Risers, impactos, barridos de filtro y un corte de beat antes del coro pegan las secciones', -20, -6),
    ],
    mix: [
      S('rgt-mx1', 'Session Prep',        'Tracks are named, colored and grouped: drums, bass, music, lead vox, ad-libs',
                   'Preparacion de Sesion', 'Las pistas estan nombradas, coloreadas y agrupadas: bateria, bajo, musica, voz principal, ad-libs', -24, -14),
      S('rgt-mx2', 'Static Balance',      'A rough fader balance with the vocal on top already reads as a record before any plugin',
                   'Balance Estatico', 'Un balance de faders con la voz arriba ya suena a disco antes de meter ningun plugin', -22, -14),
      S('rgt-mx3', 'Kick & 808 Balance',  'The 808 is mono below 100 Hz and its level is checked on a small speaker, not only on headphones',
                   'Balance de Bombo y 808', 'El 808 esta en mono por debajo de 100 Hz y su nivel se revisa en un altavoz pequeno, no solo en cascos', -22, -12),
      S('rgt-mx4', 'Sidechain the Low End', 'Bass and sub duck the kick just enough to keep the pattern readable, not pumping',
                   'Sidechain del Grave', 'El bajo y el sub esquivan el bombo lo justo para que el patron se lea, sin bombeo', -20, -10),
      S('rgt-mx5', 'Snare / Clap Forward', 'The backbeat cuts through on a phone speaker — this is the hit that carries the genre',
                   'Caja / Clap al Frente', 'El backbeat corta en el altavoz de un telefono: es el golpe que sostiene el genero', -20, -10),
      S('rgt-mx6', 'Vocal Chain',         'EQ, de-esser, compression and a touch of saturation put the lead in front without harshness',
                   'Cadena Vocal', 'EQ, de-esser, compresion y algo de saturacion ponen la voz al frente sin durezas', -20, -10),
      S('rgt-mx7', 'Ad-lib Placement',    'Ad-libs sit wide and lower than the lead, filling only the gaps between phrases',
                   'Colocacion de Ad-libs', 'Los ad-libs van abiertos y por debajo de la voz principal, llenando solo los huecos entre frases', -18, -8),
      S('rgt-mx8', 'Space: Reverb & Delay', 'A short plate on the lead and a tempo delay on the hook create depth without washing the groove',
                   'Espacio: Reverb y Delay', 'Un plate corto en la voz y un delay a tempo en el gancho dan profundidad sin lavar el groove', -18, -8),
      S('rgt-mx9', 'Percussion Air',      'Shakers and hats keep their top end while staying under the vocal in loudness',
                   'Aire de la Percusion', 'Shakers y hats conservan su brillo sin pasar por encima de la voz en volumen', -16, -6),
      S('rgt-mx10','Phone & Car Check',   'The mix has been heard on a phone speaker and in a car — bass and vocal both survive',
                   'Prueba de Telefono y Carro', 'La mezcla se ha oido en el altavoz de un telefono y en un carro: bajo y voz sobreviven en ambos', -16, -6),
    ],
    mastering: [
      S('rgt-ms1', 'Reference at Matched Loudness', 'A commercial reggaeton master is level-matched and A/B ready',
                   'Referencia a Loudness Igualado', 'Un master comercial de reggaeton esta igualado en nivel y listo para A/B', -16, -10),
      S('rgt-ms2', 'Headroom Check',   'The mix arrives around -6 dBFS peak with no limiter on the master bus',
                   'Revision de Headroom', 'La mezcla llega sobre -6 dBFS de pico y sin limitador en el bus master', -16, -10),
      S('rgt-ms3', 'Low End Control',  'A tight low shelf and mono below 100 Hz keep the 808 from eating the loudness',
                   'Control del Grave', 'Un shelf grave ajustado y mono bajo 100 Hz evitan que el 808 se coma el loudness', -14, -8),
      S('rgt-ms4', 'Glue Compression', 'Two to three dB of gentle bus compression tie the drums and the voice together',
                   'Compresion de Pegamento', 'Dos o tres dB de compresion suave de bus unen la bateria y la voz', -14, -8),
      S('rgt-ms5', 'Presence Shaping', 'A small lift between 2 and 5 kHz keeps the vocal intelligible after limiting',
                   'Modelado de Presencia', 'Un realce pequeno entre 2 y 5 kHz mantiene la voz inteligible tras el limitado', -12, -6),
      S('rgt-ms6', 'Limiter & True Peak', 'Ceiling at -1 dBTP with the limiter working, not crushing — transients survive',
                   'Limitador y True Peak', 'Techo en -1 dBTP con el limitador trabajando, no aplastando: los transitorios sobreviven', -10, -2),
      S('rgt-ms7', 'Loudness Target',  'Integrated loudness sits between -9 and -7 LUFS, checked against the reference',
                   'Objetivo de Loudness', 'El loudness integrado queda entre -9 y -7 LUFS, comprobado contra la referencia', -10, -2),
      S('rgt-ms8', 'Export & Platform Check', 'WAV 24-bit exported, and the streaming-normalized version has been auditioned',
                   'Exportacion y Prueba de Plataforma', 'WAV de 24 bits exportado y la version normalizada de streaming ya escuchada', -10, -2),
    ],
  };

  // ══════════════════════════════════════════════════════════════
  //  DEMBOW
  // ══════════════════════════════════════════════════════════════
  P['dembow'] = {
    songwriting: [
      S('dbw-sw1', 'Chant Hook', 'The hook works as a shouted chant, not as a sung melody — a crowd could answer it',
                   'Gancho Coreable', 'El gancho funciona como coro gritado, no como melodia cantada: una multitud podria responderlo'),
      S('dbw-sw2', 'Call & Response', 'At least one section is built as call and response between lead and crowd or ad-libs',
                   'Llamada y Respuesta', 'Al menos una seccion esta construida como llamada y respuesta entre la voz y el coro o los ad-libs'),
      S('dbw-sw3', 'Tempo', 'BPM is locked between 108 and 125 — the tempo is the identity of the style',
                   'Tempo', 'El BPM esta fijado entre 108 y 125: el tempo es la identidad del estilo'),
      S('dbw-sw4', 'Phrase Rhythm', 'Lyrics are written to the percussive pattern first and to the melody second',
                   'Ritmo de las Frases', 'La letra esta escrita primero al patron percusivo y despues a la melodia'),
      S('dbw-sw5', 'Slang & Punchlines', 'The verse punchlines are chosen and placed where the beat leaves a gap',
                   'Slang y Punchlines', 'Los punchlines del verso estan elegidos y colocados donde el beat deja hueco'),
      S('dbw-sw6', 'Party Test', 'The hook has been shouted over the loop out loud — if it does not move you standing up, it is not done',
                   'Prueba de Fiesta', 'El gancho se ha gritado sobre el loop en voz alta: si no te mueve de pie, no esta listo'),
    ],
    production: [
      S('dbw-pd1', 'Reference Track', 'A current dembow record is loaded at matched loudness',
                   'Track de Referencia', 'Un tema de dembow actual esta cargado a loudness igualado', -30, -12),
      S('dbw-pd2', 'Core Dembow Loop', 'The pattern is built from a classic dembow break, not from a generic drum grid',
                   'Loop Dembow Base', 'El patron sale de un break de dembow clasico, no de una rejilla de bateria generica', -28, -10),
      S('dbw-pd3', 'Sample Selection', 'Kick, snare and the signature "pra" hit are chosen for character, not for cleanliness',
                   'Seleccion de Samples', 'Bombo, caja y el "pra" caracteristico se eligen por caracter, no por limpieza', -28, -10),
      S('dbw-pd4', 'Percussion Stack', 'Multiple percussion layers run at different rates so the loop never feels static',
                   'Stack de Percusion', 'Varias capas de percusion corren a ritmos distintos para que el loop nunca se sienta estatico', -26, -10),
      S('dbw-pd5', 'Bass Line', 'A short, punchy bass follows the kick pattern rather than holding long notes',
                   'Linea de Bajo', 'Un bajo corto y contundente sigue el patron del bombo en vez de sostener notas largas', -26, -10),
      S('dbw-pd6', 'Melodic Stab', 'One recognizable stab, horn or synth hit answers the vocal every few bars',
                   'Stab Melodico', 'Un stab, metal o golpe de sinte reconocible responde a la voz cada pocos compases', -24, -8),
      S('dbw-pd7', 'Vocal Tracking', 'Lead vocals are tracked with energy and the crowd or gang vocals are recorded separately',
                   'Grabacion Vocal', 'La voz principal se graba con energia y los coros de grupo se registran aparte', -22, -8),
      S('dbw-pd8', 'Ad-libs & Shouts', 'Shouts, air horns and tags are placed as part of the arrangement, not sprinkled at the end',
                   'Ad-libs y Gritos', 'Gritos, air horns y tags se colocan como parte del arreglo, no espolvoreados al final', -22, -8),
      S('dbw-pd9', 'Arrangement', 'The loop changes every 8 or 16 bars by subtraction — elements drop out to create sections',
                   'Arreglo', 'El loop cambia cada 8 o 16 compases por resta: los elementos desaparecen para crear secciones', -20, -6),
      S('dbw-pd10','Drops & Cuts', 'At least two full beat cuts leave the voice alone before the pattern slams back',
                   'Drops y Cortes', 'Al menos dos cortes completos del beat dejan la voz sola antes de que el patron vuelva de golpe', -20, -6),
    ],
    mix: [
      S('dbw-mx1', 'Session Prep', 'Percussion is grouped on its own bus — it is the loudest family in this genre',
                   'Preparacion de Sesion', 'La percusion tiene su propio bus: es la familia mas fuerte de este genero', -24, -14),
      S('dbw-mx2', 'Static Balance', 'Faders alone deliver a loop that already sounds aggressive and danceable',
                   'Balance Estatico', 'Solo con faders el loop ya suena agresivo y bailable', -22, -14),
      S('dbw-mx3', 'Snare Impact', 'The snare is the loudest element after the vocal and it cuts on a laptop speaker',
                   'Impacto de la Caja', 'La caja es el elemento mas fuerte tras la voz y corta en el altavoz de un portatil', -22, -12),
      S('dbw-mx4', 'Kick Weight', 'The kick keeps body without masking the bass — checked in mono',
                   'Peso del Bombo', 'El bombo conserva cuerpo sin tapar el bajo, comprobado en mono', -20, -10),
      S('dbw-mx5', 'Percussion Separation', 'Each percussion layer has its own pan position and frequency window',
                   'Separacion de Percusion', 'Cada capa de percusion tiene su posicion en el panorama y su ventana de frecuencia', -20, -10),
      S('dbw-mx6', 'Vocal Aggression', 'Compression and saturation keep the vocal loud and in your face at every level',
                   'Agresividad Vocal', 'Compresion y saturacion mantienen la voz alta y en tu cara a cualquier volumen', -20, -10),
      S('dbw-mx7', 'Gang Vocal Width', 'Group vocals are wide and slightly behind the lead, never competing with it',
                   'Anchura de los Coros', 'Los coros de grupo van anchos y ligeramente detras de la voz, nunca compitiendo con ella', -18, -8),
      S('dbw-mx8', 'Short Space Only', 'Reverbs are short and gated — long tails kill the punch of the pattern',
                   'Solo Espacios Cortos', 'Las reverbs son cortas y con gate: las colas largas matan el punch del patron', -18, -8),
      S('dbw-mx9', 'Energy Automation', 'Volume rides lift each chorus above the verse by a hair, not by a leap',
                   'Automatizacion de Energia', 'Las subidas de volumen elevan cada coro sobre el verso por un pelo, no por un salto', -16, -6),
      S('dbw-mx10','Club & Phone Check', 'The mix survives a phone speaker and a loud system — the pattern reads on both',
                   'Prueba de Club y Telefono', 'La mezcla sobrevive en el altavoz del telefono y en un sistema grande: el patron se lee en ambos', -16, -6),
    ],
    mastering: [
      S('dbw-ms1', 'Reference at Matched Loudness', 'A club-tested dembow master is loaded for A/B at the same level',
                   'Referencia a Loudness Igualado', 'Un master de dembow probado en club esta cargado para A/B al mismo nivel', -16, -10),
      S('dbw-ms2', 'Headroom Check', 'The mix peaks around -6 dBFS with a clean master bus',
                   'Revision de Headroom', 'La mezcla pica sobre -6 dBFS con el bus master limpio', -16, -10),
      S('dbw-ms3', 'Transient Preservation', 'Snare and percussion transients survive the chain — this genre dies without them',
                   'Preservacion de Transitorios', 'Los transitorios de caja y percusion sobreviven a la cadena: este genero muere sin ellos', -14, -8),
      S('dbw-ms4', 'Low Mid Cleanup', 'The 200-400 Hz build-up from stacked percussion is tamed',
                   'Limpieza de Medios Graves', 'La acumulacion de 200-400 Hz de la percusion apilada esta controlada', -14, -8),
      S('dbw-ms5', 'Top End Air', 'Shakers and hats get air above 10 kHz without becoming brittle',
                   'Aire en Agudos', 'Shakers y hats ganan aire por encima de 10 kHz sin volverse quebradizos', -12, -6),
      S('dbw-ms6', 'Limiter & True Peak', 'Ceiling at -1 dBTP, and the limiter is doing 3 to 5 dB, not 10',
                   'Limitador y True Peak', 'Techo en -1 dBTP y el limitador trabaja 3 a 5 dB, no 10', -10, -2),
      S('dbw-ms7', 'Loudness Target', 'Integrated loudness lands between -8 and -6 LUFS for club translation',
                   'Objetivo de Loudness', 'El loudness integrado cae entre -8 y -6 LUFS para que traduzca en club', -10, -2),
      S('dbw-ms8', 'Export & Platform Check', 'WAV 24-bit delivered and the normalized streaming version checked',
                   'Exportacion y Prueba de Plataforma', 'WAV de 24 bits entregado y la version normalizada de streaming comprobada', -10, -2),
    ],
  };

  // ══════════════════════════════════════════════════════════════
  //  PERREO
  // ══════════════════════════════════════════════════════════════
  P['perreo'] = {
    songwriting: [
      S('per-sw1', 'Body Test', 'The idea is judged standing up: if it does not move the hips, it is not the song',
                   'Prueba del Cuerpo', 'La idea se juzga de pie: si no mueve la cadera, no es el tema'),
      S('per-sw2', 'Hook Repetition', 'The hook is short and repeats enough to be memorized on first listen',
                   'Repeticion del Gancho', 'El gancho es corto y se repite lo suficiente para memorizarse a la primera'),
      S('per-sw3', 'Tempo Pocket', 'BPM is set between 92 and 105 and stays there — no tempo changes',
                   'Pocket de Tempo', 'El BPM se fija entre 92 y 105 y se queda ahi: sin cambios de tempo'),
      S('per-sw4', 'Sensual Cadence', 'The vocal phrasing lays back behind the beat rather than pushing it',
                   'Cadencia Sensual', 'El fraseo vocal se echa atras del beat en vez de empujarlo'),
      S('per-sw5', 'Lyric Angle', 'The lyric commits to one point of view and one scene from start to finish',
                   'Angulo de la Letra', 'La letra se compromete con un punto de vista y una escena de principio a fin'),
      S('per-sw6', 'Loop Demo', 'A phone recording of voice over the raw loop already sounds like the record',
                   'Demo sobre el Loop', 'Una grabacion de telefono con la voz sobre el loop crudo ya suena al tema'),
    ],
    production: [
      S('per-pd1', 'Reference Track', 'A club perreo reference is loaded at matched loudness',
                   'Track de Referencia', 'Una referencia de perreo de club esta cargada a loudness igualado', -30, -12),
      S('per-pd2', 'Dembow Groove', 'The dembow is programmed with swing and human timing, not quantized flat',
                   'Groove del Dembow', 'El dembow esta programado con swing y timing humano, no cuadriculado plano', -28, -10),
      S('per-pd3', 'Sub Bass', 'A clean sine sub carries the low end and is tuned to the key, one note at a time',
                   'Sub Bajo', 'Un sub de seno limpio lleva el grave y esta afinado a la tonalidad, nota a nota', -26, -10),
      S('per-pd4', 'Hypnotic Loop', 'A two or four bar melodic loop repeats without fatiguing — subtraction over addition',
                   'Loop Hipnotico', 'Un loop melodico de dos o cuatro compases se repite sin cansar: restar antes que sumar', -26, -10),
      S('per-pd5', 'Percussion Groove', 'Shakers, congas and rim hits fill the sixteenths that the dembow leaves open',
                   'Groove de Percusion', 'Shakers, congas y golpes de aro rellenan las semicorcheas que el dembow deja abiertas', -24, -8),
      S('per-pd6', 'Lead Vocal', 'The lead is recorded close and intimate — proximity is part of the style',
                   'Voz Principal', 'La voz se graba cerca e intima: la proximidad es parte del estilo', -22, -8),
      S('per-pd7', 'Vocal Layers', 'Whispers, doubles and low octaves thicken the hook without raising its volume',
                   'Capas Vocales', 'Susurros, dobles y octavas graves engordan el gancho sin subir su volumen', -22, -8),
      S('per-pd8', 'Texture & Atmosphere', 'One atmospheric layer (pad, noise, room) glues the loop and hides the seams',
                   'Textura y Atmosfera', 'Una capa atmosferica (pad, ruido, sala) pega el loop y esconde las costuras', -22, -8),
      S('per-pd9', 'Arrangement', 'Sections change by dropping elements out, and the beat never fully stops for long',
                   'Arreglo', 'Las secciones cambian quitando elementos y el beat nunca se detiene del todo mucho tiempo', -20, -6),
      S('per-pd10','Transitions', 'Filter sweeps and a single reverse hit mark each section change',
                   'Transiciones', 'Barridos de filtro y un unico golpe invertido marcan cada cambio de seccion', -20, -6),
    ],
    mix: [
      S('per-mx1', 'Session Prep', 'Drums, bass, music and vocals are grouped and gain-staged before processing',
                   'Preparacion de Sesion', 'Bateria, bajo, musica y voces estan agrupadas y con gain staging antes de procesar', -24, -14),
      S('per-mx2', 'Static Balance', 'The faders alone give a hypnotic, danceable balance',
                   'Balance Estatico', 'Solo con faders el balance ya es hipnotico y bailable', -22, -14),
      S('per-mx3', 'Sub Control', 'The sub is mono, sits below the kick and never wobbles in level between notes',
                   'Control del Sub', 'El sub es mono, se sienta bajo el bombo y no baila de nivel entre notas', -22, -12),
      S('per-mx4', 'Kick Definition', 'The kick has a click above 2 kHz so it reads on small speakers',
                   'Definicion del Bombo', 'El bombo tiene un click por encima de 2 kHz para que se lea en altavoces pequenos', -20, -10),
      S('per-mx5', 'Groove Balance', 'Percussion sits under the drums but stays audible in the gaps',
                   'Balance del Groove', 'La percusion se sienta bajo la bateria pero sigue audible en los huecos', -20, -10),
      S('per-mx6', 'Vocal Intimacy', 'Compression keeps the vocal close and even without making it loud or harsh',
                   'Intimidad Vocal', 'La compresion mantiene la voz cerca y pareja sin hacerla fuerte ni dura', -20, -10),
      S('per-mx7', 'Width Placement', 'Wide elements are decorative — the groove stays centered and mono-safe',
                   'Colocacion de la Anchura', 'Los elementos anchos son decorativos: el groove queda centrado y a salvo en mono', -18, -8),
      S('per-mx8', 'Reverb Depth', 'A medium plate places the vocal in a room without pushing it back',
                   'Profundidad de Reverb', 'Un plate medio coloca la voz en una sala sin empujarla hacia atras', -18, -8),
      S('per-mx9', 'Loop Fatigue Check', 'Listened end to end twice: nothing repeats itself into annoyance',
                   'Prueba de Fatiga del Loop', 'Escuchado entero dos veces: nada se repite hasta molestar', -16, -6),
      S('per-mx10','Club & Phone Check', 'Checked loud on a system and quiet on a phone — both keep the groove',
                   'Prueba de Club y Telefono', 'Comprobado alto en un sistema y bajo en un telefono: el groove aguanta en ambos', -16, -6),
    ],
    mastering: [
      S('per-ms1', 'Reference at Matched Loudness', 'A perreo master is level-matched for honest A/B',
                   'Referencia a Loudness Igualado', 'Un master de perreo esta igualado en nivel para un A/B honesto', -16, -10),
      S('per-ms2', 'Headroom Check', 'Mix peaks near -6 dBFS with nothing on the master bus',
                   'Revision de Headroom', 'La mezcla pica cerca de -6 dBFS sin nada en el bus master', -16, -10),
      S('per-ms3', 'Sub Energy', 'The sub keeps its weight after limiting — checked on a subwoofer or headphones that reach 30 Hz',
                   'Energia del Sub', 'El sub conserva su peso tras el limitado, comprobado en subwoofer o cascos que lleguen a 30 Hz', -14, -8),
      S('per-ms4', 'Glue Compression', 'Slow bus compression at 2 to 3 dB keeps the loop breathing as one piece',
                   'Compresion de Pegamento', 'Compresion de bus lenta a 2 o 3 dB mantiene el loop respirando como una sola pieza', -14, -8),
      S('per-ms5', 'Warmth vs Air', 'Saturation adds warmth without dulling the shakers and hats',
                   'Calidez vs Aire', 'La saturacion aporta calidez sin apagar shakers y hats', -12, -6),
      S('per-ms6', 'Limiter & True Peak', 'Ceiling at -1 dBTP and the groove still swings after limiting',
                   'Limitador y True Peak', 'Techo en -1 dBTP y el groove sigue con swing tras el limitado', -10, -2),
      S('per-ms7', 'Loudness Target', 'Integrated loudness between -9 and -7 LUFS, matched to the reference',
                   'Objetivo de Loudness', 'Loudness integrado entre -9 y -7 LUFS, igualado a la referencia', -10, -2),
      S('per-ms8', 'Export & Platform Check', 'WAV 24-bit exported and the normalized version auditioned',
                   'Exportacion y Prueba de Plataforma', 'WAV de 24 bits exportado y la version normalizada escuchada', -10, -2),
    ],
  };

  // ══════════════════════════════════════════════════════════════
  //  LATIN TRAP
  // ══════════════════════════════════════════════════════════════
  P['latin-trap'] = {
    songwriting: [
      S('ltr-sw1', 'Melodic Hook', 'The hook is sung, not rapped, and it works over a single held chord',
                   'Gancho Melodico', 'El gancho es cantado, no rapeado, y funciona sobre un solo acorde sostenido'),
      S('ltr-sw2', 'Mood & Palette', 'The emotional register (dark, romantic, cocky) is decided before any sound is chosen',
                   'Mood y Paleta', 'El registro emocional (oscuro, romantico, chulo) esta decidido antes de elegir ningun sonido'),
      S('ltr-sw3', 'Tempo & Key', 'BPM sits between 130 and 150 with a half-time feel, in a minor key',
                   'Tempo y Tonalidad', 'El BPM cae entre 130 y 150 con sensacion de half-time, en tonalidad menor'),
      S('ltr-sw4', 'Flow Variation', 'Verse and chorus use clearly different flows — the change is what sells the section',
                   'Variacion del Flow', 'Verso y coro usan flows claramente distintos: el cambio es lo que vende la seccion'),
      S('ltr-sw5', 'Lyrics & Ad-libs', 'Verses are written and the ad-lib answers are chosen line by line',
                   'Letra y Ad-libs', 'Los versos estan escritos y las respuestas de ad-libs elegidas linea a linea'),
      S('ltr-sw6', 'Melody Test', 'The hook holds up hummed with no autotune and no beat',
                   'Prueba de Melodia', 'El gancho aguanta tarareado sin autotune y sin beat'),
    ],
    production: [
      S('ltr-pd1', 'Reference Track', 'A latin trap reference is loaded at matched loudness',
                   'Track de Referencia', 'Una referencia de trap latino esta cargada a loudness igualado', -30, -12),
      S('ltr-pd2', 'Chord Bed', 'A dark loop — guitar, piano or bell — sets the mood in four bars',
                   'Cama de Acordes', 'Un loop oscuro (guitarra, piano o campana) fija el mood en cuatro compases', -28, -12),
      S('ltr-pd3', '808 Design', 'The 808 is tuned to the key, with the right decay and a distortion character chosen on purpose',
                   'Diseno del 808', 'El 808 esta afinado a la tonalidad, con el decay correcto y un caracter de distorsion elegido a proposito', -26, -10),
      S('ltr-pd4', 'Drum Pattern', 'Kick and 808 lock together while the snare or clap holds the backbeat in half time',
                   'Patron de Bateria', 'Bombo y 808 encajan mientras la caja o el clap sostiene el backbeat en half time', -26, -10),
      S('ltr-pd5', 'Hi-Hat Rolls', 'Hats carry the energy with triplet and 1/32 rolls placed where the vocal rests',
                   'Rolls de Hi-Hat', 'Los hats llevan la energia con rolls de tresillos y 1/32 colocados donde la voz descansa', -24, -8),
      S('ltr-pd6', 'Lead Vocal & Tuning', 'The lead is comped and tuned to taste — the tuning is an instrument, not a repair',
                   'Voz Principal y Afinacion', 'La voz esta compilada y afinada al gusto: la afinacion es un instrumento, no una reparacion', -22, -8),
      S('ltr-pd7', 'Harmonies & Doubles', 'Chorus harmonies and octave doubles turn the hook into a wall',
                   'Armonias y Dobles', 'Las armonias del coro y los dobles en octava convierten el gancho en un muro', -22, -8),
      S('ltr-pd8', 'Ad-libs', 'Ad-libs answer every other line and are recorded as their own performance',
                   'Ad-libs', 'Los ad-libs responden en lineas alternas y se graban como interpretacion propia', -22, -8),
      S('ltr-pd9', 'Arrangement', 'Intro, verse, chorus and a stripped bridge — one section removes the 808 entirely',
                   'Arreglo', 'Intro, verso, coro y un puente desnudo: una seccion quita el 808 por completo', -20, -6),
      S('ltr-pd10','Transitions & FX', 'Risers, reverse hits and a beat cut before each chorus mark the changes',
                   'Transiciones y FX', 'Risers, golpes invertidos y un corte de beat antes de cada coro marcan los cambios', -20, -6),
    ],
    mix: [
      S('ltr-mx1', 'Session Prep', 'Vocals, 808, drums and music are grouped with clean gain staging',
                   'Preparacion de Sesion', 'Voces, 808, bateria y musica estan agrupadas con gain staging limpio', -24, -14),
      S('ltr-mx2', 'Static Balance', 'Vocal and 808 sit on top of a fader-only balance and the song already works',
                   'Balance Estatico', 'La voz y el 808 mandan en un balance solo de faders y el tema ya funciona', -22, -14),
      S('ltr-mx3', '808 & Kick Split', 'Kick owns the transient, 808 owns the sustain — decided with an EQ split, not by luck',
                   'Reparto 808 y Bombo', 'El bombo se queda el transitorio y el 808 el sostenido, decidido con un corte de EQ, no por suerte', -22, -12),
      S('ltr-mx4', '808 Distortion Check', 'The 808 keeps its harmonics so it survives on phone speakers',
                   'Revision de Distorsion del 808', 'El 808 conserva sus armonicos para sobrevivir en altavoces de telefono', -20, -10),
      S('ltr-mx5', 'Vocal Chain', 'De-esser, EQ, two-stage compression and saturation put the vocal in front',
                   'Cadena Vocal', 'De-esser, EQ, compresion en dos etapas y saturacion ponen la voz al frente', -20, -10),
      S('ltr-mx6', 'Autotune Blend', 'The tuning artifacts are deliberate and consistent across every vocal layer',
                   'Mezcla del Autotune', 'Los artefactos de afinacion son deliberados y consistentes en todas las capas vocales', -20, -10),
      S('ltr-mx7', 'Ad-lib & Harmony Space', 'Ad-libs and harmonies are panned and ducked under the lead',
                   'Espacio de Ad-libs y Armonias', 'Ad-libs y armonias estan paneados y agachados bajo la voz principal', -18, -8),
      S('ltr-mx8', 'Hi-Hat Balance', 'Rolls are audible but never sharp — high shelf checked at low volume',
                   'Balance de Hi-Hats', 'Los rolls se oyen pero nunca pinchan: shelf de agudos comprobado a bajo volumen', -18, -8),
      S('ltr-mx9', 'Depth: Delay & Reverb', 'A tempo-synced delay throws on the last word of phrases and the reverb stays short',
                   'Profundidad: Delay y Reverb', 'Un delay sincronizado lanza la ultima palabra de las frases y la reverb se queda corta', -16, -6),
      S('ltr-mx10','Phone & Car Check', 'The 808 and the vocal both survive a phone speaker and a car',
                   'Prueba de Telefono y Carro', 'El 808 y la voz sobreviven al altavoz del telefono y al carro', -16, -6),
    ],
    mastering: [
      S('ltr-ms1', 'Reference at Matched Loudness', 'A latin trap master is loaded and level-matched',
                   'Referencia a Loudness Igualado', 'Un master de trap latino esta cargado e igualado en nivel', -16, -10),
      S('ltr-ms2', 'Headroom Check', 'Mix peaks around -6 dBFS with a clean master bus',
                   'Revision de Headroom', 'La mezcla pica sobre -6 dBFS con el bus master limpio', -16, -10),
      S('ltr-ms3', '808 Consistency', 'Every 808 note reaches the same perceived level after the chain',
                   'Consistencia del 808', 'Cada nota del 808 llega al mismo nivel percibido tras la cadena', -14, -8),
      S('ltr-ms4', 'Multiband Control', 'A multiband tames the sub without flattening the drums',
                   'Control Multibanda', 'Un multibanda controla el sub sin aplanar la bateria', -14, -8),
      S('ltr-ms5', 'Vocal Presence', 'The vocal stays in front after limiting — checked at low volume',
                   'Presencia Vocal', 'La voz sigue al frente tras el limitado, comprobado a bajo volumen', -12, -6),
      S('ltr-ms6', 'Limiter & True Peak', 'Ceiling at -1 dBTP with 3 to 6 dB of limiting, no pumping on the 808',
                   'Limitador y True Peak', 'Techo en -1 dBTP con 3 a 6 dB de limitado y sin bombeo en el 808', -10, -2),
      S('ltr-ms7', 'Loudness Target', 'Integrated loudness between -9 and -7 LUFS',
                   'Objetivo de Loudness', 'Loudness integrado entre -9 y -7 LUFS', -10, -2),
      S('ltr-ms8', 'Export & Platform Check', 'WAV 24-bit exported and the streaming-normalized version checked',
                   'Exportacion y Prueba de Plataforma', 'WAV de 24 bits exportado y la version normalizada de streaming comprobada', -10, -2),
    ],
  };

  // Subgenre spellings that resolve to an existing pack
  ALIASES['reggaeton-romantico'] = 'reggaeton';
  ALIASES['regueton'] = 'reggaeton';
  ALIASES['reguleton'] = 'reggaeton';
  ALIASES['reggaeton-pop'] = 'reggaeton';
  ALIASES['dembow-dominicano'] = 'dembow';
  ALIASES['trap-latino'] = 'latin-trap';
  ALIASES['latin-trap-espanol'] = 'latin-trap';

  // ── APPEND NEW PACKS ABOVE THIS LINE ──────────────────────────

  window.STEP_PACKS = P;
  window.SUBGENRE_ALIASES = ALIASES;
})();
