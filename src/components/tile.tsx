import Piece from "./piece";
import { useDroppable } from "@dnd-kit/core";

interface TileProps {
    id: string;
    tileColor: string;
    pieceType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor?: "W" | "B";
}

export default function Tile({ id, tileColor, pieceType, pieceColor }: TileProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id.toString(),
    });

    if (id)
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
            {pieceType != null && pieceColor != null && (
                <Piece id={id.toString()} pieceType={pieceType} pieceColor={pieceColor} />
            )}
        </div>
    );
}
