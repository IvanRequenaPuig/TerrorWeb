

//main.js//

const T = document.body.classList.contains('ppag') ? 3300 : 1800;
addEventListener('load', () => setTimeout(() => document.getElementById('loader')?.classList.add('fuera'), T));
const $ = s => document.querySelector(s);
/* Escaparate de películas */
const rail = $('#rail');
if (rail) {
    let c = 0, tm, L = 0; const lista = JSON.parse(localStorage.getItem('lista') || '[]');
    rail.innerHTML = M.map((m, i) => `<button class="cp" data-i="${i}" aria-label="${m.t}"><span class="pt">${m.t}</span><img src="${m.p}" alt="Póster de ${m.t}" onerror="this.remove()"></button>`).join('');
    const cards = [...rail.children], n = M.length;
    function ver(i) {
        c = (i + n) % n; const m = M[c];
        cards.forEach((el, j) => { let o = j - c; if (o > n / 2) o -= n; if (o < -n / 2) o += n; const a = Math.abs(o); el.style.transform = `translateX(${o * 185}px) scale(${o ? .78 : 1.12})`; el.style.opacity = a > 2 ? 0 : 1 - a * .3; el.style.zIndex = 9 - a; el.style.pointerEvents = a > 2 ? 'none' : 'auto' });
        const bb = [...$('#sbg').children];
        L = 1 - L;
        bb[L].style.backgroundImage = `url("${m.f}")`;
        bb[L].classList.add('on'); bb[1 - L].classList.remove('on');
        $('#st').textContent = m.t; $('#sm').innerHTML = `<span>${m.a}</span><span>${m.d}</span><span>${m.g}</span>`; $('#ss').textContent = m.s; $('#sv').href = 'villano.html?id=' + m.k;
        $('#sl').textContent = lista.includes(m.t) ? '✓ En mi lista' : '+ Mi lista'
    }
    rail.addEventListener('click', e => { const b = e.target.closest('.cp'); if (b) ver(+b.dataset.i) });
    $('#sl').addEventListener('click', () => { const t = M[c].t, i = lista.indexOf(t); i < 0 ? lista.push(t) : lista.splice(i, 1); localStorage.setItem('lista', JSON.stringify(lista)); ver(c) });
    const auto = () => { clearInterval(tm); tm = setInterval(() => ver(c + 1), 7000) };
    rail.addEventListener('mouseenter', () => clearInterval(tm)); rail.addEventListener('mouseleave', auto);
    addEventListener('keydown', e => { if (e.key === 'ArrowRight') ver(c + 1); if (e.key === 'ArrowLeft') ver(c - 1) });
    ver(0); auto();
}
/* Villanos */
const lista = $('#villanos-lista');
if (lista) lista.innerHTML = K.map(k => `<div class="col-6 col-lg-4"><a class="tarjeta" href="villano.html?id=${k.id}" style="--ac:${k.c}"><span class="emb">${k.e}</span><img src="img/${k.id}.jpg" alt="${k.n}" onerror="this.remove()"><div class="info"><h3>${k.n}</h3><p>${k.t}</p></div></a></div>`).join('');
/* (el bloque antiguo de #prods se ha eliminado: ahora las productoras las pinta el carrusel de abajo) */

/* Ranking de fans */
const val = JSON.parse(localStorage.getItem('votos') || '{}'); let modo = 'g';
function media(k, m) { const [a, n] = k[m], u = val[k.id + m]; return u ? [(a * n + u) / (n + 1), n + 1] : [a, n] }
function ranking() {
    const f = $('#filas'); if (!f) return;
    f.innerHTML = [...K].sort((a, b) => media(b, modo)[0] - media(a, modo)[0]).map((k, i) => {
        const [m, n] = media(k, modo), u = val[k.id + modo] || 0;
        return `<div class="fila"><span class="pos">${i + 1}</span><div class="grow"><b style="color:${k.c}">${k.n}</b><div class="progress"><div class="progress-bar" style="width:${m * 20}%;background:${k.c}"></div></div><small>${m.toFixed(2)}/5 · ${n} votos</small></div><div class="calaveras">${[1, 2, 3, 4, 5].map(s => `<button class="${s <= u ? 'on' : ''}" data-k="${k.id}" data-s="${s}" aria-label="${s} de 5">☠</button>`).join('')}</div></div>`
    }).join('')
}
ranking();
$('#pestanas')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; modo = b.dataset.m; document.querySelectorAll('#pestanas button').forEach(x => x.classList.toggle('on', x === b)); ranking() });
$('#filas')?.addEventListener('click', e => { const b = e.target.closest('.calaveras button'); if (!b) return; val[b.dataset.k + modo] = +b.dataset.s; localStorage.setItem('votos', JSON.stringify(val)); ranking() });

/* ===== Títulos con letras animadas + aparición al hacer scroll ===== */
(() => {
    document.querySelectorAll('.seccion h2').forEach(h => {
        const txt = h.textContent.trim(); let i = 0;
        h.setAttribute('aria-label', txt);
        h.classList.add('split');
        h.innerHTML = txt.split(' ').map(w =>
            `<span class="w">${[...w].map(c => `<span class="ch" aria-hidden="true" style="--i:${i++}">${c}</span>`).join('')}</span>`
        ).join(' ');
    });
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in'); io.unobserve(e.target);
    }), { threshold: .25 });
    document.querySelectorAll('.split, .reveal').forEach(el => io.observe(el));
})();






/* ===== PRODUCTORAS DE CINE DE TERROR (carrusel con fondo que cambia) =====
   Imágenes que puedes añadir por productora (todas opcionales, ruta = id de data.js):
   - img/productoras/fondo-<id>.jpg  -> fondo de TODA la sección cuando esa productora está seleccionada
   - img/productoras/<id>-card.jpg   -> imagen de ambiente de la parte de arriba de la tarjeta
   - img/productoras/<id>.png        -> logo (el mismo que ya usa el carrusel de sellos)
   Si falta alguna, se usa un degradado con el color de la productora y el nombre en texto. */
(() => {
    const sec = $('#productoras'), track = $('#pr-track');
    if (!sec || !track || typeof P === 'undefined') return;

    /* textos de la imagen de diseño; si la productora no está aquí se usa p.t de data.js */
    const DESC = [
        ['atomic', 'Especializados en el terror moderno, han producido grandes éxitos como The Nun y The Conjuring.'],
        ['blumhouse', 'La productora que ha revitalizado el género con películas como Get Out, Insidious o The Purge.'],
        ['new line', 'El hogar de clásicos del terror como Pesadilla en Elm Street, Viernes 13 o Destino Final.'],
        ['legendary', 'Con una mezcla de terror y grandes producciones, han llevado el género a otro nivel.'],
        ['a24', 'Una productora moderna que apuesta por el terror artístico y psicológico. Midsommar, Hereditary, X...']
    ];
    const txt = p => { const k = p.n.toLowerCase(), d = DESC.find(([s]) => k.includes(s)); return d ? d[1] : p.t };

    /* ╔════════════════════════════════════════════════════════════════════╗
       ║  AQUÍ CAMBIAS LAS IMÁGENES DE CADA PRODUCTORA                      ║
       ║  La clave (a la izquierda) es el  id  de la productora en data.js. ║
       ║    card  -> foto de la parte de arriba de la tarjeta               ║
       ║    logo  -> logo (PNG transparente, opcional)                      ║
       ║    fondo -> fondo de TODA la sección cuando está seleccionada      ║
       ║  Si dejas una ruta vacía ('') no se muestra nada y se usa el       ║
       ║  degradado con el color de la productora.                          ║
       ╚════════════════════════════════════════════════════════════════════╝ */
   const PR_IMG = {
    'blumhouse': { card: 'img/productoras/blumhouse.jpg', logo: 'img/productoras/blumhouse.jpg', fondo: 'img/productoras/blumhouse.jpg' },
    'atomic-monster': { card: 'img/productoras/atomic.jpg', logo: '', fondo: 'img/productoras/atomic.jpg' },
    'a24': { card: 'img/productoras/A24.jpg', logo: 'img/productoras/a24.png', fondo: 'img/productoras/A24.jpg' },
    'hammer': { card: 'img/productoras/hammer.jpg', logo: 'img/productoras/hammer.png', fondo: 'img/productoras/hammer.jpg' },
     'new-line': { card: 'img/productoras/newlinecinema.jpg', logo: 'img/productoras/newline.png', fondo: 'img/productoras/fondoNewline.jpg' },
    'legendary': { card: 'img/productoras/legendary.jpg', logo: 'img/productoras/legendary.png', fondo: 'img/productoras/legendary.jpg' },
    'lionsgate': { card: 'img/productoras/lionsgate.jpg', logo: 'img/productoras/lionsgate.png', fondo: 'img/productoras/lionsgate.jpg' }
};
    /* Si una productora NO está en PR_IMG usa estas rutas por defecto (según su id) */
    const img = (p, k) => {
        const c = PR_IMG[p.id];
        if (c && k in c) return c[k];
        return { card: `img/productoras/${p.id}-card.jpg`, logo: `img/productoras/${p.id}.png`, fondo: `img/productoras/fondo-${p.id}.jpg` }[k];
    };
    /* Abre la consola (F12) para ver los ids exactos que debes poner arriba */
    console.log('IDs de productoras:', P.map(p => p.id));

    const n = P.length, bgs = [...sec.querySelectorAll('.prl')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0, L = 0, timer, hover = false, seen = false;

    track.innerHTML = P.map((p, i) => `
<article class="pr-c" data-i="${i}" style="--ac:${p.c}">
  <div class="pr-art">
    ${img(p, 'card') ? `<img class="pr-cbg" src="${img(p, 'card')}" alt="" onload="this.parentNode.querySelector('.pr-fb')?.remove()" onerror="this.remove()">` : ''}
    <span class="pr-fb">${p.n}</span>
    ${img(p, 'logo') ? `<img class="pr-logo" src="${img(p, 'logo')}" alt="${p.n}" onload="this.parentNode.querySelector('.pr-fb')?.remove()" onerror="this.remove()">` : ''}
  </div>
  <div class="pr-body">
    <h3>${p.n}</h3>
    <p>${txt(p)}</p>
    <a class="pr-more" href="productora.html?id=${p.id}">Ver más <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg></a>
  </div>
</article>`).join('');
    const cards = [...track.children];

    const vis = () => innerWidth >= 1800 ? 5 : innerWidth >= 1200 ? 4 : innerWidth >= 700 ? 3 : innerWidth >= 520 ? 2 : 1;
        function slide() {
        const w = cards[0].offsetWidth, gap = parseFloat(getComputedStyle(track).columnGap) || 24, v = vis();
        const off = n <= v ? 0 : Math.max(0, Math.min(cur - Math.floor(v / 2), n - v));
        track.style.transform = `translateX(${-off * (w + gap)}px)`;
    }

    function show(i) {
        cur = (i + n) % n; const p = P[cur];
        cards.forEach((c, j) => c.classList.toggle('on', j === cur));
        slide();
        /* fondo con fundido entre dos capas */
        L = 1 - L;
        const fondo = img(p, 'fondo');
        bgs[L].style.backgroundImage = `${fondo ? `url("${fondo}"), ` : ''}radial-gradient(circle at 70% 25%, ${p.c}66, #050404 72%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
        sec.style.setProperty('--hot', p.c);
    }

    const start = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!hover && seen) show(cur + 1) }, 6000) };

    track.addEventListener('click', e => { if (e.target.closest('a')) return; const c = e.target.closest('.pr-c'); if (c) { show(+c.dataset.i); start() } });
    $('#pr-prev').addEventListener('click', () => { show(cur - 1); start() });
    $('#pr-next').addEventListener('click', () => { show(cur + 1); start() });
    const stage = $('#pr-stage');
    stage.addEventListener('mouseenter', () => hover = true);
    stage.addEventListener('mouseleave', () => hover = false);
    new IntersectionObserver(es => { seen = es[0].isIntersecting }, { threshold: .3 }).observe(sec);
    let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(slide, 120) });

    show(0); start();
})();

/* ===== VIDEOJUEGOS DE TERROR (fondo + textos de la derecha + tráiler) =====
   Cada juego tiene 3 rutas que puedes cambiar aquí mismo:
   - p -> póster de la tarjeta           (img/videojuegos/<id>.jpg)
   - f -> fondo de TODA la sección       (img/videojuegos/fondo-<id>.jpg)
   - v -> tráiler que abre "Ver tráiler" (video/videojuegos/<id>.mp4)
   Si falta una imagen se usa un degradado con el color "c" del juego.
   Para añadir un juego nuevo copia una línea del array VJ. */
(() => {
    const sec = $('#videojuegos'), track = $('#vj-track');
    if (!sec || !track) return;

    const VJ = [
        {
            id: 'silenthill2', n: 'Silent Hill 2', y: 2024, c: '#8d99a6',
            d: 'James recibe una carta de su esposa fallecida y viaja a Silent Hill. Niebla, culpa y monstruos que nacen de su propia mente.',
            fecha: '8 oct 2024', plat: 'PS5 · PC', gen: 'Survival Horror',
            p: 'img/videojuegos/silentHill.png', f: 'img/videojuegos/silentHill.png', v: 'video/videojuegos/silenthill2.mp4'
        },
        {
            id: 'lastofus', n: 'The Last of Us Part I', y: 2022, c: '#c0623a',
            d: 'Joel y Ellie cruzan unos Estados Unidos devastados por una infección. Sobrevivir cuesta más que el miedo a los infectados.',
            fecha: '2 sep 2022', plat: 'PS5 · PC', gen: 'Acción · Survival Horror',
            p: 'img/videojuegos/lastofus.jpg', f: 'img/videojuegos/lastofus.jpg', v: 'video/videojuegos/lastofus.mp4'
        },
        {
            id: 're2', n: 'Resident Evil 2', y: 2019, c: '#b3121a',
            d: 'Raccoon City ha caído. Dos historias, un mismo destino: sobrevivir. El clásico que redefinió el género de terror.',
            fecha: '25 ene 2019', plat: 'PS4 · Xbox One · PC', gen: 'Survival Horror',
            p: 'img/videojuegos/residentevil2.jpg', f: 'img/videojuegos/residentevil2.jpg', v: 'video/videojuegos/re2.mp4'
        },
        {
            id: 'outlast', n: 'Outlast', y: 2013, c: '#4f7a3a',
            d: 'Un periodista entra en un manicomio abandonado con una cámara y sin armas. Lo único que puede hacer es huir y esconderse.',
            fecha: '4 sep 2013', plat: 'PC · PS4 · Xbox One', gen: 'Survival Horror',
            p: 'img/videojuegos/outlast.jpg', f: 'img/videojuegos/outlastPrueba.jpg', v: 'video/videojuegos/outlast.mp4'
        },
        {
            id: 'dbd', n: 'Dead by Daylight', y: 2016, c: '#d8402a',
            d: 'Un asesino contra cuatro supervivientes. Reparad generadores, escapad y no os dejéis atrapar por Michael Myers, Ghostface y compañía.',
            fecha: '14 jun 2016', plat: 'PC · PS · Xbox · Switch', gen: 'Terror asimétrico online',
            p: 'img/videojuegos/dead.jpg', f: 'img/videojuegos/daylight.jpg', v: 'video/videojuegos/dbd.mp4'
        },
        {
            id: 'evilwithin2', n: 'The Evil Within 2', y: 2017, c: '#9b8a6c',
            d: 'Sebastian Castellanos vuelve a una realidad distorsionada para rescatar a su hija. Cada rincón de Union esconde una pesadilla.',
            fecha: '13 oct 2017', plat: 'PS4 · Xbox One · PC', gen: 'Survival Horror',
            p: 'img/videojuegos/theEvil.jpg', f: 'img/videojuegos/evilgood.jpg', v: 'video/videojuegos/evilwithin2.mp4'
        },
        {
            id: 'amnesia', n: 'Amnesia: The Dark Descent', y: 2010, c: '#a05a1c',
            d: 'Despiertas en un castillo oscuro sin recordar quién eres. No puedes luchar: solo esconderte, y la oscuridad te enloquece.',
            fecha: '8 sep 2010', plat: 'PC · PS4 · Xbox One', gen: 'Survival Horror',
            p: 'img/videojuegos/amnesia.jpg', f: 'img/videojuegos/theamnesia.png', v: 'video/videojuegos/amnesia.mp4'
        }
    ];
    const INICIO = 2; /* juego seleccionado al cargar (0 = el primero) */

    const n = VJ.length, bgs = [...sec.querySelectorAll('.vjl')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = INICIO, L = 0, timer, hover = false, seen = false, open = false, first = true;

    track.innerHTML = VJ.map((g, i) => `
<button class="vj-c" data-i="${i}" style="--ac:${g.c}" aria-label="${g.n}">
  <span class="vj-art"><span class="vj-fb">${g.n}</span><img src="${g.p}" alt="Póster de ${g.n}" onload="this.previousElementSibling.remove()" onerror="this.remove()"></span>
  <span class="vj-cap"><b>${g.n}</b><small>${g.y || ''}</small></span>
</button>`).join('');
    const cards = [...track.children];

    const vis = () => innerWidth >= 1400 ? 7 : innerWidth >= 1200 ? 6 : innerWidth >= 992 ? 5 : innerWidth >= 700 ? 4 : innerWidth >= 520 ? 3 : 2;
    function slide() {
        const v = vis(); track.style.setProperty('--v', v);
        const w = cards[0].offsetWidth, gap = parseFloat(getComputedStyle(track).columnGap) || 19;
        const off = n <= v ? 0 : Math.max(0, Math.min(cur - Math.floor(v / 2), n - v));
        track.style.transform = `translateX(${-off * (w + gap)}px)`;
    }

    const titulo = t => `<b>${t.charAt(0)}</b>${t.slice(1)}`;
    function show(i) {
        cur = (i + n) % n; const g = VJ[cur];
        cards.forEach((c, j) => c.classList.toggle('on', j === cur));
        slide();
        /* fondo con fundido entre dos capas */
        L = 1 - L;
        bgs[L].style.backgroundImage = `${g.f ? `url("${g.f}"), ` : ''}radial-gradient(circle at 50% 25%, ${g.c}77, #050404 72%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
        /* textos de la derecha: salen, cambian y entran */
        const set = () => {
            $('#vj-t').innerHTML = titulo(g.n);
            $('#vj-d').textContent = g.d;
            $('#vj-fecha').textContent = `Lanzamiento: ${g.fecha}`;
            $('#vj-plat').textContent = `Plataformas: ${g.plat}`;
            $('#vj-gen').textContent = `Género: ${g.gen}`;
            sec.classList.remove('swap');
        };
        if (first) { first = false; set() } else { sec.classList.add('swap'); setTimeout(set, 280) }
    }

    const start = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!hover && seen && !open) show(cur + 1) }, 7000) };

    track.addEventListener('click', e => { const c = e.target.closest('.vj-c'); if (c) { show(+c.dataset.i); start() } });
    $('#vj-prev').addEventListener('click', () => { show(cur - 1); start() });
    $('#vj-next').addEventListener('click', () => { show(cur + 1); start() });
    const stage = $('#vj-stage');
    stage.addEventListener('mouseenter', () => hover = true);
    stage.addEventListener('mouseleave', () => hover = false);
    new IntersectionObserver(es => { seen = es[0].isIntersecting }, { threshold: .3 }).observe(sec);
    let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(slide, 120) });

    /* tráiler */
    const modal = $('#vj-modal'), vid = $('#vj-mv'), msg = $('#vj-mm');
    function abrir() {
        const g = VJ[cur];
        $('#vj-mt').textContent = g.n;
        $('#vj-my').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(g.n + ' tráiler oficial')}`;
        const sinVideo = () => { vid.hidden = true; msg.hidden = false };
        msg.hidden = true; vid.hidden = false;
        vid.onerror = sinVideo;
        if (g.v) { vid.src = g.v; vid.play().catch(() => { }) } else sinVideo();
        modal.hidden = false; open = true;
    }
    function cerrar() { vid.pause(); vid.removeAttribute('src'); vid.load(); modal.hidden = true; open = false }
    $('#vj-play').addEventListener('click', abrir);
    $('#vj-mx').addEventListener('click', cerrar);
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) cerrar() });

    show(cur); start();
})();
/* ===== ARCHIVO DE PESADILLAS =====
   ╔════════════════════════════════════════════════════════════════════╗
   ║  AQUÍ CAMBIAS LAS IMÁGENES Y EL CLIP DE CADA PERSONAJE             ║
   ║    p -> imagen de la TARJETA pequeña (vertical, aprox. 9:19)       ║
   ║    g -> imagen GRANDE de la derecha (si la dejas '' usa la de p)   ║
   ║    f -> FONDO de toda la sección (horizontal)                      ║
   ║    v -> clip que abre el botón play (.mp4)                         ║
   ║  Si una ruta está vacía ('') o no existe, se usa un degradado.     ║
   ║  Para añadir un personaje, copia una línea del array AP.           ║
   ╚════════════════════════════════════════════════════════════════════╝ */
(() => {
const AP = [
    {
        id: 'jason', n: 'Jason Voorhees', r: 'El asesino de Crystal Lake', y: 1980, ic: '🏒', c: '#ff3b1f',
        d: 'Un asesino que nunca murió. Regresa al lago para continuar lo que empezó hace años.',
        p: 'img/archivo/jason.png', g: 'img/archivo/jasonPrueba.png', f: 'img/archivo/fondoJason.jpg', v: 'video/archivo/jason.mp4'
    },
    {
        id: 'freddy', n: 'Freddy Krueger', r: 'El rey de las pesadillas', y: 1984, ic: '🖐', c: '#ff7a1a',
        d: 'Te persigue cuando duermes. Si él te mata en el sueño, no despiertas.',
        p: 'img/archivo/freddy.png', g: 'img/archivo/freddyPrueba.png', f: 'img/archivo/freddyFondo.jpg', v: 'video/archivo/freddy.mp4'
    },
    {
        id: 'ghostface', n: 'Ghostface', r: 'La voz al otro lado del teléfono', y: 1996, ic: '👻', c: '#9aa7b8',
        d: 'Llama, te conoce y juega contigo antes de atacar. Nadie en el pueblo está a salvo.',
        p: 'img/archivo/ghostface.png', g: 'img/archivo/ghostfacePrueba.png', f: 'img/archivo/fondoGhostface.jpg', v: 'video/archivo/ghostface.mp4'
    },
    {
        id: 'pennywise', n: 'Pennywise', r: 'El payaso de Derry', y: 1986, ic: '🤡', c: '#e0301e',
        d: 'Cada 27 años vuelve a Derry. Se alimenta del miedo de los niños.',
        p: 'img/archivo/pennywise.png', g: 'img/archivo/pennwiseprueba.png', f: 'img/archivo/pennywiseFondo.jpg', v: 'video/archivo/pennywise.mp4'
    },
        {
        id: 'myers', n: 'Michael Myers', r: 'La noche de Halloween', y: 1978, ic: '🔪', c: '#c9c2a8',
        d: 'Sin palabras, sin prisa y sin piedad. Vuelve a Haddonfield cada Halloween.',
        p: 'img/archivo/michael.jpg', g: 'img/archivo/michaelPrueba.png', f: 'img/archivo/michaelFondo.jpg', v: 'video/archivo/myers.mp4'
    },
    {
        id: 'chucky', n: 'Chucky', r: 'El muñeco poseído', y: 1988, ic: '🪆', c: '#d8402a',
        d: 'Un muñeco con el alma de un asesino en serie. Solo quiere un cuerpo nuevo.',
        p: 'img/archivo/chucky.jpg', g: 'img/archivo/ChuckyPrueba.png', f: 'img/archivo/fondoChucky.jpg', v: 'video/archivo/chucky.mp4'
    }
];
    const q = s => document.querySelector(s);
    const sec = q('#archivo'); if (!sec) return;
    const track = q('#ap-track'), dots = q('#ap-dots'), img = q('#ap-img'), fb = q('#ap-fb');
    const bgs = [...sec.querySelectorAll('.apl')];
    const DUR = 8000, n = AP.length;
    let cur = 0, L = 0, raf, t0 = 0, paused = false, first = true;

    /* tarjetas y puntos */
    track.innerHTML = AP.map((p, i) => `<button class="ap-c" data-i="${i}" style="--ac:${p.c}" aria-label="${p.n}">${p.p ? `<img src="${p.p}" alt="" onerror="this.remove()">` : ''}</button>`).join('');
    dots.innerHTML = AP.map((p, i) => `<button data-i="${i}" aria-label="Ver ${p.n}"></button>`).join('');
    const cards = [...track.children], dbtn = [...dots.children];

    const visible = () => innerWidth <= 600 ? 3 : 4;
    function slide() {
        const w = cards[0].offsetWidth, gap = parseFloat(getComputedStyle(track).columnGap) || 16;
        const off = Math.max(0, Math.min(cur - (visible() - 1), n - visible()));
        track.style.transform = `translateX(${-off * (w + gap)}px)`;
    }

    function fmt(ms) { const s = Math.min(DUR, ms) / 1000 | 0; return '00:0' + s }
    function loop(t) {
        if (!t0) t0 = t;
        if (!paused) {
            const e = t - t0;
            q('#ap-bar').style.width = Math.min(100, e / DUR * 100) + '%';
            q('#ap-time').textContent = `${fmt(e)} / 00:08`;
            if (e >= DUR) { show(cur + 1); return }
        } else t0 = t - (parseFloat(q('#ap-bar').style.width) || 0) / 100 * DUR;
        raf = requestAnimationFrame(loop);
    }
    function restart() { cancelAnimationFrame(raf); t0 = 0; q('#ap-bar').style.width = '0%'; raf = requestAnimationFrame(loop) }

    function show(i) {
        cur = (i + n) % n; const p = AP[cur];
        cards.forEach((c, j) => c.classList.toggle('on', j === cur));
        dbtn.forEach((d, j) => d.classList.toggle('on', j === cur));
        slide();
        /* fondo con fundido entre dos capas */
        L = 1 - L;
        bgs[L].style.backgroundImage = `${p.f ? `url("${p.f}"), ` : ''}radial-gradient(circle at 70% 30%, ${p.c}55, #050404 70%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
        sec.style.setProperty('--hot', p.c);
        /* imagen grande + textos: salen, cambian y entran */
        const set = () => {
            const grande = p.g || p.p;
            fb.textContent = p.n; img.alt = p.n;
            if (grande) {
                img.style.display = '';
                img.onerror = () => { img.style.display = 'none' };
                img.src = grande;
            } else img.style.display = 'none';
            q('#ap-n').textContent = p.n;
            q('#ap-m').textContent = `${p.r} · ${p.y}`;
            q('#ap-d').textContent = p.d;
            sec.classList.remove('swap');
        };
        if (first) { first = false; set() } else { sec.classList.add('swap'); setTimeout(set, 320) }
        restart();
    }

    /* eventos */
    track.addEventListener('click', e => { const b = e.target.closest('.ap-c'); if (b) show(+b.dataset.i) });
    dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i) });
    q('#ap-next').addEventListener('click', () => show(cur + 1));
    sec.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1) });
    addEventListener('resize', slide);

    /* solo avanza solo cuando la sección se ve */
    new IntersectionObserver(es => { paused = !es[0].isIntersecting || !q('#ap-modal').hidden }, { threshold: .3 }).observe(sec);

    /* clip del personaje */
    const modal = q('#ap-modal'), vid = q('#ap-mv'), msg = q('#ap-mm');
    function abrir() {
        const p = AP[cur];
        q('#ap-mt').textContent = p.n;
        const sinVideo = () => { vid.hidden = true; msg.hidden = false };
        msg.hidden = true; vid.hidden = false;
        vid.onerror = sinVideo;
        if (p.v) { vid.src = p.v; vid.play().catch(() => { }) } else sinVideo();
        modal.hidden = false; paused = true;
    }
    function cerrar() { vid.pause(); vid.removeAttribute('src'); vid.load(); modal.hidden = true; paused = false }
    q('#ap-play').addEventListener('click', abrir);
    q('#ap-mx').addEventListener('click', cerrar);
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) cerrar() });

    show(0);
})();

/* =====================================================================
   EL MAPA DEL TERROR
   Por lugar:  img  -> imagen grande de la tarjeta
               th   -> miniatura de la lista de la derecha
               v    -> vídeo del botón "Ver vídeo"
   Para añadir un lugar, copia un bloque del array MP.
   ===================================================================== */
(() => {
    const sec = $('#mapa'); if (!sec) return;

    const MP = [
        {
            id: 'amityville', n: 'Casa encantada de Amityville', pais: 'Nueva York, EE. UU.', q: 'Amityville Horror House',
            r: 'Aquí fue asesinada la familia DeFeo en 1974. Los siguientes inquilinos huyeron aterrados.',
            d: 'En 1974, la familia DeFeo fue asesinada en esta casa. Años después, los nuevos inquilinos comenzaron a vivir fenómenos paranormales que la convirtieron en una de las casas más famosas del mundo.',
            img: 'img/mapa/amityville.jpg', th: 'img/mapa/amityville.jpg', v: 'video/mapa/amityville.mp4'
        },
        {
            id: 'aokigahara', n: 'Bosque de Aokigahara', pais: 'Japón', q: 'Aokigahara Forest',
            r: 'Conocido como el "bosque de los suicidios". Sus árboles retorcidos y el silencio absoluto lo hacen inquietante.',
            d: 'Al pie del monte Fuji, este bosque denso y silencioso está rodeado de leyendas. Dicen que las brújulas fallan y que nadie se siente solo entre sus árboles retorcidos.',
            img: 'img/mapa/aokigahara.jpg', th: 'img/mapa/aokigahara.jpg', v: 'video/mapa/aokigahara.mp4'
        },
        {
            id: 'munecas', n: 'Isla de las Muñecas', pais: 'México', q: 'Isla de las Muñecas Xochimilco',
            r: 'Miles de muñecas cuelgan de los árboles de esta isla. Dicen que están malditas... y que no están solas.',
            d: 'En los canales de Xochimilco, un hombre colgó muñecas por toda la isla para proteger el lugar de un espíritu. Hoy hay miles, y los visitantes aseguran que susurran.',
            img: 'img/mapa/islajuguete.jpg', th: 'img/mapa/islajuguete.jpg', v: 'video/mapa/munecas.mp4'
        },
        {
            id: 'waverly', n: 'Túnel de Waverly Hills', pais: 'EE. UU.', q: 'Waverly Hills Sanatorium',
            r: 'Antiguo hospital de tuberculosis. Hoy es uno de los lugares más paranormales de América.',
            d: 'Miles de enfermos murieron en este sanatorio de Kentucky. Su túnel, llamado "el tubo de la muerte", es hoy un imán para cazadores de fantasmas.',
            img: 'img/mapa/hospitalfantasma.jpg', th: 'img/mapa/hospitalfantasma.jpg', v: 'video/mapa/waverly.mp4'
        },
        {
            id: 'bran', n: 'Castillo de Bran', pais: 'Rumanía', q: 'Castillo de Bran Rumania',
            r: 'Se asocia con la leyenda de Drácula. Su historia y su atmósfera lo convierten en un lugar de pesadilla.',
            d: 'Sobre una roca de Transilvania, este castillo medieval inspiró la leyenda de Drácula. Sus torres y pasadizos siguen alimentando historias de vampiros.',
            img: 'img/mapa/castilloBran.jpg', th: 'img/mapa/castilloBran.jpg', v: 'video/mapa/bran.mp4'
        }
    ];
    const INICIO = 0;
    let cur = INICIO, first = true, open = false;

    const img = $('#mp-img'), fb = $('#mp-fb');
    const lista = $('#mp-list');

    /* miniatura de la lista: usa p.th */
    const itemHTML = (p, i) => `<li><button class="mp-item" data-i="${i}" aria-label="Ver ${p.n}">
  <span class="mp-th"><img src="${p.th}" alt="${p.n}" onerror="this.remove()"></span>
  <span><span class="mp-tag">${p.n}</span><small>${p.pais}</small><p>${p.r}</p></span>
  <em aria-hidden="true">→</em></button></li>`;

    function pintar() {
        const p = MP[cur];
        fb.textContent = p.n; fb.style.display = '';
        img.style.display = ''; img.alt = p.n;
        img.onload = () => { fb.style.display = 'none' };
        img.onerror = () => { img.style.display = 'none' };
        img.src = p.img;                       /* imagen grande: usa p.img */
        $('#mp-n').textContent = p.n;
        $('#mp-p').textContent = p.pais;
        $('#mp-d').textContent = p.d;
        $('#mp-more').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q)}`;
        lista.innerHTML = MP.map((x, i) => i === cur ? '' : itemHTML(x, i)).join('');
        sec.classList.remove('swap');
    }

    function show(i) {
        cur = (i + MP.length) % MP.length;
        if (first) { first = false; pintar() } else { sec.classList.add('swap'); setTimeout(pintar, 300) }
    }

    lista.addEventListener('click', e => { const b = e.target.closest('.mp-item'); if (b) show(+b.dataset.i) });

    /* vídeo */
    const modal = $('#mp-modal'), vid = $('#mp-mv'), msg = $('#mp-mm');
    function abrir() {
        const p = MP[cur];
        $('#mp-mt').textContent = p.n;
        msg.hidden = true; vid.hidden = false;
        vid.onerror = () => { vid.hidden = true; msg.hidden = false };
        vid.src = p.v;                         /* vídeo: usa p.v */
        modal.hidden = false; open = true;
        vid.play().catch(() => { });
    }
    function cerrar() { vid.pause(); vid.removeAttribute('src'); vid.load(); modal.hidden = true; open = false }
    $('#mp-play').addEventListener('click', abrir);
    $('#mp-mx').addEventListener('click', cerrar);
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => { if (e.key === 'Escape' && open) cerrar() });

    show(INICIO);
})();





/* =====================================================================
   main.js: SUSTITUYE el bloque anterior del RANKING DE FANS por este
   (empieza en "(() => {" con const sec = $('#ranking') y acaba en "})();")
   ===================================================================== */
(() => {
    const sec = $('#ranking'), main = $('#rk-main'), list = $('#rk-list');
    if (!sec || !main || !list) return;

    /* ╔════════════════════════════════════════════════════════════════════╗
       ║  AQUÍ CAMBIAS LAS IMÁGENES DE CADA OBRA                            ║
       ║  La clave (izquierda) es el id de la obra (1ª columna de RK).      ║
       ║    1ª ruta -> imagen GRANDE de las tarjetas del top 3              ║
       ║    2ª ruta -> miniatura de la lista Top 5 de la derecha            ║
       ║  Si dejas la 2ª ruta vacía ('') usa la misma imagen de la grande.  ║
       ║  Si una ruta no existe, se ve un degradado oscuro.                 ║
       ╚════════════════════════════════════════════════════════════════════╝ */
    const IMG = {
        /* series */
        twd: ['img/ranking/twd.jpeg', 'img/ranking/twd-mini.jpg'],
        tlou: ['img/ranking/thelastofus.jpg', 'img/ranking/tlou-mini.jpg'],
        ahs: ['img/ranking/HorrorStory.jpg', 'img/ranking/ahs-mini.jpg'],
        st: ['img/ranking/Stranger.jpg', 'img/ranking/st-mini.jpg'],
        hillhouse: ['img/ranking/Maldicion.jpg', 'img/ranking/hillhouse-mini.jpg'],
        /* películas */
        it: ['img/ranking/it.jpg', 'img/ranking/it-mini.jpg'],
        shining: ['img/ranking/resplandor.jpg', 'img/ranking/shining-mini.jpg'],
        warren: ['img/ranking/expedienteWarren.jpg', 'img/ranking/warren-mini.jpg'],
        saw: ['img/ranking/saw.jpg', 'img/ranking/saw-mini.jpg'],
        hereditary: ['img/ranking/hereditary.jpg', 'img/ranking/hereditary-mini.jpg'],
        /* videojuegos */
        re2: ['img/ranking/residentevil.jpg', 'img/ranking/re2-mini.jpg'],
        sh2: ['img/ranking/silentHill.png', 'img/ranking/sh2-mini.jpg'],
        outlast: ['img/ranking/outlast.jpg', 'img/ranking/outlast-mini.jpg'],
        dbd: ['img/ranking/daylight.jpg', 'img/ranking/dbd-mini.jpg'],
        amnesia: ['img/ranking/theamnesia.png', 'img/ranking/amnesia-mini.jpg'],
        /* libros */
        itlibro: ['img/ranking/LibroIt.jpg', 'img/ranking/itlibro-mini.jpg'],
        dracula: ['img/ranking/dracula.jpg', 'img/ranking/dracula-mini.jpg'],
        frankenstein: ['img/ranking/frankestein.jpg', 'img/ranking/frankenstein-mini.jpg'],
        petsematary: ['img/ranking/cementerioAnimales.jpg', 'img/ranking/petsematary-mini.jpg'],
        resplandorlibro: ['img/ranking/LibroResplandor.jpg', 'img/ranking/resplandorlibro-mini.jpg'],
        /* personajes */
        jason: ['img/ranking/jason.jpg', 'img/ranking/jason-mini.jpg'],
        freddy: ['img/ranking/freddy.jpg', 'img/ranking/freddy-mini.jpg'],
        pennywise: ['img/ranking/pennywise.jpg', 'img/ranking/pennywise-mini.jpg'],
        myers: ['img/ranking/myers.jpg', 'img/ranking/myers-mini.jpg'],
        chucky: ['img/ranking/chucky.jpeg', 'img/ranking/chucky-mini.jpg']
    };
    const big = i => (IMG[i[0]] || [])[0] || `img/ranking/${i[0]}.jpg`;
    const mini = i => (IMG[i[0]] || [])[1] || big(i);

    /* Columnas: [id, categoría, nombre, géneros, descripción, votos en miles, nota] */
    const LAB = { serie: 'Serie', pelicula: 'Película', juego: 'Videojuego', libro: 'Libro', personaje: 'Personaje' };
    const RK = [
        ['twd', 'serie', 'The Walking Dead', 'Terror · Zombies', 'La serie que redefinió el género zombi. Una historia de supervivencia, traición y esperanza en un mundo sin reglas.', 12.4, 9.3],
        ['tlou', 'serie', 'The Last of Us', 'Drama · Terror', 'Un mundo infectado y un vínculo imposible de romper entre Joel y Ellie.', 8.1, 9.0],
        ['ahs', 'serie', 'American Horror Story', 'Terror · Antología', 'Cada temporada, una casa, un asilo o un hotel distinto con su propia pesadilla.', 7.0, 8.4],
        ['st', 'serie', 'Stranger Things', 'Terror · Sci-fi', 'Un pueblo, un portal y un mundo del revés que lo cambia todo.', 6.8, 8.7],
        ['hillhouse', 'serie', 'La maldición de Hill House', 'Terror · Drama', 'Una familia, una casa y los fantasmas que nunca la dejaron salir.', 5.2, 8.6],

        ['it', 'pelicula', 'IT (Eso)', 'Terror · Supernatural', 'El terror tiene un nombre... y vuelve cada 27 años.', 9.7, 8.8],
        ['shining', 'pelicula', 'El Resplandor', 'Terror · Psicológico', 'Un hotel aislado, un invierno eterno y una locura que no deja de crecer.', 7.8, 9.1],
        ['warren', 'pelicula', 'Expediente Warren', 'Terror · Sobrenatural', 'Los casos de los Warren, entre casas encantadas y demonios.', 7.4, 8.5],
        ['saw', 'pelicula', 'Saw', 'Terror · Gore', 'Dos hombres, una habitación y un juego macabro.', 6.9, 8.4],
        ['hereditary', 'pelicula', 'Hereditary', 'Terror · Psicológico', 'El duelo de una familia se convierte en una pesadilla sin salida.', 6.5, 8.6],

        ['re2', 'juego', 'Resident Evil 2 (Remake)', 'Terror · Supervivencia', 'Un clásico que nunca muere. El remake que volvió a poner Raccoon City en el mapa.', 10.8, 9.2],
        ['sh2', 'juego', 'Silent Hill 2', 'Terror · Psicológico', 'Niebla, culpa y monstruos que nacen de la mente de James.', 8.9, 9.2],
        ['outlast', 'juego', 'Outlast', 'Terror · Supervivencia', 'Un manicomio, una cámara y ningún arma.', 6.1, 8.5],
        ['dbd', 'juego', 'Dead by Daylight', 'Terror · Online', 'Un asesino contra cuatro supervivientes.', 5.8, 8.0],
        ['amnesia', 'juego', 'Amnesia: The Dark Descent', 'Terror · Supervivencia', 'Un castillo oscuro donde solo puedes esconderte.', 5.2, 8.6],

        ['itlibro', 'libro', 'It', 'Terror · Novela', 'La novela de Stephen King que dio vida a Pennywise.', 5.5, 9.0],
        ['dracula', 'libro', 'Drácula', 'Terror · Clásico', 'El conde de Transilvania en el clásico gótico de Bram Stoker.', 4.8, 8.9],
        ['frankenstein', 'libro', 'Frankenstein', 'Terror · Clásico', 'La criatura que Mary Shelley devolvió a la vida.', 4.4, 8.8],
        ['petsematary', 'libro', 'Cementerio de animales', 'Terror · Novela', 'Hay lugares donde es mejor no enterrar a nadie.', 3.9, 8.7],
        ['resplandorlibro', 'libro', 'El Resplandor (novela)', 'Terror · Novela', 'El hotel Overlook en la obra original de Stephen King.', 3.7, 8.9],

        ['jason', 'personaje', 'Jason Voorhees', 'Slasher · Viernes 13', 'El asesino de Crystal Lake que nunca muere.', 7.6, 8.7],
        ['freddy', 'personaje', 'Freddy Krueger', 'Slasher · Pesadilla', 'Te persigue cuando duermes.', 7.4, 8.8],
        ['pennywise', 'personaje', 'Pennywise', 'Payaso · Sobrenatural', 'Cada 27 años vuelve a Derry.', 7.2, 8.8],
        ['myers', 'personaje', 'Michael Myers', 'Slasher · Halloween', 'Sin palabras, sin prisa y sin piedad.', 6.9, 8.6],
        ['chucky', 'personaje', 'Chucky', 'Muñeco · Slasher', 'Un muñeco con el alma de un asesino en serie.', 6.1, 8.1]
    ];
    const COL = ['#c8c2b0', '#b3121a', '#e0301e', '#8d99a6', '#c0623a'];
    const tags = i => `${LAB[i[1]]} · ${i[3]}`;
    const url = i => `https://www.google.com/search?q=${encodeURIComponent(i[2] + ' terror')}`;
    /* la miniatura prueba su ruta; si falla, prueba la grande; si también falla, se quita */
    const thumb = i => `<img src="${mini(i)}" alt="${i[2]}" onerror="if(!this.dataset.r){this.dataset.r=1;this.src='${big(i)}'}else this.remove()">`;

    const card = (i, k) => `<article class="rk-c rk-${k}" style="--ac:${COL[k - 1]}">
  <img class="rk-bgimg" src="${big(i)}" alt="" onerror="this.remove()">
  <span class="rk-num">${k}</span>
  ${k === 1 ? '<p class="rk-top1"><span>♛</span> #1 Más votado</p>' : ''}
  <div class="rk-ct"><h3>${i[2]}</h3><p class="rk-tags">${tags(i)}</p><p class="rk-d">${i[4]}</p>
  <p class="rk-v"><b>★ ${i[6].toFixed(1)}</b> · ${i[5]}K votos</p>
  <a class="rk-btn" href="${url(i)}" target="_blank" rel="noopener">${k === 1 ? 'Ver en el ranking' : 'Ver más'} →</a></div></article>`;

    const row = (i, k) => `<li style="--ac:${COL[(k - 1) % 5]}"><span class="rk-th"><em>${k}</em>${thumb(i)}</span>
  <span><b>${i[2]}</b><small>${tags(i)}</small><span><i>★</i>${i[5]}K</span></span></li>`;

    let first = true;
    function pintar(cat) {
        const t = RK.filter(i => cat === 'todos' || i[1] === cat).sort((a, b) => b[5] - a[5]);
        main.innerHTML = t.slice(0, 3).map((i, k) => card(i, k + 1)).join('');
        list.innerHTML = t.slice(0, 5).map((i, k) => row(i, k + 1)).join('');
        sec.classList.remove('swap');
    }
    function show(cat) {
        if (first) { first = false; pintar(cat) } else { sec.classList.add('swap'); setTimeout(() => pintar(cat), 280) }
    }

    $('#rk-menu').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#rk-menu button').forEach(x => x.classList.toggle('on', x === b));
        show(b.dataset.c);
    });

    show('todos');
})();





(() => {
    const sec = $('#villanos'), list = $('#as-list');
    if (!sec || !list) return;

    /* ╔════════════════════════════════════════════════════════════════════╗
       ║  1) FONDO DE CADA PESTAÑA (se ve al elegir Todos, Asesinos en      ║
       ║     serie, Criminales famosos, Casos reales, Películas)            ║
       ╚════════════════════════════════════════════════════════════════════╝ */
    const BG = {
        todos: { f: 'img/asesinos/todos.jpg', c: '#b3121a' },
        serie: { f: 'img/asesinos/asesinoSerie.jpg', c: '#8d99a6' },
        famosos: { f: 'img/asesinos/criminalesFamosos.jpg', c: '#c0623a' },
        reales: { f: 'img/asesinos/casosReales.jpg', c: '#6a6f78' },
        pelis: { f: 'img/asesinos/peliculaInspiracion.jpg', c: '#ff3b1f' }
    };

    /* ╔════════════════════════════════════════════════════════════════════╗
       ║  2) CADA ASESINO / CASO                                            ║
       ║    p    -> foto de la tarjeta                                      ║
       ║    f    -> FONDO PROPIO de ese asesino: al pasar el ratón por su   ║
       ║            tarjeta la sección cambia a este fondo; al salir       ║
       ║            vuelve al fondo de la pestaña                           ║
       ║    href -> página a la que lleva la tarjeta                        ║
       ║    t    -> en qué pestañas sale ('todos' = los 5 destacados)       ║
       ╚════════════════════════════════════════════════════════════════════╝ */
    const AS = [
        {
            id: 'myers', n: 'Michael Myers', s: 'Halloween', d: 'Un niño que nunca debió volver. La leyenda de Michael Myers aún sigue viva.',
            p: 'img/asesinos/myers.png', f: 'img/asesinos/michael.jpg', href: 'villano.html?id=myers', t: ['todos', 'pelis']
        },
        {
            id: 'bundy', n: 'Ted Bundy', s: 'El encanto del mal', d: 'Inteligente, carismático y letal. Uno de los asesinos en serie más conocidos de la historia.',
            p: 'img/asesinos/tedBundy.png', f: 'img/asesinos/fondoted.jpg', href: 'villano.html?id=bundy', t: ['todos', 'serie', 'famosos', 'reales']
        },
        {
            id: 'gacy', n: 'John Wayne Gacy', s: 'El payaso asesino', d: 'Detrás de la sonrisa de un payaso se escondía un monstruo.',
            p: 'img/asesinos/payaso.png', f: 'img/asesinos/fondoJohn.jpg', href: 'villano.html?id=gacy', t: ['todos', 'serie', 'famosos', 'reales']
        },
        {
            id: 'dahmer', n: 'Jeffrey Dahmer', s: 'El caníbal de Milwaukee', d: 'Su casa era un infierno. Sus víctimas, jóvenes y vulnerables.',
            p: 'img/asesinos/dahmer.png', f: 'img/asesinos/jeffreyFondo.jpg', href: 'villano.html?id=dahmer', t: ['todos', 'serie', 'famosos', 'reales']
        },
        {
            id: 'zodiac', n: 'Zódiac', s: 'El asesino del Zodiaco', d: 'Un enigma sin resolver. ¿Quién era el hombre detrás de los crímenes?',
            p: 'img/asesinos/zodiaco.png', f: 'img/asesinos/zodiacoFondo.jpeg', href: 'villano.html?id=zodiac', t: ['todos', 'serie', 'famosos', 'reales']
        },

        {
            id: 'gein', n: 'Ed Gein', s: 'El carnicero de Plainfield', d: 'Un caso real que inspiró a Psicosis y a La matanza de Texas.',
            p: 'img/asesinos/edgein.jpg', f: 'img/asesinos/fondogein.jpg', href: 'villano.html?id=gein', t: ['serie', 'reales', 'pelis']
        },
        {
            id: 'ripper', n: 'Jack el Destripador', s: 'El misterio de Whitechapel', d: 'Londres, 1888. Un asesino jamás identificado que sigue fascinando al mundo.',
            p: 'img/asesinos/jack.jpg', f: 'img/asesinos/fondojack.jpg', href: 'villano.html?id=ripper', t: ['famosos', 'reales']
        },
        {
            id: 'manson', n: 'Charles Manson', s: 'La Familia', d: 'El líder de una secta cuyos crímenes marcaron toda una época.',
            p: 'img/asesinos/charles.jpg', f: 'img/asesinos/charles.jpg', href: 'villano.html?id=manson', t: ['famosos', 'reales']
        },
        {
            id: 'jason', n: 'Jason Voorhees', s: 'Viernes 13', d: 'Un asesino que nunca murió. Regresa al lago una y otra vez.',
            p: 'img/asesinos/jason.jpg', f: 'img/asesinos/jason.jpg', href: 'villano.html?id=jason', t: ['pelis']
        },
        {
            id: 'leatherface', n: 'Leatherface', s: 'La matanza de Texas', d: 'Una familia, una motosierra y una carretera en la que no debes parar.',
            p: 'img/asesinos/leather.jpg', f: 'img/asesinos/leather.jpg', href: 'villano.html?id=leatherface', t: ['pelis']
        },
        {
            id: 'bates', n: 'Norman Bates', s: 'Psicosis', d: 'El dueño del motel que cambió el cine de terror para siempre.',
            p: 'img/asesinos/norman.jpg', f: 'img/asesinos/Fondonorman.jpg', href: 'villano.html?id=bates', t: ['pelis']
        }
    ];

    const bgs = [...sec.querySelectorAll('.asl')];
    let L = 0, first = true, cur = 'todos', hov = null;

    const card = a => `<a class="as-c" href="${a.href}" data-id="${a.id}">
  <span class="as-ph"><span class="as-fb">${a.n}</span><img src="${a.p}" alt="${a.n}" onload="this.previousElementSibling.remove()" onerror="this.remove()"></span>
  <h4>${a.n}</h4><small>${a.s}</small><p>${a.d}</p><em aria-hidden="true">→</em></a>`;

    /* pone un fondo (con fundido). b = { f: ruta, c: color de reserva } */
    function fondo(b) {
        L = 1 - L;
        bgs[L].style.backgroundImage = `${b.f ? `url("${b.f}"), ` : ''}radial-gradient(circle at 70% 25%, ${b.c}77, #050404 72%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
    }
    function pintar() {
        list.innerHTML = AS.filter(a => a.t.includes(cur)).map(card).join('');
        list.scrollLeft = 0;
        sec.classList.remove('swap');
    }
    function show(t) {
        cur = t; hov = null; fondo(BG[t]);
        if (first) { first = false; pintar() } else { sec.classList.add('swap'); setTimeout(pintar, 280) }
    }

    /* fondo propio del asesino al pasar el ratón / enfocar su tarjeta */
    const entra = e => {
        const c = e.target.closest('.as-c'); if (!c || c.dataset.id === hov) return;
        const a = AS.find(x => x.id === c.dataset.id); if (!a || !a.f) return;
        hov = a.id; fondo({ f: a.f, c: BG[cur].c });
    };
    const sale = () => { if (hov) { hov = null; fondo(BG[cur]) } };
    list.addEventListener('mouseover', entra);
    list.addEventListener('mouseleave', sale);
    list.addEventListener('focusin', entra);
    list.addEventListener('focusout', sale);

    $('#as-tabs').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#as-tabs button').forEach(x => x.classList.toggle('on', x === b));
        show(b.dataset.t);
    });

    show('todos');
})();



/* =====================================================================
   LIBROS DE TERROR
   ╔════════════════════════════════════════════════════════════════════╗
   ║  AQUÍ CAMBIAS LA IMAGEN DE CADA LIBRO                              ║
   ║    p -> portada del libro (formato vertical 3:4)                   ║
   ║  Si la ruta no existe, se ve el título sobre un degradado.         ║
   ║  Para añadir un libro, copia una línea del array LB.               ║
   ╚════════════════════════════════════════════════════════════════════╝
   ===================================================================== */
(() => {
    const list = $('#lb-list');
    if (!list) return;

    const LB = [
        { t: 'IT', a: 'Stephen King', c: '#b3121a', p: 'img/libros/it.jpg' },
        { t: 'La llamada de Cthulhu', a: 'H. P. Lovecraft', c: '#2a8f8a', p: 'img/libros/LallamadadeCthulhu.jpg' },
        { t: 'El cuervo', a: 'Edgar Allan Poe', c: '#8a2a35', p: 'img/libros/elCuervo.jpg' },
        { t: 'La casa de la noche', a: 'Jo Nesbø', c: '#3a5f8a', p: 'img/libros/casanoche.jpg' },
        { t: 'Nuestra parte de noche', a: 'Mariana Enríquez', c: '#b3121a', p: 'img/libros/partenoche.jpg' }
    ];

    list.innerHTML = LB.map((b, i) => `
<a class="lb-c" style="--ac:${b.c};--i:${i}" href="https://www.google.com/search?q=${encodeURIComponent(b.t + ' ' + b.a)}" target="_blank" rel="noopener" aria-label="${b.t}, ${b.a}">
  <span class="lb-cover"><span class="lb-fb">${b.t}</span>${b.p ? `<img src="${b.p}" alt="Portada de ${b.t}" onload="this.previousElementSibling.remove()" onerror="this.remove()">` : ''}</span>
  <b>${b.t}</b><small>${b.a}</small><em aria-hidden="true">→</em>
</a>`).join('');

    /* las tarjetas entran una a una al llegar con el scroll */
    new IntersectionObserver((es, io) => es.forEach(e => {
        if (!e.isIntersecting) return;
        list.classList.add('in'); io.unobserve(e.target);
    }), { threshold: .2 }).observe(list);
})();





/* =====================================================================
   LA HISTORIA DEL TERROR
   ╔════════════════════════════════════════════════════════════════════╗
   ║  AQUÍ CAMBIAS LA IMAGEN Y EL TEXTO DE CADA ÉPOCA                   ║
   ║    p  -> imagen de la época (horizontal, aprox. 4:3)               ║
   ║    ic -> icono de la línea (cam, fangs, atom, shower, mask,        ║
   ║          spiral, balloon, play)                                    ║
   ║  Si la ruta no existe, se ve el año sobre un degradado.            ║
   ║  Para añadir una época, copia un bloque del array HS.              ║
   ╚════════════════════════════════════════════════════════════════════╝
   Fondo de la sección: img/historia/fondo.jpg (se cambia en style.css, .hs-bg)
   ===================================================================== */
(() => {
    const sec = $('#historia'), track = $('#hs-track');
    if (!sec || !track) return;

    const ICON = {
        cam: '<circle cx="8" cy="6.5" r="3"/><circle cx="15.5" cy="6.5" r="3"/><rect x="4" y="11" width="12" height="7" rx="1"/><path d="M16 13l5-2v7l-5-2M8 18l-2 3.5M12 18v3.5M14 18l2 3.5"/>',
        fangs: '<path d="M3 7c4 3 14 3 18 0-1 6-4 9-6.5 14-1-3-1.5-5-2.5-5s-1.500 2-2.500 5C7 16 4 13 3 7z"/>',
        atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>',
        shower: '<path d="M4 21V9a4.500 4.500 0 0 1 9 0v1M10 11l9 4M12 17l1 2.500M15 16l1 2.500M18 14.500l1.500 2"/>',
        mask: '<path d="M12 3c-4 0-7 3-7 8 0 5 2 9 7 10 5-1 7-5 7-10 0-5-3-8-7-8z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M12 12v3M9 17.500h6M8.500 7l1 1M15.500 7l-1 1"/>',
        spiral: '<path d="M12 12c1 0 1.500-1 1-2s-2.500-1.500-3.500 0 0 4 2.500 4.500 5.500-1.500 5.500-4.500-2.500-6.500-6.500-6.500-8.500 3-8.500 7.500 4 9 9 9"/>',
        balloon: '<path class="fill" d="M12 3c-4 0-6 3-6 6s3 7 6 8c3-1 6-5 6-8s-2-6-6-6z"/><path d="M11 17.500l-1 2h4l-1-2M12 19.500c0 1.500 1 2 1 3"/>',
        play: '<circle cx="12" cy="12" r="9.500"/><path class="fill" d="M10 8l6 4-6 4z"/>'
    };

    const HS = [
        { y: '1920s', t: 'El cine mudo', d: 'El expresionismo alemán y los primeros clásicos del terror sientan las bases del género.', f: 'Nosferatu (1922)', p: 'img/historia/cinemudo.jpg', ic: 'cam', c: '#c8c2b0' },
        { y: '1930s', t: 'La época dorada', d: 'Drácula, Frankenstein y La Momia popularizan el terror en todo el mundo.', f: 'Drácula (1931)', p: 'img/historia/epocadorada.jpg', ic: 'fangs', c: '#8d99a6' },
        { y: '1950s', t: 'El miedo atómico', d: 'La Guerra Fría llena el cine de monstruos e invasiones, y la Hammer devuelve el color y la sangre al gótico.', f: 'La maldición de Frankenstein (1957)', p: 'img/historia/frankestein.jpg', ic: 'atom', c: '#4f7a3a' },
        { y: '1960s', t: 'El nuevo terror', d: 'Alfred Hitchcock y la psicología del miedo cambian las reglas del juego.', f: 'Psicosis (1960)', p: 'img/historia/1960.jpg', ic: 'shower', c: '#6a6f78' },
        { y: '1970s-80s', t: 'El slasher', d: 'El terror se vuelve más brutal y sangriento con los slashers y el cine independiente.', f: 'Viernes 13 (1980)', p: 'img/historia/viernes13.jpeg', ic: 'mask', c: '#c0623a' },
        { y: '1990s-2000s', t: 'El terror moderno', d: 'El terror psicológico y lo sobrenatural ganan terreno en una nueva generación de películas.', f: 'The Ring (2002)', p: 'img/historia/scream.jpg', ic: 'spiral', c: '#2a8f8a' },
        { y: '2010s', t: 'La era del remake', d: 'Los clásicos regresan y el terror se expande a nuevas plataformas y formatos.', f: 'It (2017)', p: 'img/historia/IT.jpg', ic: 'balloon', c: '#b3121a' },
        { y: '2020s', t: 'El terror digital', d: 'Las nuevas tecnologías, las redes y el streaming llevan el miedo a otro nivel.', f: 'Smile (2022)', p: 'img/historia/insidious.jpg', ic: 'play', c: '#ff2a2f' }
    ];

    const n = HS.length;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0, timer, hover = false, seen = false;

    /* épocas */
    track.innerHTML = HS.map((e, i) => `
<article class="hs-i" data-i="${i}" style="--ac:${e.c}" aria-label="${e.y}: ${e.t}">
  <div class="hs-top">
    <figure class="hs-ph"><span class="hs-in"><span class="hs-fb">${e.y}</span>${e.p ? `<img src="${e.p}" alt="${e.t}" loading="lazy" onload="this.previousElementSibling.remove()" onerror="this.remove()">` : ''}</span></figure>
    <h3>${e.y}</h3><b>${e.t}</b><p>${e.d}</p><em>${e.f}</em>
  </div>
  <div class="hs-node"><svg class="hs-ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[e.ic] || ''}</svg></div>
</article>`).join('');
    const cards = [...track.children];

    /* tira de película: reutiliza las imágenes de las épocas (se repite para que el bucle sea continuo) */
    const reel = $('#hs-reel');
    if (reel) {
        const fr = HS.map(e => `<span class="hs-fr">${e.p ? `<img src="${e.p}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>`).join('');
        reel.innerHTML = fr.repeat(4);
    }

    const vis = () => innerWidth >= 1500 ? 7 : innerWidth >= 1200 ? 5 : innerWidth >= 992 ? 4 : innerWidth >= 700 ? 3 : innerWidth >= 520 ? 2 : 1;
    function slide() {
        const v = vis(); track.style.setProperty('--v', v);
        const off = n <= v ? 0 : Math.max(0, Math.min(cur - Math.floor(v / 2), n - v));
        track.style.transform = `translateX(${-off * (100 / v)}%)`;
    }

    function show(i) {
        cur = (i + n) % n;
        cards.forEach((c, j) => c.classList.toggle('on', j === cur));
        slide();
    }

    const start = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!hover && seen) show(cur + 1) }, 5500) };

    track.addEventListener('click', e => { const c = e.target.closest('.hs-i'); if (c) { show(+c.dataset.i); start() } });
    $('#hs-prev').addEventListener('click', () => { show(cur - 1); start() });
    $('#hs-next').addEventListener('click', () => { show(cur + 1); start() });

    const stage = $('#hs-stage');
    stage.addEventListener('mouseenter', () => hover = true);
    stage.addEventListener('mouseleave', () => hover = false);

    /* deslizar con el dedo en móvil */
    let tx = 0;
    stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX }, { passive: true });
    stage.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 50) { show(cur + (dx < 0 ? 1 : -1)); start() }
    });

    new IntersectionObserver(es => { seen = es[0].isIntersecting }, { threshold: .3 }).observe(sec);
    let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(slide, 120) });

    show(0); start();
})();