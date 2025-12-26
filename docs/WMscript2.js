function generarMensaje() {
  const get = id => document.getElementById(id).value;

  const output = `*Vigilia ${get("lema")}*
_${get("fecha")}_

_*PARTE 1*_
*Bienvenida en la puerta:* ${get("bienvenida1")}
*Dirección:* ${get("direccion1")}
*Alabanzas:* ${get("alabanzas1")}
*Ofrendas:* ${get("ofrendas1")}
*Oración:*
- ${get("oracion1a")}
- ${get("oracion1b")}
- ${get("oracion1c")}

*Participaciones ( Testimonios de agradecimiento, alabanzas o palabras de motivación)*
${formatLista(get("participaciones1"))}

*Mensaje:* ${get("mensaje1")}

Bocadillos: ${get("bocadillos")}

_*PARTE 2*_
*Dinámica:* ${get("dinamica")}
*Dirección:* ${get("direccion2")}
*Alabanzas:* ${get("alabanzas2")}
*Oración:*
- ${get("oracion2a")}
- ${get("oracion2b")}
- ${get("oracion2c")}

*Participaciones ( Alabanzas, testimonios y palabras de ánimo)*
${formatLista(get("participaciones2"))}

*Alabanzas de adoración:* ${get("adoracion")}
*Mensaje:* ${get("mensaje2")}
_Ministracion_`;

  document.getElementById("output").textContent = output;
}

function formatLista(text) {
  if (!text) return "-\n-\n-";
  return text
    .split("\n")
    .map(line => `- ${line}`)
    .join("\n");
}
