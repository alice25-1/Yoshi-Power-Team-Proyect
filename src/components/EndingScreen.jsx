import PixelIcon from './PixelIcon';

const ENDINGS = {
  SUCCESS: {
    title: 'MISSION ACCOMPLISHED!',
    tag: 'POST-MORTEM • FULL SUCCESS',
    titleColor: 'text-emerald-400',
    icon: 'earth',
    summary: 'The crew docked with Goliat, balanced power through the meteor storm, gathered all lunar site data, and returned safely to share their findings with young scientists in Guatemala!',
    stem: 'SYSTEMS ENGINEERING & USER SEGMENT: By balancing Attitude Control, Delta-V margins, and MDL Trade Studies across all 4 Mission Segments, your crew proved that Access to Space for All empowers future lunar missions.',
  },
  CRASH_DOCKING: {
    title: 'ORBITAL COLLISION!',
    tag: 'POST-MORTEM • CH 1 FAILURE',
    titleColor: 'text-red-400',
    icon: 'rocket',
    summary: 'Attitude Control lost alignment during final approach in Low Earth Orbit (7.66 km/s), damaging both spacecraft modules.',
    stem: 'FLIGHT DYNAMICS LESSON: In microgravity there is no air friction to stop a drifting ship. Small, early thruster pulses are required to counter inertia and achieve sub-meter docking accuracy.',
  },
  NO_FUEL: {
    title: 'POWER & DELTA-V DEPLETED!',
    tag: 'POST-MORTEM • CH 2 FAILURE',
    titleColor: 'text-amber-400',
    icon: 'planet',
    summary: 'Sharp evasive maneuvers drained battery and propellant reserves below critical survival margins during lunar transit.',
    stem: 'POWER & PROPULSION LESSON: Spacecraft carry limited mass and energy. Engineers must balance aggressive maneuvers with solar array recharge margins to keep thermal and guidance systems alive.',
  },
  PARTIAL_ANTENNAS: {
    title: 'PARTIAL DATA RETURNED!',
    tag: 'POST-MORTEM • ALTERNATIVE ENDING',
    titleColor: 'text-purple-400',
    icon: 'antenna',
    summary: 'The crew returned safely to Guatemala with valuable lunar measurements, but power trade-offs reduced collected data coverage to 2/3 sites.',
    stem: 'ENGINEERING TRADE-OFFS LESSON: You made a smart survival choice to keep Goliat safe and warm, though sacrificing sensor power meant a follow-up precursor mission will be needed to survey the third site.',
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
          <p className="text-[9px] text-sky-400">SPACE SYSTEMS POST-MORTEM:</p>
          <p className="text-[9px] text-slate-300 leading-relaxed">{data.stem}</p>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-2 bg-slate-950 border-2 border-slate-700 p-3 text-[9px]">
            <div>
              <p className="text-slate-400 mb-1">ENERGY</p>
              <p className="text-amber-400">{stats.fuel}%</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">SYSTEMS</p>
              <p className="text-sky-400">{stats.engines}%</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">DATA</p>
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
