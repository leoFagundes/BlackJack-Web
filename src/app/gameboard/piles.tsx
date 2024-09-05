"use client";

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
      <figure className="flex flex-col gap-1 items-center">
        <figcaption className="text-xl">Deck</figcaption>
        <Image
          width={180}
          height={0}
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="card-back"
        />
        <figcaption className="self-start">
          {deckStatus?.remaining} cards
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-1 items-center">
        <figcaption className="text-xl">Discard</figcaption>
        {discardPile.length > 0 ? (
          <Image
            width={180}
            height={0}
            src={`https://deckofcardsapi.com/static/img/${discardPile.at(
              -1
            )}.png`}
            alt="card-back"
          />
        ) : (
          <div className="flex justify-center items-center w-[170px] rounded-lg border border-dashed h-full">
            <GiClubs className="text-white drop-shadow-lg" size={32} />
          </div>
        )}
        <figcaption className="self-start">
          {discardPile.length} cards
        </figcaption>
      </figure>
    </div>
  );
}
