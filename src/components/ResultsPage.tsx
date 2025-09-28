"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, Download, Share2, Target, Leaf, Zap, TrendingUp } from 'lucide-react';
import { MetricsCard } from './ui/MetricsCard';
import { ComparisonChart } from './ui/ComparisonChart';
import { SankeyDiagram } from './ui/SankeyDiagram';
import toast from 'react-hot-toast';

export function ResultsPage() {
  const { assessmentData } = useAssessment();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock results data - in a real app, this would come from your assessment API
  const results = {
    carbonFootprint: 12.5, // kg CO2 eq
    energyConsumption: 45.8, // MJ
    waterUsage: 125.3, // L
    circularityIndex: 72, // percentage
    recycledContent: 35, // percentage
    wasteGenerated: 2.1, // kg
    resourceEfficiency: 68, // percentage
    recommendations: [
      "Switch to renewable energy sources to reduce carbon footprint by 23%",
      "Increase recycled content to 50% for better circularity",
      "Optimize transport routes to reduce emissions by 8%"
    ]
  };

  const handleExport = () => {
    toast.success('Results exported successfully');
  };

  const handleShare = () => {
    toast.success('Results shared successfully');
  };

  if (!assessmentData.metalType) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data</h1>
          <p className="text-gray-600 mb-8">Please complete an assessment first.</p>
          <Link
            href="/input"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assessment Results</h1>
            <p className="text-gray-800 mt-1 sm:mt-2 text-sm sm:text-base">
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
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
            >
              View Report
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'detailed', label: 'Detailed Analysis' },
              { id: 'recommendations', label: 'Recommendations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Carbon Footprint"
                value={results.carbonFootprint}
                unit="kg CO₂ eq"
                icon={<Leaf className="h-5 w-5 text-green-600" />}
                trend="negative"
                trendLabel="-15% vs. industry average"
                description="Current footprint per unit of output"
              />
              <MetricsCard
                title="Energy Use"
                value={results.energyConsumption}
                unit="MJ"
                icon={<Zap className="h-5 w-5 text-yellow-400" />}
                trend="positive"
                trendLabel="+8% vs. previous assessment"
                description="Total energy consumed per batch"
              />
              <MetricsCard
                title="Circularity Index"
                value={results.circularityIndex}
                unit="%"
                icon={<Target className="h-5 w-5 text-red-600" />}
                trend="positive"
                trendLabel="+12% improvement potential"
                maxValue={100}
                description="Overall circularity performance"
              />
              <MetricsCard
                title="Water Usage"
                value={results.waterUsage}
                unit="L"
                icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
                trend="negative"
                trendLabel="-5% vs. benchmark"
                description="Fresh water consumption"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Comparison</h3>
                <ComparisonChart results={results} assessmentData={assessmentData} />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Flow</h3>
                <SankeyDiagram assessmentData={assessmentData} />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Configuration</h4>
                  <ul className="text-gray-800 space-y-1 text-sm">
                    <li><b>Material:</b> {assessmentData.metalType}</li>
                    <li><b>Route:</b> {assessmentData.productionRoute}</li>
                    <li><b>Energy:</b> {assessmentData.energySource}</li>
                    <li><b>Transport:</b> {assessmentData.transportMode}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Key Insights</h4>
                  <ul className="text-gray-800 space-y-1 text-sm">
                    <li><b>Circularity:</b> {results.circularityIndex}/100</li>
                    <li><b>Recycled Content:</b> {results.recycledContent}%</li>
                    <li><b>Waste Generated:</b> {results.wasteGenerated} kg</li>
                    <li><b>Opportunities:</b> {results.recommendations.length} identified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Analysis Tab */}
        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Environmental Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Raw Material Extraction</span>
                  <span className="text-gray-800">4.2 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Manufacturing Process</span>
                  <span className="text-gray-800">6.8 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Transportation</span>
                  <span className="text-gray-800">1.2 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">End-of-Life</span>
                  <span className="text-gray-800">0.3 kg CO₂ eq</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Recommendations</h3>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}