interface PieceProps {
    pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    color: "W" | "B";
}

export default function Piece({pieceType, color}: PieceProps) {
    return (
        <div>
            <img
                src={`pieces/${pieceType}${color}.png`}
                alt=""
                className="absolute z-10 bottom-[12px] left-[27px]"
                width={40}
            />
        </div>
    );
}