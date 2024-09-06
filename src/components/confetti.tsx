import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

interface ConfettiProps {
  autoRun?: boolean;
  speed?: number;
}

function Confetti({ autoRun = true, speed = 2 }: ConfettiProps) {
  return <Fireworks autorun={autoRun ? { speed } : undefined} />;
}

export default Confetti;
