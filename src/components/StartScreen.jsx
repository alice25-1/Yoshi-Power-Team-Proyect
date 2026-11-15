import { useState, useEffect } from 'react';
import PixelIcon from './PixelIcon';
import FrogSprite from './FrogSprite';

const CHAPTERS = [
  { id: 1, title: 'CH 1: ORBITAL DOCKING', sub: 'Engineering • Goliat Rendezvous', icon: 'rocket' },
  { id: 2, title: 'CH 2: METEOR STORM', sub: 'Space Science • Lunar Transit', icon: 'planet' },
  { id: 3, title: 'CH 3: LUNAR ANTENNAS', sub: 'Telecoms • Deep Space Comms', icon: 'antenna' },
  { id: 4, title: 'CH 4: EARTH LINK', sub: 'Earth Science • Protect Our Planet', icon: 'earth' },
];

const FIELDS = [
  { id: 'eng', label: 'ENGINEERING', icon: 'rocket', def: 'Designing and building rockets, machines, and systems to solve problems.', style: { top: '24px', left: '24px' }, tip: 'top-full left-0 mt-2' },
  { id: 'sci', label: 'SPACE SCIENCE', icon: 'planet', def: 'Studying planets, stars, and gravity to understand our universe.', style: { top: '24px', right: '24px' }, tip: 'top-full right-0 mt-2' },
  { id: 'tel', label: 'TELECOMS', icon: 'antenna', def: 'Sending signals and data across space to keep crews connected.', style: { bottom: '24px', left: '24px' }, tip: 'bottom-full left-0 mb-2' },
  { id: 'ear', label: 'EARTH SCIENCE', icon: 'earth', def: 'Using space tech to monitor climate and protect life on Earth.', style: { bottom: '24px', right: '24px' }, tip: 'bottom-full right-0 mb-2' },
];

export default function StartScreen({ unlockedChapter = 1, onSelectChapter }) {
  const [view, setView] = useState('TITLE');
  const [active, setActive] = useState(null);
  const [hop, setHop] = useState(false);

  const toggle = (id) => setActive((prev) => (prev === id ? null : id));

  useEffect(() => {
    const timer = setInterval(() => setHop((h) => !h), 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={() => setActive(null)}
      className="space-hull relative min-h-screen text-white flex flex-col items-center justify-center p-6 overflow-hidden select-none"
    >
      {/* Estrellas y pedazos de metal espacial */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[14%] left-[25%] w-1.5 h-1.5 bg-white" />
        <div className="absolute top-[18%] right-[26%] w-1.5 h-1.5 bg-sky-300" />
        <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 bg-white" />
        <div className="absolute top-[48%] right-[10%] w-1.5 h-1.5 bg-amber-200" />
        <div className="absolute bottom-[20%] left-[22%] w-1.5 h-1.5 bg-white" />
        <div className="absolute bottom-[18%] right-[24%] w-1.5 h-1.5 bg-cyan-300" />

        <div className="absolute top-[30%] left-[12%] w-6 h-4 bg-slate-600 border-2 border-slate-950 shadow-[inset_2px_2px_0px_#cbd5e1]" />
        <div className="absolute top-[14%] left-[46%] w-5 h-3 bg-slate-700 border-2 border-slate-950 shadow-[inset_2px_2px_0px_#94a3b8]" />
        <div className="absolute top-[32%] right-[12%] w-7 h-4 bg-slate-600 border-2 border-slate-950 shadow-[inset_2px_2px_0px_#cbd5e1]" />
        <div className="absolute bottom-[28%] left-[13%] w-5 h-5 bg-slate-700 border-2 border-slate-950 shadow-[inset_2px_2px_0px_#94a3b8]" />
        <div className="absolute bottom-[26%] right-[12%] w-6 h-3 bg-slate-600 border-2 border-slate-950 shadow-[inset_2px_2px_0px_#cbd5e1]" />
      </div>

      {/* 4 Placas STEM fijas en las 4 esquinas */}
      {FIELDS.map((f) => (
        <div
          key={f.id}
          style={{ position: 'absolute', ...f.style }}
          onMouseEnter={() => setActive(f.id)}
          onMouseLeave={() => setActive(null)}
          onClick={(e) => { e.stopPropagation(); toggle(f.id); }}
          className="hidden sm:flex flex-col items-center gap-2 z-30 metal-btn px-3.5 py-2.5 cursor-pointer"
        >
          <PixelIcon type={f.icon} className="w-8 h-8" />
          <span className="text-[8px]">{f.label}</span>

          {active === f.id && (
            <div className={`absolute ${f.tip} w-60 metal-panel p-3 text-left text-white z-40`}>
              <p className="text-[9px] text-sky-400 mb-1.5">{f.label}</p>
              <p className="text-[8px] text-slate-200 leading-relaxed">{f.def}</p>
            </div>
          )}
        </div>
      ))}

      {/* Tongue (Morado) */}
      <div style={{ transform: hop ? 'translateY(-10px)' : 'translateY(0px)' }} className="flex flex-col items-center absolute top-12 left-4 sm:top-20 sm:left-[20%]">
        <FrogSprite src="/assets/tongue.png" alt="Tongue" className="w-20 h-20 sm:w-32 sm:h-32" />
        <span className="metal-panel px-2 py-1 text-[8px] sm:text-[9px] text-purple-400 mt-1">
          TONGUE
        </span>
      </div>

      {/* Baudinii (Verde café) */}
      <div style={{ transform: !hop ? 'translateY(-10px)' : 'translateY(0px)' }} className="flex flex-col items-center absolute top-12 right-4 sm:top-20 sm:right-[20%]">
        <FrogSprite src="/assets/baudinii.png" alt="Baudinii" className="w-20 h-20 sm:w-32 sm:h-32" />
        <span className="metal-panel px-2 py-1 text-[8px] sm:text-[9px] text-lime-400 mt-1">
          BAUDINII
        </span>
      </div>

      {/* Froggy (Verde) */}
      <div style={{ transform: !hop ? 'translateY(-10px)' : 'translateY(0px)' }} className="flex flex-col items-center absolute bottom-10 left-4 sm:bottom-16 sm:left-[22%]">
        <FrogSprite src="/assets/froggy.png" alt="Froggy" className="w-20 h-20 sm:w-32 sm:h-32" />
        <span className="metal-panel px-2 py-1 text-[8px] sm:text-[9px] text-emerald-400 mt-1">
          FROGGY
        </span>
      </div>

      {/* Frogatha (Naranja) */}
      <div style={{ transform: hop ? 'translateY(-10px)' : 'translateY(0px)' }} className="flex flex-col items-center absolute bottom-10 right-4 sm:bottom-16 sm:right-[22%]">
        <FrogSprite src="/assets/frogatha.png" alt="Frogatha" className="w-20 h-20 sm:w-32 sm:h-32" />
        <span className="metal-panel px-2 py-1 text-[8px] sm:text-[9px] text-orange-400 mt-1">
          FROGATHA
        </span>
      </div>

      {view === 'TITLE' ? (
        <div className="z-20 flex flex-col items-center text-center max-w-xl space-y-7">
          <div className="metal-panel px-4 py-1.5 text-[9px] sm:text-[10px] text-emerald-400">
            YOSHI POWER
          </div>

          <h1
            className="text-3xl sm:text-5xl leading-snug text-white"
            style={{ textShadow: '4px 4px 0px #334155, -3px -3px 0px #000000' }}
          >
            SPACE<br />FROGG
          </h1>

          <div className="flex sm:hidden flex-col items-center gap-2">
            <div className="flex gap-2">
              {FIELDS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggle(f.id); }}
                  className="metal-btn p-2"
                >
                  <PixelIcon type={f.icon} className="w-6 h-6" />
                </button>
              ))}
            </div>
            {active ? (
              <div onClick={(e) => e.stopPropagation()} className="w-68 metal-panel p-2.5 text-left">
                <p className="text-[8px] text-sky-400 mb-1">{FIELDS.find((x) => x.id === active)?.label}</p>
                <p className="text-[8px] text-slate-200 leading-relaxed">{FIELDS.find((x) => x.id === active)?.def}</p>
              </div>
            ) : (
              <span className="text-[8px] text-slate-400">TAP METAL PLATES FOR STEM INFO</span>
            )}
          </div>

          <button
            onClick={() => setView('CHAPTERS')}
            className="metal-btn px-12 py-4 text-lg sm:text-2xl tracking-widest cursor-pointer"
          >
            PLAY
          </button>
        </div>
      ) : (
        <div className="z-20 w-full max-w-lg metal-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b-4 border-slate-700 pb-3">
            <h2 className="text-xs text-sky-400">SELECT CHAPTER</h2>
            <button onClick={() => setView('TITLE')} className="metal-btn px-3 py-1 text-[9px] cursor-pointer">
              BACK
            </button>
          </div>

          <div className="space-y-3">
            {CHAPTERS.map((ch) => {
              const ok = ch.id <= unlockedChapter;
              return (
                <button
                  key={ch.id}
                  disabled={!ok}
                  onClick={() => ok && onSelectChapter(ch.id)}
                  className={`w-full text-left p-3 flex items-center justify-between gap-2 ${
                    ok ? 'metal-btn cursor-pointer' : 'bg-slate-950 border-4 border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PixelIcon type={ok ? ch.icon : 'lock'} className="w-7 h-7 shrink-0" />
                    <div>
                      <div className="text-[10px] sm:text-xs">{ch.title}</div>
                      <p className={`text-[8px] mt-1 ${ok ? 'text-slate-200' : 'text-slate-600'}`}>
                        {ok ? ch.sub : 'COMPLETE PREVIOUS CHAPTER'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] text-emerald-300 shrink-0">{ok ? 'PLAY' : 'LOCKED'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
