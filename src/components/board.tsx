"use client";

import Tile from "./tile";
import { DndContext } from "@dnd-kit/core";
import axios from "axios";
import { getValidMoves } from "@/utils/getValidMoves";
import { validateMove } from "@/utils/validateMoves";
import { useState } from "react";

interface BoardProps {
    gameId: string;
    pieceLocations: { [key: string]: any };
    playerColor: "W" | "B";
}

export default function Board({
    gameId,
    pieceLocations,
    playerColor,
}: BoardProps) {
    // For placing tiles
    const boardMapW: string[][] = [
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
    const boardMapB: string[][] = [
        ["", "", "", "", "", "t91", "", "", "", "", ""],
        ["", "", "", "", "t90", "", "t89", "", "", "", ""],
        ["", "", "", "t88", "", "t87", "", "t86", "", "", ""],
        ["", "", "t85", "", "t84", "", "t83", "", "t82", "", ""],
        ["", "t81", "", "t80", "", "t79", "", "t78", "", "t77", ""],
        ["t76", "", "t75", "", "t74", "", "t73", "", "t72", "", "t71"],
        ["", "t70", "", "t69", "", "t68", "", "t67", "", "t66", ""],
        ["t65", "", "t64", "", "t63", "", "t62", "", "t61", "", "t60"],
        ["", "t59", "", "t58", "", "t57", "", "t56", "", "t55", ""],
        ["t54", "", "t53", "", "t52", "", "t51", "", "t50", "", "t49"],
        ["", "t48", "", "t47", "", "t46", "", "t45", "", "t44", ""],
        ["t43", "", "t42", "", "t41", "", "t40", "", "t39", "", "t38"],
        ["", "t37", "", "t36", "", "t35", "", "t34", "", "t33", ""],
        ["t32", "", "t31", "", "t30", "", "t29", "", "t28", "", "t27"],
        ["", "t26", "", "t25", "", "t24", "", "t23", "", "t22", ""],
        ["t21", "", "t20", "", "t19", "", "t18", "", "t17", "", "t16"],
        ["", "t15", "", "t14", "", "t13", "", "t12", "", "t11", ""],
        ["", "", "t10", "", "t9", "", "t8", "", "t7", "", ""],
        ["", "", "", "t6", "", "t5", "", "t4", "", "", ""],
        ["", "", "", "", "t3", "", "t2", "", "", "", ""],
        ["", "", "", "", "", "t1", "", "", "", "", ""],
    ];

    const boardMap = playerColor === "W" ? boardMapW : boardMapB;

    const [validMoves, setValidMoves] = useState<string[]>([]);

    // Handle drag start (show valid moves)
    const handleDragStart = async (event: any) => {
        const { active } = event;
        const tileId = active.id;

        if (pieceLocations[tileId]?.color === playerColor) {
            const moves = await getValidMoves({
                gameId,
                playerColor,
                fromTileId: tileId,
            });
            setValidMoves(moves || []);
        }
    };

    // Handle drag end (move piece)
    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (over) {
            const fromTileId = active.id;
            const toTileId = over.id;

            // If the move was valid, update the piece location and the database
            if (
                await validateMove({
                    gameId,
                    playerColor,
                    validMoves,
                    toTileId,
                })
            ) {
                // Update the piece locations
                const updated = { ...pieceLocations };
                updated[toTileId] = updated[fromTileId];
                delete updated[fromTileId];

                let newTurn = "";
                // Update the turn
                if (playerColor === "W") {
                    newTurn = "B";
                } else {
                    newTurn = "W";
                }

                // Use this format because passing JSON
                axios.put("/api/updateGame", {
                    gameId,
                    pieceLocations: updated,
                    turn: newTurn,
                });
                setValidMoves([]);
            }
        }

    };

    return (
        // Area for drag and drop
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div>
                {boardMap.map((row, rowIndex) => {
                    const rowTileColor = rowIndex % 3;

                    return (
                        <div key={rowIndex} className="flex justify-center">
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex}>
                                    {cell.startsWith("t") && (
                                        <Tile
                                            id={cell}
                                            tileColor={rowTileColor.toString()}
                                            pieceType={
                                                pieceLocations[cell]?.pieceType
                                            }
                                            pieceColor={
                                                pieceLocations[cell]?.color
                                            }
                                            playerColor={playerColor}
                                            isHighlighted={validMoves.includes(
                                                cell
                                            )}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </DndContext>
    );
}
