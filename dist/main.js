import { get_controller } from "./canvas.js";
//objeto canvas
const canvas = document.getElementById("board");
const canvas_cont = document.getElementById("board-cont");
//etiquetas
const canvas_res = document.getElementById("res-text");
const canvas_tool = document.getElementById("tool-text");
const canvas_pointer = document.getElementById("cursor-text");
//ajustar si es movile
if (window.screen.width <= 800) {
    canvas.width = 360;
    canvas.height = 720;
    canvas_cont.style.width = "360px";
    canvas_res.innerText = "Resolucion: (360x720)";
}
//obtener el controlador del canvas
const canvas_controller = get_controller(canvas, canvas_pointer);
canvas_controller.init();
