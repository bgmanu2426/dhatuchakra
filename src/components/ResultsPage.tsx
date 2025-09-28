"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useAssessment } from '../context/AssessmentContext';
import { MetricsCard } from './ui/MetricsCard';
import { ComparisonChart } from './ui/ComparisonChart';
import { SankeyDiagram } from './ui/SankeyDiagram';
import { FileDown, ArrowLeft } from 'lucide-react';

export function ResultsPage() {
  const { results, calculateResults, assessmentData } = useAssessment();

  useEffect(() => {
    if (!results) {
      calculateResults();
    }
  }, [results, calculateResults]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculating Results</h2>
          <p className="text-gray-600">Processing your LCA assessment...</p>
        </div>
      </div>
    );
  }

  const metrics: { title: string; value: number; unit: string; trend: 'positive' | 'negative' | 'neutral' }[] = [
    { title: 'Carbon Footprint', value: results.carbonFootprint, unit: 'kg CO₂/ton', trend: results.carbonFootprint < 8000 ? 'positive' : 'negative' },
    { title: 'Recycled Content', value: results.recycledContent, unit: '%', trend: results.recycledContent > 50 ? 'positive' : 'negative' },
    { title: 'Resource Efficiency', value: results.resourceEfficiency, unit: 'Score', trend: results.resourceEfficiency > 70 ? 'positive' : 'negative' },
    { title: 'Circularity Index', value: results.circularityIndex, unit: 'Score', trend: results.circularityIndex > 60 ? 'positive' : 'negative' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assessment Results</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              LCA for {assessmentData.metalType} - {assessmentData.productionRoute} Production
            </p>
          </div>
          <div className="flex space-x-3 sm:space-x-4">
            <Link
              href="/input"
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-xs sm:text-sm"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Report
            </Link>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Linear vs Circular Impact
            </h2>
            <ComparisonChart results={results} assessmentData={assessmentData} />
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Material Flow
            </h2>
            <SankeyDiagram assessmentData={assessmentData} />
          </div>
        </div>

        {/* Recommendations & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Sustainability Recommendations
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-green-800 text-sm sm:text-base">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 sm:p-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Assessment Summary</h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Configuration</h3>
                <ul className="text-gray-700 space-y-1">
                  <li><b>Material:</b> {assessmentData.metalType}</li>
                  <li><b>Route:</b> {assessmentData.productionRoute}</li>
                  <li><b>Energy:</b> {assessmentData.energySource}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Key Insights</h3>
                <ul className="text-gray-700 space-y-1">
                  <li><b>Circularity:</b> {results.circularityIndex}/100</li>
                  <li><b>Recycled Content:</b> {results.recycledContent}%</li>
                  <li><b>Opportunities:</b> {results.recommendations.length} identified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}