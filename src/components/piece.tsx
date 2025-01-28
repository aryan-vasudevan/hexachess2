import { useDraggable } from "@dnd-kit/core";

interface PieceProps {
    id: string; // Unique identifier for the piece
    pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor: "W" | "B";
}

export default function Piece({ id, pieceType, pieceColor }: PieceProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id, // The unique identifier for this draggable piece
    });

    // Apply a transform to move the piece as it is dragged
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            style={style} 
            className="absolute z-10 bottom-[12px] left-[27px]"
        >
            <img
                src={`pieces/${pieceType}${pieceColor}.png`}
                alt={`${pieceType} (${pieceColor})`}
                width={47}
            />
        </div>
    );
}
