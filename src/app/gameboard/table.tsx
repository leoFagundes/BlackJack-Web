"use client";

import Button from "@/components/button";
import UseSumCardValues from "@/hooks/useSumCardValues";
import DeckRepositorie from "@/services/DeckRepositorie";
import { CardProps } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

interface TableProps {
  deckId: string | undefined;
  playerCards: CardProps[] | undefined;
  computerCards: CardProps[] | undefined;
  setPlayerCards: Dispatch<SetStateAction<CardProps[]>>;
  setComputerCards: Dispatch<SetStateAction<CardProps[]>>;
}

export default function Table({
  deckId,
  playerCards,
  computerCards,
  setPlayerCards,
  setComputerCards,
}: TableProps) {
  const computerSum = UseSumCardValues({
    array: computerCards?.map((card) => card.value) || [],
  });

  const playerSum = UseSumCardValues({
    array: playerCards?.map((card) => card.value) || [],
  });

  useEffect(() => {
    async function fecthPlayersCards() {
      if (!deckId) return;
      if (!playerCards) return;

      try {
        const responsePlayer = await DeckRepositorie.listCardsInPile(
          deckId,
          "player"
        );
        const responseComputer = await DeckRepositorie.listCardsInPile(
          deckId,
          "computer"
        );
        setPlayerCards(responsePlayer.piles.player.cards);
        setComputerCards(responseComputer.piles.computer.cards);
      } catch (error) {
        console.error("");
      }
    }

    fecthPlayersCards();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col w-full gap-2">
        <label className="text-lg">Oponente | Soma: {computerSum}</label>
        <div className="flex w-full justify-center">
          {computerCards &&
            computerCards.map((card, index) => (
              <div
                key={index}
                style={{ transform: `translateX(-${30 * index}px)` }}
              >
                <Image src={card.image} width={130} height={180} alt="card" />
              </div>
            ))}
        </div>
      </section>
      <section className="flex gap-2">
        <Button variant="secondary">Hit</Button>
        <Button variant="secondary">Stand</Button>
        <Button variant="secondary">Double Down</Button>
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
                <Image src={card.image} width={130} height={180} alt="card" />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
