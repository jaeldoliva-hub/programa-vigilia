function getFormValues() {
  return {
    serviceDate: document.getElementById('serviceDate')?.value || '',
    dirige: document.getElementById('dirige')?.value || '',
    alabanzas: document.getElementById('alabanzas')?.value || '',
    ofrendas: document.getElementById('ofrendas')?.value || '',
    mensaje: document.getElementById('mensaje')?.value || '',
    puerta: document.getElementById('puerta')?.value || '',
    parqueo: document.getElementById('parqueo')?.value || '',
    bocadillos: document.getElementById('bocadillos')?.value || '',
    recordatorio: document.getElementById('recordatorioMessage')?.value || '',
    whatsappMessage: document.getElementById('whatsappMessage')?.value || ''
  };
}

function formatDateToSpanish(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  const weekdays = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${weekdays[d.getDay()].charAt(0).toUpperCase()+weekdays[d.getDay()].slice(1)}, ${d.getDate()} de ${months[d.getMonth()]}`;
}

// Insert emoji at cursor
function insertEmoji(ch, targetId) {
  const el = document.getElementById(targetId);
  const start = el.selectionStart || 0;
  const end = el.selectionEnd || 0;
  el.value = el.value.slice(0,start) + ch + el.value.slice(end);
  el.selectionStart = el.selectionEnd = start + ch.length;
  el.focus();
}

// Auto-grow textarea
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = (el.scrollHeight) + 'px';
}

// Build Vigilia message
function buildFinalMessage() {
  const v = getFormValues();
  const lines = [];

  if (v.recordatorio) lines.push(v.recordatorio);

  const dateStr = formatDateToSpanish(v.serviceDate);
  if (dateStr) lines.push(`_${dateStr}_\n`);

  lines.push(`*Vigilia [lema de la vigilia]*\n`);

  lines.push(`_*PARTE 1*_`);
  if (v.puerta) lines.push(`*Bienvenida en la puerta:* ${v.puerta}`);
  if (v.dirige) lines.push(`*Dirección:* ${v.dirige}`);
  if (v.alabanzas) lines.push(`*Alabanzas:* ${v.alabanzas}`);
  if (v.ofrendas) lines.push(`*Ofrendas:* ${v.ofrendas}`);

  lines.push(`*Oración:*`);
  for(let i=0;i<3;i++) lines.push(`- [peticion], [nombre de hno]`);

  lines.push(`*Participaciones ( Testimonios de agradecimiento, alabanzas o palabras de motivación)*`);
  for(let i=0;i<3;i++) lines.push(`- `);

  if(v.mensaje) lines.push(`*Mensaje:* ${v.mensaje}`);
  if(v.bocadillos) lines.push(`\nBocadillos: ${v.bocadillos}`);

  lines.push(`\n_*PARTE 2*_`);
  lines.push(`*Dinámica:* Hna María Elena`);
  if(v.dirige) lines.push(`*Dirección:* ${v.dirige}`);
  if(v.alabanzas) lines.push(`*Alabanzas:* ${v.alabanzas}`);

  lines.push(`*Oración:*`);
  for(let i=0;i<3;i++) lines.push(`- [peticion], [nombre de hno]`);

  lines.push(`*Participaciones ( Alabanzas, testimonios y palabras de ánimo)*`);
  for(let i=0;i<3;i++) lines.push(`- `);

  lines.push(`*Alabanzas de adoración:*`);
  if(v.mensaje) lines.push(`*Mensaje:* ${v.mensaje}`);
  lines.push(`_Ministracion_`);

  if(v.whatsappMessage) lines.push('\n' + v.whatsappMessage);

  return lines.join('\n');
}

// Build WhatsApp URL and send
function buildWhatsAppUrl(message) {
  return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
}

function sendToWhatsApp() {
  const msg = buildFinalMessage();
  const url = buildWhatsAppUrl(msg);
  window.open(url,'_blank');
}

// Debug URL
function debugWhatsAppUrl() {
  const msg = buildFinalMessage();
  const url = buildWhatsAppUrl(msg);
  const dbg = document.getElementById('whatsappDebug');
  dbg.style.display='block';
  dbg.textContent = msg + '\n\n' + url;
}

// Initialize
window.addEventListener('DOMContentLoaded', ()=>{
  const ta = document.getElementById('whatsappMessage');
  if(ta) autoGrow(ta);
});
