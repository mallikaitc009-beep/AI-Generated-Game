/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Database, Activity, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  return (
    <div className="h-screen w-screen p-4 flex flex-col lg:flex-row gap-4 relative overflow-hidden crt-flicker">
      {/* Visual Frequency Modulators */}
      <div className="scanlines" />
      <div className="static-noise" />
      
      {/* Sidebar aside: SYSTEM_CONTROL */}
      <aside className="w-full lg:w-72 flex flex-col gap-4 flex-shrink-0 z-10">
        <div className="glitch-border bg-glitch-gray p-4 flex-none border-glitch-magenta">
          <h1 className="text-3xl font-bold tracking-tighter text-glitch-cyan text-glitch">
            <span className="text-glitch-magenta">_</span>NEON<span className="text-glitch-magenta">CORE</span>
          </h1>
          <p className="text-[12px] uppercase tracking-[0.3em] text-white opacity-60 font-mono">Kernel_v2.0.4.sh</p>
        </div>

        <div className="glitch-border bg-glitch-gray p-4 flex-grow overflow-hidden flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-glitch-magenta mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> SUB_SYSTEMS
          </h2>
          
          <div className="space-y-2">
             <div className="flex items-center gap-3 p-3 bg-glitch-cyan/5 border border-glitch-cyan/20 group hover:bg-glitch-cyan/10 transition-colors cursor-help">
                <Activity className="w-5 h-5 text-glitch-cyan" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-glitch-cyan truncate">HEURISTIC_ENGINE</p>
                  <p className="text-[10px] text-glitch-cyan/50 uppercase font-mono">STATUS: OPTIMAL</p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-3 bg-glitch-magenta/5 border border-glitch-magenta/20 group hover:bg-glitch-magenta/10 transition-colors cursor-help">
                <Database className="w-5 h-5 text-glitch-magenta" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-glitch-magenta truncate">DATA_VAULT</p>
                  <p className="text-[10px] text-glitch-magenta/50 uppercase font-mono">INTEGRITY: 100%</p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 opacity-40 hover:opacity-100 transition-opacity">
                <ShieldAlert className="w-5 h-5 text-white" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">FIREWALL_X</p>
                  <p className="text-[10px] text-white/50 uppercase font-mono">U_ID: 0x8A22</p>
                </div>
             </div>
          </div>

          <div className="mt-auto pt-4 border-t border-glitch-cyan/20">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-glitch-cyan/50">CPU_THROTTLE</span>
              <span className="text-lg font-mono text-glitch-magenta">0.2%</span>
            </div>
            <div className="w-full bg-glitch-gray h-2 border border-glitch-cyan/20 overflow-hidden">
               <motion.div 
                 animate={{ width: ['20%', '40%', '35%', '60%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "steps(4)" }}
                 className="bg-glitch-cyan h-full" 
               />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area: VISUAL_RENDERER */}
      <main className="flex-grow flex flex-col gap-4 min-w-0 z-10">
        <header className="glitch-border bg-glitch-gray px-6 py-3 flex justify-between items-center border-glitch-cyan">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-glitch-cyan/40">PROTOCOL</span>
              <span className="text-xl font-bold text-glitch-cyan leading-tight uppercase">SNAKE_AI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-glitch-magenta/40">SIGNAL</span>
              <span className="text-xl font-bold text-glitch-magenta leading-tight animate-pulse">LOCKED</span>
            </div>
          </div>

          <div className="hidden sm:flex gap-4">
             <div className="flex items-center gap-2 px-3 py-1 border border-glitch-cyan/20 text-[10px] text-glitch-cyan font-mono">
               <Cpu className="w-3 h-3" /> NODE_04
             </div>
             <div className="px-3 py-1 border border-glitch-magenta/20 bg-glitch-magenta/5 text-[10px] text-glitch-magenta font-mono">
               THREAT_LEVEL: NULL
             </div>
          </div>
        </header>

        <div className="flex-grow glitch-border bg-glitch-black relative overflow-hidden flex items-center justify-center">
          <SnakeGame />
        </div>

        <MusicPlayer />
      </main>

      {/* Footer / META_DATA */}
      <footer className="fixed bottom-2 right-2 flex gap-4 text-[10px] font-mono text-white/20 select-none z-50">
        <span>[AIS_TRANS_2026]</span>
        <span>AUTH_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
      </footer>
    </div>
  );
}

