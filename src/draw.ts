const resolution = 0.005;

export const draw = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  lookAt: ComplexNumber
) => {
  ctx.resetTransform();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Change to centered coordinates
  ctx.translate(500, 400);
  ctx.scale(125 * zoom, -125 * zoom);
  ctx.translate(lookAt.r, -lookAt.i);

  ctx.fillStyle = "white";

  for (let i = -2; i <= 1; i += resolution) {
    for (let j = -1.2; j <= 1.2; j += resolution) {
      drawCell(ctx, i, j);
    }
  }
};

interface ComplexNumber {
  r: number;
  i: number;
}

const maxIterations = 10;

const drawCell = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  if (!diverges({ r: x, i: y })) {
    ctx.fillRect(x, y, resolution, resolution);
  }
};

const diverges = (c: ComplexNumber): boolean => {
  let f = { r: 0, i: 0 };
  for (let i = 0; i <= maxIterations; i++) {
    f = mandelBrot(f, c);
  }

  return size(f) > 2;
};

const size = (z: ComplexNumber): number => {
  return Math.sqrt(z.r ** 2 + z.i ** 2);
};

export const mandelBrot = (
  z: ComplexNumber,
  c: ComplexNumber
): ComplexNumber => {
  const a = z.r * z.r;
  const b = z.r * z.i;
  const c2 = z.i * z.r;
  const d = z.i * z.i * -1;

  return {
    r: a + d + c.r,
    i: b + c2 + c.i,
  };
};
