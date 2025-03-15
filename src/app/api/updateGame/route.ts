import { db } from "@/utils/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    // Receive game id, piece locations
    const { gameId, pieceLocations, turn } = await req.json();

    // Update game state in firebase
    await set(ref(db, `games/${gameId}/pieceLocations`), pieceLocations);
    await set(ref(db, `games/${gameId}/turn`), turn);

    return NextResponse.json({ status: 200, pieceLocations });
}
