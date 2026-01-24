export function openPincel(canvas, p) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar el contexto
    if (!ctx) {
        return;
    }
    //abrir el path
    ctx.beginPath();
    //mover al punto
    ctx.moveTo(p.x, p.y);
}
export function drawPincel(canvas, p) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar el contexto
    if (!ctx) {
        return;
    }
    //dibujar linea hasta el punto
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
}
export function closePincel(canvas) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar el contexto
    if (!ctx) {
        return;
    }
    //abrir el path
    ctx.closePath();
}
