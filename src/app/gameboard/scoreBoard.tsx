import backgroundSecondary from "../../../public/images/bg-secondary.png";

export default function ScoreBoard() {
  return (
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
  );
}
