import Piece from "./piece";
import { useDroppable } from "@dnd-kit/core";

interface TileProps {
    id: string;
    pieceType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    color?: "W" | "B";
}

export default function Tile({ id, pieceType, color }: TileProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id.toString(),
    });
    return (
        <div className="relative" ref={setNodeRef}>
            <img
                src="tile.png"
                className="mx-[16px] my-[-20.5px]"
                alt="tile"
                height={70}
                width={70}
            />
            {/* Conditionally render piece, only if a piece does exist on the tile*/}
            {pieceType != null && color != null && (
                <Piece id={id.toString()} pieceType={pieceType} color={color} />
            )}
        </div>
    );
}
