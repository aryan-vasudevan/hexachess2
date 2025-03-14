import Piece from "./piece";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { getValidMoves } from "@/utils/getValidMoves";

interface TileProps {
    id: string;
    tileColor: string;
    playerColor: "W" | "B";
    pieceType?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    pieceColor?: "W" | "B";
    isHighlighted: boolean;
}

export default function Tile({
    id,
    tileColor,
    playerColor,
    pieceType,
    pieceColor,
    isHighlighted,
}: TileProps) {
    const { setNodeRef } = useDroppable({
        id: id.toString(),
    });

    return (
        <div className="relative" ref={setNodeRef}>
            <img
                src={`/tiles${playerColor}/tile${tileColor}.png`}
                className="mx-[16px] my-[-20.5px]"
                alt="tile"
                height={70}
                width={70}
            />
            {isHighlighted && (
                <img
                    src="/highlight.png"
                    alt="Highlight"
                    className="mx-[41px] my-[-43px] opacity-50"
                    height={20}
                    width={20}
                />
            )}
            {pieceType != null && pieceColor != null && (
                <Piece
                    id={id.toString()}
                    pieceType={pieceType}
                    pieceColor={pieceColor}
                    draggable={true}
                />
            )}
        </div>
    );
}
