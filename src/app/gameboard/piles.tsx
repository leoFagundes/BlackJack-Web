"use client";

import Card from "@/components/card";
import { DeckProps } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { GiClubs } from "react-icons/gi";

interface PilesProps {
  deckStatus: DeckProps | undefined;
}

export default function Piles({ deckStatus }: PilesProps) {
  const [discardPile, setDiscardPile] = useState<string[]>([]);

  return (
    <div className="flex justify-around gap-4">
      <Card
        label="Deck"
        src={`https://deckofcardsapi.com/static/img/back.png`}
        pile={deckStatus?.deck_id.trim() !== ""}
        description={`${deckStatus?.remaining} cards`}
      />
      <Card
        label="Discard"
        src={`https://deckofcardsapi.com/static/img/${discardPile.at(-1)}.png`}
        pile={discardPile.length > 0}
        description={`${discardPile.length} cards`}
      />
    </div>
  );
}
