export function drawText(canvas, text, p) {
    //obtener el contexto
    const ctx = canvas.getContext("2d");
    //validar contexto
    if (!ctx) {
        return;
    }
    //abrir un path
    ctx.beginPath();
    //dibujar el texto
    ctx.fillText(text, p.x, p.y);
    ctx.stroke();
    //cerrar el path
    ctx.closePath();
}
