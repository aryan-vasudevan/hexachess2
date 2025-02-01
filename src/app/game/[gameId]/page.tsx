"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Board from "@/components/board";

export default function GamePage() {
    const { gameId } = useParams(); 
    return (
        <div>
            <Board gameId={`${gameId}`}></Board>
        </div>
    );
}
