import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    boardState: { type: Object, required: true },
    pieceLocations: { type: Object, required: true },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
