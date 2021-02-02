import { isBindingElement, parseConfigFileTextToJson } from "typescript";

interface position {
    x: number,
    y: number
};

class FractalApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private points: position[];
    private last_position: position;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.points = [];
        this.last_position = {x: 0, y: 0};

        this.createClickEvents();
    }

    private createClickEvents(): void {
        let canvas: HTMLCanvasElement = this.canvas;
        let click: position;
        let click_counter: number = 1;

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
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

    private getClickLocation(e: MouseEvent): position {
        const bounds = this.canvas.getBoundingClientRect();
        const click_x = e.clientX - bounds.left;
        const click_y = e.clientY - bounds.top;
        
        return {
            x: click_x,
            y: click_y
        };
    }

    private drawPoint(location: position, click_counter: number): void {
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
    private findClosestPoint(pos: position): position {
        let closest_dist: number = Number.MAX_VALUE;
        let closest_point: position = pos;

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