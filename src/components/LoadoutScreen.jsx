import { useState } from 'react';

const MODULES = [
  {
    id: 'shield',
    name: 'WHIPPLE METEOR SHIELD',
    mass: 45,
    power: -10,
    desc: 'Protects spacecraft hull from micrometeoroids in Ch. 2, but adds extra mass.',
  },
  {
    id: 'battery',
    name: 'LI-ION HIGH-DENSITY BATTERY',
    mass: 35,
    power: 40,
    desc: 'Increases safe power margins for systems & maneuvers, but uses payload weight.',
  },
  {
    id: 'antenna',
    name: 'KA-BAND HIGH-GAIN ANTENNA',
    mass: 55,
    power: -35,
    desc: 'Maximizes lunar data rate in Ch. 3, but is heavy and drains high power.',
  },
];

export default function LoadoutScreen({ onLaunch, onBack }) {
  const [selected, setSelected] = useState([]);
  const [failedError, setFailedError] = useState(false);

  const toggleModule = (id) => {
    setFailedError(false);
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const totalMass = selected.reduce((sum, id) => sum + (MODULES.find((m) => m.id === id)?.mass || 0), 0);
  const totalPower = 100 + selected.reduce((sum, id) => sum + (MODULES.find((m) => m.id === id)?.power || 0), 0);

  const handleLaunchClick = () => {
    if (totalPower < 60 || totalMass > 100) {
      setFailedError(true);
      return;
    }
    onLaunch({
      hasShield: selected.includes('shield'),
      hasBattery: selected.includes('battery'),
      hasAntenna: selected.includes('antenna'),
      mass: totalMass,
      power: totalPower,
    });
  };

  return (
    <div className="space-hull min-h-screen text-white flex items-center justify-center p-4 select-none">
      <div className="max-w-2xl w-full metal-panel p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between border-b-4 border-slate-700 pb-3">
          <div>
            <p className="text-[8px] text-sky-400">NASA MISSION DESIGN LAB (MDL)</p>
            <h2 className="text-xs sm:text-sm text-white mt-1">MASTER EQUIPMENT LIST (MEL)</h2>
          </div>
          <button onClick={onBack} className="metal-btn px-3 py-1 text-[9px] cursor-pointer">
            BACK
          </button>
        </div>

        <p className="text-[9px] text-slate-300 leading-relaxed">
          Select <strong className="text-amber-300">2 of 3 modules</strong> before launch. Keep Mass &le; <span className="text-emerald-400">100 kg</span> and Power &ge; <span className="text-emerald-400">60 W</span>!
        </p>

        {/* Medidores de Masa y Energía */}
        <div className="grid grid-cols-2 gap-3 bg-slate-950 border-4 border-slate-800 p-3 text-[10px]">
          <div>
            <span className="text-slate-400">PAYLOAD MASS: </span>
            <strong className={totalMass > 100 ? 'text-red-400' : 'text-emerald-400'}>{totalMass}/100 kg</strong>
          </div>
          <div>
            <span className="text-slate-400">POWER MARGIN: </span>
            <strong className={totalPower < 60 ? 'text-red-400' : 'text-sky-400'}>{totalPower} W</strong>
          </div>
        </div>

        {/* Alerta Educativa si eligen la peor opción */}
        {failedError && (
          <div className="bg-red-950/90 border-4 border-red-500 p-4 space-y-2.5 text-left">
            <p className="text-[10px] text-red-400 font-bold">CML 4 CHECKLIST FAILED: POWER VIOLATION!</p>
            <p className="text-[8px] sm:text-[9px] text-slate-200 leading-relaxed">
              Your Master Equipment List (MEL) dropped below safe power margins ({totalPower}W &lt; 60W required). Heavier instruments demand more power! Re-balance your Trade Tree before launch.
            </p>
            <div className="bg-slate-950 border-l-4 border-amber-400 p-2.5 space-y-1">
              <p className="text-[8px] text-amber-300">SPACE WORDS FOR KIDS:</p>
              <p className="text-[8px] text-slate-300 leading-relaxed">
                <strong>Master Equipment List (MEL):</strong> Official list of every part on the ship, its weight, and power use. • <strong>Safe Power Margins:</strong> Extra backup battery saved so the ship never shuts down!
              </p>
            </div>
          </div>
        )}

        {/* Opciones de Trade-Off */}
        <div className="space-y-3">
          {MODULES.map((mod) => {
            const active = selected.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => toggleModule(mod.id)}
                className={`w-full text-left p-3.5 border-4 transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-800 border-emerald-400 shadow-[4px_4px_0px_#064e3b]'
                    : 'bg-slate-950 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-[9px] sm:text-[10px] text-white">
                    {active ? '☑ ' : '☐ '} {mod.name}
                  </span>
                  <div className="flex gap-3 text-[8px]">
                    <span className="text-amber-300">+{mod.mass} kg</span>
                    <span className={mod.power >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {mod.power >= 0 ? `+${mod.power} W` : `${mod.power} W`}
                    </span>
                  </div>
                </div>
                <p className="text-[8px] text-slate-400 leading-relaxed">{mod.desc}</p>
              </button>
            );
          })}
        </div>

        <button
          disabled={selected.length !== 2}
          onClick={handleLaunchClick}
          className={`w-full py-3.5 text-xs sm:text-sm ${
            selected.length === 2 ? 'metal-btn cursor-pointer' : 'bg-slate-900 border-4 border-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          {selected.length === 2 ? 'APPROVE MEL & LAUNCH ▶' : `SELECT ${2 - selected.length} MORE MODULE(S)`}
        </button>
      </div>
    </div>
  );
}
