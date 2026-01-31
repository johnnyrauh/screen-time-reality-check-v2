import { useState } from 'react';
import { ScreenTimeData, AppUsage } from '../../types';

interface VerifyStepProps {
  data: ScreenTimeData;
  onUpdate: (data: ScreenTimeData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VerifyStep({ data, onUpdate, onNext, onBack }: VerifyStepProps) {
  const [editMode, setEditMode] = useState(false);
  const [dailyAverage, setDailyAverage] = useState(data.dailyAverage);
  const [apps, setApps] = useState<AppUsage[]>(data.topApps);

  const handleSave = () => {
    onUpdate({
      ...data,
      dailyAverage,
      weeklyTotal: dailyAverage * 7,
      topApps: apps.filter(a => a.name && a.hours > 0),
    });
    setEditMode(false);
  };

  const updateApp = (index: number, field: 'name' | 'hours', value: string | number) => {
    const newApps = [...apps];
    newApps[index] = { ...newApps[index], [field]: value };
    setApps(newApps);
  };

  const addApp = () => {
    setApps([...apps, { name: '', hours: 0 }]);
  };

  const removeApp = (index: number) => {
    setApps(apps.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Does this look right?
      </h2>
      <p className="text-gray-400 mb-6 text-center">
        We extracted this from your screenshot. Fix anything that's wrong.
      </p>

      {/* Daily Average */}
      <div className="glass-dark p-6 mb-6">
        <div className="text-gray-400 text-sm mb-2">Daily Average</div>
        {editMode ? (
          <input
            type="number"
            step="0.1"
            value={dailyAverage}
            onChange={e => setDailyAverage(parseFloat(e.target.value) || 0)}
            className="text-4xl font-bold bg-transparent border-b-2 border-purple-500 w-24 text-white focus:outline-none"
          />
        ) : (
          <div className="text-4xl font-bold gradient-text">{dailyAverage.toFixed(1)}h</div>
        )}
        <div className="text-gray-500 text-sm mt-1">per day</div>
      </div>

      {/* Top Apps */}
      <div className="glass-dark p-6 mb-6">
        <div className="text-gray-400 text-sm mb-4">Top Apps (daily average)</div>
        <div className="space-y-3">
          {apps.map((app, index) => (
            <div key={index} className="flex items-center gap-4">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={app.name}
                    onChange={e => updateApp(index, 'name', e.target.value)}
                    placeholder="App name"
                    className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={app.hours}
                    onChange={e => updateApp(index, 'hours', parseFloat(e.target.value) || 0)}
                    className="w-20 bg-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-gray-400">h</span>
                  <button
                    onClick={() => removeApp(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white">{app.name}</span>
                  <span className="text-purple-400 font-medium">{app.hours.toFixed(1)}h</span>
                </>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <button
            onClick={addApp}
            className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
          >
            + Add app
          </button>
        )}
      </div>

      {/* Edit toggle */}
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="w-full py-3 text-purple-400 hover:text-purple-300 border border-purple-500/30 rounded-lg mb-4"
        >
          ✏️ Edit data
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg mb-4"
        >
          Save changes
        </button>
      )}

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
          disabled={editMode}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Looks good →
        </button>
      </div>
    </div>
  );
}
