import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    pieceLocations: { type: Object, required: true },
});

const Game =
    mongoose.models.Game || mongoose.model("Game", gameSchema, "games");

export default Game;
