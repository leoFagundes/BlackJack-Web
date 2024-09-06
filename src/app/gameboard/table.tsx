"use client";

import Button from "@/components/button";
import UseSumCardValues from "@/hooks/useSumCardValues";
import DeckRepositorie from "@/services/DeckRepositorie";
import { CardProps, DeckProps } from "@/types/types";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

interface TableProps {
  deckId: string | undefined;
  playerCards: CardProps[] | undefined;
  computerCards: CardProps[] | undefined;
  setPlayerCards: Dispatch<SetStateAction<CardProps[]>>;
  setComputerCards: Dispatch<SetStateAction<CardProps[]>>;
  setIsDoubleDown: Dispatch<SetStateAction<boolean>>;
  isDoubleDown: boolean;
  setDeckStatus: Dispatch<SetStateAction<DeckProps | undefined>>;
  setComputerScore: Dispatch<SetStateAction<number[]>>;
  setPlayerScore: Dispatch<SetStateAction<number[]>>;
  setDiscardCards: Dispatch<SetStateAction<string[]>>;
  computerScore: number[];
  playerScore: number[];
  discardCards: string[];
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

export default function Table({
  deckId,
  playerCards,
  computerCards,
  setPlayerCards,
  setComputerCards,
  setIsDoubleDown,
  isDoubleDown,
  setDeckStatus,
  setComputerScore,
  setPlayerScore,
  setDiscardCards,
  computerScore,
  playerScore,
  discardCards,
  message,
  setMessage,
}: TableProps) {
  const [scoreAlreadyApply, setScoreAlreadyApply] = useState(true);

  const computerSum = UseSumCardValues({
    array: computerCards?.map((card) => card.value) || [],
  });

  const playerSum = UseSumCardValues({
    array: playerCards?.map((card) => card.value) || [],
  });

  async function handleHit() {
    if (!deckId) return;
    if (!playerCards) return;

    try {
      const cardDrawed = await DeckRepositorie.drawCard(deckId, 1);

      setPlayerCards([...playerCards, cardDrawed.cards[0]]);

      const status = await DeckRepositorie.deckStatus(deckId);

      setDeckStatus(status);
      setScoreAlreadyApply(false);

      const deckFromLocalStorage = localStorage.getItem("blackjack-web");
      if (deckFromLocalStorage) {
        const parsedDeck = JSON.parse(deckFromLocalStorage);

        localStorage.setItem(
          "blackjack-web",
          JSON.stringify({
            ...parsedDeck,
            playerCardsStorage: [...playerCards, cardDrawed.cards[0]],
          })
        );
      }
    } catch (error) {
      console.error("Não foi possível realizar a ação 'hit': ", error);
    }
  }

  async function handleStand() {
    try {
      if (!deckId) return;
      if (!computerCards) return;

      // Cria uma cópia das cartas do computador para trabalhar localmente
      let updatedComputerCards = [...computerCards];
      let currentComputerSum = computerSum;

      // O computador continuará comprando cartas até ter mais pontos que o jogador ou passar de 21
      while (currentComputerSum <= playerSum && currentComputerSum <= 21) {
        const cardDrawed = await DeckRepositorie.drawCard(deckId, 1);

        // Atualiza a lista local de cartas do computador
        updatedComputerCards = [...updatedComputerCards, cardDrawed.cards[0]];

        // Atualiza a soma dos pontos com as cartas locais
        currentComputerSum = UseSumCardValues({
          array: updatedComputerCards.map((card) => card.value),
        });

        // Atualiza o estado do React com as novas cartas
        setComputerCards(updatedComputerCards);

        // Atualiza o status do deck
        const status = await DeckRepositorie.deckStatus(deckId);
        setDeckStatus(status);

        // Salva o progresso no localStorage (opcional)
        const deckFromLocalStorage = localStorage.getItem("blackjack-web");
        if (deckFromLocalStorage) {
          const parsedDeck = JSON.parse(deckFromLocalStorage);
          localStorage.setItem(
            "blackjack-web",
            JSON.stringify({
              ...parsedDeck,
              computerCardsStorage: updatedComputerCards,
            })
          );
        }
      }

      // Condição final do jogo, decide quem venceu
      if (currentComputerSum > playerSum && currentComputerSum <= 21) {
        setMessage(
          `Oponente ganhou (${currentComputerSum} o ${playerSum}) | ${
            (currentComputerSum - playerSum) * (isDoubleDown ? 2 : 1)
          } pontos!`
        );
      }
    } catch (error) {
      console.error("Não foi possível realizar a ação 'stand': ", error);
    }
  }

  function handleDoubleDown() {
    setIsDoubleDown(true);
    handleHit();
  }

  async function handleNewTable() {
    try {
      if (!deckId) return;
      if (!playerCards) return;
      if (!computerCards) return;

      // const responseDrawFromPlayer = await DeckRepositorie.drawFromPile(
      //   deckId,
      //   "player",
      //   playerCards?.length
      // );

      // const responseDrawFromComputer = await DeckRepositorie.drawFromPile(
      //   deckId,
      //   "computer",
      //   computerCards?.length
      // );

      // await DeckRepositorie.addToPile(
      //   deckId,
      //   "discard",
      //   responseDrawFromPlayer.cards.map((card: CardProps) => card.code)
      // );

      // await DeckRepositorie.addToPile(
      //   deckId,
      //   "discard",
      //   responseDrawFromComputer.cards.map((card: CardProps) => card.code)
      // );

      // setDiscardCards([
      //   ...discardCards,
      //   responseDrawFromPlayer.cards.map((card: CardProps) => card.code),
      //   responseDrawFromComputer.cards.map((card: CardProps) => card.code),
      // ]);

      setIsDoubleDown(false);

      setDiscardCards([
        ...discardCards,
        ...computerCards.map((card: CardProps) => card.code),
        ...playerCards.map((card: CardProps) => card.code),
      ]);

      // await DeckRepositorie.returnCardsInPile(deckId, "player");
      // await DeckRepositorie.returnCardsInPile(deckId, "computer");

      const responseDrawCards = await DeckRepositorie.drawCard(deckId, 3);

      const cardsDrawed: CardProps[] = responseDrawCards.cards;

      setPlayerCards(cardsDrawed.slice(0, 2));
      setComputerCards(cardsDrawed.slice(2, 3));

      await DeckRepositorie.addToPile(
        deckId,
        "player",
        cardsDrawed.slice(0, 2).map((card) => card.code)
      );

      await DeckRepositorie.addToPile(
        deckId,
        "computer",
        cardsDrawed.slice(2, 3).map((card) => card.code)
      );

      const status = await DeckRepositorie.deckStatus(deckId);

      setDeckStatus(status);
      setMessage("");
    } catch (error) {
      console.error("Erro ao reiniciar mesa: ", error);
    }
  }

  useEffect(() => {
    if (playerSum > 21 && scoreAlreadyApply === false) {
      const doubleDownMult = isDoubleDown ? 2 : 1;
      setScoreAlreadyApply(true);
      setMessage(
        `Oponente ganhou | ${
          (playerSum - computerSum) * doubleDownMult
        } pontos!`
      );
      setComputerScore([
        ...computerScore,
        (playerSum - computerSum) * doubleDownMult,
      ]);
    }

    if (computerSum > 21 && scoreAlreadyApply === false) {
      const doubleDownMult = isDoubleDown ? 2 : 1;
      setScoreAlreadyApply(true);
      setMessage(
        `Jogador ganhou | ${(computerSum - playerSum) * doubleDownMult} pontos!`
      );
      setPlayerScore([
        ...playerScore,
        (computerSum - playerSum) * doubleDownMult,
      ]);
    }
  }, [playerSum, computerSum]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col w-full gap-2">
        <label className="text-lg">Oponente | Soma: {computerSum}</label>
        <div className="flex w-full justify-center">
          {computerCards &&
            computerCards.map((card, index) => (
              <Fragment key={index}>
                <div style={{ transform: `translateX(-${30 * index}px)` }}>
                  <Image
                    className="slideIn"
                    src={card.image}
                    width={130}
                    height={180}
                    alt="card"
                  />
                </div>
                {computerCards.length === 1 && (
                  <div style={{ transform: `translateX(-30px)` }}>
                    <Image
                      className="slideIn"
                      src={`https://deckofcardsapi.com/static/img/back.png`}
                      width={130}
                      height={180}
                      alt="card"
                    />
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </section>
      <section className="flex gap-2">
        {message ? (
          <div className="flex w-full items-center justify-center gap-4">
            <p>{message}</p>
            <Button onClick={handleNewTable} variant="secondary">
              Nova mesa
            </Button>
          </div>
        ) : (
          <>
            {" "}
            <Button onClick={handleHit} variant="secondary">
              Hit
            </Button>
            <Button onClick={handleStand} variant="secondary">
              Stand
            </Button>
            <Button onClick={handleDoubleDown} variant="secondary">
              Double Down
            </Button>
          </>
        )}
      </section>
      <section className="flex flex-col gap-2 w-full">
        <label className="text-lg">Jogador | Soma: {playerSum}</label>
        <div className="flex w-full  justify-center">
          {playerCards &&
            playerCards.map((card, index) => (
              <div
                key={index}
                style={{ transform: `translateX(-${30 * index}px)` }}
              >
                <Image
                  className="slideIn"
                  src={card.image}
                  width={130}
                  height={180}
                  alt="card"
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
