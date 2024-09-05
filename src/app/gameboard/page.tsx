"use client";

import { useEffect, useState } from "react";
import background from "../../../public/images/bg.png";
import backgroundSecondary from "../../../public/images/bg-secondary.png";
import DeckRepositorie from "@/services/DeckRepositorie";
import Image from "next/image";
import Button from "@/components/button";
import { CgCardSpades } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";

export default function GameBoard() {
  const [deckId, setDeckId] = useState("");
  const [discardPile, setDiscardPile] = useState<string[]>([]);

  async function fetchDeck() {
    const newDeckId = await DeckRepositorie.createDeck();
    await DeckRepositorie.drawCard(newDeckId, 6);
    await DeckRepositorie.deckStatus(newDeckId);
    await DeckRepositorie.reshuffleCards(newDeckId);
    await DeckRepositorie.addToPile(newDeckId, "discard", ["AS", "2S"]);
    await DeckRepositorie.listCardsInPile(newDeckId, "discard");
    setDeckId(newDeckId);
  }

  useEffect(() => {
    fetchDeck();
  }, []);

  return (
    <div
      className="flex bg-no-repeat bg-cover h-full w-full p-12"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <section className="flex flex-col gap-8 w-[400px] p-4 h-full">
        <div className="flex justify-around gap-4">
          <figure className="flex flex-col gap-1 items-center">
            <figcaption className="text-xl">Deck</figcaption>
            <Image
              width={180}
              height={0}
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="card-back"
            />
          </figure>
          <figure className="flex flex-col gap-1 items-center">
            <figcaption className="text-xl">Discard</figcaption>
            <Image
              width={180}
              height={0}
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="card-back"
            />
          </figure>
        </div>
        <div className="flex flex-col items-center w-full h-full gap-4 justify-end">
          <article
            className="flex flex-col gap-3 items-center bg-no-repeat bg-cover h-[300px] w-full max-w-[400px] p-8 rounded-lg drop-shadow-2xl shadow-card"
            style={{ backgroundImage: `url(${backgroundSecondary.src})` }}
          >
            <h2 className="text-xl">PONTUAÇÃO</h2>
            <div className="flex justify-around w-full h-full">
              <div>
                <p>Jogador</p>
              </div>
              <div className="w-[1px] shadow-card h-full bg-white" />
              <div>
                <p>Oponente</p>
              </div>
            </div>
          </article>
          <div className="flex flex-col gap-4 justify-around w-full">
            <Button leftIcon={<CgCardSpades />} variant="secondary">
              Como jogar?
            </Button>
            <Button leftIcon={<GrPowerReset />} variant="secondary">
              Reiniciar
            </Button>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
}
