"use client";

import { useEffect, useState } from "react";
import background from "../../../public/images/bg.png";
import DeckRepositorie from "@/services/DeckRepositorie";

export default function GameBoard() {
  const [deckId, setDeckId] = useState("");

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
      className="bg-no-repeat bg-cover h-full w-full p-12"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      page
    </div>
  );
}
