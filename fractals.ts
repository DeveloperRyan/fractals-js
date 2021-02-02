class FractalApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private points: {x: number, y: number}[];

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.points = [];

        this.createClickEvents();
    }

    private createClickEvents(): void {
        let canvas: HTMLCanvasElement = this.canvas;
        let click: {x: number, y: number};
        let click_counter: number = 1;

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
            click = this.getClickLocation(e);
            this.drawPoint(click, click_counter++);
        });
    }

    private getClickLocation(e: MouseEvent): {x: number, y: number} {
        const bounds = this.canvas.getBoundingClientRect();
        const click_x = e.clientX - bounds.left;
        const click_y = e.clientY - bounds.top;
        
        return {
            x: click_x,
            y: click_y
        };
    }

    private drawPoint(location: {x: number, y: number}, click_counter: number): void {
        this.context.beginPath();
        this.context.arc(location.x, location.y, 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.font = "10px sans-serif";
        this.context.fillText(String(click_counter), location.x + 10, location.y);

        this.points.push(location)
    }
}

let app = new FractalApp();