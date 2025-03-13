"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Board from "@/components/board";
import { Button } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { db, ref, onValue } from "@/utils/firebase";

export default function GamePage() {
    // Extract the game id from the URL
    const params = useParams();
    const gameId = Array.isArray(params?.gameId)
        ? params.gameId[0]
        : params?.gameId;

    // The piece locations will be updated throughout the game
    const [pieceLocations, setPieceLocations] = useState<{
        [key: string]: any;
    }>({});

    const [playerColor, setPlayerColor] = useState<"W" | "B">("W");

    // If the player had already joined a game, extract the player id from local storage instead of creating a new one
    const getOrCreatePlayerId = () => {
        let playerId = localStorage.getItem("playerId");
        if (!playerId) {
            playerId = uuidv4();
            localStorage.setItem("playerId", playerId);
        }
        return playerId;
    };

    // Add the player to the game with the game id and playerId
    const joinGame = async (gameId: string, playerId: string) => {
        const res = await axios.put(
            `/api/joinGame?gameId=${gameId}&playerId=${playerId}`
        );
        setPlayerColor(res.data.playerColor);
    };

    // Listen for live updates to the game from firebase
    useEffect(() => {
        if (gameId) {
            const playerId = getOrCreatePlayerId();
            joinGame(gameId, playerId);

            const gameRef = ref(db, `games/${gameId}/pieceLocations`);
            const unsubscribe = onValue(gameRef, (snapshot) => {
                if (snapshot.exists()) {
                    setPieceLocations(snapshot.val());
                }
            });

            return () => unsubscribe();
        }
    }, [gameId]);

    return (
        <div className="my-[100px] place-items-center">
            {/* Provide piece locations for rendering and game id to update game state from board component */}
            {gameId && pieceLocations && (
                <Board
                    gameId={gameId}
                    pieceLocations={pieceLocations}
                    playerColor={playerColor}
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
