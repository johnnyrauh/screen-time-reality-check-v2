interface DreamStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DreamStep({ value, onChange, onNext, onBack }: DreamStepProps) {
  const suggestions = [
    'Learn a new language',
    'Start a side business',
    'Read more books',
    'Exercise regularly',
    'Spend time with family',
    'Learn an instrument',
    'Write a novel',
    'Build something meaningful',
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        The Dream Question
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        If you magically had <span className="text-purple-400 font-bold">10 extra hours</span> this week,
        what would you actually do with them?
      </p>

      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Be specific. Dream big. No wrong answers..."
        rows={4}
        className="w-full bg-white/10 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
      />

      {!value && (
        <div className="mb-6">
          <div className="text-gray-500 text-sm mb-3">Need inspiration?</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => onChange(suggestion)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-gray-700 rounded-full text-sm text-gray-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 text-gray-400 hover:text-white border border-gray-600 rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
