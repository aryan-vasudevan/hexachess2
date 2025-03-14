import axios from "axios";
interface MoveProps {
    gameId: string;
    playerColor: "W" | "B";
    fromTileId: string;
}

export const getValidMoves = async ({
    gameId,
    playerColor,
    fromTileId,
}: MoveProps) => {
    const game = await axios.get(`/api/getGame?gameId=${gameId}`);
    let tileNum = parseInt(fromTileId.slice(1));
    let legalTiles: string[] = [];

    // If its not the player's turn
    if (game.data.turn !== playerColor) {
        console.log("Invalid move.");
        return;
    }

    // If the piece moved was a pawn
    if (game.data.pieceLocations[fromTileId].pieceType === "pawn") {
        if (playerColor === "W") {

            // If the pawn is on one of the start tiles
            let startTiles: number[] = [81, 75, 69, 63, 57, 62, 67, 72, 77];
            if (startTiles.includes(tileNum)) {
                for (let i = 1; i < 3; i++) {
                    if (
                        (("t" + (tileNum - i * 11)) as unknown as string) in
                        game.data.pieceLocations
                    ) {
                        break;
                    }
                    legalTiles.push(
                        ("t" + (tileNum - i * 11)) as unknown as string
                    );
                }
            }
            
            // If the pawn is not on one of the start tiles
            else {
                if (
                    !(
                        (("t" + (tileNum - 11)) as unknown as string) in
                        game.data.pieceLocations
                    )
                ) {
                    legalTiles.push(
                        ("t" + (tileNum - 11)) as unknown as string
                    );
                }
            }

            // If pawn can capture diagonally left
            if (
                (("t" + (tileNum - 6)) as unknown as string) in
                game.data.pieceLocations
            ) {
                let otherPiece =
                    game.data.pieceLocations[
                        ("t" + (tileNum - 6)) as unknown as string
                    ];

                if (otherPiece.color === "B") {
                    legalTiles.push(("t" + (tileNum - 6)) as unknown as string);
                }
            }

            // If pawn can capture diagonally right
            if (
                (("t" + (tileNum - 5)) as unknown as string) in
                game.data.pieceLocations
            ) {
                let otherPiece =
                    game.data.pieceLocations[
                        ("t" + (tileNum - 5)) as unknown as string
                    ];

                if (otherPiece.color === "B") {
                    legalTiles.push(("t" + (tileNum - 5)) as unknown as string);
                }
            }

            console.log(legalTiles);
        } else {
        }
    }
    
    return legalTiles;
};
