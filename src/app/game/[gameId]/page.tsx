"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Board from "@/components/board";
import { Button } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { db, ref, onValue, update } from "@/utils/firebase"; // Import Firebase

export default function GamePage() {
    const params = useParams();
    const gameId = Array.isArray(params?.gameId)
        ? params.gameId[0]
        : params?.gameId;

    const [pieceLocations, setPieceLocations] = useState<{
        [key: string]: any;
    }>({});

    const getOrCreatePlayerId = () => {
        let playerId = localStorage.getItem("playerId");
        if (!playerId) {
            playerId = uuidv4();
            localStorage.setItem("playerId", playerId);
        }
        return playerId;
    };

    const joinGame = async (gameId: string, playerId: string) => {
        try {
            const res = await axios.put(
                `/api/joinGame?gameId=${gameId}&playerId=${playerId}`
            );
            console.log("Joined game:", res.data);
        } catch (error) {
            console.error("Error joining game:", error);
        }
    };

    // Join and listen for live updates
    useEffect(() => {
        if (gameId) {
            const playerId = getOrCreatePlayerId();
            joinGame(gameId, playerId);

            const gameRef = ref(db, `games/${gameId}/pieceLocations`);
            const unsubscribe = onValue(gameRef, (snapshot) => {
                console.log("onvalue");
                if (snapshot.exists()) {
                    setPieceLocations(snapshot.val());
                }
            });

            // Cleanup listener on unmount
            return () => unsubscribe();
        }
    }, [gameId]);

    return (
        <div className="my-[100px] place-items-center">
            {gameId && (
                <Board
                    gameId={gameId}
                    pieceLocations={pieceLocations}
                />
            )}
            <Button
                variant="contained"
                onClick={async () => {
                    await navigator.clipboard.writeText(
                        `localhost:3000/game/${gameId}`
                    );
                }}
            >
                Copy Game Link
            </Button>
        </div>
    );
}
