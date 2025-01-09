import { TileType } from "../tile";

const {
    Empty,
    Player,
    // Box,
    // Goal,
    Wall,
} = TileType;

export default [
    [Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Player, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Wall],
    [Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall, Wall],
]