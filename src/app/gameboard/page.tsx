"use client";

import { useEffect, useState } from "react";
import background from "../../../public/images/bg.png";
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

export default function GameBoard() {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [deckStatus, setDeckStatus] = useState<DeckProps>();
  const [playerCards, setPlayerCards] = useState<CardProps[]>();
  const [computerCards, setComputerCards] = useState<CardProps[]>();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function startGame() {
    try {
      if (!deckStatus?.deck_id) return;

      const response = await DeckRepositorie.drawCard(deckStatus.deck_id, 2);

      const cardsDrawed: CardProps[] = response.cards;

      setPlayerCards(cardsDrawed);

      await DeckRepositorie.addToPile(
        deckStatus.deck_id,
        "player",
        cardsDrawed.map((card) => card.code)
      );

      await DeckRepositorie.listCardsInPile(deckStatus.deck_id, "player");

      const status = await DeckRepositorie.deckStatus(deckStatus.deck_id);
      setDeckStatus(status);
    } catch (error) {
      console.error("Erro ao iniciar o jogo: ", error);
    }
  }

  async function fetchDeck() {
    setIsLoading(true);
    try {
      const deckIdFromLocalStorage = localStorage.getItem("blackjack-web");

      // await DeckRepositorie.drawCard(newDeckId, 6);
      // await DeckRepositorie.deckStatus(newDeckId);
      // await DeckRepositorie.reshuffleCards(newDeckId);
      // await DeckRepositorie.addToPile(newDeckId, "discard", ["AS", "2S"]);
      // await DeckRepositorie.listCardsInPile(newDeckId, "discard");

      if (deckIdFromLocalStorage) {
        const parsedDeck = JSON.parse(deckIdFromLocalStorage);
        const { deckId } = parsedDeck;

        const status = await DeckRepositorie.deckStatus(deckId);

        setDeckStatus(status);
        return;
      }

      const newDeckId = await DeckRepositorie.createDeck();
      const status = await DeckRepositorie.deckStatus(newDeckId);
      setDeckStatus(status);
      localStorage.setItem(
        "blackjack-web",
        JSON.stringify({
          deckId: status.deck_id,
          playerCards: playerCards,
          computerCards: computerCards,
          discardCards: [],
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

  const handleReset = () => {
    localStorage.removeItem("blackjack-web");
    router.push("/");
  };

  return (
    <div
      className="flex bg-no-repeat bg-cover h-full w-full p-12"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <section className="scroll flex flex-col gap-8 w-[500px] min-w-[400px] p-4 h-full overflow-y-scroll">
            <Piles deckStatus={deckStatus} />
            <div className="flex flex-col items-center w-full h-full gap-4 justify-end">
              <ScoreBoard />
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
          <section className="flex justify-center items-center p-4 h-full w-full">
            <Button
              leftIcon={<CiPlay1 />}
              variant="secondary"
              onClick={startGame}
            >
              Iniciar Jogo
            </Button>
            <Table
              deckId={deckStatus?.deck_id}
              playerCards={playerCards}
              computerCards={computerCards}
            />
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
