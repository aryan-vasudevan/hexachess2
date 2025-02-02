import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();

    // Create url object
    const url = new URL(req.url);

    const gameId = url.searchParams.get("gameId");

    // Find the game in the db using the gameId
    const game = await Game.findById(gameId);

    // Return the piece locations of the game
    return NextResponse.json({ pieceLocations: game.pieceLocations });
}
