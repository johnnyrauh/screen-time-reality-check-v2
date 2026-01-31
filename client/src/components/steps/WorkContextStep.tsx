interface WorkContextStepProps {
  workHours: number;
  workRole: string;
  onWorkHoursChange: (hours: number) => void;
  onWorkRoleChange: (role: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WorkContextStep({
  workHours,
  workRole,
  onWorkHoursChange,
  onWorkRoleChange,
  onNext,
  onBack,
}: WorkContextStepProps) {
  const roles = [
    { value: 'student', label: '🎓 Student' },
    { value: 'employed', label: '💼 Employed' },
    { value: 'self-employed', label: '🚀 Self-employed' },
    { value: 'unemployed', label: '🔍 Between jobs' },
    { value: 'retired', label: '🌴 Retired' },
    { value: 'other', label: '✨ Other' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        A bit of context
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        This helps us understand your available time.
      </p>

      {/* Work hours slider */}
      <div className="mb-8">
        <label className="block text-white font-medium mb-4">
          Hours you work/study per week
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="80"
            value={workHours}
            onChange={e => onWorkHoursChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500"
          />
          <div className="w-16 text-center">
            <span className="text-2xl font-bold text-purple-400">{workHours}</span>
            <span className="text-gray-400 text-sm block">hrs</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
        </div>
      </div>

      {/* Role selection */}
      <div className="mb-8">
        <label className="block text-white font-medium mb-4">
          What best describes you?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {roles.map(role => (
            <button
              key={role.value}
              onClick={() => onWorkRoleChange(role.value)}
              className={`
                p-4 rounded-xl border-2 text-left transition-all
                ${workRole === role.value
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-gray-700 bg-white/5 text-gray-300 hover:border-gray-600'
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
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
          disabled={!workRole}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
