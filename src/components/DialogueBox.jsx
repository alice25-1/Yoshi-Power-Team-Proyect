import { useState, useEffect } from 'react';
import FrogSprite from './FrogSprite';

const FROG_COLORS = {
  Tongue: 'text-purple-400 border-purple-500',
  Baudinii: 'text-lime-400 border-lime-600',
  Froggy: 'text-emerald-400 border-emerald-500',
  Frogatha: 'text-orange-400 border-orange-500',
};

const FROG_IMAGES = {
  Tongue: '/assets/tongue.png',
  Baudinii: '/assets/baudinii.png',
  Froggy: '/assets/froggy.png',
  Frogatha: '/assets/frogatha.png',
};

export default function DialogueBox({ dialogues = [], onClose }) {
  const [index, setIndex] = useState(0);
  const [techDismissed, setTechDismissed] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  useEffect(() => {
    setIndex(0);
    setTechDismissed(false);
    setShowGlossary(false);
  }, [dialogues]);

  if (!dialogues || dialogues.length === 0) return null;

  const current = dialogues[index];
  const colorStyle = FROG_COLORS[current.character] || 'text-sky-400 border-sky-500';
  const avatar = FROG_IMAGES[current.character];
  const isLast = index === dialogues.length - 1;
  const showPopup = Boolean(current.techDetail) && !techDismissed;

  const handleNext = () => {
    setTechDismissed(false);
    setShowGlossary(false);
    if (isLast) onClose?.();
    else setIndex((prev) => prev + 1);
  };

  return (
    <>
      {/* Ventana Emergente Obligatoria de Concepto Científico */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 select-none">
          <div className="max-w-lg w-full metal-panel p-5 sm:p-6 text-left space-y-4 border-4 border-sky-400">
            <div className="border-b-4 border-slate-700 pb-2.5">
              <span className="text-[9px] sm:text-[10px] text-sky-400 font-bold">
                MISSION BRIEFING: {current.techTitle}
              </span>
            </div>

            <p className="text-[9px] sm:text-[10px] text-slate-100 leading-relaxed">
              {current.techDetail}
            </p>

            {/* Botón opcional para desplegar el Glosario para Niños */}
            {current.kidWords && (
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowGlossary((prev) => !prev)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border-2 border-amber-400 text-amber-300 text-[8px] sm:text-[9px] cursor-pointer"
                >
                  {showGlossary ? 'HIDE SPACE WORDS ▲' : '? SPACE WORDS FOR KIDS ▼'}
                </button>

                {showGlossary && (
                  <div className="bg-slate-950 border-l-4 border-amber-400 p-3">
                    <p className="text-[8px] sm:text-[9px] text-slate-200 leading-relaxed">
                      {current.kidWords}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowGlossary(false);
                  setTechDismissed(true);
                }}
                className="metal-btn px-6 py-2.5 text-[10px] sm:text-xs text-emerald-300 cursor-pointer"
              >
                GOT IT! ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Caja Inferior de Diálogo de las Ranas */}
      {!showPopup && (
        <div className="fixed bottom-4 inset-x-4 z-40 flex justify-center select-none">
          <div className="max-w-3xl w-full metal-panel p-4 sm:p-5 text-white">
            <div className="flex items-start gap-4">
              {avatar && (
                <div className={`bg-slate-950 border-4 p-1 shrink-0 ${colorStyle}`}>
                  <FrogSprite src={avatar} alt={current.character} className="w-14 h-14 sm:w-16 sm:h-16" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between border-b-2 border-slate-700 pb-2 mb-3">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase ${colorStyle.split(' ')}`}>
                    {current.character}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {index + 1}/{dialogues.length}
                  </span>
                </div>

                <p className="text-[10px] sm:text-xs text-slate-100 leading-loose min-h-[3.5rem]">
                  {current.text}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={handleNext} className="metal-btn px-5 py-2.5 text-[10px] sm:text-xs cursor-pointer">
                {isLast ? 'DONE ▶' : 'NEXT ▶'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
