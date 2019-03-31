import sierpinski from './sierpinskicarpetrainbow';
import { FillStyle } from './utility';

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

function gradientMaker(ctx: CanvasRenderingContext2D, colors: string[]): CanvasGradient {
  const l = colors.length;
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  colors.map((c, idx) => {
    g.addColorStop(idx / l, c);
  });
  return g;
}

sierpinski(
  ctx,
  0,
  0,
  1048,
  gradientMaker(ctx, ["purple", "blue", "green", "yellow", "orange", "red"]),
  4
);
