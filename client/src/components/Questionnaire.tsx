import { useState } from 'react';
import { ScreenTimeData, QuestionnaireData } from '../types';
import UploadStep from './steps/UploadStep';
import VerifyStep from './steps/VerifyStep';
import DreamStep from './steps/DreamStep';
import WorkContextStep from './steps/WorkContextStep';
import RegretStep from './steps/RegretStep';
import TimeWantedStep from './steps/TimeWantedStep';
import RelationshipStep from './steps/RelationshipStep';
import SeriousnessStep from './steps/SeriousnessStep';
import LoadingStep from './steps/LoadingStep';

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const TOTAL_STEPS = 8;

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData | null>(null);
  const [dreamGoal, setDreamGoal] = useState('');
  const [workHours, setWorkHours] = useState(40);
  const [workRole, setWorkRole] = useState('');
  const [regretApp, setRegretApp] = useState('');
  const [timeWanted, setTimeWanted] = useState<string[]>([]);
  const [phoneRelationship, setPhoneRelationship] = useState('');
  const [changeSeriousness, setChangeSeriousness] = useState(5);
  const [successDefinition, setSuccessDefinition] = useState('');

  const progress = (step / TOTAL_STEPS) * 100;
  const xp = step * 125;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!screenTimeData) return;

    setIsLoading(true);

    const data: QuestionnaireData = {
      screenTimeData,
      dreamGoal,
      workHours,
      workRole,
      regretApp,
      timeWanted,
      phoneRelationship,
      changeSeriousness,
      successDefinition,
    };

    await onComplete(data);
  };

  if (isLoading) {
    return <LoadingStep />;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {step} of {TOTAL_STEPS}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-400 font-medium">XP</span>
              <span className="text-sm font-bold text-white">{xp}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="glass p-8">
          {step === 1 && (
            <UploadStep
              onNext={handleNext}
              onDataExtracted={setScreenTimeData}
            />
          )}
          {step === 2 && screenTimeData && (
            <VerifyStep
              data={screenTimeData}
              onUpdate={setScreenTimeData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <DreamStep
              value={dreamGoal}
              onChange={setDreamGoal}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && (
            <WorkContextStep
              workHours={workHours}
              workRole={workRole}
              onWorkHoursChange={setWorkHours}
              onWorkRoleChange={setWorkRole}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 5 && screenTimeData && (
            <RegretStep
              apps={screenTimeData.topApps}
              value={regretApp}
              onChange={setRegretApp}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 6 && (
            <TimeWantedStep
              value={timeWanted}
              onChange={setTimeWanted}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 7 && (
            <RelationshipStep
              value={phoneRelationship}
              onChange={setPhoneRelationship}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 8 && (
            <SeriousnessStep
              seriousness={changeSeriousness}
              successDefinition={successDefinition}
              onSeriousnessChange={setChangeSeriousness}
              onSuccessChange={setSuccessDefinition}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
