interface SeriousnessStepProps {
  seriousness: number;
  successDefinition: string;
  onSeriousnessChange: (value: number) => void;
  onSuccessChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function SeriousnessStep({
  seriousness,
  successDefinition,
  onSeriousnessChange,
  onSuccessChange,
  onSubmit,
  onBack,
}: SeriousnessStepProps) {
  const getSeriousnessLabel = (value: number) => {
    if (value <= 2) return 'Just curious';
    if (value <= 4) return 'Thinking about it';
    if (value <= 6) return 'Ready to try';
    if (value <= 8) return 'Committed';
    return 'Dead serious';
  };

  const getSeriousnessEmoji = (value: number) => {
    if (value <= 2) return '🤔';
    if (value <= 4) return '💭';
    if (value <= 6) return '💪';
    if (value <= 8) return '🔥';
    return '⚡';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Final question
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        How serious are you about making a change?
      </p>

      {/* Seriousness slider */}
      <div className="mb-8 glass-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{getSeriousnessEmoji(seriousness)}</span>
          <span className="text-xl font-bold text-purple-400">{getSeriousnessLabel(seriousness)}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={seriousness}
          onChange={e => onSeriousnessChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Not at all</span>
          <span>Extremely</span>
        </div>
      </div>

      {/* Success definition */}
      <div className="mb-8">
        <label className="block text-white font-medium mb-3">
          What would success look like for you?
        </label>
        <textarea
          value={successDefinition}
          onChange={e => onSuccessChange(e.target.value)}
          placeholder="e.g., Spending less than 2 hours on social media daily, having phone-free evenings..."
          rows={3}
          className="w-full bg-white/10 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
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
          onClick={onSubmit}
          disabled={!successDefinition.trim()}
          className="flex-1 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 animate-glow"
        >
          Show me my reality check ⚡
        </button>
      </div>
    </div>
  );
}
