interface TimeWantedStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TimeWantedStep({ value, onChange, onNext, onBack }: TimeWantedStepProps) {
  const options = [
    { id: 'mornings', label: '🌅 Mornings', desc: 'Start the day right' },
    { id: 'evenings', label: '🌙 Evenings', desc: 'Quality wind-down time' },
    { id: 'weekends', label: '📅 Weekends', desc: 'Reclaim your free days' },
    { id: 'lunch', label: '🍽️ Lunch breaks', desc: 'Midday reset' },
    { id: 'commute', label: '🚇 Commute', desc: 'Transit time' },
    { id: 'before-bed', label: '😴 Before bed', desc: 'Better sleep' },
  ];

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        When do you want time back?
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Select all that apply
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => toggle(option.id)}
            className={`
              p-4 rounded-xl border-2 text-left transition-all
              ${value.includes(option.id)
                ? 'border-purple-500 bg-purple-500/20'
                : 'border-gray-700 bg-white/5 hover:border-gray-600'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-medium">{option.label}</span>
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center
                ${value.includes(option.id)
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-500'
                }
              `}>
                {value.includes(option.id) && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
            </div>
            <span className="text-gray-500 text-sm">{option.desc}</span>
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
          disabled={value.length === 0}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
