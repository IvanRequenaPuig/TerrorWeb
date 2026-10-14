const S = [
    { id: 'ahs', p: 'img/series/HorrorStory.jpg', f: 'img/fondos/horrorStory.jpg', n: 'American Horror Story', r: 'FX', y: '2011 – actualidad', cr: 'Ryan Murphy y Brad Falchuk', g: 'Antología · Sobrenatural', c: '#c0161d', t: [12, 13, 13, 13, 12, 10, 11, 10, 9, 10, 10, 9, 13], d: 'Una antología en la que cada temporada cuenta una historia distinta con un reparto recurrente: casas encantadas, manicomios, aquelarres y circos de monstruos. La temporada 13 se estrenó en septiembre de 2026 y vuelve al universo de Coven.', sim: ['hill', 'hannibal', 'twd', 'misa', 'derry'] },
    { id: 'derry', p: 'img/series/derry.jpg', f: 'img/fondos/derry.jpg', n: 'IT: Bienvenidos a Derry', r: 'HBO', y: '2025 – actualidad', cr: 'Andy y Barbara Muschietti y Jason Fuchs', g: 'Sobrenatural · Universo IT', c: '#e0412b', t: [8], d: 'Precuela de las películas de IT, ambientada en 1962. Cuenta cómo Derry empieza a descubrir el mal que lo habita mucho antes de que Pennywise se haga famoso. HBO ya ha confirmado una segunda temporada, situada en 1935.', sim: ['ahs', 'hill', 'misa', 'twd', 'hannibal'] },
    { id: 'hill', p: 'img/series/Maldicion.jpg', f: 'img/fondos/hillHouse.jpg', n: 'La maldición de Hill House', r: 'NETFLIX', y: '2018', cr: 'Mike Flanagan', g: 'Casas encantadas · Drama', c: '#6c8fb5', t: [10], d: 'Cinco hermanos que crecieron en una casa embrujada vuelven a enfrentarse a su pasado. La historia salta entre su infancia en Hill House y la vida adulta que ha dejado marcada.', sim: ['misa', 'ahs', 'derry', 'hannibal'] },
    { id: 'hannibal', p: 'img/series/hannibal.jpg', f: 'img/fondos/hannibal.jpg', n: 'Hannibal', r: 'NBC', y: '2013 – 2015', cr: 'Bryan Fuller', g: 'Thriller · Gore', c: '#a8222a', t: [13, 13, 13], d: 'Un joven agente del FBI con una empatía peligrosa colabora con el psiquiatra Hannibal Lecter sin saber que es el asesino al que persigue. Elegante, oscura y muy sangrienta.', sim: ['ahs', 'twd', 'hill', 'misa'] },
    { id: 'twd', p: 'img/series/twd.jpeg', f: 'img/fondos/twd.jpg', n: 'The Walking Dead', r: 'AMC', y: '2010 – 2022', cr: 'Frank Darabont y Robert Kirkman', g: 'Zombis · Supervivencia', c: '#8a9a3c', t: [6, 13, 16, 16, 16, 16, 16, 16, 16, 22, 24], d: 'Un ayudante de sheriff despierta tras un coma y encuentra un mundo invadido por zombis. La serie cuenta sobre todo cómo cambian los vivos para sobrevivir.', sim: ['ahs', 'hannibal', 'derry', 'misa'] },
    { id: 'misa', p: 'img/series/medianoche.jpg', f: 'img/fondos/misa.jpg', n: 'Misa de medianoche', r: 'NETFLIX', y: '2021', cr: 'Mike Flanagan', g: 'Terror religioso · Misterio', c: '#d7b46a', t: [7], d: 'Un joven vuelve a su pueblo pesquero, aislado y muy religioso, justo cuando llega un nuevo sacerdote. Con él empiezan a ocurrir hechos que parecen milagros.', sim: ['hill', 'ahs', 'derry', 'twd'] }];
(() => {
    const q = s => document.querySelector(s), strip = q('#sstrip'), pan = q('#spanel'), sec = q('#series'); if (!strip) return;
    let c = 0, tab = 'res', ses = 1, L = 0;
    strip.innerHTML = S.map((s, i) => `<button class="sc" data-i="${i}" style="--ac:${s.c}" aria-label="${s.n}"><span class="pt">${s.n}</span><img src="${s.p}" alt="${s.n}" onerror="this.remove()"></button>`).join('');
    const meta = s => `<div class="smeta"><span class="age">TV-MA</span><b>${s.t.length} ${s.t.length > 1 ? 'temporadas' : 'temporada'}</b><i>•</i><b>${s.y}</b></div>`;
    const row = h => `<div class="rwrap"><button class="rarr l" data-d="-1" aria-label="Anterior">‹</button><div class="row-s">${h}</div><button class="rarr r" data-d="1" aria-label="Siguiente">›</button></div>`;
    const card = (s, i, th, a, b, d, at) => `<article class="ecard" ${at} tabindex="0"><div class="eimg" style="background-image:url(${th}),url(${th}),url(${s.f}),url(${s.p});background-size:cover,260% auto,cover;background-position:center,${(i * 37) % 100}% ${(i * 23) % 100}%,center"></div><div class="eb"><div class="et"><span>${a}</span><em>${b}</em></div><p>${d}</p></div></article>`;
    const V = {
        res: s => `<span class="net">${s.r}</span><h3 class="stitle">${s.n}</h3>${meta(s)}<p class="sg">${s.g}</p><p class="sd">${s.d}</p><p class="scr">Creada por <b>${s.cr}</b></p><div class="botones"><button class="btn-sangre" data-tr="0">Ver tráiler</button><button class="btn-lista" data-tab="eps">Ver episodios</button></div>`,
        eps: s => `<h3 class="stitle sm">${s.n}</h3>${meta(s)}<select id="ssel" class="campo ssel" aria-label="Temporada">${s.t.map((_, i) => `<option value="${i + 1}"${i + 1 === ses ? ' selected' : ''}>Temporada ${i + 1}</option>`).join('')}</select>${row(Array.from({ length: s.t[ses - 1] }, (_, i) => card(s, i, `img/series/${s.id}-t${ses}e${i + 1}.jpg`, `Episodio ${i + 1}`, `T${ses} · E${i + 1}`, 'Pulsa para ver el avance de este episodio.', `data-ep="${i + 1}"`)).join(''))}`,
        tr: s => `<h3 class="stitle sm">${s.n}</h3>${meta(s)}${row(['Tráiler oficial', 'Teaser', 'Avance de la temporada'].map((t, i) => card(s, i + 2, `img/series/${s.id}-trailer${i + 1}.jpg`, t, 'Vídeo', `Tráiler de ${s.n}.`, `data-tr="${i}"`)).join(''))}`,
        sim: s => `<h3 class="stitle sm">Si te gusta ${s.n}</h3>${row(s.sim.map((id, i) => { const o = S.find(x => x.id === id); return card(o, i + 1, o.p, o.n, `${o.t.length} temp.`, o.g, `data-sel="${id}"`) }).join(''))}`
    };

    /* Fondo de TODA la sección (título + carrusel + panel) con fundido */
    function bg() {
        const s = S[c], b = [...sec.querySelectorAll('.sbgl')];
        L = 1 - L;
        b[L].style.backgroundImage = `url("${s.f}")`;
        b[L].classList.add('on'); b[1 - L].classList.remove('on');
        [...strip.children].forEach((e, i) => e.classList.toggle('on', i === c));
        const e = strip.children[c];
        strip.scrollTo({ left: e.offsetLeft - (strip.clientWidth - e.clientWidth) / 2, behavior: 'smooth' })
    }
    function body() { pan.querySelectorAll('.stabs button').forEach(t => t.classList.toggle('on', t.dataset.tab === tab)); q('#sbody').innerHTML = V[tab](S[c]) }
    function sel(i) { c = (i + S.length) % S.length; ses = 1; bg(); body() }

    const m = q('#tmodal'), v = q('#tm-v'), msg = q('#tm-m');
    function abrir(t, f, qq) { q('#tm-t').textContent = t; msg.hidden = true; v.hidden = false; v.onerror = () => { v.hidden = true; msg.textContent = 'Aún no hay vídeo. Guarda el tráiler en ' + f; msg.hidden = false }; v.src = f; q('#tm-y').href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(qq); m.hidden = false; v.play().catch(() => { }) }
    function cerrar() { m.hidden = true; v.pause(); v.removeAttribute('src') }
    q('#tm-x').onclick = cerrar; m.addEventListener('click', e => e.target === m && cerrar()); addEventListener('keydown', e => e.key === 'Escape' && cerrar());

    strip.addEventListener('click', e => { const b = e.target.closest('.sc'); if (b) sel(+b.dataset.i) });
    document.querySelectorAll('.sarr').forEach(b => b.addEventListener('click', () => sel(c + +b.dataset.d)));
    pan.addEventListener('click', e => {
        const t = e.target.closest('[data-tab]'); if (t) { tab = t.dataset.tab; body(); return }
        const r = e.target.closest('.rarr'); if (r) { r.parentElement.querySelector('.row-s').scrollBy({ left: r.dataset.d * 320, behavior: 'smooth' }); return }
        const x = e.target.closest('[data-ep],[data-tr],[data-sel]'); if (!x) return; const s = S[c];
        if (x.dataset.sel) { tab = 'res'; sel(S.findIndex(o => o.id === x.dataset.sel)); return }
        if (x.dataset.ep) abrir(`${s.n} · T${ses} E${x.dataset.ep}`, `video/series/${s.id}-t${ses}e${x.dataset.ep}.mp4`, `${s.n} temporada ${ses} episodio ${x.dataset.ep} tráiler`);
        else abrir(`${s.n} · tráiler`, `video/series/${s.id}-trailer${+x.dataset.tr + 1}.mp4`, `${s.n} tráiler oficial`)
    });
    pan.addEventListener('change', e => { if (e.target.id === 'ssel') { ses = +e.target.value; body() } });
    document.addEventListener('click', e => { const a = e.target.closest('[data-serie]'); if (a) { tab = 'res'; sel(S.findIndex(o => o.id === a.dataset.serie)) } });
    sel(0);
})();
