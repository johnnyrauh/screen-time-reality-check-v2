interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
          <span className="text-2xl">📱</span>
          <span className="text-sm font-medium text-purple-300">Reality Check Time</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          <span className="text-white">You don't have a </span>
          <span className="gradient-text">time problem.</span>
          <br />
          <span className="text-white">You have a </span>
          <span className="gradient-text">time awareness</span>
          <span className="text-white"> problem.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
          Upload your screen time screenshot. Get a personalized reality check.
          No judgment—just truth.
        </p>

        {/* Stats preview */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: '1,460+', label: 'Hours/year on social media (avg)' },
            { value: '60', label: 'Days staring at your phone' },
            { value: '∞', label: 'Things you could have done instead' },
          ].map((stat, i) => (
            <div key={i} className="glass p-4">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-glow"
        >
          <span className="relative z-10">See My Reality Check</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity" />
        </button>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>🔒</span> Private & Secure
          </span>
          <span className="flex items-center gap-1">
            <span>⚡</span> Takes 2 minutes
          </span>
          <span className="flex items-center gap-1">
            <span>🎯</span> Personalized
          </span>
        </div>

        {/* Privacy details */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="glass-dark p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-green-400 text-sm font-medium">100% Private</span>
            </div>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• No data stored in any database</li>
              <li>• Screenshots deleted immediately after processing</li>
              <li>• Results are ephemeral - shown once, not saved</li>
              <li>• No accounts, no tracking, no analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
