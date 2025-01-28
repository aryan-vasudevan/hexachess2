"use client"

import Tile from "./tile";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

export default function Board() {
    const [pieceLocations, setPieceLocations] = useState<{
        [key: string]: {
            pieceType: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
            color: "W" | "B";
        };
    }>({
        t1: { pieceType: "bishop", color: "B" },
        t2: { pieceType: "queen", color: "B" },
        t3: { pieceType: "king", color: "B" },
        t4: { pieceType: "knight", color: "B" },
        t5: { pieceType: "bishop", color: "B" },
        t6: { pieceType: "knight", color: "B" },
        t7: { pieceType: "rook", color: "B" },
        t10: { pieceType: "rook", color: "B" },
        t11: { pieceType: "pawn", color: "B" },
        t13: { pieceType: "bishop", color: "B" },
        t15: { pieceType: "pawn", color: "B" },
        t17: { pieceType: "pawn", color: "B" },
        t20: { pieceType: "pawn", color: "B" },
        t23: { pieceType: "pawn", color: "B" },
        t25: { pieceType: "pawn", color: "B" },
        t29: { pieceType: "pawn", color: "B" },
        t30: { pieceType: "pawn", color: "B" },
        t35: { pieceType: "pawn", color: "B" },

        t91: { pieceType: "bishop", color: "W" },
        t90: { pieceType: "king", color: "W" },
        t89: { pieceType: "queen", color: "W" },
        t88: { pieceType: "knight", color: "W" },
        t87: { pieceType: "bishop", color: "W" },
        t86: { pieceType: "knight", color: "W" },
        t85: { pieceType: "rook", color: "W" },
        t82: { pieceType: "rook", color: "W" },
        t81: { pieceType: "pawn", color: "W" },
        t79: { pieceType: "bishop", color: "W" },
        t77: { pieceType: "pawn", color: "W" },
        t75: { pieceType: "pawn", color: "W" },
        t72: { pieceType: "pawn", color: "W" },
        t69: { pieceType: "pawn", color: "W" },
        t67: { pieceType: "pawn", color: "W" },
        t63: { pieceType: "pawn", color: "W" },
        t62: { pieceType: "pawn", color: "W" },
        t57: { pieceType: "pawn", color: "W" },
    });

    const boardMap: string[][] = [
        ["", "", "", "", "", "t1", "", "", "", "", ""],
        ["", "", "", "", "t2", "", "t3", "", "", "", ""],
        ["", "", "", "t4", "", "t5", "", "t6", "", "", ""],
        ["", "", "t7", "", "t8", "", "t9", "", "t10", "", ""],
        ["", "t11", "", "t12", "", "t13", "", "t14", "", "t15", ""],
        ["t16", "", "t17", "", "t18", "", "t19", "", "t20", "", "t21"],
        ["", "t22", "", "t23", "", "t24", "", "t25", "", "t26", ""],
        ["t27", "", "t28", "", "t29", "", "t30", "", "t31", "", "t32"],
        ["", "t33", "", "t34", "", "t35", "", "t36", "", "t37", ""],
        ["t38", "", "t39", "", "t40", "", "t41", "", "t42", "", "t43"],
        ["", "t44", "", "t45", "", "t46", "", "t47", "", "t48", ""],
        ["t49", "", "t50", "", "t51", "", "t52", "", "t53", "", "t54"],
        ["", "t55", "", "t56", "", "t57", "", "t58", "", "t59", ""],
        ["t60", "", "t61", "", "t62", "", "t63", "", "t64", "", "t65"],
        ["", "t66", "", "t67", "", "t68", "", "t69", "", "t70", ""],
        ["t71", "", "t72", "", "t73", "", "t74", "", "t75", "", "t76"],
        ["", "t77", "", "t78", "", "t79", "", "t80", "", "t81", ""],
        ["", "", "t82", "", "t83", "", "t84", "", "t85", "", ""],
        ["", "", "", "t86", "", "t87", "", "t88", "", "", ""],
        ["", "", "", "", "t89", "", "t90", "", "", "", ""],
        ["", "", "", "", "", "t91", "", "", "", "", ""],
    ];

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // Check if the piece was dropped over a valid tile
        if (over) {
            const fromTileId = active.id;
            const toTileId = over.id;

            // Update the pieceLocations state
            setPieceLocations((prev) => {
                const updated = { ...prev };
                updated[toTileId] = updated[fromTileId];
                delete updated[fromTileId]; 
                return updated;
            });
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div>
                {boardMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center">
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex}>
                                {/* Only render a piece if a tile has a piece on it, otherwise just the tile */}
                                {cell.startsWith("t") ? (
                                    cell in pieceLocations ? (
                                        <Tile
                                            id={cell}
                                            pieceType={
                                                pieceLocations[cell].pieceType
                                            }
                                            color={pieceLocations[cell].color}
                                        />
                                    ) : (
                                        <Tile id={cell} />
                                    )
                                ) : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </DndContext>
    );
}
