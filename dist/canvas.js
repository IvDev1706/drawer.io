import { openPincel, drawPincel, closePincel, openEraser, closeEraser } from "./painting/drawPincel.js";
import { drawArc, drawLine, drawPolygon, drawRect } from "./painting/drawShapes.js";
import { clearCanvas } from "./painting/repaints.js";
import { drawText } from "./painting/texts.js";
import buildShape from "./utils/shapeFactory.js";
import { ERASER, NOTHING, PINCEL, TEXT, LINE, RECTANGLE, RRECTANGLE, CIRCLE, OVAL, TRIANGLE, DIAMOND, PENTAGON, HEXAGON } from './utils/tools.js';
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
        line_ref: {
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 0, y: 0 },
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
            //retornar el punto de coordenadas
            return {
                x: Math.floor(e.clientX - this.canvas.getBoundingClientRect().x),
                y: Math.floor(e.clientY - this.canvas.getBoundingClientRect().y)
            };
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
            //verificar el target (solo en movile pasa)
            if (e.currentTarget != this.canvas) {
                return;
            }
            //usar pointer capture
            this.canvas.setPointerCapture(e.pointerId);
            //obtener punto
            const p = this.get_position(e);
            //herramienta de figuras
            if (this.tool != PINCEL && this.tool != ERASER && this.tool != TEXT) {
                //guardar en referencia
                this.line_ref.startPoint = Object.assign({}, p);
                return;
            }
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
            else {
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
            //liberar el pointer capture
            if (this.canvas.hasPointerCapture(e.pointerId)) {
                this.canvas.releasePointerCapture(e.pointerId);
            }
            //validar herramienta
            if (this.tool != PINCEL && this.tool != ERASER) {
                //obtener las coordenadas
                this.line_ref.endPoint = this.get_position(e);
            }
            //cerrar el pincel
            if (this.tool == PINCEL) {
                //se apaga la bandera
                this.isDrawing = false;
                //cierra el path
                closePincel(this.canvas);
            }
            else if (this.tool == ERASER) {
                //se apaga la bandera
                this.isDrawing = false;
                //cerrar el borrador
                closeEraser(this.canvas);
            }
            else if (this.tool == LINE) {
                //construir la linea
                const line = buildShape(LINE, this.config, this.line_ref);
                //dibujar la linea
                drawLine(this.canvas, line);
            }
            else if (this.tool == RECTANGLE) {
                //construir el rectangulo
                const rect = buildShape(RECTANGLE, this.config, this.line_ref);
                //dibujar el rectangulo
                drawRect(this.canvas, rect);
            }
            else if (this.tool == RRECTANGLE) {
                //construir el rectangulo
                const rrect = buildShape(RRECTANGLE, this.config, this.line_ref);
                //dibujar el rectangulo
                drawRect(this.canvas, rrect);
            }
            else if (this.tool == CIRCLE) {
                //construir el circulo
                const circle = buildShape(CIRCLE, this.config, this.line_ref);
                //dibujar el circulo
                drawArc(this.canvas, circle);
            }
            else if (this.tool == OVAL) {
                //construir el ovalo
                const oval = buildShape(OVAL, this.config, this.line_ref);
                //dibujar la ovalo
                drawArc(this.canvas, oval);
            }
            else if (this.tool == TRIANGLE) {
                //construir el triangulo
                const tri = buildShape(TRIANGLE, this.config, this.line_ref);
                //dibujar el triangulo
                drawPolygon(this.canvas, tri);
            }
            else if (this.tool == DIAMOND) {
                //construir el rombo
                const diam = buildShape(DIAMOND, this.config, this.line_ref);
                //dibujar el rombo
                drawPolygon(this.canvas, diam);
            }
            else if (this.tool == PENTAGON) {
                //construir el pentagono
                const pent = buildShape(PENTAGON, this.config, this.line_ref);
                //dibujar el pentagono
                drawPolygon(this.canvas, pent);
            }
            else if (this.tool == HEXAGON) {
                //construir el hexagono
                const hex = buildShape(HEXAGON, this.config, this.line_ref);
                //dibujar el hexagono
                drawPolygon(this.canvas, hex);
            }
        }
    };
}
