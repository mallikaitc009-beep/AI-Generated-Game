export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export type Point = { x: number; y: number };

export type GameState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
