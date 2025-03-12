import Piece from "./piece";
import { useDroppable } from "@dnd-kit/core";

interface TileProps {
    id: string;
    tileColor: string;
    playerColor?: "W" | "B";
    pieceType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor?: "W" | "B";
}

export default function Tile({ id, tileColor, playerColor, pieceType, pieceColor }: TileProps) {
    // Allow this tile to be droppable
    const { setNodeRef, isOver } = useDroppable({
        id: id.toString(),
    });
    
    return (
        <div className="relative" ref={setNodeRef}>
            <img
                src={`/tile${tileColor}.png`}
                className="mx-[16px] my-[-20.5px]"
                alt="tile"
                height={70}
                width={70}
            />
            {/* Conditionally render piece, only if a piece does exist on the tile*/}
            {pieceType != null &&
                pieceColor != null &&
                playerColor === pieceColor && (
                    <Piece
                        id={id.toString()}
                        pieceType={pieceType}
                        pieceColor={pieceColor}
                        draggable={true}
                    />
                )}
            {pieceType != null &&
                pieceColor != null &&
                playerColor != pieceColor && (
                    <Piece
                        id={id.toString()}
                        pieceType={pieceType}
                        pieceColor={pieceColor}
                        draggable={false}
                    />
                )}
        </div>
    );
}
