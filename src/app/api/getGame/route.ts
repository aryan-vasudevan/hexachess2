import { db } from "@/utils/firebase";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Receive game id
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId");

    // Fetch the current game data
    const gameRef = ref(db, `games/${gameId}`);
    const snapshot = await get(gameRef);

    return NextResponse.json(snapshot.val());
}
