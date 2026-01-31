import { AppUsage } from '../../types';

interface RegretStepProps {
  apps: AppUsage[];
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RegretStep({ apps, value, onChange, onNext, onBack }: RegretStepProps) {
  // Add "None" option
  const options = [
    ...apps.map(app => app.name),
    'All of them equally',
    'None - I regret nothing',
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        The Regret Question
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Which app do you <span className="text-red-400 font-bold">regret</span> spending time on the most?
      </p>

      <div className="space-y-3 mb-8">
        {options.map(app => (
          <button
            key={app}
            onClick={() => onChange(app)}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3
              ${value === app
                ? 'border-purple-500 bg-purple-500/20 text-white'
                : 'border-gray-700 bg-white/5 text-gray-300 hover:border-gray-600'
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${value === app ? 'border-purple-500 bg-purple-500' : 'border-gray-500'}
            `}>
              {value === app && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span>{app}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 text-gray-400 hover:text-white border border-gray-600 rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
