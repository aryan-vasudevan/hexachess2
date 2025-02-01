"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@mui/material";

export default function Home() {
    // Router
    const router = useRouter(); 
    const [loading, setLoading] = useState(false);

    const createGame = async () => {
        setLoading(true);
        const res = await axios.post("/api/createGame");

        // Redirect to the new game page after game creation
        router.push(`/game/${res.data.gameId}`);
    };

    return (
        <div>
            <Button variant="contained" onClick={createGame} disabled={loading}>
                {loading ? "Creating..." : "Create Game"}
            </Button>
        </div>
    );
}
