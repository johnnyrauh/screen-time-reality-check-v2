import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { QuestionnaireData, AnalysisResult } from './types';
import { API_URL } from './config';

type Page = 'landing' | 'questionnaire' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => {
    setCurrentPage('questionnaire');
  };

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    setQuestionnaireData(data);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      setAnalysisResult(result);
      setCurrentPage('results');
    } catch (error) {
      console.error('Error analyzing data:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleStartOver = () => {
    setQuestionnaireData(null);
    setAnalysisResult(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {currentPage === 'landing' && <LandingPage onStart={handleStart} />}
        {currentPage === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}
        {currentPage === 'results' && analysisResult && questionnaireData && (
          <Results
            result={analysisResult}
            data={questionnaireData}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;
