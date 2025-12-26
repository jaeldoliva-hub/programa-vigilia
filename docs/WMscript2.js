function utf8PercentEncode(str) {
  try {
    if (typeof TextEncoder !== 'undefined') {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(String(str));
      return Array.from(bytes).map(b => '%' + b.toString(16).toUpperCase().padStart(2,'0')).join('');
    }
  } catch(e){}
  return encodeURIComponent(String(str));
}

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
  if (isNaN(d.getTime())) return isoDate;
  const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const weekday = days[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];
  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month}`;
}

function buildFinalMessage() {
  const v = getFormValues();
  const lines = [];

  if (v.recordatorio) lines.push(v.recordatorio);
  const dateStr = formatDateToSpanish(v.serviceDate);
  if (dateStr) lines.push(`_${dateStr}_\n`);

  lines.push(`*Vigilia [lema de la vigilia]*`);

  lines.push(`\n_*PARTE 1*_`);
  if (v.puerta) lines.push(`*Bienvenida en la puerta:* ${v.puerta}`);
  if (v.dirige) lines.push(`*Dirección:* ${v.dirige}`);
  if (v.alabanzas) lines.push(`*Alabanzas:* ${v.alabanzas}`);
  if (v.ofrendas) lines.push(`*Ofrendas:* ${v.ofrendas}`);
  if (v.mensaje) lines.push(`*Mensaje:* ${v.mensaje}`);
  if (v.parqueo) lines.push(`*Parqueo:* ${v.parqueo}`);
  if (v.bocadillos) lines.push(`Bocadillos: ${v.bocadillos}`);

  // Append additional invitation text
  if (v.whatsappMessage) lines.push('\n' + v.whatsappMessage);

  return lines.join('\n');
}

function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message).replace(/%20/g,'+');
  return 'https://api.whatsapp.com/send?text=' + encoded;
}

function sendToWhatsApp() {
  const msg = buildFinalMessage();
  const url = buildWhatsAppUrl(msg);
  window.open(url, '_blank');
  console.log('WhatsApp URL:', url);
}

function debugWhatsAppUrl() {
  const msg = buildFinalMessage();
  const url = buildWhatsAppUrl(msg);
  const dbg = document.getElementById('whatsappDebug');
  dbg.style.display = 'block';
  dbg.innerHTML = `<pre>${msg}</pre><a href="${url}" target="_blank">${url}</a>`;
}

// Auto-grow
function autoGrow(el){
  el.style.height = 'auto';
  el.style.height = el.scrollHeight+'px';
}

// Emoji insert
function insertEmoji(ch, targetId){
  const el = document.getElementById(targetId);
  if (!el) return;
  const start = el.selectionStart || 0;
  const end = el.selectionEnd || 0;
  el.value = el.value.slice(0,start)+ch+el.value.slice(end);
  el.selectionStart = el.selectionEnd = start+ch.length;
  el.focus();
  if(el.tagName.toLowerCase() === 'textarea') autoGrow(el);
}

window.addEventListener('DOMContentLoaded',()=>{
  const ta = document.getElementById('whatsappMessage');
  if(ta) autoGrow(ta);
});
