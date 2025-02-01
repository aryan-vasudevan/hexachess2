"use client";

import { useState, useEffect } from "react";
import Board from "../components/board";
import axios from "axios";
import { Button } from "@mui/material";

export default function Home() {
    const [gameId, setGameId] = useState<string>("");

    const createGame = async () => {
        const res = await axios.post("/api/createGame");

        setGameId(res.data.gameId);
    };

    // Empty dependency array ensures it only runs once when the component is mounted
    useEffect(() => {
        createGame();
    }, []);

    return (
        <div className="my-[100px] place-items-center">
            {/* Render Board only when gameId is available */}
            {gameId && <Board gameId={gameId} />}{" "}
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
