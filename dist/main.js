import { get_controller } from "./canvas.js";
import { ERASER, PINCEL, TEXT } from './utils/tools.js';
//objeto canvas
const canvas = document.getElementById("board");
const canvas_cont = document.getElementById("board-cont");
//etiquetas
const canvas_res = document.getElementById("res-text");
const canvas_tool = document.getElementById("tool-text");
const canvas_pointer = document.getElementById("cursor-text");
//botones de funcion
const pincel_btn = document.getElementById("pincel-tool");
const text_btn = document.getElementById("text-tool");
const eraser_btn = document.getElementById("eraser-tool");
const clean_btn = document.getElementById("clean-tool");
//campos de configuracion
const lineColor_fld = document.getElementById("line-color");
const fillColor_fld = document.getElementById("fill-color");
const lineWeight_fld = document.getElementById("line-weight");
const font_fld = document.getElementById("font");
const fontSize_fld = document.getElementById("font-size");
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
//fijar valores de configuracion
lineColor_fld.value = canvas_controller.config.strokeColor;
fillColor_fld.value = canvas_controller.config.fillColor;
lineWeight_fld.value = canvas_controller.config.lineWeight + "";
font_fld.value = canvas_controller.config.font;
fontSize_fld.value = canvas_controller.config.fontSize + "";
//escuchas de campos
lineColor_fld.addEventListener("change", (e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.strokeColor = e.target.value;
    canvas_controller.updateConfig();
});
fillColor_fld.addEventListener("change", (e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.fillColor = e.target.value;
    canvas_controller.updateConfig();
});
lineWeight_fld.addEventListener("change", (e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.lineWeight = parseInt(e.target.value);
    canvas_controller.updateConfig();
});
font_fld.addEventListener("change", (e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.font = e.target.value;
    canvas_controller.updateConfig();
});
fontSize_fld.addEventListener("change", (e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.fontSize = parseInt(e.target.value);
    canvas_controller.updateConfig();
});
//escuchas de botones
pincel_btn.addEventListener("click", (e) => {
    //definir la herramienta en el controlador
    canvas_controller.set_tool(PINCEL);
    canvas_tool.innerText = "Herramienta: " + PINCEL;
});
text_btn.addEventListener("click", (e) => {
    //definir la herramienta en el controlador
    canvas_controller.set_tool(TEXT);
    canvas_tool.innerText = "Herramienta: " + TEXT;
});
eraser_btn.addEventListener("click", (e) => {
    //definir la herramienta en el controlador
    canvas_controller.set_tool(ERASER);
    canvas_tool.innerText = "Herramienta: " + ERASER;
});
clean_btn.addEventListener("click", (e) => {
    //limpiar el canvas completo
    canvas_controller.cleanCanvas();
});
