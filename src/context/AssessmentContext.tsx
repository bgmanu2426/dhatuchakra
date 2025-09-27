import { createContext, useContext, useState, ReactNode } from 'react';

export interface AssessmentData {
  metalType: string;
  productionRoute: string;
  energySource: string;
  transportMode: string;
  endOfLife: string;
  quantity?: number;
  region?: string;
}

export interface AIEstimation {
  parameter: string;
  predictedValue: string;
  confidence: number;
  reasoning: string;
}

export interface Results {
  carbonFootprint: number;
  recycledContent: number;
  resourceEfficiency: number;
  circularityIndex: number;
  recommendations: string[];
}

interface AssessmentContextType {
  assessmentData: AssessmentData;
  aiEstimations: AIEstimation[];
  results: Results | null;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  generateAIEstimations: () => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    metalType: '',
    productionRoute: '',
    energySource: '',
    transportMode: '',
    endOfLife: '',
  });

  const [aiEstimations, setAIEstimations] = useState<AIEstimation[]>([]);
  const [results, setResults] = useState<Results | null>(null);

  const updateAssessmentData = (data: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...data }));
  };

  const generateAIEstimations = () => {
    const estimations: AIEstimation[] = [];
    
    if (!assessmentData.quantity) {
      estimations.push({
        parameter: 'Quantity',
        predictedValue: '1000 tons',
        confidence: 0.85,
        reasoning: 'Based on typical industrial batch sizes for ' + assessmentData.metalType
      });
    }

    if (!assessmentData.region) {
      estimations.push({
        parameter: 'Region',
        predictedValue: 'Europe',
        confidence: 0.75,
        reasoning: 'Inferred from energy mix and transport preferences'
      });
    }

    setAIEstimations(estimations);
  };

  const calculateResults = () => {
    // Mock calculation based on input parameters
    const baseEmissions = getBaseEmissions(assessmentData.metalType);
    const productionMultiplier = assessmentData.productionRoute === 'Recycled' ? 0.3 : 1.0;
    const energyMultiplier = getEnergyMultiplier(assessmentData.energySource);
    const transportMultiplier = getTransportMultiplier(assessmentData.transportMode);

    const carbonFootprint = baseEmissions * productionMultiplier * energyMultiplier * transportMultiplier;
    const recycledContent = assessmentData.productionRoute === 'Recycled' ? 85 : 15;
    const resourceEfficiency = 100 - (carbonFootprint / baseEmissions) * 50;
    const circularityIndex = calculateCircularityIndex(assessmentData);

    const recommendations = generateRecommendations(assessmentData, {
      carbonFootprint,
      recycledContent,
      resourceEfficiency,
      circularityIndex
    });

    setResults({
      carbonFootprint: Math.round(carbonFootprint),
      recycledContent: Math.round(recycledContent),
      resourceEfficiency: Math.round(Math.max(0, resourceEfficiency)),
      circularityIndex: Math.round(circularityIndex),
      recommendations
    });
  };

  const resetAssessment = () => {
    setAssessmentData({
      metalType: '',
      productionRoute: '',
      energySource: '',
      transportMode: '',
      endOfLife: '',
    });
    setAIEstimations([]);
    setResults(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        assessmentData,
        aiEstimations,
        results,
        updateAssessmentData,
        generateAIEstimations,
        calculateResults,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}

// Helper functions
function getBaseEmissions(metalType: string): number {
  const emissions = {
    'Aluminium': 11500,
    'Copper': 3800,
    'Lithium': 15000,
  };
  return emissions[metalType as keyof typeof emissions] || 5000;
}

function getEnergyMultiplier(energySource: string): number {
  const multipliers = {
    'Coal': 1.5,
    'Mixed': 1.0,
    'Hydro': 0.6,
    'Renewable': 0.4,
  };
  return multipliers[energySource as keyof typeof multipliers] || 1.0;
}

function getTransportMultiplier(transportMode: string): number {
  const multipliers = {
    'Air': 1.8,
    'Road': 1.3,
    'Rail': 1.1,
    'Ship': 1.0,
  };
  return multipliers[transportMode as keyof typeof multipliers] || 1.0;
}

function calculateCircularityIndex(data: AssessmentData): number {
  let index = 0;
  
  if (data.productionRoute === 'Recycled') index += 40;
  if (data.endOfLife === 'Recycle') index += 35;
  if (data.endOfLife === 'Reuse') index += 30;
  if (data.energySource === 'Renewable') index += 15;
  if (data.energySource === 'Hydro') index += 10;
  
  return Math.min(100, index + 20); // Base score of 20
}

function generateRecommendations(data: AssessmentData, results: Omit<Results, 'recommendations'>): string[] {
  const recommendations: string[] = [];

  if (data.productionRoute === 'Raw') {
    recommendations.push('Switch to recycled content to reduce emissions by up to 70%');
  }

  if (data.energySource === 'Coal') {
    recommendations.push('Transition to renewable energy sources to cut carbon footprint by 60%');
  }

  if (data.transportMode === 'Air') {
    recommendations.push('Consider rail or ship transport to reduce logistics emissions by 40-80%');
  }

  if (data.endOfLife === 'Landfill') {
    recommendations.push('Implement recycling programs to improve circularity index significantly');
  }

  if (results.circularityIndex < 50) {
    recommendations.push('Focus on circular design principles to achieve better sustainability scores');
  }

  return recommendations;
}