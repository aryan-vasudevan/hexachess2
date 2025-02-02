import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await connectDB();
    const url = new URL(req.url);

    const gameId = url.searchParams.get("gameId");
    const playerId = url.searchParams.get("playerId")

    const game = await Game.findById(gameId);

    if (!game.playerWhite) {
        game.playerWhite = playerId;
    }
    else if (!game.playerBlack) {
        game.playerBlack = playerId;
    }

    await game.save();

    return NextResponse.json({ game });
}
