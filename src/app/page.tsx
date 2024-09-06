"use client";

import Button from "@/components/button";
import cards from "../../public/svg/cards.svg";
import { GiClubs } from "react-icons/gi";
import Image from "next/image";
import clubs from "../../public/svg/clubs.svg";
import diamonds from "../../public/svg/diamonds.svg";
import hearts from "../../public/svg/hearts.svg";
import spades from "../../public/svg/spades.svg";
import { Fragment } from "react";
import Link from "next/link";

export default function Home() {
  const deckIdFromLocalStorage = localStorage.getItem("blackjack-web");

  return (
    <main className="flex w-full h-full">
      <section className="w-full sm:w-[60%] flex flex-col gap-4 justify-center items-center relative">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-4xl sm:text-6xl ">BLACK JACK</h1>
          <h2 className="text-2xl sm:text-4xl  ">WEB</h2>
        </div>
        <Link href={"/gameboard"}>
          <Button rightIcon={<GiClubs />}>
            {deckIdFromLocalStorage ? "Continuar Jogo" : "Iniciar"}
          </Button>
        </Link>

        <Fragment>
          <Image
            className="lg:scale-100 mix-blend-screen shadow-md absolute translate-x-[120px] -translate-y-[280px] sm:translate-x-[160px] sm:-translate-y-[180px]  lg:translate-x-[200px] lg:-translate-y-[240px] rotate-[20deg]"
            src={clubs.src}
            width={130}
            height={130}
            alt="clubs"
          />
          <Image
            className="lg:scale-100 mix-blend-screen shadow-md absolute -translate-x-[100px] -translate-y-[180px] sm:-translate-x-[140px] sm:-translate-y-[130px] lg:-translate-x-[230px] lg:-translate-y-[180px] -rotate-[20deg]"
            src={diamonds.src}
            width={130}
            height={130}
            alt="diamonds"
          />
          <Image
            className="lg:scale-100 mix-blend-screen shadow-md absolute -translate-x-[80px] translate-y-[280px] sm:-translate-x-[120px] sm:translate-y-[200px] lg:-translate-x-[150px] lg:translate-y-[240px] -rotate-[15deg]"
            src={hearts.src}
            width={130}
            height={130}
            alt="hearts"
          />
          <Image
            className="lg:scale-100 mix-blend-screen shadow-md absolute translate-x-[90px] translate-y-[130px] sm:translate-x-[100px] sm:translate-y-[120px] lg:translate-x-[240px] lg:translate-y-[130px] rotate-[20deg]"
            src={spades.src}
            width={130}
            height={130}
            alt="spades"
          />
        </Fragment>
      </section>
      <div
        className="w-[40%] h-screen bg-no-repeat bg-cover hidden sm:block"
        style={{ backgroundImage: `url(${cards.src})` }}
      />
    </main>
  );
}
