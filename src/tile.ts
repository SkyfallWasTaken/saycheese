export enum TileType {
    Empty = 0,
    Player = 1,
    Box = 2,
    Goal = 3,
    Wall = 4,
};

const tileColours = {
    [TileType.Empty]: "transparent",
    [TileType.Player]: "#2a71f5",
    [TileType.Box]: "#eb8c34",
    [TileType.Goal]: "#32e329",
    [TileType.Wall]: "#4b555c",
};

const tileSize = 32;

export function drawTile(ctx: CanvasRenderingContext2D, tileType: TileType, x: number, y: number) {
    ctx.fillStyle = tileColours[tileType];
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

export function drawLevel(ctx: CanvasRenderingContext2D, level: TileType[][]) {
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            drawTile(ctx, level[y][x], x, y);
        }
    }
}

const tileXCount = 30;
const tileYCount = 20;
export function resizeCanvas(ctx: CanvasRenderingContext2D) {
    ctx.canvas.width = tileXCount * tileSize;
    ctx.canvas.height = tileYCount * tileSize;
}