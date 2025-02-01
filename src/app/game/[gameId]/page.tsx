"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Board from "@/components/board";
import { Button } from "@mui/material";

export default function GamePage() {
    const params = useParams();

    // Parameters might be a string or array
    const gameId = Array.isArray(params?.gameId)
        ? params.gameId[0]
        : params?.gameId;

    return (
        <div className="my-[100px] place-items-center">
            {gameId && <Board gameId={gameId} />}
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
