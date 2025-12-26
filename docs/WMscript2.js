document.getElementById("generateBtn").addEventListener("click", generate);

function generate() {
  let o = [];
  const v = id => document.getElementById(id).value.trim();
  const real = t => t && !(t.startsWith("[") && t.endsWith("]"));

  const list = t => real(t)
    ? t.split("\n").filter(x=>x.trim()).map(x=>`- ${x}`).join("\n")
    : "";

  if (real(v("vigiliaTitulo")))
    o.push(`*Vigilia ${v("vigiliaTitulo")}*`);

  if (v("serviceDate")) {
    const d = new Date(v("serviceDate")+"T00:00");
    o.push(`_${d.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"}).replace(/^./,c=>c.toUpperCase())}_`);
  }

  o.push("\n_*PARTE 1*_");
  line(o,"Bienvenida en la puerta",v("p1Puerta"));
  line(o,"Dirección",v("p1Direccion"));
  line(o,"Alabanzas",v("p1Alabanzas"));
  line(o,"Ofrendas",v("p1Ofrendas"));

  block(o,"Oración",list(v("p1Oracion")));
  block(o,"Participaciones ( Testimonios de agradecimiento, alabanzas o palabras de motivación)",list(v("p1Participaciones")));
  line(o,"Mensaje",v("p1Mensaje"));

  if (real(v("bocadillos"))) o.push(`\nBocadillos: ${v("bocadillos")}`);

  o.push("\n_*PARTE 2*_");
  line(o,"Dinámica",v("p2Dinamica"));
  line(o,"Dirección",v("p2Direccion"));
  line(o,"Alabanzas",v("p2Alabanzas"));

  block(o,"Oración",list(v("p2Oracion")));
  block(o,"Participaciones ( Alabanzas, testimonios y palabras de ánimo)",list(v("p2Participaciones")));

  line(o,"Alabanzas de adoración",v("p2Adoracion"));
  line(o,"Mensaje",v("p2Mensaje"));

  if (real(v("ministracion"))) o.push("_Ministración_");

  document.getElementById("whatsappMessage").value = o.join("\n");
}

function line(arr,label,val){
  if(val && !(val.startsWith("[") && val.endsWith("]")))
    arr.push(`*${label}:* ${val}`);
}

function block(arr,label,val){
  if(val){
    arr.push(`*${label}:*`);
    arr.push(val);
  }
}
