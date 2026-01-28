import { Point } from "./paths.js";

export interface RefLine {
    startPoint: Point,
    endPoint: Point
}

export interface BoundRect {
    pivot: Point,
    width: number,
    height: number
}

export interface Shape {
    bound: BoundRect,
    lineColor: string,
    fillColor: string,
    lineWeight: number
}

export interface Line extends Shape {
    startPoint: Point,
    endPoint: Point
}

export interface Rectangle extends Shape {
    radius?: number
}

export interface Arc extends Shape {
    center: Point,
    radiusX: number,
    radiusY?: number
}

export interface Polygon extends Shape {
    points: Array<Point>
}