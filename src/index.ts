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

draw(ctx, zoom, lookAt);

canvas.addEventListener("wheel", (e) => {
  const newPoint = new DOMPoint(e.clientX, e.clientY).matrixTransform(
    ctx.getTransform().inverse()
  );

  lookAt = { r: newPoint.x, i: newPoint.y };

  console.log(lookAt);

  const newZoom = zoom + e.deltaY * -0.001;

  zoom = Math.max(newZoom, 1);
  lookAt = zoom == 1 ? { r: 0, i: 0 } : lookAt;

  draw(ctx, zoom, lookAt);
});
