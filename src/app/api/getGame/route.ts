import { db } from "@/utils/firebase";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId");

    if (!gameId) {
        return NextResponse.json({ error: "Missing gameId" }, { status: 400 });
    }

    try {
        const gameRef = ref(db, `games/${gameId}`); // Reference to game in Firebase
        const snapshot = await get(gameRef); // Fetch game data

        return snapshot.exists()
            ? NextResponse.json(snapshot.val())
            : NextResponse.json({ error: "Game not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch game" },
            { status: 500 }
        );
    }
}
