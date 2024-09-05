import Image from "next/image";
import { GiClubs } from "react-icons/gi";

interface CardProps {
  label: string;
  pile: boolean;
  description: string;
  src: string;
}

export default function Card({ label, description, pile, src }: CardProps) {
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
      <figcaption className="self-start">{description}</figcaption>
    </figure>
  );
}
