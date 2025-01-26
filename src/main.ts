import { drawLevel, resizeCanvas } from "./tile.ts";
import level1 from "./levels/level1.ts";
import "./styles.css";

// biome-ignore lint/style/noNonNullAssertion: always defined
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
// biome-ignore lint/style/noNonNullAssertion: always defined
const ctx = canvas.getContext("2d")!;

// const level = level1;

function loop() {
  console.log("Rendering frame");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resizeCanvas(ctx);
  drawLevel(ctx, level1);
  requestAnimationFrame(loop);
}
loop();
