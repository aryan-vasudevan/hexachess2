import { db } from "@/utils/firebase";
import { ref, push, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Reference to all games in Firebase
    const gamesRef = ref(db, "games");

    // Create a new game entry
    const newGameRef = push(gamesRef);
    const gameData = {
        pieceLocations: {
            t1: { pieceType: "bishop", color: "B" },
            t2: { pieceType: "queen", color: "B" },
            t3: { pieceType: "king", color: "B" },
            t4: { pieceType: "knight", color: "B" },
            t5: { pieceType: "bishop", color: "B" },
            t6: { pieceType: "knight", color: "B" },
            t7: { pieceType: "rook", color: "B" },
            t10: { pieceType: "rook", color: "B" },
            t11: { pieceType: "pawn", color: "B" },
            t13: { pieceType: "bishop", color: "B" },
            t15: { pieceType: "pawn", color: "B" },
            t17: { pieceType: "pawn", color: "B" },
            t20: { pieceType: "pawn", color: "B" },
            t23: { pieceType: "pawn", color: "B" },
            t25: { pieceType: "pawn", color: "B" },
            t29: { pieceType: "pawn", color: "B" },
            t30: { pieceType: "pawn", color: "B" },
            t35: { pieceType: "pawn", color: "B" },

            t91: { pieceType: "bishop", color: "W" },
            t90: { pieceType: "king", color: "W" },
            t89: { pieceType: "queen", color: "W" },
            t88: { pieceType: "knight", color: "W" },
            t87: { pieceType: "bishop", color: "W" },
            t86: { pieceType: "knight", color: "W" },
            t85: { pieceType: "rook", color: "W" },
            t82: { pieceType: "rook", color: "W" },
            t81: { pieceType: "pawn", color: "W" },
            t79: { pieceType: "bishop", color: "W" },
            t77: { pieceType: "pawn", color: "W" },
            t75: { pieceType: "pawn", color: "W" },
            t72: { pieceType: "pawn", color: "W" },
            t69: { pieceType: "pawn", color: "W" },
            t67: { pieceType: "pawn", color: "W" },
            t63: { pieceType: "pawn", color: "W" },
            t62: { pieceType: "pawn", color: "W" },
            t57: { pieceType: "pawn", color: "W" },
        },
        playerWhite: null,
        playerBlack: null,
        turn: null,
    };

    // Save new game to firebase
    await set(newGameRef, gameData);

    return NextResponse.json({ gameId: newGameRef.key });
}
