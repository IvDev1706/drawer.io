import { Arc, Line, Polygon, Rectangle } from "../interfaces/shapes.js";

export function drawLine(canvas:HTMLCanvasElement, line:Line){
    //obtener el contexto
    const ctx = canvas.getContext("2d");

    //validar el contexto
    if(!ctx){
        return;
    }

    //abrir path
    ctx.beginPath();
    //dibujar la linea
    ctx.moveTo(line.startPoint.x,line.startPoint.y);
    ctx.lineTo(line.endPoint.x,line.endPoint.y);
    ctx.stroke();
    //cerrar el path
    ctx.closePath();
}

export function drawRect(canvas:HTMLCanvasElement, rect:Rectangle){
    //obtener el contexto
    const ctx = canvas.getContext("2d");

    //validar el contexto
    if(!ctx){
        return;
    }

    //abrir path
    ctx.beginPath();

    //dibujar la figura
    if(rect.radius){
        ctx.roundRect(
            rect.bound.pivot.x,
            rect.bound.pivot.y,
            rect.bound.width,
            rect.bound.height,
            rect.radius
        );
    }else{
        ctx.rect(
            rect.bound.pivot.x,
            rect.bound.pivot.y,
            rect.bound.width,
            rect.bound.height
        );
    }
    //rellenar la figura
    ctx.fillRect(
        rect.bound.pivot.x,
        rect.bound.pivot.y,
        rect.bound.width,
        rect.bound.height
    );
    //renderiza la figura
    ctx.stroke();

    //cerrar el path
    ctx.closePath();
}

export function drawArc(canvas:HTMLCanvasElement, arc:Arc){
    //obtener el contexto
    const ctx = canvas.getContext("2d");

    //validar el contexto
    if(!ctx){
        return;
    }

    //abrir path
    ctx.beginPath();

    //dibujar la figura
    if(arc.radiusY){
        ctx.ellipse(arc.center.x,arc.center.y,arc.radiusX,arc.radiusY,0,0,360);
    }else{
        ctx.arc(arc.center.x,arc.center.y,arc.radiusX,0,360);
    }
    //rellenar la figura
    ctx.fill();
    //renderiza la figura
    ctx.stroke();

    //cerrar el path
    ctx.closePath();
}

export function drawPolygon(canvas:HTMLCanvasElement, pol:Polygon){
    //obtener el contexto
    const ctx = canvas.getContext("2d");

    //validar el contexto
    if(!ctx){
        return;
    }

    //abrir path
    ctx.beginPath();

    //mover al punto inicial
    ctx.moveTo(pol.points[0].x,pol.points[0].y);

    //dibujar los demas puntos
    for (let i = 1; i < pol.points.length; i++) {
        ctx.lineTo(pol.points[i].x,pol.points[i].y);
    }

    //cerrar el path
    ctx.closePath();

    //rellenar la figura
    ctx.fill();
    //rendarizar
    ctx.stroke();
}