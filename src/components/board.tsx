"use client";

import Tile from "./tile";
import { DndContext } from "@dnd-kit/core";
import axios from "axios";

interface BoardProps {
    gameId: string;
    pieceLocations: { [key: string]: any };
}

export default function Board({ gameId, pieceLocations }: BoardProps) {
    // For placing tiles
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

    // Handle drag and drop pieces
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over) {
            const fromTileId = active.id;
            const toTileId = over.id;

            // If a piece moved to an empty tile, update the piece location and the database
            if (fromTileId !== toTileId && !pieceLocations[toTileId]) {
                const updated = { ...pieceLocations };
                updated[toTileId] = updated[fromTileId];
                delete updated[fromTileId];

                // Use this formate because passing JSON
                axios.put("/api/updateGame", {
                    gameId,
                    pieceLocations: updated, 
                });
            }
        }
    };

    return (
        // Area for drag and drop
        <DndContext onDragEnd={handleDragEnd}>
            <div>
                {boardMap.map((row, rowIndex) => {
                    const rowTileColor = rowIndex % 3;

                    return (
                        <div key={rowIndex} className="flex justify-center">
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex}>
                                    {cell.startsWith("t") ? (
                                        cell in pieceLocations ? (
                                            <Tile
                                                id={cell}
                                                tileColor={rowTileColor.toString()}
                                                pieceType={
                                                    pieceLocations[cell]
                                                        .pieceType
                                                }
                                                pieceColor={
                                                    pieceLocations[cell].color
                                                }
                                            />
                                        ) : (
                                            <Tile
                                                id={cell}
                                                tileColor={rowTileColor.toString()}
                                            />
                                        )
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </DndContext>
    );
}
