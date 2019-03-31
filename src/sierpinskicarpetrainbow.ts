import { FillStyle } from './utility';

class Square {
    x: number;
    y: number;
    length: number;
  
    constructor(x: number, y: number, length: number) {
      this.x = x;
      this.y = y;
      this.length = length;
    }
  
    draw(ctx: CanvasRenderingContext2D, color: FillStyle): void {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.length, this.length);
    }
  }
  
  function sierpinski(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    color: FillStyle,
    depth: number
  ): void {
    let s = new Square(x, y, length);
    s.draw(ctx, "black");
    let delta = length / 3;
    let center = new Square(x + delta, y + delta, delta);
    center.draw(ctx, color);
    if (depth >= 1) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i != 1 || j != 1) {
            sierpinski(
              ctx,
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

  export default sierpinski;