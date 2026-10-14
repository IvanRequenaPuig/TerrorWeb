/* ===== PANTALLA DE CARGA =====
   Cambia MIN para que dure más o menos (milisegundos) y MSG para los textos. */
(() => {
    const ld = document.getElementById('pj-load'); if (!ld) return;
    const MIN = 3600;
    const MSG = [[0, 'Abriendo el archivo...'], [22, 'Buscando expedientes...'], [48, 'Algo se mueve en la oscuridad...'], [72, 'No deberías estar aquí...'], [92, 'Ya vienen a por ti.']];
    const n = document.getElementById('pjl-n'), fill = document.getElementById('pjl-fill'), msg = document.getElementById('pjl-msg');
    const t0 = performance.now(); let p = 0, loaded = document.readyState === 'complete', done = false, tm;
    addEventListener('load', () => loaded = true);

    const salir = () => {
        if (done) return; done = true; clearInterval(tm);
        p = 100; n.textContent = 100; fill.style.width = '100%';
        ld.classList.add('dark');                      /* se apagan las luces y asoman los ojos */
        setTimeout(() => { ld.classList.remove('dark'); ld.classList.add('open'); document.body.classList.remove('pj-lock') }, 1100);
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
   PERSONAJES
   ╔════════════════════════════════════════════════════════════════════╗
   ║  PARA AÑADIR UN PERSONAJE: copia un bloque del array PJ.           ║
   ║    id    -> sin espacios. Su imagen: img/personajes/<id>.jpg       ║
   ║             (también prueba .png, .jpeg y img/archivo, img/asesinos)║
   ║    p     -> (opcional) ruta propia de la imagen de la tarjeta      ║
   ║    f     -> (opcional) ruta del FONDO de la página al pasar el     ║
   ║             ratón. Si no la pones, usa la imagen de la tarjeta     ║
   ║    cat   -> slasher | sobrenatural | payasos | muñecos | demonios  ║
   ║    gore, terror, miedo -> de 1 a 5                                  ║
   ╚════════════════════════════════════════════════════════════════════╝ */
const PJ = [
    { id: 'jason', n: 'Jason Voorhees', r: 'El asesino de Crystal Lake', saga: 'Viernes 13', y: 1980, ic: '🏒', c: '#ff3b1f', cat: 'slasher',
      d: 'Ahogado de niño por el descuido de unos monitores, Jason vuelve una y otra vez a Crystal Lake. Imparable, silencioso y casi imposible de matar.',
      arma: 'Machete', origen: 'Crystal Lake, Nueva Jersey', gore: 5, terror: 4, miedo: 5 },
    { id: 'freddy', n: 'Freddy Krueger', r: 'El rey de las pesadillas', saga: 'Pesadilla en Elm Street', y: 1984, ic: '🖐', c: '#ff7a1a', cat: 'sobrenatural',
      d: 'Un asesino de niños quemado vivo por los vecinos. Ahora caza a sus hijos en sueños, donde nadie puede esconderse. Si él te mata dormido, no despiertas.',
      arma: 'Guante de cuchillas', origen: 'Springwood, Ohio', gore: 4, terror: 5, miedo: 5 },
    { id: 'myers', n: 'Michael Myers', r: 'La noche de Halloween', saga: 'Halloween', y: 1978, ic: '🔪', c: '#c9c2a8', cat: 'slasher',
      d: 'Sin palabras, sin prisa y sin piedad. A los seis años mató a su hermana; quince años después escapa y vuelve a Haddonfield cada Halloween.',
      arma: 'Cuchillo de cocina', origen: 'Haddonfield, Illinois', gore: 3, terror: 5, miedo: 5 },
    { id: 'ghostface', n: 'Ghostface', r: 'La voz al otro lado del teléfono', saga: 'Scream', y: 1996, ic: '👻', c: '#9aa7b8', cat: 'slasher',
      d: 'Llama, te conoce y juega contigo antes de atacar. Bajo la máscara puede estar cualquiera, incluso alguien de tu confianza.',
      arma: 'Cuchillo de caza', origen: 'Woodsboro, California', gore: 4, terror: 4, miedo: 4 },
    { id: 'chucky', n: 'Chucky', r: 'El muñeco poseído', saga: 'Muñeco diabólico', y: 1988, ic: '🪆', c: '#d8402a', cat: 'muñecos',
      d: 'Un muñeco con el alma de un asesino en serie. Solo quiere un cuerpo nuevo, y el de un niño le serviría perfectamente.',
      arma: 'Cuchillo', origen: 'Chicago, Illinois', gore: 4, terror: 3, miedo: 3 },
    { id: 'pennywise', n: 'Pennywise', r: 'El payaso de Derry', saga: 'IT', y: 1986, ic: '🤡', c: '#e0301e', cat: 'payasos',
      d: 'Cada 27 años despierta en las alcantarillas de Derry y se alimenta del miedo de los niños, tomando la forma de lo que más temen.',
      arma: 'Garras y dientes', origen: 'Derry, Maine', gore: 3, terror: 5, miedo: 5 },
    { id: 'art', n: 'Art el Payaso', r: 'La sonrisa que no habla', saga: 'Terrifier', y: 2013, ic: '🎭', c: '#e9e1cf', cat: 'payasos',
      d: 'Mudo, juguetón y brutalmente sádico. Art no tiene motivos ni reglas: disfruta de cada crimen como si fuera un número de circo. Es de lo más extremo del terror moderno.',
      arma: 'Sierra y todo lo que encuentre', origen: 'Condado de Miles, Nueva York', gore: 5, terror: 4, miedo: 4 },
    { id: 'leatherface', n: 'Leatherface', r: 'La familia Sawyer', saga: 'La matanza de Texas', y: 1974, ic: '🪚', c: '#b08a3a', cat: 'slasher',
      d: 'Un hombre con máscaras de piel humana y una motosierra. Vive con su familia caníbal en una carretera de Texas donde no conviene parar.',
      arma: 'Motosierra', origen: 'Texas, EE. UU.', gore: 5, terror: 5, miedo: 4 },
    { id: 'diana', n: 'Diana', r: 'La mujer de la oscuridad', saga: 'Lights Out', y: 2016, ic: '💡', c: '#4aa3ff', cat: 'sobrenatural',
      d: 'Solo existe cuando se apagan las luces. Diana es un espíritu ligado a una familia y desaparece bajo la luz, así que cada interruptor es tu última defensa.',
      arma: 'La oscuridad', origen: 'Los Ángeles, California', gore: 2, terror: 5, miedo: 5 },
    { id: 'pinhead', n: 'Pinhead', r: 'El cenobita', saga: 'Hellraiser', y: 1987, ic: '⛓', c: '#8d99a6', cat: 'demonios',
      d: 'Líder de los cenobitas, seres de otra dimensión para quienes dolor y placer son lo mismo. Aparece cuando alguien resuelve el cubo de Lemarchand.',
      arma: 'Cadenas con ganchos', origen: 'El Laberinto', gore: 5, terror: 4, miedo: 4 },
    { id: 'samara', n: 'Samara', r: 'La niña del pozo', saga: 'The Ring', y: 2002, ic: '📼', c: '#4f7a3a', cat: 'sobrenatural',
      d: 'Una cinta de vídeo maldita y una llamada: siete días de vida. Samara sale de la pantalla arrastrándose, con el pelo tapándole la cara.',
      arma: 'Una cinta maldita', origen: 'Isla Moesko, Washington', gore: 1, terror: 5, miedo: 5 },
    { id: 'valak', n: 'Valak', r: 'La monja demonio', saga: 'El Conjuro', y: 2016, ic: '✝', c: '#a05a1c', cat: 'demonios',
      d: 'Un demonio con hábito de monja que ronda una abadía rumana. Se presenta en los rincones oscuros y en el reflejo de los cristales.',
      arma: 'Posesión', origen: 'Abadía de San Cartha, Rumanía', gore: 2, terror: 4, miedo: 5 },
    { id: 'jigsaw', n: 'Jigsaw', r: 'El maestro del juego', saga: 'Saw', y: 2004, ic: '🧩', c: '#c0623a', cat: 'slasher',
      d: 'John Kramer no mata: pone a la gente a prueba. Sus trampas obligan a elegir entre el dolor y la vida, y siempre dejan una lección.',
      arma: 'Trampas mecánicas', origen: 'Ciudad sin nombre, EE. UU.', gore: 5, terror: 3, miedo: 4 },
    { id: 'annabelle', n: 'Annabelle', r: 'La muñeca del Conjuro', saga: 'Annabelle', y: 2014, ic: '🎎', c: '#9b8a6c', cat: 'muñecos',
      d: 'Una muñeca antigua que atrae a un espíritu demoníaco. Los Warren acabaron guardándola bajo llave en su museo del ocultismo.',
      arma: 'Posesión', origen: 'Connecticut, EE. UU.', gore: 1, terror: 4, miedo: 4 },
    { id: 'candyman', n: 'Candyman', r: 'El hombre del espejo', saga: 'Candyman', y: 1992, ic: '🪞', c: '#8a2a35', cat: 'sobrenatural',
      d: 'Di su nombre cinco veces ante un espejo y aparecerá, con un garfio por mano y un enjambre de abejas. Una leyenda urbana que se hizo real.',
      arma: 'Garfio', origen: 'Cabrini-Green, Chicago', gore: 4, terror: 4, miedo: 4 }
];

(() => {
    const $ = s => document.querySelector(s);
    const grid = $('#pj-grid'), tabs = $('#pj-tabs'), q = $('#pj-q'), sec = $('#pj');
    const bgs = [...sec.querySelectorAll('.pjl')];
    const CAT = { todos: 'Todos', slasher: 'Slashers', sobrenatural: 'Sobrenatural', payasos: 'Payasos', 'muñecos': 'Muñecos', demonios: 'Demonios' };
    let cat = 'todos', term = '', list = [], cur = 0, L = 0, base = null;

    /* rutas que se prueban en orden para la imagen de cada personaje */
    const rutas = p => [...new Set([p.p, `img/personajes/${p.id}.jpg`, `img/personajes/${p.id}.png`, `img/personajes/${p.id}.jpeg`,
        `img/archivo/${p.id}.png`, `img/archivo/${p.id}.jpg`, `img/asesinos/${p.id}.png`, `img/asesinos/${p.id}.jpg`, `img/${p.id}.jpg`].filter(Boolean))];
    window.pjErr = im => {
        const l = im.dataset.s.split('|'), i = +im.dataset.i + 1;
        if (i < l.length) { im.dataset.i = i; im.src = l[i] } else im.remove();
    };
    const img = (p, alt = '') => { const l = rutas(p); return `<img src="${l[0]}" alt="${alt}" data-i="0" data-s="${l.join('|')}" loading="lazy" onerror="pjErr(this)">` };
    const skulls = n => `<span class="pj-skulls" aria-label="${n} de 5">${[1, 2, 3, 4, 5].map(i => i <= n ? '<b>☠</b>' : '☠').join('')}</span>`;

    /* fondo con fundido entre dos capas */
    function fondo(p) {
        const f = p.f || rutas(p)[1];
        L = 1 - L;
        bgs[L].style.backgroundImage = `${f ? `url("${f}"), ` : ''}radial-gradient(circle at 70% 25%, ${p.c}77, #050404 72%)`;
        bgs[L].classList.add('on'); bgs[1 - L].classList.remove('on');
    }

    function pintar() {
        list = PJ.filter(p => (cat === 'todos' || p.cat === cat) && (p.n + ' ' + p.saga + ' ' + p.r).toLowerCase().includes(term));
        $('#pj-count').textContent = `(${list.length})`;
        $('#pj-empty').hidden = list.length > 0;
        grid.innerHTML = list.map((p, i) => `
<button class="pj-c" data-i="${i}" style="--ac:${p.c};--i:${i}" aria-label="Abrir expediente de ${p.n}">
  <span class="pj-ph"><span class="pj-fb">${p.n}</span>${img(p, p.n)}<span class="pj-badge" aria-hidden="true">${p.ic}</span></span>
  <span class="pj-info"><h3>${p.n}</h3><small>${p.saga} (${p.y})</small>${skulls(p.terror)}</span>
</button>`).join('');
    }

    tabs.innerHTML = Object.entries(CAT).map(([k, v]) => `<button data-c="${k}"${k === cat ? ' class="on"' : ''}>${v}</button>`).join('');
    tabs.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        cat = b.dataset.c; tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); pintar();
    });
    q.addEventListener('input', () => { term = q.value.trim().toLowerCase(); pintar() });

    /* fondo propio al pasar el ratón + inclinación suave de la tarjeta */
    grid.addEventListener('mouseover', e => {
        const c = e.target.closest('.pj-c'); if (!c || !list[c.dataset.i] || list[c.dataset.i] === base) return;
        base = list[c.dataset.i]; fondo(base);
    });
    grid.addEventListener('mousemove', e => {
        const c = e.target.closest('.pj-c'); if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 8 + 'deg');
        c.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5)) * 8 + 'deg');
    });
    grid.addEventListener('mouseout', e => { const c = e.target.closest('.pj-c'); if (c) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg') } });
    grid.addEventListener('click', e => { const c = e.target.closest('.pj-c'); if (c) abrir(+c.dataset.i) });

    /* expediente */
    const modal = $('#pj-modal'), box = modal.querySelector('.pj-box');
    function abrir(i) {
        if (!list.length) return;
        cur = (i + list.length) % list.length; const p = list[cur];
        box.style.setProperty('--ac', p.c);
        $('#pj-mt').textContent = `${p.saga} · ${p.cat}`;
        $('#pj-mn').textContent = p.n; $('#pj-mr').textContent = p.r; $('#pj-md').textContent = p.d;
        $('#pj-mfb').textContent = p.n;
        const mi = $('#pj-mi'); mi.alt = p.n; mi.style.display = '';
        const l = rutas(p); mi.dataset.i = 0; mi.dataset.s = l.join('|'); mi.onerror = () => { const l2 = mi.dataset.s.split('|'), k = +mi.dataset.i + 1; if (k < l2.length) { mi.dataset.i = k; mi.src = l2[k] } else mi.style.display = 'none' }; mi.src = l[0];
        $('#pj-mf').innerHTML = `<dt>Debut</dt><dd>${p.y}</dd><dt>Arma</dt><dd>${p.arma}</dd><dt>Origen</dt><dd>${p.origen}</dd>`;
        $('#pj-ms').innerHTML = [['Gore', p.gore], ['Terror', p.terror], ['Miedo', p.miedo]].map(([t, v]) => `<div class="pj-stat"><span>${t}</span><div><i data-w="${v * 20}"></i></div></div>`).join('');
        modal.hidden = false; document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => requestAnimationFrame(() => modal.querySelectorAll('.pj-stat i').forEach(b => b.style.width = b.dataset.w + '%')));
        fondo(p);
    }
    function cerrar() { modal.hidden = true; document.body.style.overflow = '' }
    $('#pj-x').addEventListener('click', cerrar);
    $('#pj-pv').addEventListener('click', () => abrir(cur - 1));
    $('#pj-nx').addEventListener('click', () => abrir(cur + 1));
    modal.addEventListener('click', e => { if (e.target === modal) cerrar() });
    addEventListener('keydown', e => {
        if (modal.hidden) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'ArrowRight') abrir(cur + 1);
        if (e.key === 'ArrowLeft') abrir(cur - 1);
    });

    pintar(); fondo(PJ[0]);
})();
