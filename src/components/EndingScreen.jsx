import PixelIcon from './PixelIcon';

const ENDINGS = {
  SUCCESS: {
    title: 'MISSION COMPLETE!',
    tag: 'GOOD ENDING',
    titleColor: 'text-emerald-400',
    icon: 'earth',
    summary: 'The crew docked with Goliat, survived the meteor storm, and deployed all lunar antennas.',
    stem: 'ENGINEERING & TELECOMS: Lunar relay antennas require fuel budgeting and orbital precision to maintain Earth-Moon communications.',
  },
  CRASH_DOCKING: {
    title: 'ORBITAL CRASH!',
    tag: 'GAME OVER • CH 1',
    titleColor: 'text-red-400',
    icon: 'rocket',
    summary: 'Docking alignment failed, damaging both spacecraft modules in orbit.',
    stem: 'ORBITAL MECHANICS: Spacecraft docking requires matching velocity and sub-meter alignment in microgravity.',
  },
  NO_FUEL: {
    title: 'OUT OF FUEL!',
    tag: 'GAME OVER • CH 3',
    titleColor: 'text-amber-400',
    icon: 'planet',
    summary: 'Propellant dropped to 0% before completing the lunar antenna deployment.',
    stem: 'PROPULSION PHYSICS: Every thruster burn consumes finite delta-v; efficient navigation saves mission fuel.',
  },
  PARTIAL_ANTENNAS: {
    title: 'PARTIAL SIGNAL!',
    tag: 'ALTERNATIVE ENDING',
    titleColor: 'text-purple-400',
    icon: 'antenna',
    summary: 'The crew landed safely, but lost equipment reduced lunar communication coverage.',
    stem: 'SYSTEMS REDUNDANCY: Space missions carry backup hardware to survive harsh lunar conditions.',
  },
};

export default function EndingScreen({ endingType = 'SUCCESS', stats, onRestart }) {
  const data = ENDINGS[endingType] || ENDINGS.SUCCESS;

  return (
    <div className="space-hull min-h-screen text-white flex items-center justify-center p-4 select-none">
      <div className="max-w-xl w-full metal-panel p-5 sm:p-7 space-y-5 text-center">
        <span className="inline-block px-3 py-1 bg-slate-950 border-2 border-slate-700 text-[9px] text-slate-300">
          {data.tag}
        </span>

        <div className="flex justify-center">
          <PixelIcon type={data.icon} className="w-12 h-12" />
        </div>

        <h2 className={`text-lg sm:text-2xl leading-snug ${data.titleColor}`}>
          {data.title}
        </h2>

        <p className="text-[10px] sm:text-xs text-slate-200 leading-relaxed">
          {data.summary}
        </p>

        <div className="bg-slate-950 border-4 border-slate-800 p-4 text-left space-y-2">
          <p className="text-[9px] text-sky-400">NASA STEM DEBRIEF:</p>
          <p className="text-[9px] text-slate-300 leading-relaxed">{data.stem}</p>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-2 bg-slate-950 border-2 border-slate-700 p-3 text-[9px]">
            <div>
              <p className="text-slate-400 mb-1">FUEL</p>
              <p className="text-amber-400">{stats.fuel}%</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">ENGINES</p>
              <p className="text-sky-400">{stats.engines}%</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">ANTENNAS</p>
              <p className="text-emerald-400">{stats.antennas}/3</p>
            </div>
          </div>
        )}

        <button
          onClick={onRestart}
          className="metal-btn w-full py-3.5 text-xs sm:text-sm cursor-pointer"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );
}
