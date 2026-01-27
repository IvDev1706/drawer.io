import { get_controller } from "./canvas.js";
import { CIRCLE, ERASER, LINE, OVAL, PINCEL, RECTANGLE, RRECTANGLE, TEXT } from './utils/tools.js';

//objeto canvas
const canvas = document.getElementById("board") as HTMLCanvasElement;
const canvas_cont =  document.getElementById("board-cont") as HTMLDivElement;

//etiquetas
const canvas_res = document.getElementById("res-text") as HTMLParagraphElement;
const canvas_tool = document.getElementById("tool-text") as HTMLParagraphElement;
const canvas_pointer = document.getElementById("cursor-text") as HTMLParagraphElement;

//botones de funcion
const pincel_btn = document.getElementById("pincel-tool") as HTMLButtonElement;
const text_btn = document.getElementById("text-tool") as HTMLButtonElement;
const eraser_btn = document.getElementById("eraser-tool") as HTMLButtonElement;
const clean_btn = document.getElementById("clean-tool") as HTMLButtonElement;
const line_btn = document.getElementById("line-tool") as HTMLButtonElement;
const rect_btn = document.getElementById("rect-tool") as HTMLButtonElement;
const rrect_btn = document.getElementById("rrect-tool") as HTMLButtonElement;
const circle_btn = document.getElementById("circle-tool") as HTMLButtonElement;
const oval_btn = document.getElementById("oval-tool") as HTMLButtonElement;

//campos de configuracion
const lineColor_fld = document.getElementById("line-color") as HTMLInputElement;
const fillColor_fld = document.getElementById("fill-color") as HTMLInputElement;
const lineWeight_fld = document.getElementById("line-weight") as HTMLInputElement;
const font_fld = document.getElementById("font") as HTMLSelectElement;
const fontSize_fld = document.getElementById("font-size") as HTMLInputElement;

//ajustar si es movile
if (window.screen.width <= 800){
    canvas.width = 360;
    canvas.height = 720;
    canvas_cont.style.width = "360px";
    canvas_res.innerText = "Resolucion: (360x720)";
}

//obtener el controlador del canvas
const canvas_controller = get_controller(canvas,canvas_pointer);
canvas_controller.init();

//fijar valores de configuracion
lineColor_fld.value = canvas_controller.config.strokeColor;
fillColor_fld.value = canvas_controller.config.fillColor;
lineWeight_fld.value = canvas_controller.config.lineWeight+"";
font_fld.value = canvas_controller.config.font;
fontSize_fld.value = canvas_controller.config.fontSize+"";

//escuchas de campos
lineColor_fld.addEventListener("change",(e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.strokeColor = (e.target as HTMLInputElement).value;
    canvas_controller.updateConfig();
});
fillColor_fld.addEventListener("change",(e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.fillColor = (e.target as HTMLInputElement).value;
    canvas_controller.updateConfig();
});
lineWeight_fld.addEventListener("change",(e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.lineWeight = parseInt((e.target as HTMLInputElement).value);
    canvas_controller.updateConfig();
});
font_fld.addEventListener("change",(e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.font = (e.target as HTMLSelectElement).value;
    canvas_controller.updateConfig();
});
fontSize_fld.addEventListener("change",(e) => {
    //cambiar en la configuracion del canvas
    canvas_controller.config.fontSize = parseInt((e.target as HTMLInputElement).value);
    canvas_controller.updateConfig();
});

//escuchas de botones
pincel_btn.addEventListener("click",(e) => {
    //definir la herramienta en el controlador
    canvas_controller.set_tool(PINCEL);
    canvas_tool.innerText = "Herramienta: "+PINCEL;
});

text_btn.addEventListener("click",(e)=>{
    //definir la herramienta en el controlador
    canvas_controller.set_tool(TEXT);
    canvas_tool.innerText = "Herramienta: "+TEXT;
});

eraser_btn.addEventListener("click",(e) => {
    //definir la herramienta en el controlador
    canvas_controller.set_tool(ERASER);
    canvas_tool.innerText = "Herramienta: "+ERASER;
});

clean_btn.addEventListener("click",(e) => {
    //limpiar el canvas completo
    canvas_controller.cleanCanvas();
});

line_btn.addEventListener("click",(e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(LINE);
    canvas_tool.innerText = "Herramienta: "+LINE;
});

rect_btn.addEventListener("click",(e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(RECTANGLE);
    canvas_tool.innerText = "Herramienta: "+RECTANGLE;
});

rrect_btn.addEventListener("click",(e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(RRECTANGLE);
    canvas_tool.innerText = "Herramienta: "+RRECTANGLE;
});

circle_btn.addEventListener("click",(e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(CIRCLE);
    canvas_tool.innerText = "Herramienta: "+CIRCLE;
});

oval_btn.addEventListener("click",(e) => {
    //definir herramienta en el controlador
    canvas_controller.set_tool(OVAL);
    canvas_tool.innerText = "Herramienta: "+OVAL;
});