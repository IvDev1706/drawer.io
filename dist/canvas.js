import { openPincel, drawPincel, closePincel, openEraser, closeEraser } from "./painting/drawPincel.js";
import { clearCanvas } from "./painting/repaints.js";
import { drawText } from "./painting/texts.js";
import { ERASER, NOTHING, PINCEL, TEXT } from './utils/tools.js';
export function get_controller(canvas, canvas_pointer) {
    //instanciar el objeto
    return {
        canvas: canvas,
        canvas_pointer: canvas_pointer,
        config: {
            strokeColor: "#000000",
            fillColor: "#FFFFFF",
            lineWeight: 5,
            font: "Arial",
            fontSize: 10,
            angle: 90
        },
        tool: NOTHING,
        isDrawing: false,
        init() {
            //poner configuracion inicial
            this.updateConfig();
            //vincular escuchas al canvas
            this.canvas.onmousedown = (e) => this.onStart(e);
            this.canvas.onmousemove = (e) => this.onMove(e);
            this.canvas.onmouseup = (e) => this.onStop(e);
            this.canvas.ontouchstart = (e) => this.onStart(e);
            this.canvas.ontouchmove = (e) => this.onMove(e);
            this.canvas.ontouchend = (e) => this.onStop(e);
        },
        get_position(e) {
            //objeto a retornar
            const p = { x: 0, y: 0 };
            //obtener las coordenadas
            if (e instanceof MouseEvent) {
                p.x = e.clientX - this.canvas.getBoundingClientRect().x;
                p.y = e.clientY - this.canvas.getBoundingClientRect().y;
            }
            else {
                p.x = Math.round(e.touches[0].clientX - this.canvas.getBoundingClientRect().x);
                p.y = Math.round(e.touches[0].clientY - this.canvas.getBoundingClientRect().y);
            }
            //retornar el punto
            return p;
        },
        set_tool(tool) {
            //cambiar herramienta
            this.tool = tool;
        },
        cleanCanvas() {
            //limpiar el canvas
            clearCanvas(this.canvas);
        },
        updateConfig() {
            //colocar nuevos valores
            const ctx = canvas.getContext("2d");
            //validar el contexto
            if (!ctx) {
                return;
            }
            //definir las propiedades
            ctx.strokeStyle = this.config.strokeColor;
            ctx.fillStyle = this.config.fillColor;
            ctx.lineWidth = this.config.lineWeight;
            ctx.font = this.config.fontSize + "px " + this.config.font;
        },
        onStart(e) {
            //si no hay herramienta
            if (this.tool == NOTHING) {
                return;
            }
            //obtener punto
            const p = this.get_position(e);
            //herramienta de texto
            if (this.tool == TEXT) {
                //pedir el texto a ingresar
                const text = prompt("Ingrese el texto:", "drawerio");
                //dibujar en el canvas
                drawText(this.canvas, text, p);
                return;
            }
            //levantar bandera
            this.isDrawing = true;
            //herramienta de pincel
            if (this.tool == PINCEL) {
                //abrir el pincel
                openPincel(canvas, p);
                //herramienta de borrador
            }
            else if (this.tool == ERASER) {
                //abrir el pincel
                openEraser(canvas, p);
            }
        },
        onMove(e) {
            //obtener punto
            const p = this.get_position(e);
            //actualizar etiqueta
            canvas_pointer.innerText = `Puntero: (${p.x}, ${p.y})`;
            //verificar que se haya presionado
            if (this.isDrawing) {
                //dibujar el trazo
                drawPincel(canvas, p);
            }
        },
        onStop(e) {
            //si no hay herramienta
            if (this.tool == NOTHING || this.tool == TEXT) {
                return;
            }
            //se apaga la bandera
            this.isDrawing = false;
            //dibujar el pincel
            if (this.tool == PINCEL) {
                //cierra el path
                closePincel(this.canvas);
            }
            else if (this.tool == ERASER) {
                //cerrar el borrador
                closeEraser(this.canvas);
            }
        }
    };
}
