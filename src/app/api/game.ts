import { NextApiRequest, NextApiResponse } from "next";
import Game from "@/utils/models/game";
import { connectDB } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Make sure user creates the game with a post request, not visiting the route
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method Not Allowed" });

    // Wait untill mongoDB is connected
    await connectDB();

    // Create the game
    const newGame = new Game({ gameState: {}, players: [] });
    await newGame.save();

    // Send gameId to frontend
    res.status(201).json({ gameId: newGame._id });
}
