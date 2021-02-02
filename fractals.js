"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class FractalApp {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.points = [];
        this.last_position = { x: 0, y: 0 };
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
        // Set our initial starting position to be between 
        if (click_counter === 2) {
            let starting_x = (this.points[0].x + this.points[1].x) / 2;
            let starting_y = (this.points[0].y + this.points[1].y) / 2;
            this.last_position = {
                x: starting_x,
                y: starting_y
            };
        }
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
        // Draw a ciruclar point on the Canvas at the click location
        this.context.beginPath();
        this.context.arc(location.x, location.y, 2, 0, 2 * Math.PI);
        this.context.fill();
        // Label the point
        this.context.font = "10px sans-serif";
        this.context.fillText(String(click_counter), location.x + 10, location.y);
        // Add the point to our array of points
        this.points.push(location);
    }
    // A helper method to find the closest point to a given position
    findClosestPoint(pos) {
        let closest_dist = Number.MAX_VALUE;
        let closest_point = pos;
        // Go through all points and find whichever one is closest
        for (const point of this.points) {
            let dist = Math.sqrt(Math.pow((point.x - pos.x), 2) + Math.pow((point.y - pos.y), 2));
            if (dist < closest_dist) {
                closest_dist = dist;
                closest_point = { x: point.x, y: point.y };
            }
        }
        return closest_point;
    }
}
let app = new FractalApp();
