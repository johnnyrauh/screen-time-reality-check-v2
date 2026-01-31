export default function LoadingStep() {
  const messages = [
    'Analyzing your screen time...',
    'Calculating opportunity costs...',
    'Preparing your reality check...',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated loader */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl animate-pulse">📊</span>
          </div>
        </div>

        {/* Loading messages */}
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <div
              key={msg}
              className="text-gray-400 animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {msg}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-600">
          This takes a few seconds...
        </p>
      </div>
    </div>
  );
}
