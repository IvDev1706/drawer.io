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
    //cerrar el path
    ctx.closePath();
}
export function openEraser(canvas, p) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar el contexto
    if (!ctx) {
        return;
    }
    //guardar estilos y fijar color blanco
    ctx.save();
    ctx.strokeStyle = "#FFFFFF";
    //abrir el pincel
    openPincel(canvas, p);
}
export function closeEraser(canvas) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar el contexto
    if (!ctx) {
        return;
    }
    //restaurar los estilos
    ctx.restore();
    //cerrar el pincel
    closePincel(canvas);
}
