import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Play, CircleAlert } from 'lucide-react';
import { Point, GameState } from '../types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION: Point = { x: 0, y: -1 };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [speed, setSpeed] = useState(150);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState('PLAYING');
    setFood(generateFood(INITIAL_SNAKE));
    setSpeed(150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const moveSnake = () => {
      const head = snake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('GAME_OVER');
        if (score > highScore) setHighScore(score);
        return;
      }

      const newSnake = [newHead, ...snake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(prev - 2, 60));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameState, speed, score, highScore, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tileSize = canvas.width / GRID_SIZE;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tileSize, 0);
        ctx.lineTo(i * tileSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * tileSize);
        ctx.lineTo(canvas.width, i * tileSize);
        ctx.stroke();
    }

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ff00ff' : '#00ffff';
      ctx.fillRect(
        segment.x * tileSize + 2,
        segment.y * tileSize + 2,
        tileSize - 4,
        tileSize - 4
      );
    });

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(
      food.x * tileSize + 4,
      food.y * tileSize + 4,
      tileSize - 8,
      tileSize - 8
    );

  }, [snake, food]);

  return (
    <div className="relative group w-full h-full flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 font-mono text-[10px] text-glitch-cyan space-y-1">
        <p>PROCESS_ID::SNAKE_THREAD_0x1</p>
        <p>SCORE::{score.toString().padStart(6, '0')}</p>
        <p>BEST::{highScore.toString().padStart(6, '0')}</p>
      </div>

      <div className="glitch-border bg-glitch-black p-1 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="block max-w-full aspect-square grayscale-[0.5] contrast-125"
          id="game-canvas"
        />

        <AnimatePresence>
          {gameState === 'IDLE' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-glitch-black/90"
              id="idle-overlay"
            >
               <h2 className="text-5xl font-bold text-glitch-cyan mb-8 text-glitch tracking-[0.2em]">INITIALIZE</h2>
              <button
                onClick={resetGame}
                className="group px-12 py-4 bg-glitch-cyan/10 hover:bg-glitch-magenta/20 text-glitch-cyan hover:text-glitch-magenta border-2 border-glitch-cyan hover:border-glitch-magenta transition-all"
                id="start-btn"
              >
                <div className="flex items-center gap-4">
                   <Play className="w-6 h-6 fill-current" />
                   <span className="text-2xl font-bold uppercase tracking-widest leading-none pt-1">EXECUTE_CORE</span>
                </div>
              </button>
            </motion.div>
          )}

          {gameState === 'GAME_OVER' && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-glitch-magenta/90"
              id="game-over-overlay"
            >
              <CircleAlert className="w-20 h-20 text-white mb-4 animate-bounce" />
              <h2 className="text-6xl font-bold text-white mb-2 tracking-tighter uppercase italic">SEG_FAULT</h2>
              <p className="text-white mono mb-10 text-xl">[ERROR_CODE: {score}]</p>
              <button
                onClick={resetGame}
                className="px-12 py-4 bg-white text-glitch-magenta border-4 border-white hover:bg-transparent hover:text-white transition-all font-black text-2xl uppercase italic"
                id="retry-btn"
              >
                REBOOT_SYSTEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-8 items-center text-[12px] opacity-40 uppercase tracking-[0.4em] font-bold">
        <span>CTRL::ARROWS</span>
        <span>MOD::PIXEL</span>
      </div>
    </div>
  );
}
