import { useState } from 'react';
import { ScreenTimeData } from '../../types';
import { API_URL } from '../../config';

interface UploadStepProps {
  onNext: () => void;
  onDataExtracted: (data: ScreenTimeData) => void;
}

export default function UploadStep({ onNext, onDataExtracted }: UploadStepProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('screenshot', file);

      const response = await fetch(`${API_URL}/api/ocr`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('OCR failed');

      const data = await response.json();
      onDataExtracted(data);
      onNext();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Could not process screenshot. Please try again or enter data manually.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        First, let's see what we're working with
      </h2>
      <p className="text-gray-400 mb-2">
        Upload a screenshot of your <strong className="text-purple-300">weekly</strong> Screen Time
      </p>
      <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-3 mb-8 text-sm text-purple-200">
        Make sure "Week" is selected at the top when you take your screenshot.
      </div>

      <div className="mb-6">
        <label
          htmlFor="screenshot-upload"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            block w-full p-12 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-300
            ${uploading
              ? 'border-purple-500 bg-purple-500/20'
              : isDragging
                ? 'border-purple-400 bg-purple-500/30 scale-[1.02] shadow-lg shadow-purple-500/20'
                : 'border-gray-600 hover:border-purple-400 bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <div className="text-6xl mb-4">
            {uploading ? '⏳' : isDragging ? '📥' : '📱'}
          </div>
          <div className="text-white font-bold text-lg mb-2">
            {uploading
              ? 'Analyzing your screen time...'
              : isDragging
                ? 'Drop your screenshot here!'
                : 'Click to upload screenshot'}
          </div>
          <div className="text-gray-500 text-sm">
            {isDragging ? 'Release to upload' : 'or drag and drop'}
          </div>
        </label>
        <input
          id="screenshot-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </div>

      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="text-purple-400 hover:text-purple-300 text-sm underline mb-4"
      >
        {showInstructions ? 'Hide' : 'Show'} instructions
      </button>

      {showInstructions && (
        <div className="bg-white/5 rounded-lg p-6 text-left space-y-4 mt-4">
          <div>
            <h4 className="text-white font-bold mb-2">📱 iOS (iPhone)</h4>
            <ol className="text-gray-400 text-sm space-y-1 ml-4 list-decimal">
              <li>Open Settings → Screen Time</li>
              <li>Tap "See All Activity"</li>
              <li>Select "Week" at the top</li>
              <li>Take a screenshot</li>
            </ol>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">🤖 Android</h4>
            <ol className="text-gray-400 text-sm space-y-1 ml-4 list-decimal">
              <li>Open Settings → Digital Wellbeing</li>
              <li>Tap the chart for details</li>
              <li>Take a screenshot</li>
            </ol>
          </div>
        </div>
      )}

      {/* Privacy Badge */}
      <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-green-400 text-sm font-medium">Your data is private</span>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 max-w-md mx-auto text-xs text-gray-500 leading-relaxed">
        <p>
          🔒 Your screenshot is processed in real-time and immediately discarded.
          We don't store any images or personal data. Your results are shown once and not saved.
        </p>
      </div>
    </div>
  );
}
