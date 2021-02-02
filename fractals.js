"use strict";
class FractalApp {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
    }
    drawPoint(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, 2 * Math.PI);
        this.context.fill();
    }
}
let app = new FractalApp();
app.drawPoint(100, 100);
