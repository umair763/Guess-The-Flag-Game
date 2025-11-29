import { useState, useEffect } from "react";
import { GameBoard } from "../components";

export const GameBoardPage = () => {

  return (
    <div className="w-full h-full flex items-center justify-center"> 
      <GameBoard />
    </div>
  );
};
