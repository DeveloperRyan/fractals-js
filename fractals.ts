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
        let click_counter: number = 0;

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
            click_counter++
            click = this.getClickLocation(e);
            this.drawBoundingPoint(click, click_counter);

            if (click_counter === 2) this.updateStartingLocation();
        });
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

    // Helper method to update the starting position when we have enough points.
    private updateStartingLocation(): void {
        let starting_x: number = (this.points[0].x + this.points[1].x) / 2;
        let starting_y: number = (this.points[0].y + this.points[1].y) / 2;

        this.last_position = {
            x: starting_x,
            y: starting_y
        };
    }

    // Method to create bounding points based on user input
    private drawBoundingPoint(location: position, click_counter: number): void {
        // Draw a ciruclar point on the Canvas at the click location
        this.context.fillStyle = "red";
        this.context.beginPath();
        this.context.arc(location.x, location.y, 2, 0, 2 * Math.PI);
        this.context.fill();

        // Label the point
        this.context.font = "10px sans-serif";
        this.context.fillText(String(click_counter), location.x + 10, location.y);

        // Add the point to our array of points
        this.points.push(location);
    }

    public drawInteriorPoint(): void {
        const location = this.calculateNextPoint();
        console.log("Points", this.points, "\nLocation:", location);

        this.context.fillStyle = "black";
        this.context.beginPath();
        this.context.arc(location.x, location.y, 2, 0, 2 * Math.PI);
        this.context.fill();
    }
    
    // Helper method to find the closest point to a given position
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

        return {x: (pos.x + closest_point.x) / 2, y: (pos.y + closest_point.y) / 2};
    }


    // Helper method to determine the location of the next position
    private calculateNextPoint(): position {
        const closest: position = this.findClosestPoint(this.last_position)
        this.last_position = {x: (closest.x + this.last_position.x) / 2, y: (closest.y + this.last_position.y) / 2};
        return this.last_position;
    }
}

let app: FractalApp = new FractalApp();
let update: boolean = false;

// Set up the control button
const control_button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("control-button");
control_button.addEventListener("click", () => {
    update = !update;

    if (update) updateCanvas();

    control_button.innerHTML = (update ? "Stop" : "Start");
});

// Until the stop button is pressed, draw new points.
function updateCanvas(): void {
    setTimeout(() => {
        app.drawInteriorPoint();
        if (update) updateCanvas();
    }, 1000);
}