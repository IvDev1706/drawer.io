export interface Point {
    x: number,
    y: number
}

export interface Path {
    start: Point,
    points: Array<Point>
}