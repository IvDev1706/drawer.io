export function clearCanvas(canvas) {
    //limpiar el canvas
    const ctx = canvas.getContext("2d");
    //validar contexto
    if (!ctx) {
        return;
    }
    //limpiar el rectangulo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
