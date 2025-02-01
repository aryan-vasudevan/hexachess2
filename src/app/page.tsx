"use client";

import { useState, useEffect } from "react";
import { connectDB } from "@/utils/db";
import Board from "../components/board";
import axios from "axios";

export default function Home() {
    const [gameId, setGameId] = useState<string>("");

    const createGame = async () => {
        // Api route to create new game
        const res = await axios.post("/api/createGame");

        // Route returns the id of the game created
        console.log(res.data.gameId);
        setGameId(res.data.gameId);
    };

    // Empty dependency array ensures it only runs once when the component is mounted
    useEffect(() => {
        createGame();
    }, []);

    return (
        <div className="my-[100px]">
            {/* Render Board only when gameId is available */}
            {gameId && <Board gameId={gameId} />}{" "}
        </div>
    );
}
