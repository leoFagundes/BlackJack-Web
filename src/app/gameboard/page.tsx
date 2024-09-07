"use client";

import { Fragment, useEffect, useState } from "react";
import background from "../../../public/images/bg.png";
import backgroundDoubleDown from "../../../public/images/bg-doubledown.png";
import backgroundCards from "../../../public/images/bg-cards.png";
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
import rules from "../../utils/rules.json";
import PlayerWon from "./playerWon";
import { BiExpand } from "react-icons/bi";
import { GiContract } from "react-icons/gi";

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

function getStoredString(key: string): string | null {
  if (typeof window !== "undefined") {
    const dataFromLocalStorage = localStorage.getItem("blackjack-web");
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      return parsedData[key] || null;
    }
  }
  return null;
}

function getStoredBoolean(key: string) {
  if (typeof window !== "undefined") {
    const dataFromLocalStorage = localStorage.getItem("blackjack-web");
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      return Boolean(parsedData[key]);
    }
  }
  return false;
}

export default function GameBoard() {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [deckStatus, setDeckStatus] = useState<DeckProps>();
  const [expandMobileInterface, setExpandMobileInterface] = useState(false);
  const [finishGame, setFinishGame] = useState(false);
  const [message, setMessage] = useState(() =>
    getStoredString("messageStorage")
  );
  const [playerCards, setPlayerCards] = useState<CardProps[]>(() =>
    getStoredCards("playerCardsStorage")
  );
  const [discardCards, setDiscardCards] = useState<string[]>(() =>
    getStoredCards("discardCardsStorage")
  );
  const [computerCards, setComputerCards] = useState<CardProps[]>(() =>
    getStoredCards("computerCardsStorage")
  );
  const [playerScore, setPlayerScore] = useState<number[]>(() =>
    getStoredCards("playerScoreStorage")
  );
  const [computerScore, setComputerScore] = useState<number[]>(() =>
    getStoredCards("computerScoreStorage")
  );
  const [gameIsRunning, setGameIsRunning] = useState(() =>
    getStoredBoolean("gameIsRunningStorage")
  );
  const [isDoubleDown, setIsDoubleDown] = useState(() =>
    getStoredBoolean("isDoubleDownStorage")
  );

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setExpandMobileInterface(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      if (deckFromLocalStorage) {
        const parsedDeck = JSON.parse(deckFromLocalStorage);
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
          playerCardsStorage: [],
          computerCardsStorage: [],
          discardCardsStorage: [],
          playerScoreStorage: [],
          computerScoreStorage: [],
          isDoubleDownStorage: false,
          gameIsRunningStorage: false,
          messageStorage: null,
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

  useEffect(() => {
    const deckFromLocalStorage = localStorage.getItem("blackjack-web");
    console.log(deckStatus?.remaining);
    if (deckStatus?.remaining && deckStatus?.remaining <= 4) {
      setFinishGame(true);
    }

    if (deckFromLocalStorage) {
      const parsedDeck = JSON.parse(deckFromLocalStorage);

      localStorage.setItem(
        "blackjack-web",
        JSON.stringify({
          ...parsedDeck,
          playerCardsStorage: playerCards,
          computerCardsStorage: computerCards,
          playerScoreStorage: playerScore,
          computerScoreStorage: computerScore,
          discardCardsStorage: discardCards,
          isDoubleDownStorage: isDoubleDown,
          gameIsRunningStorage: gameIsRunning,
          messageStorage: message,
        })
      );
    }
  }, [
    playerCards,
    computerCards,
    computerScore,
    playerScore,
    discardCards,
    isDoubleDown,
    message,
  ]);

  const handleReset = () => {
    localStorage.removeItem("blackjack-web");
    setFinishGame(false);
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
      {finishGame && (
        <PlayerWon
          win={
            playerScore.reduce((curr, acc) => acc + curr, 0) <
            computerScore.reduce((curr, acc) => acc + curr, 0)
              ? "computer"
              : "player"
          }
          onClick={handleReset}
        />
      )}
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <section
            style={
              expandMobileInterface
                ? { backgroundImage: `url(${background.src})` }
                : {}
            }
            className={`scroll lg:flex flex-col gap-8 sm:w-[500px] sm:min-w-[400px] p-4 h-full overflow-y-scroll overflow-x-hidden ${
              expandMobileInterface
                ? "fixed w-screen h-screen top-0 left-0 flex z-30 items-center"
                : "hidden"
            }`}
          >
            {expandMobileInterface && (
              <div
                onClick={() => setExpandMobileInterface(false)}
                className="flex items-center gap-1 fixed bottom-4 right-4 z-50"
              >
                <Button
                  variant="secondary"
                  rightIcon={<GiContract size={20} />}
                >
                  Ver menos
                </Button>
              </div>
            )}
            <Piles discardCards={discardCards} deckStatus={deckStatus} />
            <div className="flex flex-col lg:w-full w-[350px] sm:w-[400px] items-center h-full gap-4 justify-end">
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
          <section
            style={
              !gameIsRunning
                ? { backgroundImage: `url(${backgroundCards.src})` }
                : {}
            }
            className={`relative flex flex-col justify-center items-center p-4 h-full w-full ${
              !gameIsRunning && "bg-cover bg-no-repeat bg-center"
            }`}
          >
            <div className="fixed bottom-4 right-4 lg:hidden flex">
              <Button
                onClick={() => setExpandMobileInterface(true)}
                variant="secondary"
                rightIcon={<BiExpand size={20} />}
              >
                Ver mais
              </Button>
            </div>
            {!gameIsRunning ? (
              <div className="absolute h-full w-full flex items-center justify-center">
                <Button
                  style={{ scale: "1.2" }}
                  leftIcon={<CiPlay1 />}
                  variant="secondary"
                  onClick={startGame}
                >
                  Iniciar Jogo
                </Button>
              </div>
            ) : (
              <Table
                deckId={deckStatus?.deck_id}
                playerCards={playerCards}
                computerCards={computerCards}
                setPlayerCards={setPlayerCards}
                setComputerCards={setComputerCards}
                setIsDoubleDown={setIsDoubleDown}
                isDoubleDown={isDoubleDown}
                setDeckStatus={setDeckStatus}
                setComputerScore={setComputerScore}
                setPlayerScore={setPlayerScore}
                playerScore={playerScore}
                computerScore={computerScore}
                setDiscardCards={setDiscardCards}
                discardCards={discardCards}
                message={message}
                setMessage={setMessage}
              />
            )}
          </section>
        </>
      )}

      <Modal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      >
        <div className="flex flex-col gap-4 px-4 backdrop-blur-sm">
          <h1 className="self-center text-3xl">Regras do Jogo</h1>
          {rules.map(({ title, description }, index) => (
            <Fragment key={index}>
              <hr />
              <article className="flex flex-col gap-1 bg-transparent ">
                <h2 className="text-2xl">{title}</h2>
                {description.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </article>
            </Fragment>
          ))}
        </div>
      </Modal>
    </div>
  );
}
