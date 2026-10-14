


//villano.js//
const id = new URLSearchParams(location.search).get('id'), k = K.find(x => x.id === id) || K[0], i = K.indexOf(k);
document.documentElement.style.setProperty('--ac', k.c); document.title = k.n + ' | Sangre y Celuloide';
document.getElementById('lt').textContent = k.l;
document.getElementById('ficha').innerHTML = `
<section class="vhero"><span class="emb">${k.e}</span><img src="img/${k.id}.jpg" alt="${k.n}" onerror="this.remove()"><div class="vtxt"><h1>${k.n}</h1><p class="lema">${k.t}</p></div></section>
<section class="container seccion"><div class="row g-5"><div class="col-lg-7"><h2>Expediente</h2><p class="fs-5">${k.bio}</p><h2 class="mt-5">Datos que no sabías</h2><ul>${k.cur.map(c => `<li>${c}</li>`).join('')}</ul></div>
<div class="col-lg-5"><div class="caja"><dl><dt>Debut</dt><dd>${k.debut}</dd><dt>Arma</dt><dd>${k.arma}</dd><dt>Territorio</dt><dd>${k.lugar}</dd></dl></div>
<h2 class="mt-5">Filmografía</h2>${k.pelis.map(p => `<div class="peli"><span>${p[1]}</span> ${p[0]}</div>`).join('')}</div></div>
<div class="d-flex justify-content-between mt-5"><a class="btn-sangre" href="villano.html?id=${K[(i + K.length - 1) % K.length].id}">Anterior</a><a class="btn-sangre" href="index.html#ranking">Votar en el ranking</a><a class="btn-sangre" href="villano.html?id=${K[(i + 1) % K.length].id}">Siguiente</a></div></section>`;
