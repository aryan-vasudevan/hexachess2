"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Board from "@/components/board";
import { Button } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function GamePage() {
    const params = useParams();
    const gameId = Array.isArray(params?.gameId)
        ? params.gameId[0]
        : params?.gameId;

    const getOrCreatePlayerId = () => {
        let playerId = localStorage.getItem("playerId");
        if (!playerId) {
            playerId = uuidv4(); // Generates "6d6d2b76-600f-4a19-bc67-ca8673f4839e"
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

    useEffect(() => {
        if (gameId) {
            const playerId = getOrCreatePlayerId();
            joinGame(gameId, playerId);
        }
    }, [gameId]);

    return (
        <div className="my-[100px] place-items-center">
            {gameId && <Board gameId={gameId} />}
            <Button
                variant="contained"
                onClick={async () => {
                    await navigator.clipboard.writeText(
                        `hexachess2.vercel.app/game/${gameId}`
                    );
                }}
            >
                Copy Game Link
            </Button>
        </div>
    );
}
