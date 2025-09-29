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
  energyConsumption: number;
  waterUsage: number;
  circularityIndex: number;
  recycledContent: number;
  wasteGenerated: number;
  resourceEfficiency: number;
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
    const resourceEfficiency = Math.max(0, 100 - (carbonFootprint / baseEmissions) * 50);
    const circularityIndex = calculateCircularityIndex(assessmentData);
    const energyConsumption = estimateEnergyConsumption(assessmentData, carbonFootprint);
    const waterUsage = estimateWaterUsage(assessmentData, carbonFootprint);
    const wasteGenerated = estimateWasteGenerated(assessmentData);

    const recommendations = generateRecommendations(assessmentData, {
      carbonFootprint,
      energyConsumption,
      waterUsage,
      recycledContent,
      resourceEfficiency,
      circularityIndex,
      wasteGenerated
    });

    setResults({
      carbonFootprint: Math.round(carbonFootprint),
      energyConsumption: Math.round(energyConsumption * 10) / 10,
      waterUsage: Math.round(waterUsage * 10) / 10,
      recycledContent: Math.round(recycledContent),
      wasteGenerated: Math.round(wasteGenerated * 10) / 10,
      resourceEfficiency: Math.round(resourceEfficiency),
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

  if (results.energyConsumption > 60) {
    recommendations.push('Invest in energy-efficient equipment or heat recovery to lower overall consumption');
  }

  if (results.waterUsage > 140) {
    recommendations.push('Introduce closed-loop water systems to reduce freshwater demand');
  }

  if (results.wasteGenerated > 3) {
    recommendations.push('Adopt lean manufacturing and scrap recycling to minimize waste outputs');
  }

  return recommendations;
}

function estimateEnergyConsumption(data: AssessmentData, carbonFootprint: number): number {
  const baseEnergyMap: Record<string, number> = {
    'Aluminium': 65,
    'Copper': 55,
    'Lithium': 80,
  };

  let energy = baseEnergyMap[data.metalType] ?? 50;

  if (data.productionRoute === 'Recycled') {
    energy *= 0.7;
  }

  if (data.energySource === 'Renewable') {
    energy *= 0.85;
  } else if (data.energySource === 'Coal') {
    energy *= 1.15;
  } else if (data.energySource === 'Hydro') {
    energy *= 0.9;
  }

  if (data.transportMode === 'Air') {
    energy *= 1.05;
  }

  // Normalize slightly using carbon footprint scale
  const carbonFactor = Math.min(Math.max(carbonFootprint / 10000, 0.8), 1.2);
  return energy * carbonFactor;
}

function estimateWaterUsage(data: AssessmentData, carbonFootprint: number): number {
  const baseWaterMap: Record<string, number> = {
    'Aluminium': 150,
    'Copper': 120,
    'Lithium': 180,
  };

  let water = baseWaterMap[data.metalType] ?? 110;

  if (data.productionRoute === 'Recycled') {
    water *= 0.75;
  }

  if (data.energySource === 'Coal') {
    water *= 1.1;
  } else if (data.energySource === 'Renewable') {
    water *= 0.9;
  }

  if (data.endOfLife === 'Recycle') {
    water *= 0.95;
  }

  const footprintScaling = Math.min(Math.max(carbonFootprint / 8000, 0.7), 1.3);
  return water * footprintScaling;
}

function estimateWasteGenerated(data: AssessmentData): number {
  let waste = 2.2;

  if (data.productionRoute === 'Recycled') {
    waste *= 0.6;
  }

  if (data.endOfLife === 'Recycle' || data.endOfLife === 'Reuse') {
    waste *= 0.8;
  }

  if (data.transportMode === 'Air') {
    waste *= 1.1;
  }

  return waste;
}