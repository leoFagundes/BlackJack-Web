"use client";

import Button from "@/components/button";
import Confetti from "@/components/confetti";
import { GrPowerReset } from "react-icons/gr";
import backgroundCards from "../../../public/images/bg-deck-v3.png";

interface PlayerWonProps {
  onClick: VoidFunction;
  win: "player" | "computer";
}

function PlayerWon({ onClick, win }: PlayerWonProps) {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundCards.src})` }}
      className="flex-col gap-4 w-screen h-screen bg-cover bg-no-repeat bg-center fixed top-0 left-0 bg-primary z-50 flex justify-center items-center"
    >
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen fixed top-0 left-0">
        {win === "player" ? (
          <h2 className="text-5xl">VOCÊ GANHOU</h2>
        ) : (
          <h2 className="text-5xl">VOCÊ PERDEU</h2>
        )}
        {win === "player" && <Confetti />}
        <Button
          leftIcon={<GrPowerReset />}
          variant="secondary"
          onClick={onClick}
        >
          Novo Jogo
        </Button>
      </div>
    </div>
  );
}

export default PlayerWon;
