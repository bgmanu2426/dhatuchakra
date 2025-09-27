import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { MetricsCard } from '../components/MetricsCard';
import { ComparisonChart } from '../components/ComparisonChart';
import { SankeyDiagram } from '../components/SankeyDiagram';
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

  const metrics = [
    {
      title: 'Carbon Footprint',
      value: results.carbonFootprint,
      unit: 'kg CO₂/ton',
      icon: '🌍',
      trend: results.carbonFootprint < 8000 ? 'positive' : 'negative',
      description: 'Total greenhouse gas emissions per ton of material'
    },
    {
      title: 'Recycled Content',
      value: results.recycledContent,
      unit: '%',
      icon: '♻️',
      trend: results.recycledContent > 50 ? 'positive' : 'negative',
      description: 'Percentage of recycled material in the product'
    },
    {
      title: 'Resource Efficiency',
      value: results.resourceEfficiency,
      unit: 'Score',
      icon: '⚡',
      trend: results.resourceEfficiency > 70 ? 'positive' : 'negative',
      description: 'Overall efficiency of resource utilization'
    },
    {
      title: 'Circularity Index',
      value: results.circularityIndex,
      unit: 'Score',
      icon: '🔄',
      trend: results.circularityIndex > 60 ? 'positive' : 'negative',
      description: 'Measure of circular economy implementation'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessment Results</h1>
            <p className="text-gray-600 mt-2">
              Life Cycle Assessment for {assessmentData.metalType} - {assessmentData.productionRoute} Production
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/input"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Input
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Generate Report
            </Link>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Linear vs Circular Impact
            </h2>
            <ComparisonChart results={results} assessmentData={assessmentData} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Material Flow Diagram
            </h2>
            <SankeyDiagram assessmentData={assessmentData} />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sustainability Recommendations
          </h2>
          <div className="space-y-4">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-green-800">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Assessment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Current Performance</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Material: {assessmentData.metalType}</li>
                <li>• Route: {assessmentData.productionRoute}</li>
                <li>• Energy: {assessmentData.energySource}</li>
                <li>• Transport: {assessmentData.transportMode}</li>
                <li>• End-of-Life: {assessmentData.endOfLife}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Insights</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Circularity Score: {results.circularityIndex}/100</li>
                <li>• {results.recycledContent}% recycled content</li>
                <li>• {results.resourceEfficiency}% resource efficiency</li>
                <li>• {results.recommendations.length} improvement opportunities identified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}