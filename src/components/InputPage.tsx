"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../context/AssessmentContext';
import { Upload, ArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function InputPage() {
  const router = useRouter();
  const { assessmentData, updateAssessmentData, resetAssessment } = useAssessment();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['metalType', 'productionRoute', 'energySource', 'transportMode', 'endOfLife'];
    const missingFields = requiredFields.filter(field => !assessmentData[field as keyof typeof assessmentData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    toast.success('Assessment started successfully!');
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      router.push('/ai-estimation');
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    updateAssessmentData({ [field]: value });
  };

  const handleReset = () => {
    resetAssessment();
    toast.success('Form reset successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Life Cycle Assessment Input</h1>
            <p className="text-gray-600 mt-2">
              Provide details about your metal production process for comprehensive analysis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Metal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metal Type *
              </label>
              <select
                value={assessmentData.metalType}
                onChange={(e) => handleInputChange('metalType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select metal type</option>
                <option value="Aluminium">Aluminium</option>
                <option value="Copper">Copper</option>
                <option value="Lithium">Lithium</option>
                <option value="Steel">Steel</option>
                <option value="Iron">Iron</option>
              </select>
            </div>

            {/* Production Route */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Production Route *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Raw', 'Recycled'].map((option) => (
                  <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="productionRoute"
                      value={option}
                      checked={assessmentData.productionRoute === option}
                      onChange={(e) => handleInputChange('productionRoute', e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                      required
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Energy Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Source *
              </label>
              <select
                value={assessmentData.energySource}
                onChange={(e) => handleInputChange('energySource', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select energy source</option>
                <option value="Coal">Coal</option>
                <option value="Natural Gas">Natural Gas</option>
                <option value="Mixed">Mixed Grid</option>
                <option value="Hydro">Hydroelectric</option>
                <option value="Nuclear">Nuclear</option>
                <option value="Renewable">Renewable (Solar/Wind)</option>
              </select>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Transport Mode *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Road', 'Rail', 'Ship', 'Air'].map((option) => (
                  <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="transportMode"
                      value={option}
                      checked={assessmentData.transportMode === option}
                      onChange={(e) => handleInputChange('transportMode', e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                      required
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* End-of-Life */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End-of-Life Option *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Recycle', 'Reuse', 'Landfill', 'Incineration'].map((option) => (
                  <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="endOfLife"
                      value={option}
                      checked={assessmentData.endOfLife === option}
                      onChange={(e) => handleInputChange('endOfLife', e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                      required
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Optional Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (tons)
                  </label>
                  <input
                    type="number"
                    value={assessmentData.quantity || ''}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    value={assessmentData.region || ''}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select region</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia-Pacific">Asia-Pacific</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Optional: Upload CSV/Excel with detailed parameters
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      toast.success(`File "${e.target.files[0].name}" uploaded successfully`);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer"
                >
                  Choose file
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Run Assessment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}