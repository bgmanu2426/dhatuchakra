"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../context/AssessmentContext';
import { Brain, Zap, Target, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function AIEstimationPage() {
  const router = useRouter();
  const { assessmentData } = useAssessment();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimationComplete, setEstimationComplete] = useState(false);

  const steps = [
    "Analyzing input parameters...",
    "Running AI models for carbon footprint...",
    "Calculating energy consumption patterns...",
    "Assessing circularity potential...",
    "Generating optimization recommendations...",
    "Finalizing assessment results..."
  ];

  // Define startEstimation outside useEffect so it can be reused
  const startEstimation = () => {
    setCurrentStep(0);
    setIsProcessing(true);
    setEstimationComplete(false);
    toast.success('AI estimation started');
    
    // Simulate AI processing steps
    let step = 0;
    const processSteps = () => {
      if (step < steps.length - 1) {
        step++;
        setCurrentStep(step);
        setTimeout(processSteps, 2000);
      } else {
        setTimeout(() => {
          setIsProcessing(false);
          setEstimationComplete(true);
          toast.success('AI estimation completed successfully!');
        }, 2000);
      }
    };
    
    setTimeout(processSteps, 2000);
  };

  useEffect(() => {
    if (!assessmentData.metalType) {
      toast.error('No assessment data found. Redirecting to input page.');
      router.push('/input');
      return;
    }

    // Start the AI estimation process
    startEstimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData.metalType, router]);

  const handleViewResults = () => {
    router.push('/results');
  };

  const handleRestart = () => {
    startEstimation();
  };

  if (!assessmentData.metalType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to input page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 mr-4" />
              <h1 className="text-3xl font-bold">AI-Powered LCA Analysis</h1>
            </div>
            <p className="text-center text-blue-100">
              Advanced machine learning algorithms analyzing your {assessmentData.metalType} production lifecycle
            </p>
          </div>

          {/* Assessment Info */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                <Target className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Material</div>
                  <div className="font-medium text-black">{assessmentData.metalType}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                <Zap className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Production Route</div>
                  <div className="font-medium text-black">{assessmentData.productionRoute}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Energy Source</div>
                  <div className="font-medium text-black">{assessmentData.energySource}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="p-8">
            {isProcessing && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
                  AI Models Processing Your Data
                </h3>
                
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep ? 'bg-green-600 text-white' : 
                      index === currentStep ? 'bg-blue-600 text-white' : 
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className={`font-medium ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step}
                      </div>
                      {index === currentStep && (
                        <div className="flex items-center mt-2">
                          <RefreshCw className="h-4 w-4 animate-spin text-blue-600 mr-2" />
                          <span className="text-sm text-blue-600">Processing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Completion State */}
            {estimationComplete && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    AI Analysis Complete!
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our advanced AI models have successfully analyzed your {assessmentData.metalType} 
                    production lifecycle. The results include detailed environmental impact assessments, 
                    optimization recommendations, and circularity insights.
                  </p>
                </div>

                {/* Key Insights Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">12.5</div>
                    <div className="text-sm text-gray-600">kg CO₂ equivalent</div>
                    <div className="font-medium text-gray-900 mt-1">Carbon Footprint</div>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">72%</div>
                    <div className="text-sm text-gray-600">Circularity Score</div>
                    <div className="font-medium text-gray-900 mt-1">Optimization Potential</div>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                    <div className="text-sm text-gray-600">Key Recommendations</div>
                    <div className="font-medium text-gray-900 mt-1">Improvement Areas</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run Again
                  </button>
                  <button
                    onClick={handleViewResults}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors font-medium"
                  >
                    View Detailed Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Technology Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Neural Networks</h4>
              <p className="text-sm text-gray-600">Deep learning models trained on extensive LCA databases</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Optimization Engine</h4>
              <p className="text-sm text-gray-600">AI-powered recommendations for circularity improvements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Predictive Analytics</h4>
              <p className="text-sm text-gray-600">Advanced forecasting for environmental impact scenarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}