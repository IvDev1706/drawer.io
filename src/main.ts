//obtener objetos
const canvas = document.getElementById("board") as HTMLCanvasElement;
const canvas_cont =  document.getElementById("board-cont") as HTMLDivElement;
const canvas_res = document.getElementById("res-text") as HTMLParagraphElement;

//ajustar si es movile
if (window.screen.width <= 800){
    canvas.width = 360;
    canvas.height = 720;
    canvas_cont.style.width = "360px";
    canvas_res.innerText = "Resolucion: (360x720)";
}