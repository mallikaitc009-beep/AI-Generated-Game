import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artist: 'Synthwave AI',
    duration: '3:45',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Digital Echo',
    duration: '4:12',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Void Runner',
    artist: 'Midnight Marauder',
    duration: '3:20',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 200);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  return (
    <footer className="glitch-border bg-glitch-gray h-24 flex items-center px-6 gap-6 border-glitch-cyan shadow-[0_0_20px_rgba(0,255,255,0.05)]" id="music-player">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-glitch-cyan hover:text-glitch-black transition-colors text-glitch-cyan border border-glitch-cyan/30"
          id="music-back"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={handleTogglePlay}
          className="w-14 h-14 bg-glitch-magenta text-white flex items-center justify-center hover:bg-white hover:text-glitch-magenta transition-all border-2 border-white shadow-[4px_4px_0_#ff00ff]"
          id="music-play-pause"
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>
        <button 
          onClick={handleNext}
          className="p-2 hover:bg-glitch-cyan hover:text-glitch-black transition-colors text-glitch-cyan border border-glitch-cyan/30"
          id="music-next"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="flex-grow flex flex-col gap-1 overflow-hidden">
        <div className="flex justify-between items-end mb-1">
          <div className="flex flex-col min-w-0">
             <span className="text-[10px] text-glitch-cyan/50 tracking-widest uppercase font-bold">STREAM_ID::0XF32</span>
             <span className="text-xl font-bold text-glitch-cyan truncate tracking-[0.1em] text-glitch">
                {currentTrack.title} // {currentTrack.artist}
             </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-4 h-4 text-glitch-magenta animate-pulse" />
            <span className="text-lg font-mono text-glitch-magenta">PHASE_({progress.toFixed(0)}%)</span>
          </div>
        </div>
        <div className="w-full h-3 border border-glitch-cyan/30 bg-glitch-black relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-glitch-cyan"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
          {/* Faux Segment markers */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-glitch-black" />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-glitch-cyan/20">
        <Volume2 className="w-5 h-5 text-glitch-cyan" />
        <div className="w-20 h-2 border border-glitch-cyan/20 bg-glitch-black">
            <div className="w-3/4 h-full bg-glitch-cyan/40" />
        </div>
      </div>
    </footer>
  );
}
