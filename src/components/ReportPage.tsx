"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, Download, Printer, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ComparisonChart } from './ui/ComparisonChart';
import { SankeyDiagram } from './ui/SankeyDiagram';

export function ReportPage() {
  const { assessmentData, results, calculateResults } = useAssessment();
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (assessmentData.metalType && !results) {
      calculateResults();
    }
  }, [assessmentData, results, calculateResults]);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setIsGenerating(true);
    toast.loading('Generating PDF report...');
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
        const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`LCA-Report-${assessmentData.metalType}-${Date.now()}.pdf`);
      toast.dismiss();
      toast.success('PDF report generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to generate PDF report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleEmail = () => {
    toast.success('Report sharing options opened');
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

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
          <p className="text-gray-700">Generating your detailed report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <Link
              href="/results"
              className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Link>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors text-sm"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button
              onClick={handleEmail}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors text-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Report Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Life Cycle Assessment Report
            </h1>
            <p className="text-lg text-gray-800">
              {assessmentData.metalType} - {assessmentData.productionRoute} Production
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Generated on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed">
                This Life Cycle Assessment (LCA) analyzes the environmental impact of {assessmentData.metalType} 
                production using the {assessmentData.productionRoute} route with {assessmentData.energySource} 
                energy source. The assessment reveals a carbon footprint of {results.carbonFootprint} kg CO₂ 
                equivalent with a circularity index of {results.circularityIndex}%. Key opportunities for 
                improvement include optimizing energy sources and increasing recycled content.
              </p>
            </div>
          </div>

          {/* Assessment Parameters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Parameters</h3>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>Material Type:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.metalType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production Route:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.productionRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy Source:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.energySource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport Mode:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.transportMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End-of-Life:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.endOfLife}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Optional Parameters</h3>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.quantity || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Region:</span>
                    <span className="font-semibold text-gray-900">{assessmentData.region || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {results.carbonFootprint}
                </div>
                <div className="text-sm text-gray-800">kg CO₂ equivalent</div>
                <div className="font-medium text-gray-900 mt-1">Carbon Footprint</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {results.energyConsumption}
                </div>
                <div className="text-sm text-gray-800">MJ</div>
                <div className="font-medium text-gray-900 mt-1">Energy Consumption</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {results.circularityIndex}%
                </div>
                <div className="text-sm text-gray-800">Score</div>
                <div className="font-medium text-gray-900 mt-1">Circularity Index</div>
              </div>
            </div>
          </div>

          {/* Environmental Impact Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Environmental Impact Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">Raw Material Extraction</span>
                <span className="text-gray-800">4.2 kg CO₂ eq (33.6%)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">Manufacturing Process</span>
                <span className="text-gray-800">6.8 kg CO₂ eq (54.4%)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">Transportation</span>
                <span className="text-gray-800">1.2 kg CO₂ eq (9.6%)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">End-of-Life</span>
                <span className="text-gray-800">0.3 kg CO₂ eq (2.4%)</span>
              </div>
            </div>
          </div>

          {/* Visual Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visual Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Comparison</h3>
                <ComparisonChart results={results} assessmentData={assessmentData} />
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Flow</h3>
                <SankeyDiagram assessmentData={assessmentData} />
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
            <div className="prose text-gray-800">
              <p>
                This LCA was conducted following ISO 14040/14044 standards. The assessment includes 
                four main phases: raw material extraction, manufacturing, transportation, and end-of-life 
                treatment. Environmental impact categories analyzed include climate change potential, 
                energy consumption, and resource depletion.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Generated by Dhatuchakra - AI-driven circular LCA assessments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}