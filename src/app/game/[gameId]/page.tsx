"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Board from "@/components/board";
import { Button } from "@mui/material";
import axios from "axios";

export default function GamePage() {
    const params = useParams();

    // Parameters might be a string or array
    const gameId = Array.isArray(params?.gameId)
        ? params.gameId[0]
        : params?.gameId;

    const joinGame = async (gameId: string, playerId: string) => {
        const res = axios.put(`/api/joinGame?gameId=${gameId}&playerId=${playerId}`);
    };

    useEffect(() => {
        const playerId = "abc123";
        if (gameId) {
            joinGame(gameId, playerId);
        }
    }, []);

    return (
        <div className="my-[100px] place-items-center">
            {gameId && <Board gameId={gameId} />}
            <Button
                variant="contained"
                onClick={async () => {
                    await navigator.clipboard.writeText(
                        `hexachess.vercel.app/game/${gameId}`
                    );
                }}
            >
                Copy Game Link
            </Button>
        </div>
    );
}
