"use strict";
class FractalApp {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.createClickEvents();
    }
    createClickEvents() {
        let canvas = this.canvas;
        let click;
        canvas.addEventListener("mousedown", (e) => {
            click = this.getClickLocation(canvas, e);
        });
    }
    getClickLocation(canvas, e) {
        const bounds = canvas.getBoundingClientRect();
        const click_x = e.clientX - bounds.left;
        const click_y = e.clientY - bounds.top;
        return {
            x: click_x,
            y: click_y
        };
    }
    drawPoint(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, 2 * Math.PI);
        this.context.fill();
    }
}
let app = new FractalApp();
app.drawPoint(100, 100);
