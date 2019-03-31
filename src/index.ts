type FillStyle = string | CanvasGradient | CanvasPattern;

// from https://www.html5rocks.com/en/tutorials/canvas/hidpi/
function setupCanvas(canvas : HTMLCanvasElement) : CanvasRenderingContext2D {
  // Get the device pixel ratio, falling back to 1.
  const dpr = 1 // window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

const filename = document.getElementById('filename') as HTMLInputElement;
const btn = document.getElementById('download') as HTMLAnchorElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = setupCanvas(canvas);

function saveImage() {
  btn.setAttribute('download', filename.value);
  btn.setAttribute('href', canvas.toDataURL());
}
btn.onclick = saveImage;

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

function gradientMaker(ctx: CanvasRenderingContext2D, colors: string[]): CanvasGradient {
  const l = colors.length;
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  colors.map((c, idx) => {
    g.addColorStop(idx / l, c);
  });
  return g;
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

sierpinski(
  ctx,
  0,
  0,
  1048,
  gradientMaker(ctx, ["purple", "blue", "green", "yellow", "orange", "red"]),
  4
);
