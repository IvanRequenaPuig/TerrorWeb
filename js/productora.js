

//productora.js//
const p=P.find(x=>x.id===new URLSearchParams(location.search).get('id'))||P[0],i=P.indexOf(p);
document.documentElement.style.setProperty('--ac',p.c);document.title=p.n+' | Sangre y Celuloide';
document.getElementById('lt').textContent=p.n;
document.getElementById('ficha').innerHTML=`
<section class="vhero"><span class="emb">${p.n[0]}</span><div class="vtxt"><h1>${p.n}</h1><p class="lema">${p.t}</p></div></section>
<section class="container seccion"><div class="row g-5"><div class="col-lg-7"><h2>Quiénes son</h2><p class="fs-5">${p.b}</p><h2 class="mt-5">Datos clave</h2><ul>${p.cur.map(c=>`<li>${c}</li>`).join('')}</ul></div>
<div class="col-lg-5"><div class="caja"><dl><dt>Creador</dt><dd>${p.f}</dd><dt>Fundada en</dt><dd>${p.y}</dd><dt>Conocida por</dt><dd>${p.k}</dd></dl></div></div></div>
<h2 class="mt-5 mb-4">Sus películas</h2><div class="row g-4">${p.pelis.map(([t,a])=>`<div class="col-6 col-md-4 col-lg-3"><div class="tarjeta" style="--ac:${p.c}"><span class="emb s">${t}</span><img src="img/pelis/${sl(t+' '+a)}.jpg" alt="Póster de ${t}" onerror="this.remove()"><div class="info"><h3>${t}</h3><p>${a}</p></div></div></div>`).join('')}</div>
<div class="d-flex justify-content-between mt-5"><a class="btn-sangre" href="productora.html?id=${P[(i+P.length-1)%P.length].id}">Anterior</a><a class="btn-sangre" href="index.html#productoras">Todas</a><a class="btn-sangre" href="productora.html?id=${P[(i+1)%P.length].id}">Siguiente</a></div></section>`;
