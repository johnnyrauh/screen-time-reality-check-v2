import { AnalysisResult, QuestionnaireData } from '../types';

interface ResultsProps {
  result: AnalysisResult;
  data: QuestionnaireData;
  onStartOver: () => void;
}

export default function Results({ result, data, onStartOver }: ResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'low': return 'bg-green-500/20 border-green-500/50 text-green-400';
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Your Reality Check</span>
          </h1>
          <p className="text-gray-400">
            Based on {data.screenTimeData.dailyAverage.toFixed(1)}h daily average
          </p>
        </div>

        {/* THE BIG NUMBER */}
        <section className="glass p-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium mb-4">
            {result.bigNumber.severityBadge}
          </div>
          <div className="text-6xl md:text-8xl font-black gradient-text mb-2">
            {result.bigNumber.annualHours.toLocaleString()}
          </div>
          <div className="text-2xl text-gray-400 mb-4">hours per year</div>
          <div className="text-xl text-white font-medium mb-2">
            That's <span className="text-purple-400 font-bold">{result.bigNumber.annualDays} days</span> of your life
          </div>
          <div className="text-gray-500">{result.bigNumber.shockingStat}</div>
        </section>

        {/* TIME THIEVES */}
        <section className="glass p-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            Your Time Thieves
          </h2>
          <p className="text-gray-400 mb-6">Apps ranked by opportunity cost</p>

          <div className="space-y-4">
            {result.impactLeaderboard.map((app, index) => (
              <div key={app.appName} className="glass-dark p-4 rounded-xl">
                <div className="flex items-center gap-4 mb-3">
                  {/* Rank */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                      index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                      'bg-gray-700 text-gray-300'}
                  `}>
                    {index + 1}
                  </div>

                  {/* App info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">{app.appName}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityBg(app.severity)}`}>
                        {app.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {app.dailyHours.toFixed(1)}h/day · {app.weeklyHours.toFixed(1)}h/week
                    </div>
                  </div>

                  {/* Impact score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">{app.impactScore}</div>
                    <div className="text-xs text-gray-500">impact score</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full bg-gradient-to-r ${getSeverityColor(app.severity)} animate-slide-in`}
                    style={{ width: `${Math.min((app.weeklyHours / 40) * 100, 100)}%` }}
                  />
                </div>

                {/* Insight */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-purple-400">💡</span>
                  <span className="text-gray-400">{app.couldHaveDone}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE GUT PUNCH */}
        <section className="glass p-8 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">💔</span>
            {result.gutPunch.headline}
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            {result.gutPunch.personalizedMessage}
          </p>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-300 italic">"{result.gutPunch.dreamConnection}"</p>
          </div>
        </section>

        {/* PATTERN INSIGHTS */}
        <section className="glass p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🔍</span>
            What We Noticed
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {result.patternInsights.map((insight, index) => (
              <div key={index} className="glass-dark p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{insight.badge}</span>
                  <span className="text-white font-bold">{insight.title}</span>
                </div>
                <p className="text-gray-400 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OPPORTUNITY TIMELINE */}
        <section className="glass p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            What You Could Reclaim
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {result.opportunityTimeline.map((milestone, index) => (
              <div key={index} className="glass-dark p-4 rounded-xl text-center group hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{milestone.badge}</div>
                <div className="text-2xl font-bold text-purple-400">{milestone.hoursReclaimed}h</div>
                <div className="text-gray-500 text-sm mb-2">{milestone.period}</div>
                <div className="text-xs text-gray-400">{milestone.achievement}</div>
              </div>
            ))}
          </div>
        </section>

        {/* RECLAIM PLAN */}
        <section className="glass p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            Your Reclaim Plan
          </h2>

          {/* Tier 1 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/20 rounded text-xs">TIER 1</span>
              Quick Wins
            </h3>
            <div className="space-y-2">
              {result.reclaimPlan.tier1.map((action, index) => (
                <div key={index} className="flex items-center gap-3 glass-dark p-3 rounded-lg">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBadge(action.difficulty)}`}>
                    {action.difficulty}
                  </span>
                  <span className="text-white flex-1">{action.action}</span>
                  <span className="text-gray-500 text-sm">{action.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs">TIER 2</span>
              Medium Effort
            </h3>
            <div className="space-y-2">
              {result.reclaimPlan.tier2.map((action, index) => (
                <div key={index} className="flex items-center gap-3 glass-dark p-3 rounded-lg">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBadge(action.difficulty)}`}>
                    {action.difficulty}
                  </span>
                  <span className="text-white flex-1">{action.action}</span>
                  <span className="text-gray-500 text-sm">{action.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div>
            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-red-500/20 rounded text-xs">TIER 3</span>
              Lifestyle Changes
            </h3>
            <div className="space-y-2">
              {result.reclaimPlan.tier3.map((action, index) => (
                <div key={index} className="flex items-center gap-3 glass-dark p-3 rounded-lg">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBadge(action.difficulty)}`}>
                    {action.difficulty}
                  </span>
                  <span className="text-white flex-1">{action.action}</span>
                  <span className="text-gray-500 text-sm">{action.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-gray-400 mb-6">
            Your future self is counting on you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartOver}
              className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={() => {
                // Copy share text to clipboard
                const shareText = `I just discovered I spend ${result.bigNumber.annualHours.toLocaleString()} hours/year on my phone. That's ${result.bigNumber.annualDays} days. Time for a reality check.`;
                navigator.clipboard.writeText(shareText);
                alert('Copied to clipboard!');
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90"
            >
              Share My Stats 📤
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
