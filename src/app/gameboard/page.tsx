"use client";

import { useEffect, useState } from "react";
import background from "../../../public/images/bg.png";
import backgroundDoubleDown from "../../../public/images/bg-doubledown.png";
import DeckRepositorie from "@/services/DeckRepositorie";
import Button from "@/components/button";
import { CgCardSpades } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import Piles from "./piles";
import ScoreBoard from "./scoreBoard";
import Table from "./table";
import { CiPlay1 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import { CardProps, DeckProps } from "@/types/types";
import Loader from "@/components/loader";

function getStoredCards(key: string) {
  if (typeof window !== "undefined") {
    const deckFromLocalStorage = localStorage.getItem("blackjack-web");
    if (deckFromLocalStorage) {
      const parsedDeck = JSON.parse(deckFromLocalStorage);
      return parsedDeck[key] || [];
    }
  }
  return [];
}

export default function GameBoard() {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [deckStatus, setDeckStatus] = useState<DeckProps>();
  const [playerCards, setPlayerCards] = useState<CardProps[]>(() =>
    getStoredCards("playerCardsStorage")
  );
  const [discardCards, setDiscardCards] = useState<string[]>([]);
  const [computerCards, setComputerCards] = useState<CardProps[]>(() =>
    getStoredCards("computerCardsStorage")
  );
  const [playerScore, setPlayerScore] = useState<number[]>([]);
  const [computerScore, setComputerScore] = useState<number[]>([]);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [isDoubleDown, setIsDoubleDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function startGame() {
    try {
      if (!deckStatus?.deck_id) return;

      await DeckRepositorie.reshuffleCards(deckStatus.deck_id);

      const response = await DeckRepositorie.drawCard(deckStatus.deck_id, 3);

      const cardsDrawed: CardProps[] = response.cards;

      setPlayerCards(cardsDrawed.slice(0, 2));
      setComputerCards(cardsDrawed.slice(2, 3));
      setGameIsRunning(true);

      await DeckRepositorie.addToPile(
        deckStatus.deck_id,
        "player",
        cardsDrawed.slice(0, 2).map((card) => card.code)
      );

      await DeckRepositorie.addToPile(
        deckStatus.deck_id,
        "computer",
        cardsDrawed.slice(2, 3).map((card) => card.code)
      );

      const status = await DeckRepositorie.deckStatus(deckStatus.deck_id);
      setDeckStatus(status);
    } catch (error) {
      console.error("Erro ao iniciar o jogo: ", error);
    }
  }

  async function fetchDeck() {
    setIsLoading(true);
    try {
      const deckFromLocalStorage = localStorage.getItem("blackjack-web");

      // await DeckRepositorie.drawCard(newDeckId, 6);
      // await DeckRepositorie.deckStatus(newDeckId);
      // await DeckRepositorie.reshuffleCards(newDeckId);
      // await DeckRepositorie.addToPile(newDeckId, "discard", ["AS", "2S"]);
      // await DeckRepositorie.listCardsInPile(newDeckId, "discard");

      if (deckFromLocalStorage) {
        const parsedDeck = JSON.parse(deckFromLocalStorage);
        const { deckId } = parsedDeck;

        const status = await DeckRepositorie.deckStatus(deckId);

        setDeckStatus(status);
        setGameIsRunning(true);
        return;
      }

      const newDeckId = await DeckRepositorie.createDeck();
      const status = await DeckRepositorie.deckStatus(newDeckId);
      setDeckStatus(status);
      localStorage.setItem(
        "blackjack-web",
        JSON.stringify({
          deckId: status.deck_id,
          playerCardsStorage: [],
          computerCardsStorage: [],
          discardCardsStorage: [],
        })
      );
    } catch (error) {
      console.error("Erro ao carregar deck: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDeck();
  }, []);

  // useEffect(() => {
  //   const deckFromLocalStorage = localStorage.getItem("blackjack-web");

  //   if (deckFromLocalStorage) {
  //     const parsedDeck = JSON.parse(deckFromLocalStorage);

  //     localStorage.setItem(
  //       "blackjack-web",
  //       JSON.stringify({
  //         ...parsedDeck,
  //         playerCardsStorage: playerCards,
  //         computerCardsStorage: computerCards,
  //         discardCards: [],
  //       })
  //     );
  //   }
  // }, [playerCards, computerCards]);

  const handleReset = () => {
    localStorage.removeItem("blackjack-web");
    router.push("/");
  };

  return (
    <div
      className="flex bg-no-repeat bg-cover h-full w-full p-12"
      style={{
        backgroundImage: `url(${
          isDoubleDown ? backgroundDoubleDown.src : background.src
        })`,
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <section className="scroll flex flex-col gap-8 w-[500px] min-w-[400px] p-4 h-full overflow-y-scroll">
            <Piles discardCards={discardCards} deckStatus={deckStatus} />
            <div className="flex flex-col items-center w-full h-full gap-4 justify-end">
              <ScoreBoard
                playerScore={playerScore}
                computerScore={computerScore}
              />
              <div className="flex flex-col gap-4 justify-around w-full">
                <Button
                  leftIcon={<CgCardSpades />}
                  variant="secondary"
                  onClick={() => setIsRulesModalOpen(true)}
                >
                  Como jogar?
                </Button>
                <Button
                  leftIcon={<GrPowerReset />}
                  variant="secondary"
                  onClick={handleReset}
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          </section>
          <section className="flex flex-col justify-center items-center p-4 h-full w-full">
            {!gameIsRunning ? (
              <Button
                leftIcon={<CiPlay1 />}
                variant="secondary"
                onClick={startGame}
              >
                Iniciar Jogo
              </Button>
            ) : (
              <Table
                deckId={deckStatus?.deck_id}
                playerCards={playerCards}
                computerCards={computerCards}
                setPlayerCards={setPlayerCards}
                setComputerCards={setComputerCards}
                setIsDoubleDown={setIsDoubleDown}
                setDeckStatus={setDeckStatus}
                setComputerScore={setComputerScore}
                setPlayerScore={setPlayerScore}
                playerScore={playerScore}
                computerScore={computerScore}
                setDiscardCards={setDiscardCards}
                discardCards={discardCards}
              />
            )}
          </section>
        </>
      )}

      <Modal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      >
        teste
      </Modal>
    </div>
  );
}
