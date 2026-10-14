//menu.js//
(() => {
    const nav = document.getElementById('top'), mega = document.getElementById('mega'), btns = [...document.querySelectorAll('.nl')], desk = matchMedia('(min-width:992px)');

    /* Si una imagen falla, prueba la siguiente ruta de la lista; si fallan todas, la quita (queda el título) */
    window.thErr = img => {
        const l = img.dataset.s.split('|'), i = +img.dataset.i + 1;
        if (i < l.length) { img.dataset.i = i; img.src = l[i] }
        else { console.warn('Menú: sin imagen para', img.alt, '→ probadas:', l.join(' , ')); img.remove() }
    };
    const th = (c, t, s) => {
        const L = [...new Set([].concat(s).filter(Boolean))];
        return `<div class="th" style="--ac:${c}"><span>${t}</span>${L.length ? `<img src="${L[0]}" alt="${t}" data-i="0" data-s="${L.join('|')}" loading="lazy" onerror="thErr(this)">` : ''}</div>`;
    };
    const tile = (c, t, sub, txt, src, l) => `<div class="mt1">${th(c, txt, src)}<b>${t}</b><small>${sub}</small><div class="ml">${l}</div></div>`;
    const side = (t, l) => `<ul class="mlinks"><li class="mh">${t}</li>${l.map(([a, h, x]) => `<li><a href="${h}"${x ? ` data-tipo="${x}"` : ''}>${a}</a></li>`).join('')}</ul>`;
    const C = [['Falta una película', 'Cuéntanos cuál echas en falta', '▶'], ['Falta un personaje', 'Un asesino que no sale', '☠'], ['Falta una productora', 'Un estudio que debería estar', '✦'], ['Falta un videojuego', 'Un juego que da miedo', '🎮'], ['Falta un libro', 'Una novela que no sale', '📖'], ['Reportar un error', 'Datos o enlaces mal', '⚠'], ['Colaborar', 'Imágenes, textos, ideas', '✎']];

    /* ---------- PRODUCTORAS (mismas imágenes que PR_IMG de main.js) ---------- */
    const PRI = {
        'blumhouse': ['img/productoras/blumhouse.jpg'],
        'atomic-monster': ['img/productoras/atomic.jpg'],
        'a24': ['img/productoras/A24.jpg', 'img/productoras/a24.png'],
        'hammer': ['img/productoras/hammer.jpg', 'img/productoras/hammer.png'],
        'new-line': ['img/productoras/newlinecinema.jpg', 'img/productoras/fondoNewline.jpg', 'img/productoras/newline.png'],
        'legendary': ['img/productoras/legendary.jpg', 'img/productoras/legendary.png'],
        'lionsgate': ['img/productoras/lionsgate.jpg', 'img/productoras/lionsgate.png']
    };
    const prodImg = p => [...(PRI[p.id] || []), `img/productoras/${p.id}-card.jpg`, `img/productoras/${p.id}.jpg`, `img/productoras/${p.id}.png`, `img/productoras/fondo-${p.id}.jpg`];

    /* ---------- SERIES ---------- */
    const SRK = [['walking', 'img/ranking/twd.jpeg'], ['horror story', 'img/ranking/HorrorStory.jpg'], ['hill house', 'img/ranking/Maldicion.jpg'], ['last of us', 'img/ranking/thelastofus.jpg'], ['stranger', 'img/ranking/Stranger.jpg']];
    const serImg = s => {
        const n = (s.n || '').toLowerCase(), r = SRK.filter(([k]) => n.includes(k)).map(x => x[1]);
        return [`img/series/${s.id}.jpg`, `img/series/${s.id}.png`, `img/series/${s.id}.jpeg`, `img/series/${s.id}.webp`, s.p, s.img, s.f, ...r];
    };

    const V = {
        /* PELÍCULAS: "Todas las películas" -> peliculas.html */
        pelis: [
            M.map(m => tile('#b3121a', m.t, `${m.a} · ${m.g}`, m.t, [m.p, `img/pelis/${sl(m.t + ' ' + m.a)}.jpg`, m.f], `<a href="villano.html?id=${m.k}">Ver ficha</a><a href="#ranking">Votar</a>`)),
            side('Cartelera del miedo', [
                ['Todas las películas', 'peliculas.html'],
                ['Escaparate', '#peliculas'],
                ['Las más gore', '#ranking'],
                ['Las más terroríficas', '#ranking'],
                ['Sugerir una película', '#contacto', 'Falta una película']
            ])
        ],
        /* PERSONAJES: "Todos los personajes" -> personajes.html (sin Art el Payaso ni Leatherface en el menú) */
        pers: [
            K.filter(k => !/art el payaso|leatherface/i.test(k.n)).map(k => tile(k.c, k.n, k.debut, k.e, [`img/${k.id}.jpg`, `img/archivo/${k.id}.png`, `img/archivo/${k.id}.jpg`, `img/asesinos/${k.id}.png`, `img/asesinos/${k.id}.jpg`, `img/ranking/${k.id}.jpg`], `<a href="villano.html?id=${k.id}">Expediente</a><a href="#ranking">Votar</a>`)),
            side('Los asesinos', [
                ['Todos los personajes', 'personajes.html'],
                ['Todos los asesinos', '#villanos'],
                ['Archivo de pesadillas', '#archivo'],
                ['Ranking de gore', '#ranking'],
                ['Ranking de terror', '#ranking'],
                ['Sugerir un personaje', '#contacto', 'Falta un personaje']
            ])
        ],
        prod: [P.map(p => tile(p.c, p.n, `Desde ${p.y}`, p.n, prodImg(p), `<a href="productora.html?id=${p.id}">Entrar</a><a href="productora.html?id=${p.id}">Su creador</a>`)), side('Los estudios', [['Todas las productoras', '#productoras'], ['La más antigua: Hammer', 'productora.html?id=hammer'], ['Sugerir una productora', '#contacto', 'Falta una productora']])],
        cont: [C.map(([t, s, g]) => tile('#b3121a', t, s, g, '', `<a href="#contacto" data-tipo="${t}">Escribir</a>`)), side('Escríbenos', [['Formulario de contacto', '#contacto'], ['Reportar un error', '#contacto', 'Reportar un error'], ['Colaborar', '#contacto', 'Colaborar']])]
    };
    V.ser = [S.map(s => tile(s.c, s.n, `${s.t.length} ${s.t.length > 1 ? 'temporadas' : 'temporada'} · ${s.r}`, s.n, serImg(s), `<a href="#series" data-serie="${s.id}">Ver serie</a>`)), side('Series de miedo', [['Todas las series', '#series'], ['Sugerir una serie', '#contacto', 'Falta una película']])];

    /* ---- datos para el menú: [id, título, extra, color, [imágenes]] ---- */
    const VJm = [
        ['silenthill2', 'Silent Hill 2', 'Survival Horror · 2024', '#8d99a6', ['img/videojuegos/silentHill.png', 'img/ranking/silentHill.png']],
        ['lastofus', 'The Last of Us Part I', 'Acción · 2022', '#c0623a', ['img/videojuegos/lastofus.jpg', 'img/ranking/thelastofus.jpg']],
        ['re2', 'Resident Evil 2', 'Survival Horror · 2019', '#b3121a', ['img/videojuegos/residentevil2.jpg', 'img/ranking/residentevil.jpg']],
        ['outlast', 'Outlast', 'Survival Horror · 2013', '#4f7a3a', ['img/videojuegos/outlast.jpg', 'img/ranking/outlast.jpg']],
        ['dbd', 'Dead by Daylight', 'Terror online · 2016', '#d8402a', ['img/videojuegos/dead.jpg', 'img/videojuegos/daylight.jpg', 'img/ranking/daylight.jpg']],
        ['evilwithin2', 'The Evil Within 2', 'Survival Horror · 2017', '#9b8a6c', ['img/videojuegos/theEvil.jpg', 'img/videojuegos/evilgood.jpg']],
        ['amnesia', 'Amnesia: The Dark Descent', 'Survival Horror · 2010', '#a05a1c', ['img/videojuegos/amnesia.jpg', 'img/videojuegos/theamnesia.png', 'img/ranking/theamnesia.png']]
    ];
    const LBm = [
        ['it', 'IT', 'Stephen King', '#b3121a', ['img/libros/it.jpg', 'img/ranking/LibroIt.jpg']],
        ['cthulhu', 'La llamada de Cthulhu', 'H. P. Lovecraft', '#2a8f8a', ['img/libros/LallamadadeCthulhu.jpg']],
        ['cuervo', 'El cuervo', 'Edgar Allan Poe', '#8a2a35', ['img/libros/elCuervo.jpg']],
        ['casanoche', 'La casa de la noche', 'Jo Nesbø', '#3a5f8a', ['img/libros/casanoche.jpg']],
        ['partenoche', 'Nuestra parte de noche', 'Mariana Enríquez', '#b3121a', ['img/libros/partenoche.jpg']]
    ];
    const MPm = [
        ['amityville', 'Casa de Amityville', 'Nueva York, EE. UU.', '#b3121a', ['img/mapa/amityville.jpg']],
        ['aokigahara', 'Bosque de Aokigahara', 'Japón', '#4f7a3a', ['img/mapa/aokigahara.jpg']],
        ['munecas', 'Isla de las Muñecas', 'México', '#c0623a', ['img/mapa/islajuguete.jpg']],
        ['waverly', 'Túnel de Waverly Hills', 'EE. UU.', '#8d99a6', ['img/mapa/hospitalfantasma.jpg']],
        ['bran', 'Castillo de Bran', 'Rumanía', '#8a2a35', ['img/mapa/castilloBran.jpg']]
    ];

    /* VIDEOJUEGOS: "Todos los videojuegos" -> videojuegos.html */
    V.vj = [VJm.map(([id, n, s, c, im]) => tile(c, n, s, n, im, `<a href="#videojuegos" data-juego="${id}">Ver juego</a><a href="#ranking">Votar</a>`)),
        side('Videojuegos de terror', [['Todos los videojuegos', 'videojuegos.html'], ['Los más votados', '#ranking'], ['Sugerir un videojuego', '#contacto', 'Falta un videojuego']])];

    V.lib = [LBm.map(([id, n, s, c, im]) => tile(c, n, s, n, im, `<a href="#libros">Ver libro</a><a href="#ranking">Votar</a>`)),
        side('Libros de terror', [['Todos los libros', '#libros'], ['Los más votados', '#ranking'], ['Sugerir un libro', '#contacto', 'Falta un libro']])];

    V.mapa = [MPm.map(([id, n, s, c, im]) => tile(c, n, s, n, im, `<a href="#mapa" data-lugar="${id}">Ver lugar</a>`)),
        side('Lugares malditos', [['Explora el mapa', '#mapa'], ['Sugerir un lugar', '#contacto', 'Colaborar']])];

    let cur = null;
    function abrir(k) { cur = k; mega.firstElementChild.innerHTML = `<div class="mega-w"><div class="mgrid">${V[k][0].join('')}</div><div class="mside">${V[k][1]}</div></div>`; nav.classList.add('open'); btns.forEach(b => { const on = b.dataset.m === k; b.classList.toggle('on', on); b.setAttribute('aria-expanded', on) }) }
    function cerrar() { cur = null; nav.classList.remove('open'); btns.forEach(b => { b.classList.remove('on'); b.setAttribute('aria-expanded', false) }) }
    btns.forEach(b => { b.addEventListener('mouseenter', () => desk.matches && abrir(b.dataset.m)); b.addEventListener('click', () => cur === b.dataset.m ? cerrar() : abrir(b.dataset.m)) });
    nav.addEventListener('mouseleave', () => desk.matches && cerrar());
    addEventListener('keydown', e => e.key === 'Escape' && cerrar());
    mega.addEventListener('click', e => { if (e.target.closest('a')) { cerrar(); nav.classList.remove('menu-open') } });
    document.getElementById('burger')?.addEventListener('click', () => { nav.classList.toggle('menu-open'); cerrar() });
    document.addEventListener('click', e => { const a = e.target.closest('[data-tipo]'), t = document.getElementById('c-tipo'); if (a && t) t.value = a.dataset.tipo });
    document.getElementById('cform')?.addEventListener('submit', e => { e.preventDefault(); const s = JSON.parse(localStorage.getItem('sugerencias') || '[]'); s.push({ tipo: document.getElementById('c-tipo').value, msg: document.getElementById('c-m').value, fecha: Date.now() }); localStorage.setItem('sugerencias', JSON.stringify(s)); e.target.reset(); document.getElementById('cok').hidden = false });
})();
