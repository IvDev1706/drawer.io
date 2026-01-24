import { Point } from "./paths.js"

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
    tool: string
}

export interface CanvasController extends CanvasProps {
    init(this:CanvasController): void,
    get_position(this:CanvasController, e:MouseEvent | TouchEvent): Point,
    set_tool(this:CanvasController, tool:string): void,
    onMove(this:CanvasController, e:MouseEvent | TouchEvent): void,
    onStart(this:CanvasController, e:MouseEvent | TouchEvent): void,
    onStop(this:CanvasController, e:MouseEvent | TouchEvent): void
}