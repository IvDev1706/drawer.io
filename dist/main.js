import { get_controller } from "./canvas.js";
import { CIRCLE, DIAMOND, ERASER, LINE, OVAL, PENTAGON, PINCEL, RECTANGLE, RRECTANGLE, TEXT, TRIANGLE, HEXAGON } from './utils/tools.js';
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
const line_btn = document.getElementById("line-tool");
const rect_btn = document.getElementById("rect-tool");
const rrect_btn = document.getElementById("rrect-tool");
const circle_btn = document.getElementById("circle-tool");
const oval_btn = document.getElementById("oval-tool");
const tri_btn = document.getElementById("tri-tool");
const diam_btn = document.getElementById("diam-tool");
const pent_btn = document.getElementById("pent-tool");
const hex_btn = document.getElementById("hex-tool");
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
line_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(LINE);
    canvas_tool.innerText = "Herramienta: " + LINE;
});
rect_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(RECTANGLE);
    canvas_tool.innerText = "Herramienta: " + RECTANGLE;
});
rrect_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(RRECTANGLE);
    canvas_tool.innerText = "Herramienta: " + RRECTANGLE;
});
circle_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(CIRCLE);
    canvas_tool.innerText = "Herramienta: " + CIRCLE;
});
oval_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(OVAL);
    canvas_tool.innerText = "Herramienta: " + OVAL;
});
tri_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(TRIANGLE);
    canvas_tool.innerText = "Herramienta: " + TRIANGLE;
});
diam_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(DIAMOND);
    canvas_tool.innerText = "Herramienta: " + DIAMOND;
});
pent_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(PENTAGON);
    canvas_tool.innerText = "Herramienta: " + PENTAGON;
});
hex_btn.addEventListener("click", (e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(HEXAGON);
    canvas_tool.innerText = "Herramienta: " + HEXAGON;
});
