import { connectDB } from "@/utils/db";
import Game from "@/utils/models/gameModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectDB();

    // Get the id of the game that were fetching the data from
    const gameId = req.query.gameId;

    try {
        // Find the game in the db
        const game = await Game.findById(gameId)

        // If the game isnt found
        if (!game) {
            return res.status(404).json({ message: "Game not found" })
        }

        // Return the data
        return res.status(200).json({ pieceLocations: game.pieceLocations });
    } catch {
        return res.status(500).json({ message: "Server Error" });
    }
}