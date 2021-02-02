class FractalApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.createClickEvents();
    }

    private createClickEvents(): void {
        let canvas: HTMLCanvasElement = this.canvas;
        let click: {x: number, y: number};

        canvas.addEventListener("mousedown", (e: MouseEvent) => {
            click = this.getClickLocation(canvas, e);
        });
    }

    private getClickLocation(canvas: HTMLCanvasElement, e: MouseEvent): {x: number, y: number} {
        const bounds = canvas.getBoundingClientRect();
        const click_x = e.clientX - bounds.left;
        const click_y = e.clientY - bounds.top;
        
        return {
            x: click_x,
            y: click_y
        };
    }

    drawPoint(x: number, y: number): void {
        this.context.beginPath();
        this.context.arc(x, y, 2
            , 0, 2 * Math.PI);
        this.context.fill();
    }
}

let app = new FractalApp();
app.drawPoint(100, 100);