import { CanvasConfig } from "../interfaces/canvas.js";
import { BoundRect, RefLine, Line, Rectangle, Arc } from "../interfaces/shapes.js";
import { CIRCLE, RECTANGLE, RRECTANGLE, OVAL } from "./tools.js";

function buildBoundRect(line:RefLine):BoundRect{
    //constuir el bound
    return {
        pivot: {
            x:line.startPoint.x < line.endPoint.x ? line.startPoint.x : line.endPoint.x,
            y:line.startPoint.y < line.endPoint.y ? line.startPoint.y : line.endPoint.y
        },
        width: Math.abs(line.endPoint.x - line.startPoint.x),
        height: Math.abs(line.endPoint.y - line.startPoint.y)
    };
}

export function buildShape(shape:string, conf:CanvasConfig, ref:RefLine){
    //segun sea la figura
    switch(shape){
        case RECTANGLE:
            return buildRect(conf,ref);
        case RRECTANGLE:
            return buildRect(conf,ref,true);
        case CIRCLE:
            return buildArc(conf,ref);
        case OVAL:
            return buildArc(conf,ref,true);
        default:
            return buildLine(conf,ref);
    }
}

function buildLine(conf:CanvasConfig, ref:RefLine):Line{
    return {
        startPoint: {...ref.startPoint},
        endPoint: {...ref.endPoint},
        bound: buildBoundRect(ref),
        lineColor: conf.strokeColor,
        fillColor: conf.fillColor,
        lineWeight: conf.lineWeight
    };
}

function buildRect(conf: CanvasConfig, ref:RefLine, rounded:boolean = false):Rectangle{
    //si es redondeado
    if(rounded){
        return {
            radius: 5,
            bound: buildBoundRect(ref),
            lineColor: conf.strokeColor,
            fillColor: conf.fillColor,
            lineWeight: conf.lineWeight
        };
    }

    return {
        bound: buildBoundRect(ref),
        lineColor: conf.strokeColor,
        fillColor: conf.fillColor,
        lineWeight: conf.lineWeight
    };
}

function buildArc(conf:CanvasConfig,ref:RefLine,oval:boolean = false):Arc{
    //obtener el bound
    const bound = buildBoundRect(ref);

    //crear el centro
    const center = {
        x: Math.round(((bound.pivot.x + bound.width) + bound.pivot.x) / 2),
        y: Math.round(((bound.pivot.y + bound.height) + bound.pivot.y) / 2)
    };

    //si es ovalo
    if(oval){
        return {
            center: center,
            radiusX: center.x - bound.pivot.x,
            radiusY: center.y - bound.pivot.y,
            bound: bound,
            lineColor: conf.strokeColor,
            fillColor: conf.fillColor,
            lineWeight: conf.lineWeight
        }
    }
    //calcular radios
    const rx = center.x - bound.pivot.x;
    const ry = center.y - bound.pivot.y;

    //retornar circulo
    return {
        center: center,
        radiusX: rx < ry ? rx : ry,
        bound: bound,
        lineColor: conf.strokeColor,
        fillColor: conf.fillColor,
        lineWeight: conf.lineWeight
    };
}