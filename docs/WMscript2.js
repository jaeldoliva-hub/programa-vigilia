document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("sendWhatsAppBtn").addEventListener("click", sendWhatsApp);

function v(id) {
  return document.getElementById(id).value.trim();
}

function generate() {
  let msg = `*Vigilia ${v("vigiliaTitulo") || "[lema de la vigilia]"}*\n`;

  if (v("serviceDate")) {
    const d = new Date(v("serviceDate") + "T00:00");
    msg += `_${formatDate(d)}_\n\n`;
  }

  msg += `_*PARTE 1*_\n`;
  msg += `*Bienvenida en la puerta:* ${v("p1Puerta") || "[Hnos. Roger y Fany]"}\n`;
  msg += `*Dirección:* ${v("p1Direccion") || "[Hno. Juan Carlos]"}\n`;
  msg += `*Alabanzas:* ${v("p1Alabanzas") || "[nombre de hno]"}\n`;
  msg += `*Ofrendas:* ${v("p1Ofrendas") || "Hnos. Santos y María"}\n`;

  msg += `*Oración:*\n${list(v("p1Oracion"))}`;
  msg += `*⁠Participaciones ( Testimonios de agradecimiento, alabanzas o palabras de motivación)*\n${list(v("p1Participaciones"))}`;
  msg += `*Mensaje:* ${v("p1Mensaje") || "Pastor Marvin Oliva"}\n\n`;
  msg += `Bocadillos: ${v("bocadillos") || ""}\n\n`;

  msg += `_*PARTE 2*_\n`;
  msg += `*Dinámica:* ${v("p2Dinamica") || "Hna María Elena"}\n`;
  msg += `*Dirección:* ${v("p2Direccion") || "Hno. José Hdez."}\n`;
  msg += `*Alabanzas:* ${v("p2Alabanzas") || "[nombre de hno]"}\n`;

  msg += `*Oración:*\n${list(v("p2Oracion"))}`;
  msg += `*Participaciones ( Alabanzas, testimonios y palabras de ánimo)*\n${list(v("p2Participaciones"))}`;
  msg += `*Alabanzas de adoración:* ${v("p2Adoracion") || ""}\n`;
  msg += `*Mensaje:* ${v("p2Mensaje") || "Pastor Marvin Oliva"}\n`;
  msg += `_Ministracion_`;

  document.getElementById("whatsappMessage").value = msg;
}

function list(text) {
  if (!text) {
    return `- [peticion], [nombre de hno]\n- [peticion], [nombre de hno]\n- [peticion], [nombre de hno]\n`;
  }
  return text.split("\n").filter(Boolean).map(l => `- ${l}`).join("\n") + "\n";
}

function formatDate(d) {
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).replace(/^./, c => c.toUpperCase());
}

function sendWhatsApp() {
  const msg = document.getElementById("whatsappMessage").value;
  if (!msg) return alert("Primero genere el mensaje");
  window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
}
