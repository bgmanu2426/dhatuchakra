import { Chart } from "react-google-charts";
import { AssessmentData } from '../context/AssessmentContext';

interface SankeyDiagramProps {
  assessmentData: AssessmentData;
}

export function SankeyDiagram({ assessmentData }: SankeyDiagramProps) {

  function getEndOfLifeLabel(endOfLife: string): string {
    switch (endOfLife) {
      case 'Recycle': return 'Recycling';
      case 'Reuse': return 'Reuse';
      case 'Landfill': return 'Disposal';
      case 'Incineration': return 'Energy Recovery';
      default: return 'End of Life';
    }
  }

  const data = [
    ['From', 'To', 'Weight'],
    ['Raw Materials', 'Production', assessmentData.productionRoute === 'Raw' ? 80 : 20],
    ['Recycled Materials', 'Production', assessmentData.productionRoute === 'Recycled' ? 80 : 20],
    ['Production', 'Use Phase', 100],
    ['Use Phase', getEndOfLifeLabel(assessmentData.endOfLife), 100],
  ];

  const options = {
    sankey: {
      node: {
        colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'],
      },
      link: {
        colorMode: 'gradient',
        colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'],
      },
    },
  };

  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}