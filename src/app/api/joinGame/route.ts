import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await connectDB();
    const url = new URL(req.url);

    const gameId = url.searchParams.get("gameId");
    const playerId = url.searchParams.get("playerId");

    const game = await Game.findById(gameId);

    // Prevent a third player from joining
    if (game.playerWhite && game.playerBlack) {
        return NextResponse.json({ error: "Game is full" }, { status: 403 });
    }

    // Assign player to an open spot
    if (!game.playerWhite) {
        game.playerWhite = playerId;
    } else if (!game.playerBlack) {
        game.playerBlack = playerId;
    }

    await game.save();

    return NextResponse.json({ game });
}
