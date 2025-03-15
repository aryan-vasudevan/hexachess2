import { useDraggable } from "@dnd-kit/core";

interface PieceProps {
    id: string;
    pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor: "W" | "B";
    draggable: boolean;
}

export default function Piece({
    id,
    pieceType,
    pieceColor,
    draggable,
}: PieceProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div>
            {draggable ? (
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
            ) : (
                <div className="absolute z-10 bottom-[11px] left-[25.5px]">
                    <img
                        src={`/pieces/${pieceType}${pieceColor}.png`}
                        alt={`${pieceType} (${pieceColor})`}
                        width={50}
                    />
                </div>
            )}
        </div>
    );
}
