import { CanvasController, CanvasConfig } from "./interfaces/canvas.js";
import { Point } from "./interfaces/paths.js";
import { openPincel, drawPincel, closePincel } from "./painting/drawPincel.js";

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
        tool: "",
        init() {
            //poner configuracion inicial
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.strokeStyle = this.config.strokeColor;
            ctx.lineWidth = this.config.lineWeight;
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
            const p = {x:0,y:0};

            //obtener las coordenadas
            if(e instanceof MouseEvent){
                p.x = e.clientX - this.canvas.getBoundingClientRect().x;
                p.y = e.clientY - this.canvas.getBoundingClientRect().y;
            }else{
                p.x = Math.round(e.touches[0].clientX - this.canvas.getBoundingClientRect().x);
                p.y = Math.round(e.touches[0].clientY - this.canvas.getBoundingClientRect().y);
            }

            //retornar el punto
            return p;
        },
        set_tool(tool){
            //cambiar herramienta
            this.tool = tool;
        },
        onStart(e) {
            //obtener punto
            const p = this.get_position(e);

            //abrir el pincel
            openPincel(canvas, p);

            this.tool = "pincel";
        },
        onMove(e) {
            //obtener punto
            const p = this.get_position(e);

            //actualizar etiqueta
            canvas_pointer.innerText = `Puntero: (${p.x}, ${p.y})`;

            //dibujar el pincel
            if(this.tool == "pincel"){
                drawPincel(canvas,p);
            }
        },
        onStop(e){
            //dibujar el pincel
            if(this.tool == "pincel"){
                closePincel(canvas);
                this.tool = "";
            }
        }
    };
}
