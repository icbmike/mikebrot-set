import { draw } from "./draw";

const canvas = document.createElement("canvas");

canvas.width = 1000;
canvas.height = 800;

canvas.style.width = "1000px";
canvas.style.height = "800px";
canvas.style.backgroundColor = "black";

document.getElementById("root").append(canvas);

const ctx = canvas.getContext("2d");

let zoom = 1;
let lookAt = { r: 0, i: 0 };

// Change to centered coordinates
ctx.translate(500, 400);
ctx.scale(125, -125);
ctx.fillStyle = "white";

ctx.save();

draw(ctx, zoom, lookAt);

canvas.addEventListener("wheel", (e) => {
  const newPoint = new DOMPoint(e.clientX, e.clientY).matrixTransform(
    ctx.getTransform().inverse()
  );

  lookAt = { r: newPoint.x, i: newPoint.y };

  const newZoom = zoom + e.deltaY * -0.001;

  zoom = Math.max(newZoom, 1);
  lookAt = zoom == 1 ? { r: 0, i: 0 } : lookAt;

  console.log(lookAt);

  draw(ctx, zoom, lookAt);
});
