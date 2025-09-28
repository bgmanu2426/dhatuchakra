"use client";
import { useAssessment } from '../context/AssessmentContext';
import { FileDown, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { SankeyDiagram } from './ui/SankeyDiagram';

export function ReportPage() {
  const { assessmentData, results, aiEstimations } = useAssessment();
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current || !results) return;

    try {
  const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('LCA-Assessment-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const emailReport = () => {
    const subject = encodeURIComponent('LCA Assessment Report - ' + assessmentData.metalType);
    const body = encodeURIComponent(`
Please find attached the Life Cycle Assessment report for ${assessmentData.metalType} production.

Key Results:
- Carbon Footprint: ${results?.carbonFootprint} kg CO₂/ton
- Recycled Content: ${results?.recycledContent}%
- Resource Efficiency: ${results?.resourceEfficiency}%
- Circularity Index: ${results?.circularityIndex}/100

Best regards,
AI-LCA Tool
    `);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No assessment results available. Please complete an assessment first.</p>
          <Link href="/input" className="mt-4 inline-block text-green-600 hover:text-green-700">
            Start New Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/results"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={emailReport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Report
            </button>
            <button
              onClick={generatePDF}
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Report Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Life Cycle Assessment Report
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                AI-Driven Circularity Analysis
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Generated on {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                This report presents a comprehensive Life Cycle Assessment (LCA) for {assessmentData.metalType} 
                production using {assessmentData.productionRoute.toLowerCase()} materials. The analysis incorporates 
                circularity principles and AI-driven estimations to provide actionable sustainability insights.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.carbonFootprint}</div>
                  <div className="text-sm text-gray-600">kg CO₂/ton</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.recycledContent}%</div>
                  <div className="text-sm text-gray-600">Recycled Content</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{results.resourceEfficiency}</div>
                  <div className="text-sm text-gray-600">Efficiency Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{results.circularityIndex}</div>
                  <div className="text-sm text-gray-600">Circularity Index</div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Parameters */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Parameters</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material Type:</span>
                    <span className="font-medium">{assessmentData.metalType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Production Route:</span>
                    <span className="font-medium">{assessmentData.productionRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Source:</span>
                    <span className="font-medium">{assessmentData.energySource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transport Mode:</span>
                    <span className="font-medium">{assessmentData.transportMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End-of-Life:</span>
                    <span className="font-medium">{assessmentData.endOfLife}</span>
                  </div>
                </div>
              </div>
              
              {aiEstimations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Estimations Used</h3>
                  <div className="space-y-3">
                    {aiEstimations.map((estimation, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600">{estimation.parameter}:</span>
                          <span className="font-medium">{estimation.predictedValue}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Confidence: {Math.round(estimation.confidence * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Impact Analysis</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Carbon Footprint Analysis</h3>
                <p className="text-gray-700 mb-2">
                  The total carbon footprint of {results.carbonFootprint} kg CO₂ per ton includes emissions from:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Raw material extraction and processing</li>
                  <li>Energy consumption during production</li>
                  <li>Transportation and logistics</li>
                  <li>End-of-life treatment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Circularity Assessment</h3>
                <p className="text-gray-700 mb-2">
                  The circularity index of {results.circularityIndex}/100 reflects:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Use of recycled materials in production</li>
                  <li>End-of-life recovery potential</li>
                  <li>Resource efficiency measures</li>
                  <li>Renewable energy integration</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Material Flow (Sankey Diagram)</h3>
                <SankeyDiagram assessmentData={assessmentData} />
              </div>

            </div>
          </div>

          {/* Recommendations */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainability Recommendations</h2>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Limitations */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology & Data Sources</h2>
            <div className="prose max-w-none text-sm text-gray-700">
              <p className="mb-4">
                This assessment follows ISO 14040/14044 standards for Life Cycle Assessment, 
                incorporating circular economy principles and AI-enhanced data modeling.
              </p>
              
              <h4 className="font-semibold mb-2">Data Sources:</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Industry-standard emission factors from IPCC databases</li>
                <li>Material-specific LCI data from EcoInvent</li>
                <li>Energy grid emission factors by region</li>
                <li>Transport emission factors from regulatory databases</li>
              </ul>

              <h4 className="font-semibold mb-2">Limitations:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Results based on generic industry data; site-specific data may vary</li>
                <li>AI estimations provided where input data was incomplete</li>
                <li>End-of-life scenarios modeled using average industry practices</li>
                <li>Regional variations in energy mix and regulations not fully captured</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 rounded-b-xl">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                Report generated by AI-LCA Tool v1.0
              </p>
              <p>
                For technical questions or support, visit our documentation or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}