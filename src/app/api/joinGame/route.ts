import { db } from "@/utils/firebase";
import { ref, get, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    // Receive game id, player id
    const url = new URL(req.url);
    const gameId = url.searchParams.get("gameId");
    const playerId = url.searchParams.get("playerId");

    // Fetch the current game data
    const gameRef = ref(db, `games/${gameId}`);
    const snapshot = await get(gameRef);
    const game = snapshot.val();

    // If there are already 2 people in the game, prevent the third from joining
    if (game.playerWhite && game.playerBlack) {
        return NextResponse.json({ error: "Game is full" }, { status: 403 });
    }

    // Player 1 is white, player 2 is black
    let updatedGame = { ...game };
    if (!game.playerWhite) {
        updatedGame.playerWhite = playerId;
    } else if (!game.playerBlack) {
        updatedGame.playerBlack = playerId;
    }

    // Update firebase with the new game state
    await update(gameRef, updatedGame);

    return NextResponse.json({ status: 200, game: updatedGame });
}
