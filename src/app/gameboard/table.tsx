"use client";

import DeckRepositorie from "@/services/DeckRepositorie";
import { CardProps } from "@/types/types";
import { useEffect } from "react";

interface TableProps {
  deckId: string | undefined;
  playerCards: CardProps[] | undefined;
  computerCards: CardProps[] | undefined;
}

export default function Table({
  deckId,
  playerCards,
  computerCards,
}: TableProps) {
  useEffect(() => {
    async function fecthPlayersCards() {
      if (!deckId) return;

      try {
        const response = await DeckRepositorie.listCardsInPile(
          deckId,
          "player"
        );
        console.log("aaaa", response.piles.player.cards);
      } catch (error) {
        console.error("");
      }
    }

    fecthPlayersCards();
  }, []);

  return (
    <div>
      <section></section>
      <section></section>
      <section>
        {playerCards?.map((card, index) => (
          <div key={index}>{card.code}</div>
        ))}
      </section>
    </div>
  );
}
