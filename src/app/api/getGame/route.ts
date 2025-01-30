import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { url } from "inspector";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();

    // Create url object
    const url = new URL(req.url);

    const gameId = url.searchParams.get("gameId");

    if (!gameId) {
        return NextResponse.json(
            { message: "Game ID is required" },
            { status: 400 }
        );
    }

    try {
        // Find the game in the db using the gameId
        const game = await Game.findById(gameId);

        // If the game is not found
        if (!game) {
            return NextResponse.json(
                { message: "Game not found" },
                { status: 404 }
            );
        }

        // Return the piece locations of the game
        return NextResponse.json({ pieceLocations: game.pieceLocations });
    } catch {
        return NextResponse.json(
            { message: "Server Error"},
            { status: 500 }
        );
    }
}
