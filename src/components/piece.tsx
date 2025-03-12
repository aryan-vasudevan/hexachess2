import { useDraggable } from "@dnd-kit/core";

interface PieceProps {
    // Unique identifier for the piece
    id: string;
    pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor: "W" | "B";
}

export default function Piece({ id, pieceType, pieceColor }: PieceProps) {
    // Allow this piece to be draggable
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
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
            className="absolute z-10 bottom-[11px] left-[25.5px]"
        >
            <img
                src={`/pieces/${pieceType}${pieceColor}.png`}
                alt={`${pieceType} (${pieceColor})`}
                width={50}
            />
        </div>
    );
}
