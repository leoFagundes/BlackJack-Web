"use client";

import Card from "@/components/card";
import { DeckProps } from "@/types/types";

interface PilesProps {
  deckStatus: DeckProps | undefined;
  discardCards: string[];
}

export default function Piles({ deckStatus, discardCards }: PilesProps) {
  return (
    <div className="flex justify-around gap-4">
      <Card
        label="Deck"
        src={`https://deckofcardsapi.com/static/img/back.png`}
        pile={deckStatus?.deck_id.trim() !== ""}
        description={`${deckStatus?.remaining} cards`}
        warnDescription={{ warnWhen: 10, count: deckStatus!.remaining }}
      />
      <Card
        label="Discard"
        src={`https://deckofcardsapi.com/static/img/${discardCards.at(-1)}.png`}
        pile={discardCards.length > 0}
        description={`${discardCards.length} cards`}
      />
    </div>
  );
}
