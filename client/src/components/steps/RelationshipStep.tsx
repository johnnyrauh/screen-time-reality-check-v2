interface RelationshipStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RelationshipStep({ value, onChange, onNext, onBack }: RelationshipStepProps) {
  const options = [
    {
      id: 'tool',
      emoji: '🔧',
      label: 'A tool',
      desc: 'I use it when needed and put it down',
    },
    {
      id: 'habit',
      emoji: '🔄',
      label: 'A habit',
      desc: 'I check it without thinking',
    },
    {
      id: 'crutch',
      emoji: '🩼',
      label: 'A crutch',
      desc: 'I reach for it when bored or anxious',
    },
    {
      id: 'addiction',
      emoji: '⛓️',
      label: 'An addiction',
      desc: "I can't stop even when I want to",
    },
    {
      id: 'lifeline',
      emoji: '🆘',
      label: 'A lifeline',
      desc: 'It connects me to important things',
    },
    {
      id: 'unsure',
      emoji: '🤷',
      label: 'Unsure',
      desc: "Honestly, I don't know",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Be honest with yourself
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        My phone is...
      </p>

      <div className="space-y-3 mb-8">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4
              ${value === option.id
                ? 'border-purple-500 bg-purple-500/20'
                : 'border-gray-700 bg-white/5 hover:border-gray-600'
              }
            `}
          >
            <span className="text-3xl">{option.emoji}</span>
            <div className="flex-1">
              <div className="text-white font-medium">{option.label}</div>
              <div className="text-gray-500 text-sm">{option.desc}</div>
            </div>
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${value === option.id ? 'border-purple-500 bg-purple-500' : 'border-gray-500'}
            `}>
              {value === option.id && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
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
