type FillStyle = string | CanvasGradient | CanvasPattern;

class Square {
  x: number;
  y: number;
  length: number;

  constructor(x: number, y: number, length: number) {
    this.x = x;
    this.y = y;
    this.length = length;
  }

  draw(canvas: HTMLCanvasElement, color: FillStyle): void {
    let c: CanvasRenderingContext2D = canvas.getContext("2d");
    c.fillStyle = color;
    c.fillRect(this.x, this.y, this.length, this.length);
  }
}

function gradientMaker(canvas: HTMLCanvasElement, colors: string[]): CanvasGradient {
  const ctx = canvas.getContext("2d");
  const l = colors.length;
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  colors.map((c, idx) => {
    g.addColorStop(idx * 1 / l, c);
  });
  return g;
}

function sierpinski(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  length: number,
  color: FillStyle,
  depth: number
): void {
  let divisor = 4;
  let my_gradient = canvas
    .getContext("2d")
    .createLinearGradient(x, y, x + length, y + length);
  my_gradient.addColorStop(0, "purple");
  my_gradient.addColorStop(0.125, "blue");
  my_gradient.addColorStop(0.25, "green");
  my_gradient.addColorStop(0.375, "yellow");
  my_gradient.addColorStop(0.5, "orange");
  my_gradient.addColorStop(0.625, "red");
  my_gradient.addColorStop(0.75, "purple");
  my_gradient.addColorStop(0.875, "blue");
  my_gradient.addColorStop(1, "green");

  let s = new Square(x, y, length);
  s.draw(canvas, "black");
  let delta = length / 3;
  let center = new Square(x + delta, y + delta, delta);
  center.draw(canvas, color);
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

sierpinski(
  canvas,
  0,
  0,
  400,
  gradientMaker(canvas, ["purple", "blue", "green", "yellow", "orange", "red"]),
  4
);
