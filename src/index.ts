class Square {
    x: number;
    y: number;
    length: number;
  
    constructor(x: number, y: number, length: number) {
      this.x = x;
      this.y = y;
      this.length = length;
    }
  
    draw(canvas: HTMLCanvasElement, color: string): void {
      let c: CanvasRenderingContext2D = canvas.getContext("2d");
      c.fillStyle = color;
      c.fillRect(this.x, this.y, this.length, this.length);
    }
  }
  
  function sierpinski(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    length: number,
    color: string,
    depth: number
  ): void {
    let s = new Square(x, y, length);
    s.draw(canvas, color);
    let delta = length / 3;
    let center = new Square(x + delta, y + delta, delta);
    center.draw(canvas, "white");
    if (depth >= 1) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i != 1 || j != 1) {
            sierpinski(
              canvas,
              x + i * delta,
              y + j * delta,
              delta,
              color,
              depth - 1
            );
          }
        }
      }
    }
  }
  
  const canvas: HTMLCanvasElement = document.getElementById(
    "ctx"
  ) as HTMLCanvasElement;
  
  sierpinski(canvas, 0, 0, 400, "black", 1);
  