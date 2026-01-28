import { Point } from "./paths.js"
import { RefLine } from "./shapes.js"

export interface CanvasConfig {
    strokeColor: string,
    fillColor: string,
    lineWeight: number,
    font: string,
    fontSize: number,
    angle: number
}

interface CanvasProps {
    canvas: HTMLCanvasElement,
    canvas_pointer: HTMLParagraphElement,
    config: CanvasConfig,
    tool: string,
    isDrawing: boolean,
    line_ref: RefLine
}

export interface CanvasController extends CanvasProps {
    init(this:CanvasController): void,
    get_position(this:CanvasController, e:PointerEvent): Point,
    set_tool(this:CanvasController, tool:string): void,
    cleanCanvas(this:CanvasController): void,
    updateConfig(this:CanvasController):void,
    onMove(this:CanvasController, e:PointerEvent): void,
    onStart(this:CanvasController, e:PointerEvent): void,
    onStop(this:CanvasController, e:PointerEvent): void
}