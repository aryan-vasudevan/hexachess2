import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await connectDB();
    
    const { gameId, pieceLocations } = await req.json();

    // Find and update game at the same time
    const updatedGame = await Game.findByIdAndUpdate(
        gameId,
        { pieceLocations },
        { new: true }
    );

    return NextResponse.json({
        status: 200,
        pieceLocations: updatedGame.pieceLocations,
    });
}
