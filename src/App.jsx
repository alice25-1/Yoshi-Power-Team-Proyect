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
  const [endingType, setEndingType] = useState('SUCCESS');
  const [hasUnityBuild, setHasUnityBuild] = useState(false);

  // Detecta automáticamente cuando tus compañeros metan Unity en public/unity/index.html
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

  // Puente listo para recibir señales de Unity (diálogos, daños, choques o fin de capítulo)
  useEffect(() => {
    const onMessage = (event) => {
      const msg = event.data;
      if (!msg || !msg.type) return;
      if (msg.type === 'OPEN_DIALOGUE') setDialogues(DIALOGUES[msg.id] || []);
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
          <span>ANT:<strong className="text-emerald-400">{stats.antennas}/3</strong></span>
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
          <div className="max-w-xl w-full metal-panel p-6 m-4 text-center space-y-5">
            <p className="text-xs text-sky-400">CHAPTER {chapter}/3 • READY FOR UNITY</p>
            <p className="text-[8px] text-slate-400 leading-relaxed">
              Test Chapter 1 scenes & NASA popups below while waiting for Unity WebGL:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setDialogues(DIALOGUES.CH1_INTRO)} className="metal-btn p-2.5 text-[8px] cursor-pointer">
                1. INTRO + POPUPS
              </button>
              <button onClick={() => setDialogues(DIALOGUES.DOCKING_CONSOLE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">
                2. DOCKING CONSOLE
              </button>
              <button onClick={() => setDialogues(DIALOGUES.HATCH_LOCKED)} className="metal-btn p-2.5 text-[8px] cursor-pointer">
                3. HATCH ANOMALY
              </button>
              <button onClick={() => setDialogues(DIALOGUES.CH1_COMPLETE)} className="metal-btn p-2.5 text-[8px] cursor-pointer">
                4. CREW REUNION
              </button>
              <button onClick={() => { setEndingType('CRASH_DOCKING'); setScreen('ENDING'); }} className="metal-btn p-2.5 text-[8px] text-red-300 cursor-pointer">
                TEST DOCKING CRASH
              </button>
              <button onClick={handleCompleteChapter} className="metal-btn p-2.5 text-[8px] text-emerald-300 cursor-pointer">
                FINISH CH 1 ▶
              </button>
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
