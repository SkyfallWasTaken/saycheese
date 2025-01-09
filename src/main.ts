import { drawLevel, resizeCanvas } from "./tile.ts";
import level1 from "./levels/level1.ts";
import "./styles.css";

// biome-ignore lint/style/noNonNullAssertion: always defined
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
// biome-ignore lint/style/noNonNullAssertion: always defined
const ctx = canvas.getContext("2d")!;

// const level = level1;

resizeCanvas(ctx);
drawLevel(ctx, level1)