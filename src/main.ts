import level1 from "./levels/1.json";
import level2 from "./levels/2.json";
import "./styles.css";

// biome-ignore lint/style/noNonNullAssertion: always defined
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
// biome-ignore lint/style/noNonNullAssertion: always defined
const ctx = canvas.getContext("2d")!;

export enum TileType {
  Empty = 0,
  Player = 1,
  Goal = 2,
  Wall = 3,
}

export interface LevelData {
  width: number;
  height: number;
  tiles: TileType[][];
}

const tileColours = {
  [TileType.Empty]: "transparent",
  [TileType.Player]: "#2a71f5",
  [TileType.Goal]: "#32e329",
  [TileType.Wall]: "#4b555c",
};

const levels = [level1, level2];
let currentLevel = 0;
let playerPositions: [number, number][] = [];

function getPlayerPositions(level: Pick<typeof level1, "tiles">) {
  const positions: [number, number][] = [];

  for (let y = 0; y < level.tiles.length; y++) {
    for (let x = 0; x < level.tiles[y].length; x++) {
      if (level.tiles[y][x] === TileType.Player) {
        positions.push([x, y]);
      }
    }
  }

  return positions;
}

const tileSize = 32;

export function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: TileType,
  x: number,
  y: number
) {
  ctx.fillStyle = tileColours[tileType];
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

export function drawLevel(ctx: CanvasRenderingContext2D) {
  for (let y = 0; y < levels[currentLevel].height; y++) {
    for (let x = 0; x < levels[currentLevel].width; x++) {
      drawTile(ctx, levels[currentLevel].tiles[y][x], x, y);
    }
  }
}

const tileXCount = levels[currentLevel].width;
const tileYCount = levels[currentLevel].height;
export function resizeCanvas(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = tileXCount * tileSize;
  ctx.canvas.height = tileYCount * tileSize;
}

export function handleMovement() {
  document.addEventListener("keydown", (event) => {
    let multiplier = 1;
    for (const position of playerPositions) {
      // Store original position in case we need to revert
      const originalX = position[0];
      const originalY = position[1];

      // Calculate new position based on key press
      let newX = originalX;
      let newY = originalY;

      switch (event.key) {
        case "ArrowUp":
          newY -= 1 * multiplier;
          multiplier *= -1;
          break;
        case "ArrowDown":
          newY += 1 * multiplier;
          multiplier *= -1;
          break;
        case "ArrowLeft":
          newX -= 1;
          break;
        case "ArrowRight":
          newX += 1;
          break;
        default:
          // If not an arrow key, skip this iteration
          continue;
      }

      // Check if the new position is valid (not a wall/player)
      if (
        newY >= 0 &&
        newY < levels[currentLevel].height &&
        newX >= 0 &&
        newX < levels[currentLevel].width &&
        levels[currentLevel].tiles[newY][newX] !== TileType.Wall &&
        levels[currentLevel].tiles[newY][newX] !== TileType.Player
      ) {
        // Check if the new position is a goal
        if (levels[currentLevel].tiles[newY][newX] === TileType.Goal) {
          // Move to the next level
          if (currentLevel < levels.length - 1) {
            currentLevel++;
            // Reset player positions
            playerPositions = getPlayerPositions(levels[currentLevel]);
          } else {
            alert("Congrats, you win!");
            location.reload();
          }
          return;
        }

        // Clear the original position
        levels[currentLevel].tiles[originalY][originalX] = TileType.Empty;

        // Update the player's position
        position[0] = newX;
        position[1] = newY;

        // Set the new position to Player
        levels[currentLevel].tiles[newY][newX] = TileType.Player;
      }
    }
  });
}

function loop() {
  console.log("Rendering frame");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  playerPositions = getPlayerPositions(levels[currentLevel]);

  resizeCanvas(ctx);
  drawLevel(ctx);
  requestAnimationFrame(loop);
}

handleMovement();
loop();
