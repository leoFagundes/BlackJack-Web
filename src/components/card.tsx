import Image from "next/image";
import { GiClubs } from "react-icons/gi";

interface CardProps {
  label: string;
  pile: boolean;
  description: string;
  warnDescription?: {
    warnWhen: number;
    count: number;
  };
  src: string;
}

export default function Card({
  label,
  description,
  pile,
  src,
  warnDescription,
}: CardProps) {
  return (
    <figure className="flex flex-col gap-1 items-center">
      <figcaption className="text-xl">{label}</figcaption>
      {pile ? (
        <Image width={180} height={0} src={src} alt={label} />
      ) : (
        <div className="flex justify-center items-center w-[170px] rounded-lg border border-dashed h-full">
          <GiClubs className="text-white drop-shadow-lg" size={32} />
        </div>
      )}
      <figcaption
        className={`self-start ${
          warnDescription &&
          warnDescription.count <= warnDescription.warnWhen &&
          "text-red-400"
        }`}
      >
        {description}
      </figcaption>
    </figure>
  );
}
