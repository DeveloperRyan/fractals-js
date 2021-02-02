"use strict";
class FractalApp {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.points = [];
        this.createClickEvents();
    }
    createClickEvents() {
        let canvas = this.canvas;
        let click;
        let click_counter = 1;
        canvas.addEventListener("mousedown", (e) => {
            click = this.getClickLocation(e);
            this.drawPoint(click, click_counter++);
        });
    }
    getClickLocation(e) {
        const bounds = this.canvas.getBoundingClientRect();
        const click_x = e.clientX - bounds.left;
        const click_y = e.clientY - bounds.top;
        return {
            x: click_x,
            y: click_y
        };
    }
    drawPoint(location, click_counter) {
        this.context.beginPath();
        this.context.arc(location.x, location.y, 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.font = "10px sans-serif";
        this.context.fillText(String(click_counter), location.x + 10, location.y);
        this.points.push(location);
    }
}
let app = new FractalApp();
