import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    pieceLocations: { type: Object, required: true },
    playerWhite: { type: String, required: false },
    playerBlack: { type: String, required: false },
    turn: { type: String, required: false },
});

const Game =
    mongoose.models.Game || mongoose.model("Game", gameSchema, "games");

export default Game;
