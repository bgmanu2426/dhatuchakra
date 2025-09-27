import { AssessmentData } from '../context/AssessmentContext';

interface SankeyDiagramProps {
  assessmentData: AssessmentData;
}

export function SankeyDiagram({ assessmentData }: SankeyDiagramProps) {
  // Simplified Sankey-style visualization using CSS and SVG
  const flows = [
    { from: 'Raw Materials', to: 'Production', value: assessmentData.productionRoute === 'Raw' ? 80 : 20 },
    { from: 'Recycled Materials', to: 'Production', value: assessmentData.productionRoute === 'Recycled' ? 80 : 20 },
    { from: 'Production', to: 'Use Phase', value: 100 },
    { from: 'Use Phase', to: getEndOfLifeLabel(assessmentData.endOfLife), value: 100 },
  ];

  function getEndOfLifeLabel(endOfLife: string): string {
    switch (endOfLife) {
      case 'Recycle': return 'Recycling';
      case 'Reuse': return 'Reuse';
      case 'Landfill': return 'Disposal';
      case 'Incineration': return 'Energy Recovery';
      default: return 'End of Life';
    }
  }

  const getFlowColor = (index: number) => {
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
    return colors[index % colors.length];
  };

  return (
    <div className="h-80 flex flex-col justify-center">
      {/* Simplified flow representation */}
      <div className="space-y-6">
        {/* Raw Materials Row */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              assessmentData.productionRoute === 'Raw' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
            }`}>
              Raw Materials ({assessmentData.productionRoute === 'Raw' ? '80%' : '20%'})
            </div>
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              assessmentData.productionRoute === 'Recycled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              Recycled Materials ({assessmentData.productionRoute === 'Recycled' ? '80%' : '20%'})
            </div>
          </div>
        </div>

        {/* Flow Arrows */}
        <div className="flex justify-center">
          <div className="text-2xl text-gray-400">↓</div>
        </div>

        {/* Production */}
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-blue-100 text-blue-800 rounded-lg font-medium">
            Production ({assessmentData.metalType})
          </div>
        </div>

        {/* Flow Arrows */}
        <div className="flex justify-center">
          <div className="text-2xl text-gray-400">↓</div>
        </div>

        {/* Use Phase */}
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
            Use Phase (100%)
          </div>
        </div>

        {/* Flow Arrows */}
        <div className="flex justify-center">
          <div className="text-2xl text-gray-400">↓</div>
        </div>

        {/* End of Life */}
        <div className="flex justify-center">
          <div className={`px-6 py-3 rounded-lg font-medium ${
            assessmentData.endOfLife === 'Recycle' || assessmentData.endOfLife === 'Reuse'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {getEndOfLifeLabel(assessmentData.endOfLife)} (100%)
          </div>
        </div>

        {/* Circular Flow Indicator */}
        {(assessmentData.endOfLife === 'Recycle' || assessmentData.endOfLife === 'Reuse') && (
          <div className="flex justify-center items-center space-x-2 text-sm text-green-600">
            <span>Circular Flow Enabled</span>
            <div className="text-xl">♻️</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Material Flow Analysis</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>• Energy: {assessmentData.energySource}</div>
          <div>• Transport: {assessmentData.transportMode}</div>
          <div>• Circularity: {assessmentData.endOfLife === 'Recycle' || assessmentData.endOfLife === 'Reuse' ? 'High' : 'Low'}</div>
          <div>• Material: {assessmentData.metalType}</div>
        </div>
      </div>
    </div>
  );
}