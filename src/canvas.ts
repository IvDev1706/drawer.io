import { CanvasController } from "./interfaces/canvas.js";
import { Arc, Line, Rectangle } from "./interfaces/shapes.js";
import { openPincel, drawPincel, closePincel, openEraser, closeEraser } from "./painting/drawPincel.js";
import { drawArc, drawLine, drawRect } from "./painting/drawShapes.js";
import { clearCanvas } from "./painting/repaints.js";
import { drawText } from "./painting/texts.js";
import { buildShape } from "./utils/shapeFactory.js";
import { ERASER, NOTHING, PINCEL, TEXT, LINE, RECTANGLE, RRECTANGLE, CIRCLE, OVAL } from './utils/tools.js';

export function get_controller(canvas:HTMLCanvasElement, canvas_pointer:HTMLParagraphElement):CanvasController{
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
        line_ref: {
            startPoint: {x:0,y:0},
            endPoint: {x:0,y:0},
        },
        init() {
            //poner configuracion inicial
            this.updateConfig();
            //vincular escuchas al canvas
            this.canvas.onpointerdown = (e) => this.onStart(e);
            this.canvas.onpointermove = (e) => this.onMove(e);
            this.canvas.onpointerup = (e) => this.onStop(e);
        },
        get_position(e) {
            //objeto a retornar
            const p = {x:0,y:0};

            //obtener las coordenadas
            if(e instanceof MouseEvent){
                p.x = e.clientX - this.canvas.getBoundingClientRect().x;
                p.y = e.clientY - this.canvas.getBoundingClientRect().y;
            }else{
                p.x = Math.floor(e.changedTouches[e.changedTouches.length - 1].clientX - this.canvas.getBoundingClientRect().x);
                p.y = Math.floor(e.changedTouches[e.changedTouches.length - 1].clientY - this.canvas.getBoundingClientRect().y);
            }

            //retornar el punto
            return p;
        },
        set_tool(tool){
            //cambiar herramienta
            this.tool = tool;
        },
        cleanCanvas(){
            //limpiar el canvas
            clearCanvas(this.canvas);
        },
        updateConfig(){
            //colocar nuevos valores
            const ctx = canvas.getContext("2d");

            //validar el contexto
            if(!ctx){
                return;
            }

            //definir las propiedades
            ctx.strokeStyle = this.config.strokeColor;
            ctx.fillStyle = this.config.fillColor;
            ctx.lineWidth = this.config.lineWeight;
            ctx.font = this.config.fontSize +"px " + this.config.font;
        },
        onStart(e) {
            //si no hay herramienta
            if(this.tool == NOTHING){
                return;
            }

            //obtener punto
            const p = this.get_position(e);

            //herramienta de figuras
            if(this.tool != PINCEL && this.tool != ERASER && this.tool != TEXT){
                //guardar en referencia
                this.line_ref.startPoint = {...p};
                return;
            }

            //herramienta de texto
            if(this.tool == TEXT){
                //pedir el texto a ingresar
                const text = prompt("Ingrese el texto:","drawerio") as string;
                //dibujar en el canvas
                drawText(this.canvas,text,p);
                return;
            }

            //levantar bandera
            this.isDrawing = true;

            //herramienta de pincel
            if(this.tool == PINCEL){
                //abrir el pincel
                openPincel(canvas, p);
            //herramienta de borrador
            }else{
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
            if(this.isDrawing){
                //dibujar el trazo
                drawPincel(canvas,p);
            }
        },
        onStop(e){
            //si no hay herramienta
            if(this.tool == NOTHING || this.tool == TEXT){
                return;
            }

            //validar herramienta
            if(this.tool != PINCEL && this.tool != ERASER){
                //obtener las coordenadas
                this.line_ref.endPoint = this.get_position(e);
            }

            //cerrar el pincel
            if(this.tool == PINCEL){
                //se apaga la bandera
                this.isDrawing = false;
                //cierra el path
                closePincel(this.canvas);
            }else if(this.tool == ERASER){
                //se apaga la bandera
                this.isDrawing = false;
                //cerrar el borrador
                closeEraser(this.canvas);
            }else if(this.tool == LINE){
                //construir la linea
                const line = buildShape(LINE,this.config,{...this.line_ref}) as Line;
                //dibujar la linea
                drawLine(this.canvas,line);
            }else if(this.tool == RECTANGLE){
                //construir la linea
                const rect = buildShape(RECTANGLE,this.config,{...this.line_ref}) as Rectangle;
                //dibujar la linea
                drawRect(this.canvas,rect);
            }else if(this.tool == RRECTANGLE){
                //construir la linea
                const rrect = buildShape(RRECTANGLE,this.config,{...this.line_ref}) as Rectangle;
                //dibujar la linea
                drawRect(this.canvas,rrect);
            }else if(this.tool == CIRCLE){
                //construir la linea
                const circle = buildShape(CIRCLE,this.config,{...this.line_ref}) as Arc;
                //dibujar la linea
                drawArc(this.canvas,circle);
            }else if(this.tool == OVAL){
                //construir la linea
                const oval = buildShape(OVAL,this.config,{...this.line_ref}) as Arc;
                //dibujar la linea
                drawArc(this.canvas,oval);
            }
        }
    };
}
