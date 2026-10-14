/* ===== PANTALLA DE CARGA =====
   Cambia MIN para que dure más o menos (milisegundos) y MSG para los textos. */
(() => {
    const ld = document.getElementById('vg-load'); if (!ld) return;
    const MIN = 3600;
    const MSG = [[0, 'Insertando el disco...'], [22, 'Cargando la partida...'], [48, 'Apaga las luces...'], [72, 'Hace rato que no guardas...'], [92, 'Aquí no hay checkpoint.']];
    const n = document.getElementById('vgl-n'), fill = document.getElementById('vgl-fill'), msg = document.getElementById('vgl-msg');
    const t0 = performance.now(); let p = 0, loaded = document.readyState === 'complete', done = false, tm;
    addEventListener('load', () => loaded = true);

    const salir = () => {
        if (done) return; done = true; clearInterval(tm);
        p = 100; n.textContent = 100; fill.style.width = '100%';
        ld.classList.add('dark');                      /* se apagan las luces y asoman los ojos */
        setTimeout(() => { ld.classList.remove('dark'); ld.classList.add('open'); document.body.classList.remove('vg-lock') }, 1100);
        setTimeout(() => ld.classList.add('gone'), 2600);
    };
    tm = setInterval(() => {
        const listo = loaded && performance.now() - t0 > MIN;
        p = Math.min(listo ? 100 : 92, p + Math.random() * 3.2 + .4);
        n.textContent = Math.floor(p); fill.style.width = p + '%';
        msg.textContent = MSG.filter(([k]) => p >= k).pop()[1];
        if (p >= 100) salir();
    }, 90);
    ld.addEventListener('click', salir);
    addEventListener('keydown', salir, { once: true });
})();

/* =====================================================================
   VIDEOJUEGOS
   ╔════════════════════════════════════════════════════════════════════╗
   ║  PARA AÑADIR UN JUEGO: copia una línea del array GAMES.            ║
   ║    id -> sin espacios. Portada: img/videojuegos/<id>.jpg           ║
   ║          (también prueba .png y img/ranking/<id>.jpg)              ║
   ║    p  -> (opcional) ruta propia de la portada                      ║
   ║    f  -> (opcional) ruta del FONDO de la página                    ║
   ║    v  -> (opcional) tráiler. Si no, busca video/videojuegos/<id>.mp4║
   ║    cat -> survival | accion | psicologico | indie | online         ║
   ║    terror, accion, historia -> de 1 a 5                            ║
   ╚════════════════════════════════════════════════════════════════════╝ */
const GAMES = [
    { id: 'silenthill2', n: 'Silent Hill 2', y: 2024, dev: 'Bloober Team', plat: 'PS5 · PC', gen: 'Survival Horror', cat: 'survival', c: '#8d99a6', terror: 5, accion: 2, historia: 5,
      d: 'James recibe una carta de su esposa fallecida y viaja a Silent Hill. Niebla, culpa y monstruos que nacen de su propia mente.',
      p: 'img/videojuegos/silentHill.png', f: 'img/videojuegos/silentHill.png', v: 'video/videojuegos/silenthill2.mp4' },
    { id: 'lastofus', n: 'The Last of Us Part I', y: 2022, dev: 'Naughty Dog', plat: 'PS5 · PC', gen: 'Acción · Survival', cat: 'accion', c: '#c0623a', terror: 3, accion: 4, historia: 5,
      d: 'Joel y Ellie cruzan unos Estados Unidos devastados por una infección. Sobrevivir cuesta más que el miedo a los infectados.',
      p: 'img/videojuegos/lastofus.jpg', f: 'img/videojuegos/lastofus.jpg', v: 'video/videojuegos/lastofus.mp4' },
    { id: 're2', n: 'Resident Evil 2', y: 2019, dev: 'Capcom', plat: 'PS4 · Xbox One · PC', gen: 'Survival Horror', cat: 'survival', c: '#b3121a', terror: 4, accion: 4, historia: 4,
      d: 'Raccoon City ha caído. Dos historias, un mismo destino: sobrevivir. El clásico que redefinió el género.',
      p: 'img/videojuegos/residentevil2.jpg', f: 'img/videojuegos/residentevil2.jpg', v: 'video/videojuegos/re2.mp4' },
    { id: 'outlast', n: 'Outlast', y: 2013, dev: 'Red Barrels', plat: 'PC · PS4 · Xbox One', gen: 'Survival Horror', cat: 'survival', c: '#4f7a3a', terror: 5, accion: 1, historia: 3,
      d: 'Un periodista entra en un manicomio abandonado con una cámara y sin armas. Lo único que puede hacer es huir y esconderse.',
      p: 'img/videojuegos/outlast.jpg', f: 'img/videojuegos/outlastPrueba.jpg', v: 'video/videojuegos/outlast.mp4' },
    { id: 'dbd', n: 'Dead by Daylight', y: 2016, dev: 'Behaviour Interactive', plat: 'PC · PS · Xbox · Switch', gen: 'Terror asimétrico online', cat: 'online', c: '#d8402a', terror: 4, accion: 3, historia: 2,
      d: 'Un asesino contra cuatro supervivientes. Reparad generadores y escapad antes de que Michael Myers, Ghostface y compañía os atrapen.',
      p: 'img/videojuegos/dead.jpg', f: 'img/videojuegos/daylight.jpg', v: 'video/videojuegos/dbd.mp4' },
    { id: 'evilwithin2', n: 'The Evil Within 2', y: 2017, dev: 'Tango Gameworks', plat: 'PS4 · Xbox One · PC', gen: 'Survival Horror', cat: 'survival', c: '#9b8a6c', terror: 4, accion: 4, historia: 3,
      d: 'Sebastian Castellanos vuelve a una realidad distorsionada para rescatar a su hija. Cada rincón de Union esconde una pesadilla.',
      p: 'img/videojuegos/theEvil.jpg', f: 'img/videojuegos/evilgood.jpg', v: 'video/videojuegos/evilwithin2.mp4' },
    { id: 'amnesia', n: 'Amnesia: The Dark Descent', y: 2010, dev: 'Frictional Games', plat: 'PC · PS4 · Xbox One', gen: 'Survival Horror', cat: 'indie', c: '#a05a1c', terror: 5, accion: 1, historia: 4,
      d: 'Despiertas en un castillo oscuro sin recordar quién eres. No puedes luchar: solo esconderte, y la oscuridad te enloquece.',
      p: 'img/videojuegos/amnesia.jpg', f: 'img/videojuegos/theamnesia.png', v: 'video/videojuegos/amnesia.mp4' },
    { id: 're4', n: 'Resident Evil 4', y: 2023, dev: 'Capcom', plat: 'PS5 · Xbox · PC', gen: 'Acción · Survival', cat: 'accion', c: '#c0623a', terror: 3, accion: 5, historia: 4,
      d: 'Leon viaja a un pueblo europeo para rescatar a la hija del presidente, y los aldeanos no son lo que parecen.' },
    { id: 'revillage', n: 'Resident Evil Village', y: 2021, dev: 'Capcom', plat: 'PS5 · Xbox · PC', gen: 'Acción · Survival', cat: 'accion', c: '#8a2a35', terror: 3, accion: 5, historia: 3,
      d: 'Ethan busca a su hija en una aldea helada dominada por señores monstruosos y un castillo gótico.' },
    { id: 'alien', n: 'Alien: Isolation', y: 2014, dev: 'Creative Assembly', plat: 'PC · PS · Xbox · Switch', gen: 'Survival Horror', cat: 'survival', c: '#4f7a3a', terror: 5, accion: 2, historia: 4,
      d: 'Amanda Ripley busca respuestas en una estación espacial donde un xenomorfo la acecha y no se puede matar.' },
    { id: 'deadspace', n: 'Dead Space', y: 2023, dev: 'Motive Studio', plat: 'PS5 · Xbox · PC', gen: 'Survival Horror', cat: 'survival', c: '#3a5f8a', terror: 4, accion: 4, historia: 4,
      d: 'Un ingeniero queda atrapado en una nave minera invadida por necromorfos y debe desmembrarlos para sobrevivir.' },
    { id: 'fnaf', n: "Five Nights at Freddy's", y: 2014, dev: 'Scott Cawthon', plat: 'PC · móvil · consolas', gen: 'Terror indie', cat: 'indie', c: '#d8402a', terror: 4, accion: 1, historia: 3,
      d: 'Vigilante nocturno en una pizzería, solo con cámaras y unos animatrónicos que se mueven cuando no miras.' },
    { id: 'untildawn', n: 'Until Dawn', y: 2015, dev: 'Supermassive Games', plat: 'PS4 · PS5 · PC', gen: 'Aventura interactiva', cat: 'psicologico', c: '#9aa7b8', terror: 4, accion: 2, historia: 4,
      d: 'Ocho amigos pasan la noche en una montaña nevada y cada decisión cambia quién llega al amanecer.' },
    { id: 'phasmophobia', n: 'Phasmophobia', y: 2020, dev: 'Kinetic Games', plat: 'PC · VR', gen: 'Terror cooperativo online', cat: 'online', c: '#2a8f8a', terror: 4, accion: 1, historia: 2,
      d: 'Equipo de cazafantasmas: investiga casas encantadas, identifica al espíritu y sal con vida.' },
    { id: 'nightmares', n: 'Little Nightmares', y: 2017, dev: 'Tarsier Studios', plat: 'PC · PS · Xbox · Switch', gen: 'Plataformas de terror', cat: 'indie', c: '#d9b36a', terror: 3, accion: 2, historia: 4,
      d: 'Seis, una niña con impermeable amarillo, escapa de una nave habitada por criaturas grotescas.' },
    { id: 'alanwake2', n: 'Alan Wake 2', y: 2023, dev: 'Remedy Entertainment', plat: 'PS5 · Xbox · PC', gen: 'Survival Horror', cat: 'psicologico', c: '#ff7a1a', terror: 4, accion: 3, historia: 5,
      d: 'Una agente del FBI y un escritor atrapado en una pesadilla se cruzan en un thriller psicológico.' },
    { id: 'layers', n: 'Layers of Fear', y: 2016, dev: 'Bloober Team', plat: 'PC · PS · Xbox', gen: 'Terror psicológico', cat: 'psicologico', c: '#a05a1c', terror: 4, accion: 1, historia: 4,
      d: 'Un pintor desciende a la locura en una mansión cuyas paredes y cuadros cambian ante sus ojos.' }
];

(() => {
    const $ = s => document.querySelector(s);
    const grid = $('#vg-grid'), tabs = $('#vg-tabs'), q = $('#vg-q'), sec = $('#vg'), sortEl = $('#vg-sort');
    const bgs = [...sec.querySelectorAll('.vgl')];
    let cat = 'todos', term = '', list = [], cur = 0, L = 0, base = null;
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const DATA = GAMES;
    const CAT = { todos: 'Todos', survival: 'Survival Horror', accion: 'Acción', psicologico: 'Psicológico', indie: 'Indie', online: 'Online' };
    const SORT = {
        rec: ['Más recientes', (a, b) => b.y - a.y], ant: ['Más antiguos', (a, b) => a.y - b.y],
        terror: ['Más terroríficos', (a, b) => b.terror - a.terror || b.historia - a.historia],
        az: ['A - Z', (a, b) => a.n.localeCompare(b.n, 'es')]
    };
    const rutas = p => [...new Set([p.p, `img/videojuegos/${p.id}.jpg`, `img/videojuegos/${p.id}.png`, `img/videojuegos/${p.id}.jpeg`, `img/ranking/${p.id}.jpg`].filter(Boolean))];
    const fondoRuta = p => p.f || rutas(p)[0];
    const hay = p => `${p.n} ${p.dev} ${p.gen} ${p.y}`;
    const badge = p => p.y;
    const sub = p => `${p.gen} · ${p.y}`;
    const tag = p => `${p.dev} · ${CAT[p.cat]}`;
    const role = p => p.plat;
    const facts = p => [['Año', p.y], ['Desarrolla', p.dev], ['Plataformas', p.plat], ['Género', p.gen]];
    const stats = p => [['Terror', p.terror * 20], ['Acción', p.accion * 20], ['Historia', p.historia * 20]];

    /* tráiler: abre el vídeo del juego; si no existe, ofrece buscarlo en YouTube */
    const vm = $('#vg-vm'), vv = $('#vg-vv'), vmm = $('#vg-vmm');
    function trailer(p) {
        $('#vg-vt').textContent = p.n;
        $('#vg-vy').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(p.n + ' tráiler oficial')}`;
        vmm.hidden = true; vv.hidden = false;
        vv.onerror = () => { vv.hidden = true; vmm.hidden = false };
        vv.src = p.v || `video/videojuegos/${p.id}.mp4`; vv.play().catch(() => { });
        vm.hidden = false;
    }
    function cerrarV() { vv.pause(); vv.removeAttribute('src'); vv.load(); vm.hidden = true }
    $('#vg-vx').addEventListener('click', cerrarV);
    vm.addEventListener('click', e => { if (e.target === vm) cerrarV() });
    addEventListener('keydown', e => { if (!vm.hidden) { if (e.key === 'Escape') cerrarV(); e.stopImmediatePropagation() } });


    const skulls = n => `<span class="vg-skulls" aria-label="${n} de 5">${[1, 2, 3, 4, 5].map(i => i <= n ? '<b>☠</b>' : '☠').join('')}</span>`;
    const img = (p, alt = '') => { const l = rutas(p); return `<img src="${l[0]}" alt="${alt}" data-i="0" data-s="${l.join('|')}" loading="lazy" onerror="vgErr(this)">` };
    window.vgErr = im => { const l = im.dataset.s.split('|'), i = +im.dataset.i + 1; if (i < l.length) { im.dataset.i = i; im.src = l[i] } else im.remove() };

    /* fondo con fundido entre dos capas */
    function fondo(p) {
        const f = fondoRuta(p);
        L = 1 - L;
        bgs[L].style.backgroundImage = `${f ? `url("${f}"), ` : ''}radial-gradient(circle at 70% 25%, ${p.c}77, #050404 72%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
    }

    sortEl.innerHTML = Object.entries(SORT).map(([k, v]) => `<option value="${k}">${v[0]}</option>`).join('');
    tabs.innerHTML = Object.entries(CAT).map(([k, v]) => `<button data-c="${k}"${k === cat ? ' class="on"' : ''}>${v}</button>`).join('');

    function pintar() {
        list = DATA.filter(p => (cat === 'todos' || p.cat === cat) && norm(hay(p)).includes(term)).sort(SORT[sortEl.value][1]);
        $('#vg-count').textContent = `(${list.length})`;
        $('#vg-empty').hidden = list.length > 0;
        grid.innerHTML = list.map((p, i) => `
<button class="vg-c" data-i="${i}" style="--ac:${p.c};--i:${i}" aria-label="Abrir ficha de ${p.n}">
  <span class="vg-ph"><span class="vg-fb">${p.n}</span>${img(p, p.n)}<span class="vg-badge">${badge(p)}</span></span>
  <span class="vg-info"><h3>${p.n}</h3><small>${sub(p)}</small>${skulls(p.terror)}</span>
</button>`).join('');
    }

    tabs.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        cat = b.dataset.c; tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); pintar();
    });
    q.addEventListener('input', () => { term = norm(q.value.trim()); pintar() });
    sortEl.addEventListener('change', pintar);

    /* fondo propio al pasar el ratón + inclinación suave de la tarjeta */
    grid.addEventListener('mouseover', e => {
        const c = e.target.closest('.vg-c'); if (!c || !list[c.dataset.i] || list[c.dataset.i] === base) return;
        base = list[c.dataset.i]; fondo(base);
    });
    grid.addEventListener('mousemove', e => {
        const c = e.target.closest('.vg-c'); if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 8 + 'deg');
        c.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5)) * 8 + 'deg');
    });
    grid.addEventListener('mouseout', e => { const c = e.target.closest('.vg-c'); if (c) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg') } });
    grid.addEventListener('click', e => { const c = e.target.closest('.vg-c'); if (c) abrir(+c.dataset.i) });

    /* ficha */
    const modal = $('#vg-modal'), box = modal.querySelector('.vg-box');
    function abrir(i) {
        if (!list.length) return;
        cur = (i + list.length) % list.length; const p = list[cur];
        box.style.setProperty('--ac', p.c);
        $('#vg-mt').textContent = tag(p); $('#vg-mn').textContent = p.n; $('#vg-mr').textContent = role(p);
        $('#vg-md').textContent = p.d; $('#vg-mfb').textContent = p.n;
        const mi = $('#vg-mi'); mi.alt = p.n; mi.style.display = '';
        const l = rutas(p); mi.dataset.i = 0; mi.dataset.s = l.join('|');
        mi.onerror = () => { const l2 = mi.dataset.s.split('|'), k = +mi.dataset.i + 1; if (k < l2.length) { mi.dataset.i = k; mi.src = l2[k] } else mi.style.display = 'none' };
        mi.src = l[0];
        $('#vg-mf').innerHTML = facts(p).map(([t, v]) => `<dt>${t}</dt><dd>${v}</dd>`).join('');
        $('#vg-ms').innerHTML = stats(p).map(([t, v]) => `<div class="vg-stat"><span>${t}</span><div><i data-w="${v}"></i></div></div>`).join('');
        modal.hidden = false; document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => requestAnimationFrame(() => modal.querySelectorAll('.vg-stat i').forEach(b => b.style.width = b.dataset.w + '%')));
        fondo(p);
    }
    function cerrar() { modal.hidden = true; document.body.style.overflow = '' }
    $('#vg-x').addEventListener('click', cerrar);
    $('#vg-pv').addEventListener('click', () => abrir(cur - 1));
    $('#vg-nx').addEventListener('click', () => abrir(cur + 1));
    $('#vg-tr').addEventListener('click', () => trailer(list[cur]));
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => {
        if (modal.hidden) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'ArrowRight') abrir(cur + 1);
        if (e.key === 'ArrowLeft') abrir(cur - 1);
    });

    pintar(); fondo(DATA[0]);
})();
