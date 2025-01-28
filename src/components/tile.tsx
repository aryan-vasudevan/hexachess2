import Piece from "./piece";

interface TileProps {
    pieceType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    color?: "W" | "B";
}

export default function Tile({ pieceType, color }: TileProps) {
    return (
        <div className="relative">
            <img
                src="tile.png"
                className="mx-[17px] my-[-16.5px]"
                alt="tile"
                height={60}
                width={60}
            />
            {/* Conditionally render piece, only if a piece does exist on the tile*/}
            {pieceType != null && color != null && (
                <Piece pieceType={pieceType} color={color} />
            )}
        </div>
    );
}
