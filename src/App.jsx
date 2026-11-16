import { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import DialogueBox from './components/DialogueBox';
import EndingScreen from './components/EndingScreen';
import { DIALOGUES } from './data/gameData';

export default function App() {
  const [screen, setScreen] = useState('START');
  const [chapter, setChapter] = useState(1);
  const [unlockedChapter, setUnlockedChapter] = useState(1);
  const [stats, setStats] = useState({ fuel: 100, engines: 100, antennas: 3 });
  const [dialogues, setDialogues] = useState([]);
  const [tradeOffType, setTradeOffType] = useState(null);
  const [endingType, setEndingType] = useState('SUCCESS');
  const [hasUnityBuild, setHasUnityBuild] = useState(false);

  useEffect(() => {
    fetch('/unity/index.html')
      .then((res) => res.text())
      .then((html) => setHasUnityBuild(html.toLowerCase().includes('unity')))
      .catch(() => setHasUnityBuild(false));
  }, []);

  const sendToUnity = useCallback((method, param = '') => {
    const iframe = document.getElementById('unity-frame');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ source: 'REACT_UI', method, param }, '*');
      if (iframe.contentWindow.unityInstance) {
        iframe.contentWindow.unityInstance.SendMessage('GameManager', method, String(param));
      }
    }
  }, []);

  const handleSelectChapter = (ch) => {
    setChapter(ch);
    setStats({ fuel: 100, engines: 100, antennas: 3 });
    setTradeOffType(null);
    setScreen('PLAYING');
    setDialogues(DIALOGUES[`CH${ch}_INTRO`] || []);
  };

  const handleCompleteChapter = useCallback(() => {
    const next = chapter + 1;
    if (next <= 3) {
      setUnlockedChapter((prev) => Math.max(prev, next));
      setChapter(next);
      setDialogues(DIALOGUES[`CH${next}_INTRO`] || []);
      sendToUnity('LoadChapter', next);
    } else {
      setEndingType(stats.antennas === 3 ? 'SUCCESS' : 'PARTIAL_ANTENNAS');
      setScreen('ENDING');
    }
  }, [chapter, stats.antennas, sendToUnity]);

  const handleTradeOffChoice = (choice) => {
    setTradeOffType(null);
    if (choice === 'HEATERS') {
      setStats((s) => ({ ...s, fuel: 45, engines: Math.max(40, s.engines - 20), antennas: 3 }));
      setDialogues(DIALOGUES.POWER_PUZZLE);
    } else if (choice === 'SENSORS') {
      setStats((s) => ({ ...s, fuel: 55, engines: 100, antennas: 2 }));
      setDialogues(DIALOGUES.POWER_PUZZLE);
    } else if (choice === 'ALL_SAMPLES') {
      setStats((s) => ({ ...s, fuel: 15, antennas: 3 }));
      setDialogues(DIALOGUES.CH3_COMPLETE);
    } else if (choice === 'DIGITAL_ONLY') {
      setStats((s) => ({ ...s, fuel: 75, antennas: 2 }));
      setDialogues(DIALOGUES.CH3_COMPLETE);
    }
  };

  useEffect(() => {
    const onMessage = (event) => {
      const msg = event.data;
      if (!msg || !msg.type) return;
      if (msg.type === 'OPEN_DIALOGUE') setDialogues(DIALOGUES[msg.id] || []);
      if (msg.type === 'OPEN_TRADEOFF') setTradeOffType(msg.id || 'CH2_POWER');
      if (msg.type === 'CRASH') {
        setEndingType('CRASH_DOCKING');
        setScreen('ENDING');
      }
      if (msg.type === 'CHAPTER_DONE') handleCompleteChapter();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [handleCompleteChapter]);

  if (screen === 'START') {
    return <StartScreen unlockedChapter={unlockedChapter} onSelectChapter={handleSelectChapter} />;
  }

  if (screen === 'ENDING') {
    return <EndingScreen endingType={endingType} stats={stats} onRestart={() => setScreen('START')} />;
  }
  return (
    <div className="space-hull min-h-screen text-white flex flex-col select-none">
      <header className="bg-slate-950 border-b-4 border-slate-700 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-[9px] sm:text-xs">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('START')} className="metal-btn px-2.5 py-1 text-[9px] cursor-pointer">
            MENU
          </button>
          <span className="text-sky-400">CH {chapter}/3</span>
        </div>

        <div className="flex items-center gap-4">
          <span>ENERGY:<strong className="text-amber-400">{stats.fuel}%</strong></span>
          <span>SYS:<strong className="text-sky-400">{stats.engines}%</strong></span>
          <span>DATA:<strong className="text-emerald-400">{stats.antennas}/3</strong></span>
        </div>
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
        {hasUnityBuild ? (
          <iframe
            id="unity-frame"
            src="/unity/index.html"
            title="Space Frogg Unity World"
            className="w-full h-full flex-1 border-0"
          />
        ) : (
          <div className="max-w-xl w-full metal-panel p-6 m-4 text-center space-y-4">
            <p className="text-xs text-sky-400">CHAPTER {chapter}/3 • DIALOGUE & TRADE-OFF TESTER</p>
            <p className="text-[8px] text-slate-400 leading-relaxed">
              Test every scene of Chapter {chapter} below while waiting for Unity WebGL:
            </p>

            {chapter === 1 && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setDialogues(DIALOGUES.CH1_INTRO)} className="metal-btn p-2.5 text-[8px] cursor-pointer">1. INTRO + BRIEFINGS</button>
                <button onClick={() => setDialogues(DIALOGUES.DOCKING_CONSOLE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">2. DOCKING PUZZLE</button>
                <button onClick={() => setDialogues(DIALOGUES.HATCH_LOCKED)} className="metal-btn p-2.5 text-[8px] cursor-pointer">3. HATCH PUZZLE</button>
                <button onClick={() => setDialogues(DIALOGUES.CH1_COMPLETE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">4. CREW REUNION</button>
                <button onClick={() => { setEndingType('CRASH_DOCKING'); setScreen('ENDING'); }} className="metal-btn p-2.5 text-[8px] text-red-300 cursor-pointer">TEST CRASH ENDING</button>
                <button onClick={handleCompleteChapter} className="metal-btn p-2.5 text-[8px] text-emerald-300 cursor-pointer">NEXT CHAPTER ▶</button>
              </div>
            )}

            {chapter === 2 && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setDialogues(DIALOGUES.CH2_INTRO)} className="metal-btn p-2.5 text-[8px] cursor-pointer">1. TRANSIT INTRO</button>
                <button onClick={() => setDialogues(DIALOGUES.METEOR_CONSOLE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">2. METEOR PUZZLE</button>
                <button onClick={() => setTradeOffType('CH2_POWER')} className="metal-btn p-2.5 text-[8px] text-amber-300 cursor-pointer">3. POWER TRADE-OFF</button>
                <button onClick={() => setDialogues(DIALOGUES.CH2_COMPLETE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">4. LUNAR ARRIVAL</button>
                <button onClick={() => { setEndingType('NO_FUEL'); setScreen('ENDING'); }} className="metal-btn p-2.5 text-[8px] text-red-300 cursor-pointer">TEST NO-POWER END</button>
                <button onClick={handleCompleteChapter} className="metal-btn p-2.5 text-[8px] text-emerald-300 cursor-pointer">NEXT CHAPTER ▶</button>
              </div>
            )}

            {chapter === 3 && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setDialogues(DIALOGUES.CH3_INTRO)} className="metal-btn p-2.5 text-[8px] cursor-pointer">1. MOON TOUCHDOWN</button>
                <button onClick={() => setDialogues(DIALOGUES.LUNAR_SURVEY)} className="metal-btn p-2.5 text-[8px] cursor-pointer">2. LUNAR ZONES SCAN</button>
                <button onClick={() => setDialogues(DIALOGUES.SAMPLE_COLLECTION)} className="metal-btn p-2.5 text-[8px] cursor-pointer">3. SOIL SAMPLES</button>
                <button onClick={() => setTradeOffType('CH3_ASCENT')} className="metal-btn p-2.5 text-[8px] text-amber-300 cursor-pointer">4. ASCENT TRADE-OFF</button>
                <button onClick={() => setDialogues(DIALOGUES.CH3_COMPLETE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">5. RETURN TO GUATEMALA</button>
                <button onClick={handleCompleteChapter} className="metal-btn p-2.5 text-[8px] text-emerald-300 cursor-pointer">FINAL REPORT ▶</button>
              </div>
            )}
          </div>
        )}

        {tradeOffType === 'CH2_POWER' && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="max-w-xl w-full metal-panel p-5 sm:p-6 space-y-4 border-4 border-amber-400 text-left">
              <p className="text-[10px] sm:text-xs text-amber-300 font-bold">
                ENGINEERING TRADE-OFF: POWER BUDGET CRISIS
              </p>
              <p className="text-[8px] sm:text-[9px] text-slate-200 leading-relaxed">
                Forcing the hatch in Ch. 1 and dodging meteoroids overloaded Goliat&apos;s solar bus! Choose which subsystem to sacrifice before rebooting:
              </p>

              <div className="space-y-3 pt-1">
                <button onClick={() => handleTradeOffChoice('HEATERS')} className="w-full text-left p-3 bg-slate-950 hover:bg-slate-900 border-2 border-sky-400 cursor-pointer space-y-1">
                  <p className="text-[9px] text-sky-300 font-bold">OPTION A: DIM THERMAL HEATERS</p>
                  <p className="text-[8px] text-emerald-400">+ Keeps 3/3 Lunar Sensors at 100% power for Ch. 3</p>
                  <p className="text-[8px] text-red-400">- Cabin cools down (SYS drops -20%)</p>
                </button>

                <button onClick={() => handleTradeOffChoice('SENSORS')} className="w-full text-left p-3 bg-slate-950 hover:bg-slate-900 border-2 border-purple-400 cursor-pointer space-y-1">
                  <p className="text-[9px] text-purple-300 font-bold">OPTION B: THROTTLE AUXILIARY SENSORS</p>
                  <p className="text-[8px] text-emerald-400">+ Keeps cabin warm & Systems at 100%</p>
                  <p className="text-[8px] text-red-400">- Reduces Lunar Data capacity to 2/3 in Ch. 3</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {tradeOffType === 'CH3_ASCENT' && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="max-w-xl w-full metal-panel p-5 sm:p-6 space-y-4 border-4 border-amber-400 text-left">
              <p className="text-[10px] sm:text-xs text-amber-300 font-bold">
                ENGINEERING TRADE-OFF: LUNAR ASCENT MASS vs. FUEL
              </p>
              <p className="text-[8px] sm:text-[9px] text-slate-200 leading-relaxed">
                Carrying heavy lunar soil samples back to Earth requires extra rocket thrust (Delta-V). What is your call?
              </p>

              <div className="space-y-3 pt-1">
                <button onClick={() => handleTradeOffChoice('ALL_SAMPLES')} className="w-full text-left p-3 bg-slate-950 hover:bg-slate-900 border-2 border-sky-400 cursor-pointer space-y-1">
                  <p className="text-[9px] text-sky-300 font-bold">OPTION A: CARRY ALL SOIL SAMPLES</p>
                  <p className="text-[8px] text-emerald-400">+ Delivers 100% full data & samples to Guatemala</p>
                  <p className="text-[8px] text-red-400">- Uses heavy Delta-V (ENERGY drops to 15%)</p>
                </button>

                <button onClick={() => handleTradeOffChoice('DIGITAL_ONLY')} className="w-full text-left p-3 bg-slate-950 hover:bg-slate-900 border-2 border-purple-400 cursor-pointer space-y-1">
                  <p className="text-[9px] text-purple-300 font-bold">OPTION B: SEND DIGITAL TELEMETRY ONLY</p>
                  <p className="text-[8px] text-emerald-400">+ Safe return fuel margin (ENERGY stays at 75%)</p>
                  <p className="text-[8px] text-red-400">- Leaves physical samples behind (DATA 2/3)</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <DialogueBox
        dialogues={dialogues}
        onClose={() => {
          setDialogues([]);
          sendToUnity('ResumePlayer');
        }}
      />
    </div>
  );
}
