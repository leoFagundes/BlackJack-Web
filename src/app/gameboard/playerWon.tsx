import Button from "@/components/button";
import Confetti from "@/components/confetti";
import { GrPowerReset } from "react-icons/gr";

interface PlayerWonProps {
  onClick: VoidFunction;
  win: "player" | "computer";
}

function PlayerWon({ onClick, win }: PlayerWonProps) {
  console.log(win);
  return (
    <div className="flex-col gap-4 w-screen h-screen fixed top-0 left-0 bg-primary z-50 flex justify-center items-center">
      {win === "player" ? (
        <h2 className="text-5xl">VOCÊ GANHOU</h2>
      ) : (
        <h2 className="text-5xl">VOCÊ PERDEU</h2>
      )}
      {win === "player" && <Confetti />}
      <Button leftIcon={<GrPowerReset />} variant="secondary" onClick={onClick}>
        Novo Jogo
      </Button>
    </div>
  );
}

export default PlayerWon;
