import { db } from "@/utils/firebase";
import { ref, get, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const gameId = url.searchParams.get("gameId");
        const playerId = url.searchParams.get("playerId");

        if (!gameId || !playerId) {
            return NextResponse.json(
                { error: "Missing gameId or playerId" },
                { status: 400 }
            );
        }

        // Reference the game in Firebase
        const gameRef = ref(db, `games/${gameId}`);

        // Fetch the current game data
        const snapshot = await get(gameRef);
        if (!snapshot.exists()) {
            return NextResponse.json(
                { error: "Game not found" },
                { status: 404 }
            );
        }

        const game = snapshot.val();

        // Prevent a third player from joining
        if (game.playerWhite && game.playerBlack) {
            return NextResponse.json(
                { error: "Game is full" },
                { status: 403 }
            );
        }

        // Assign player to an open spot
        const updatedGame = {
            playerWhite: game.playerWhite || playerId,
            playerBlack: game.playerWhite
                ? game.playerBlack || playerId
                : game.playerBlack,
        };

        // Update Firebase
        await update(gameRef, updatedGame);

        return NextResponse.json({ game: updatedGame });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to join game" },
            { status: 500 }
        );
    }
}
