"use client"

import { useState, useEffect } from "react";
import Board from "../components/board";
import axios from "axios";

export default function Home() {
    const [gameId, setGameId] = useState<string>(""); // State to hold gameId

    const createGame = async () => {
        try {
            // Api route to create new game
            const res = await axios.post("/api/createGame");

            // Route returns the id of the game created
            console.log(res.data.gameId);
            setGameId(res.data.gameId); // Set the gameId in state
        } catch {
            console.log("Error creating game");
        }
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
