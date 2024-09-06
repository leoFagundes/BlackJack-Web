import backgroundSecondary from "../../../public/images/bg-secondary.png";

interface ScoreBoardProps {
  computerScore: number[];
  playerScore: number[];
}

export default function ScoreBoard({
  computerScore,
  playerScore,
}: ScoreBoardProps) {
  return (
    <article
      className="flex flex-col gap-3 items-center bg-no-repeat bg-cover h-[300px] w-full max-w-[400px] p-8 rounded-lg drop-shadow-2xl shadow-card"
      style={{ backgroundImage: `url(${backgroundSecondary.src})` }}
    >
      <h2 className="text-xl">PONTUAÇÃO</h2>
      <div className="flex justify-around w-full h-full">
        <div className="flex flex-col">
          <p>Jogador</p>
          <div className="flex-1">
            {playerScore.map((value) => (
              <p>{value}</p>
            ))}
          </div>
          <p>
            Total:{" "}
            {playerScore.length > 0
              ? playerScore.reduce((curr, acc) => acc + curr)
              : "0"}
          </p>
        </div>
        <div className="w-[1px] shadow-card h-full bg-white" />
        <div className="flex flex-col">
          <p>Oponente</p>
          <div className="flex-1">
            {computerScore.map((value) => (
              <p>{value}</p>
            ))}
          </div>
          <p>
            Total:{" "}
            {computerScore.length > 0
              ? computerScore.reduce((curr, acc) => acc + curr)
              : "0"}
          </p>
        </div>
      </div>
    </article>
  );
}
