/* ===== PANTALLA DE CARGA =====
   Cambia MIN para que dure más o menos (milisegundos) y MSG para los textos. */
(() => {
    const ld = document.getElementById('pf-load'); if (!ld) return;
    const MIN = 3600;
    const MSG = [[0, 'Rebobinando la cinta...'], [22, 'Encendiendo el proyector...'], [48, 'Alguien más está en la sala...'], [72, 'No mires hacia atrás...'], [92, 'Empieza la función.']];
    const n = document.getElementById('pfl-n'), fill = document.getElementById('pfl-fill'), msg = document.getElementById('pfl-msg');
    const t0 = performance.now(); let p = 0, loaded = document.readyState === 'complete', done = false, tm;
    addEventListener('load', () => loaded = true);

    const salir = () => {
        if (done) return; done = true; clearInterval(tm);
        p = 100; n.textContent = 100; fill.style.width = '100%';
        ld.classList.add('dark');                      /* se apagan las luces y asoman los ojos */
        setTimeout(() => { ld.classList.remove('dark'); ld.classList.add('open'); document.body.classList.remove('pf-lock') }, 1100);
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
   PELÍCULAS
   ╔════════════════════════════════════════════════════════════════════╗
   ║  PARA AÑADIR UNA PELÍCULA: copia una línea del array FILMS.        ║
   ║    id  -> sin espacios. Cartel: img/peliculas/<id>.jpg             ║
   ║           (también prueba .png, .jpeg, img/pelis y img/ranking)    ║
   ║           Si el título coincide con una de data.js usa su cartel.  ║
   ║    p   -> (opcional) ruta propia del cartel                        ║
   ║    f   -> (opcional) ruta del FONDO de la página                   ║
   ║    cat -> slasher | sobrenatural | gore | psicologico | monstruos  ║
   ║           | clasicos                                               ║
   ║    gore, terror -> de 1 a 5      nota -> de 0 a 10                 ║
   ╚════════════════════════════════════════════════════════════════════╝ */
const FILMS = [
    { id: 'nosferatu', n: 'Nosferatu', y: 1922, dir: 'F. W. Murnau', dur: 94, nota: 7.9, cat: 'clasicos', c: '#c8c2b0', gore: 1, terror: 3, d: 'Un conde llega a un pueblo alemán con la peste y una sombra que no se separa de él.' },
    { id: 'psicosis', n: 'Psicosis', y: 1960, dir: 'Alfred Hitchcock', dur: 109, nota: 8.5, cat: 'clasicos', c: '#6a6f78', gore: 2, terror: 4, d: 'Una huida con dinero termina en un motel donde el dueño vive bajo la sombra de su madre.' },
    { id: 'noche-muertos', n: 'La noche de los muertos vivientes', y: 1968, dir: 'George A. Romero', dur: 96, nota: 7.8, cat: 'monstruos', c: '#8d99a6', gore: 3, terror: 4, d: 'Siete desconocidos se atrincheran en una casa mientras los muertos se levantan fuera.' },
    { id: 'exorcista', n: 'El exorcista', y: 1973, dir: 'William Friedkin', dur: 122, nota: 8.1, cat: 'sobrenatural', c: '#a05a1c', gore: 2, terror: 5, d: 'Una niña cambia de forma inexplicable y su madre acude a dos sacerdotes como último recurso.' },
    { id: 'matanza-texas', n: 'La matanza de Texas', y: 1974, dir: 'Tobe Hooper', dur: 83, nota: 7.4, cat: 'slasher', c: '#b08a3a', gore: 4, terror: 5, d: 'Cinco amigos se desvían de la carretera y dan con una familia de caníbales y una motosierra.' },
    { id: 'halloween', n: 'Halloween', y: 1978, dir: 'John Carpenter', dur: 91, nota: 7.7, cat: 'slasher', c: '#c9c2a8', gore: 2, terror: 5, d: 'Michael Myers escapa del psiquiátrico y vuelve a su pueblo la noche de Halloween.' },
    { id: 'alien', n: 'Alien, el octavo pasajero', y: 1979, dir: 'Ridley Scott', dur: 117, nota: 8.5, cat: 'monstruos', c: '#4f7a3a', gore: 3, terror: 5, d: 'La tripulación de una nave comercial acoge algo que los caza en la oscuridad de los conductos.' },
    { id: 'resplandor', n: 'El Resplandor', y: 1980, dir: 'Stanley Kubrick', dur: 146, nota: 8.4, cat: 'psicologico', c: '#c0623a', gore: 2, terror: 5, d: 'Un escritor y su familia cuidan un hotel aislado en invierno, y el lugar empieza a cambiarlo.' },
    { id: 'viernes13', n: 'Viernes 13', y: 1980, dir: 'Sean S. Cunningham', dur: 95, nota: 6.4, cat: 'slasher', c: '#ff3b1f', gore: 4, terror: 3, d: 'Un campamento de verano, un lago con pasado y alguien que no quiere que se reabra.' },
    { id: 'posesion-infernal', n: 'Posesión infernal', y: 1981, dir: 'Sam Raimi', dur: 85, nota: 7.4, cat: 'gore', c: '#8a2a35', gore: 5, terror: 4, d: 'Cinco jóvenes leen un libro maldito en una cabaña del bosque y despiertan algo antiguo.' },
    { id: 'la-cosa', n: 'La cosa', y: 1982, dir: 'John Carpenter', dur: 109, nota: 8.2, cat: 'monstruos', c: '#9aa7b8', gore: 5, terror: 5, d: 'Una base antártica recibe a un ser que imita a cualquiera. Nadie puede fiarse de nadie.' },
    { id: 'pesadilla', n: 'Pesadilla en Elm Street', y: 1984, dir: 'Wes Craven', dur: 91, nota: 7.4, cat: 'sobrenatural', c: '#ff7a1a', gore: 3, terror: 5, d: 'Los adolescentes de Elm Street comparten un asesino que solo los alcanza mientras duermen.' },
    { id: 'hellraiser', n: 'Hellraiser', y: 1987, dir: 'Clive Barker', dur: 94, nota: 7.0, cat: 'gore', c: '#b3121a', gore: 5, terror: 4, d: 'Un cubo misterioso abre la puerta a unos seres para quienes dolor y placer son lo mismo.' },
    { id: 'muneco-diabolico', n: 'Muñeco diabólico', y: 1988, dir: 'Tom Holland', dur: 87, nota: 6.6, cat: 'sobrenatural', c: '#d8402a', gore: 3, terror: 3, d: 'Un asesino traspasa su alma a un muñeco, y el único que lo ve moverse es un niño.' },
    { id: 'scream', n: 'Scream', y: 1996, dir: 'Wes Craven', dur: 111, nota: 7.4, cat: 'slasher', c: '#9aa7b8', gore: 3, terror: 4, d: 'Un asesino enmascarado llama por teléfono a sus víctimas y las somete a un juego mortal.' },
    { id: 'ring', n: 'The Ring (El aro)', y: 2002, dir: 'Gore Verbinski', dur: 115, nota: 7.1, cat: 'sobrenatural', c: '#2a8f8a', gore: 1, terror: 5, d: 'Una cinta de vídeo maldita condena a quien la ve a morir siete días después.' },
    { id: 'saw', n: 'Saw', y: 2004, dir: 'James Wan', dur: 103, nota: 7.6, cat: 'gore', c: '#c0623a', gore: 5, terror: 3, d: 'Dos hombres despiertan encadenados en un baño y deben seguir las reglas de un juego macabro.' },
    { id: 'insidious', n: 'Insidious', y: 2010, dir: 'James Wan', dur: 103, nota: 6.8, cat: 'sobrenatural', c: '#3a5f8a', gore: 1, terror: 4, d: 'El hijo de una familia cae en coma y algo de otra dimensión quiere ocupar su cuerpo.' },
    { id: 'warren', n: 'Expediente Warren', y: 2013, dir: 'James Wan', dur: 112, nota: 7.5, cat: 'sobrenatural', c: '#9b8a6c', gore: 1, terror: 5, d: 'Dos investigadores de lo paranormal ayudan a una familia atormentada en su casa de campo.' },
    { id: 'terrifier', n: 'Terrifier', y: 2016, dir: 'Damien Leone', dur: 82, nota: 5.6, cat: 'gore', c: '#e9e1cf', gore: 5, terror: 4, d: 'Art el Payaso persigue a dos chicas en Halloween con una crueldad sin límites.' },
    { id: 'lights-out', n: 'Lights Out', y: 2016, dir: 'David F. Sandberg', dur: 81, nota: 6.3, cat: 'sobrenatural', c: '#4aa3ff', gore: 1, terror: 4, d: 'Una mujer descubre que una presencia solo aparece cuando se apagan las luces.' },
    { id: 'it', n: 'IT (Eso)', y: 2017, dir: 'Andy Muschietti', dur: 135, nota: 7.3, cat: 'sobrenatural', c: '#e0301e', gore: 3, terror: 4, d: 'Un grupo de niños se enfrenta a un payaso que reaparece en Derry cada 27 años.' },
    { id: 'get-out', n: 'Déjame salir', y: 2017, dir: 'Jordan Peele', dur: 104, nota: 7.7, cat: 'psicologico', c: '#8d99a6', gore: 2, terror: 4, d: 'Un joven visita a la familia de su novia y descubre que algo no cuadra en esa casa.' },
    { id: 'hereditary', n: 'Hereditary', y: 2018, dir: 'Ari Aster', dur: 127, nota: 7.3, cat: 'psicologico', c: '#a05a1c', gore: 3, terror: 5, d: 'Tras la muerte de la abuela, una familia descubre secretos que lo van destruyendo todo.' },
    { id: 'midsommar', n: 'Midsommar', y: 2019, dir: 'Ari Aster', dur: 148, nota: 7.1, cat: 'psicologico', c: '#d9b36a', gore: 4, terror: 3, d: 'Una pareja viaja a un festival en Suecia donde el sol nunca se pone y el miedo sí.' },
    { id: 'smile', n: 'Smile (Sonríe)', y: 2022, dir: 'Parker Finn', dur: 115, nota: 6.5, cat: 'sobrenatural', c: '#ff2a2f', gore: 3, terror: 4, d: 'Una terapeuta presencia un suceso brutal y empieza a ver sonrisas que no son de este mundo.' }
];

(() => {
    const $ = s => document.querySelector(s);
    const grid = $('#pf-grid'), tabs = $('#pf-tabs'), q = $('#pf-q'), sec = $('#pf'), sortEl = $('#pf-sort');
    const bgs = [...sec.querySelectorAll('.pfl')];
    let cat = 'todos', term = '', list = [], cur = 0, L = 0, base = null;
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const DATA = FILMS;
    const CAT = { todos: 'Todas', slasher: 'Slashers', sobrenatural: 'Sobrenatural', gore: 'Gore', psicologico: 'Psicológico', monstruos: 'Monstruos', clasicos: 'Clásicos' };
    const SORT = {
        rec: ['Más recientes', (a, b) => b.y - a.y], ant: ['Más antiguas', (a, b) => a.y - b.y],
        nota: ['Mejor nota', (a, b) => b.nota - a.nota], terror: ['Más terroríficas', (a, b) => b.terror - a.terror || b.gore - a.gore],
        az: ['A - Z', (a, b) => a.n.localeCompare(b.n, 'es')]
    };
    /* si el título coincide con una película de data.js (M), usa su cartel y su fondo */
    const M0 = typeof M !== 'undefined' ? M : [];
    const ex = p => M0.find(m => norm(m.t) === norm(p.n)) || {};
    const rutas = p => [...new Set([p.p, ex(p).p, `img/peliculas/${p.id}.jpg`, `img/peliculas/${p.id}.png`, `img/peliculas/${p.id}.jpeg`, `img/pelis/${p.id}.jpg`, `img/ranking/${p.id}.jpg`].filter(Boolean))];
    const fondoRuta = p => p.f || ex(p).f || rutas(p)[0];
    const hay = p => `${p.n} ${p.dir} ${p.y}`;
    const badge = p => `★ ${p.nota.toFixed(1)}`;
    const sub = p => `${p.y} · ${CAT[p.cat]}`;
    const tag = p => `${CAT[p.cat]} · ${p.y}`;
    const role = p => `Dirigida por ${p.dir}`;
    const facts = p => [['Año', p.y], ['Director', p.dir], ['Duración', p.dur + ' min'], ['Nota', `★ ${p.nota.toFixed(1)} / 10`]];
    const stats = p => [['Gore', p.gore * 20], ['Terror', p.terror * 20], ['Nota', p.nota * 10]];
    const trailer = p => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(p.n + ' ' + p.y + ' tráiler oficial')}`, '_blank', 'noopener');


    const skulls = n => `<span class="pf-skulls" aria-label="${n} de 5">${[1, 2, 3, 4, 5].map(i => i <= n ? '<b>☠</b>' : '☠').join('')}</span>`;
    const img = (p, alt = '') => { const l = rutas(p); return `<img src="${l[0]}" alt="${alt}" data-i="0" data-s="${l.join('|')}" loading="lazy" onerror="pfErr(this)">` };
    window.pfErr = im => { const l = im.dataset.s.split('|'), i = +im.dataset.i + 1; if (i < l.length) { im.dataset.i = i; im.src = l[i] } else im.remove() };

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
        $('#pf-count').textContent = `(${list.length})`;
        $('#pf-empty').hidden = list.length > 0;
        grid.innerHTML = list.map((p, i) => `
<button class="pf-c" data-i="${i}" style="--ac:${p.c};--i:${i}" aria-label="Abrir ficha de ${p.n}">
  <span class="pf-ph"><span class="pf-fb">${p.n}</span>${img(p, p.n)}<span class="pf-badge">${badge(p)}</span></span>
  <span class="pf-info"><h3>${p.n}</h3><small>${sub(p)}</small>${skulls(p.terror)}</span>
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
        const c = e.target.closest('.pf-c'); if (!c || !list[c.dataset.i] || list[c.dataset.i] === base) return;
        base = list[c.dataset.i]; fondo(base);
    });
    grid.addEventListener('mousemove', e => {
        const c = e.target.closest('.pf-c'); if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 8 + 'deg');
        c.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5)) * 8 + 'deg');
    });
    grid.addEventListener('mouseout', e => { const c = e.target.closest('.pf-c'); if (c) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg') } });
    grid.addEventListener('click', e => { const c = e.target.closest('.pf-c'); if (c) abrir(+c.dataset.i) });

    /* ficha */
    const modal = $('#pf-modal'), box = modal.querySelector('.pf-box');
    function abrir(i) {
        if (!list.length) return;
        cur = (i + list.length) % list.length; const p = list[cur];
        box.style.setProperty('--ac', p.c);
        $('#pf-mt').textContent = tag(p); $('#pf-mn').textContent = p.n; $('#pf-mr').textContent = role(p);
        $('#pf-md').textContent = p.d; $('#pf-mfb').textContent = p.n;
        const mi = $('#pf-mi'); mi.alt = p.n; mi.style.display = '';
        const l = rutas(p); mi.dataset.i = 0; mi.dataset.s = l.join('|');
        mi.onerror = () => { const l2 = mi.dataset.s.split('|'), k = +mi.dataset.i + 1; if (k < l2.length) { mi.dataset.i = k; mi.src = l2[k] } else mi.style.display = 'none' };
        mi.src = l[0];
        $('#pf-mf').innerHTML = facts(p).map(([t, v]) => `<dt>${t}</dt><dd>${v}</dd>`).join('');
        $('#pf-ms').innerHTML = stats(p).map(([t, v]) => `<div class="pf-stat"><span>${t}</span><div><i data-w="${v}"></i></div></div>`).join('');
        modal.hidden = false; document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => requestAnimationFrame(() => modal.querySelectorAll('.pf-stat i').forEach(b => b.style.width = b.dataset.w + '%')));
        fondo(p);
    }
    function cerrar() { modal.hidden = true; document.body.style.overflow = '' }
    $('#pf-x').addEventListener('click', cerrar);
    $('#pf-pv').addEventListener('click', () => abrir(cur - 1));
    $('#pf-nx').addEventListener('click', () => abrir(cur + 1));
    $('#pf-tr').addEventListener('click', () => trailer(list[cur]));
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => {
        if (modal.hidden) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'ArrowRight') abrir(cur + 1);
        if (e.key === 'ArrowLeft') abrir(cur - 1);
    });

    pintar(); fondo(DATA[0]);
})();
