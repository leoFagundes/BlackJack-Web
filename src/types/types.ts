export interface DeckProps {
  deck_id: "string";
  remaining: number;
  success: boolean;
  shuffled: boolean;
}

export interface CardProps {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: string;
  value: string;
}

export type TRunAnimationParams = {
  speed: number;
  duration?: number;
  delay?: number;
};

export type TConductorInstance = {
  run: (params: TRunAnimationParams) => void;
  shoot: () => void;
  pause: () => void;
  stop: () => void;
};
