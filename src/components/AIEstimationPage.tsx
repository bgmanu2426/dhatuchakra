"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../context/AssessmentContext';
import { Brain, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export function AIEstimationPage() {
  const router = useRouter();
  const { aiEstimations, generateAIEstimations, updateAssessmentData } = useAssessment();
  const [acceptedEstimations, setAcceptedEstimations] = useState<string[]>([]);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      generateAIEstimations();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [generateAIEstimations]);

  const handleAcceptEstimation = (parameter: string, value: string) => {
    setAcceptedEstimations(prev => [...prev, parameter]);
    updateAssessmentData({ [parameter.toLowerCase()]: value });
  };

  const handleOverride = (parameter: string, value: string) => {
    setOverrides(prev => ({ ...prev, [parameter]: value }));
    updateAssessmentData({ [parameter.toLowerCase()]: value });
  };

  const handleContinue = () => {
    router.push('/results');
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Processing Your Data</h2>
          <p className="text-gray-600">Analyzing patterns and generating intelligent estimations...</p>
          <div className="mt-8 w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Estimations</h1>
                <p className="text-gray-600 mt-1">
                  Review AI-generated predictions for missing parameters
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {aiEstimations.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">All Parameters Provided</h2>
                <p className="text-gray-600 mb-6">
                  Great! You've provided all necessary information. Ready to calculate results.
                </p>
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Calculate Results
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-blue-800 font-medium">
                      AI has generated estimations for missing parameters
                    </p>
                  </div>
                  <p className="text-blue-700 text-sm mt-1">
                    Review each estimation and either accept or provide your own values
                  </p>
                </div>

                {aiEstimations.map((estimation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {estimation.parameter}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(estimation.confidence)}`}>
                            {Math.round(estimation.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">AI Prediction:</p>
                      <p className="font-medium text-gray-900 mb-2">{estimation.predictedValue}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Reasoning:</strong> {estimation.reasoning}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {!acceptedEstimations.includes(estimation.parameter) ? (
                        <>
                          <button
                            onClick={() => handleAcceptEstimation(estimation.parameter, estimation.predictedValue)}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            Accept Prediction
                          </button>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder={`Override with your ${estimation.parameter.toLowerCase()}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={(e) => handleOverride(estimation.parameter, e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Prediction Accepted</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={handleContinue}
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Continue to Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}