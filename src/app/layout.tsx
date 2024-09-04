import type { Metadata } from "next";
import { Salsa } from "next/font/google";
import "./globals.css";

const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Black Jack",
  description: "Jogo de cartas conhecido como 21 ou Black Jack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${salsa.className} bg-primary text-white w-screen h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
