class FractalApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
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