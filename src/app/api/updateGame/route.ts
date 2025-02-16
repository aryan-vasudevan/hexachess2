import { db } from "@/utils/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { gameId, pieceLocations } = await req.json();

    // Save the updated game state in Firebase
    await set(ref(db, `games/${gameId}/pieceLocations`), pieceLocations);

    return NextResponse.json({ status: 200, pieceLocations });
}
