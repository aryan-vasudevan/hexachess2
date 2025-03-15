import axios from "axios";

interface MoveProps {
    gameId: string;
    playerColor: "W" | "B";
    validMoves: string[];
    toTileId: string;
}

export const validateMove = async ({
    gameId,
    playerColor,
    validMoves,
    toTileId,
}: MoveProps) => {
    const game = await axios.get(`/api/getGame?gameId=${gameId}`);

    if (game.data.turn !== playerColor) {
        return false;
    }

    if (!(validMoves.includes(toTileId))) {
        return false;
    }

    return true;
};
