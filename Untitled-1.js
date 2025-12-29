/* ===============================
   DYNAMIC INPUTS
================================ */

function addInput(containerId) {
  event.preventDefault();
  const container = document.getElementById(containerId);
  if (!container) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Petición / Participación, Nombre de Hno(a)';
  input.style.marginTop = '6px';

  container.appendChild(input);
}

/* ===============================
   HELPERS
================================ */

function getValue(id) {
  return document.getElementById(id)?.value.trim() || '';
}

function getList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('input'))
    .map(i => i.value.trim())
    .filter(v => v !== '');
}

function formatDateToSpanishTitle(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (isNaN(d)) return '';
  const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${dias[d.getDay()][0].toUpperCase() + dias[d.getDay()].slice(1)} ${d.getDate()} de ${meses[d.getMonth()]}`;
}

/* ===============================
   MESSAGE BUILDER
================================ */

function buildFinalMessage() {

  let msg = [];

  const lema = getValue('Lema');
  const fecha = formatDateToSpanishTitle(getValue('serviceDate'));

  msg.push(`*Vigilia* ${lema}`);
  msg.push(`_${fecha}_`);
  msg.push('');

  /* -------- PARTE 1 -------- */
  let p1 = [];

  const puerta = getValue('Puerta');
  const director1 = getValue('Director');
  const alabanzas1 = getValue('alabanzas');
  const ofrendas = getValue('ofrendas');
  const oracion1 = getList('oracion-container');
  const participaciones1 = getList('participaciones-container1');
  const mensaje1 = getValue('mensaje');
  const bocadillos = getValue('bocadillos');

  if (puerta) p1.push(`*Bienvenida en la puerta:* ${puerta}`);
  if (director1) p1.push(`*Dirección:* ${director1}`);
  if (alabanzas1) p1.push(`*Alabanzas:* ${alabanzas1}`);
  if (ofrendas) p1.push(`*Ofrendas:* ${ofrendas}`);

  if (oracion1.length) {
    p1.push(`*Oración:*`);
    oracion1.forEach(o => p1.push(`- ${o}`));
  }

  if (participaciones1.length) {
    p1.push(`*Participaciones ( Testimonios de agradecimiento, alabanzas o palabras de motivación)*`);
    participaciones1.forEach(p => p1.push(`- ${p}`));
  }

  p1.push(`*Mensaje:* ${mensaje1}`);
  if (bocadillos) p1.push(`Bocadillos: ${bocadillos}`);

  if (p1.length) {
    msg.push(`_*PARTE 1*_`);
    msg.push(...p1);
    msg.push('');
  }

  /* -------- PARTE 2 -------- */
  let p2 = [];

  const dinamica = getValue('Dinmica');
  const director2 = getValue('Director2');
  const alabanzas2 = getValue('alabanzas2');
  const oracion2 = getList('oracion2-container');
  const participaciones2 = getList('participaciones-container2');
  const adoracion = getValue('alabanzas2a');
  const ministracion = getValue('ministracion');

  if (dinamica) p2.push(`*Dinámica:* ${dinamica}`);
  if (director2) p2.push(`*Dirección:* ${director2}`);
  if (alabanzas2) p2.push(`*Alabanzas:* ${alabanzas2}`);

  if (oracion2.length) {
    p2.push(`*Oración:*`);
    oracion2.forEach(o => p2.push(`- ${o}`));
  }

  if (participaciones2.length) {
    p2.push(`*Participaciones ( Alabanzas, testimonios y palabras de ánimo)*`);
    participaciones2.forEach(p => p2.push(`- ${p}`));
  }

p2.push(`*Alabanzas de adoración:* ${adoracion}`);
const mensaje2 = getValue('mensaje2');
p2.push(`*Mensaje:* ${mensaje2}`);
p2.push(`_Ministracion_ ${ministracion}`);


  if (p2.length > 2) {
    msg.push(`_*PARTE 2*_`);
    msg.push(...p2);
  }

  return msg.join('\n');
}

/* ===============================
   SEND TO WHATSAPP
================================ */

function sendToWhatsApp() {
  const message = buildFinalMessage();
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

/* ===============================
   TEXTAREA AUTO-GROW
================================ */

function autoGrow(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

