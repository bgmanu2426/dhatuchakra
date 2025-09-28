
import React from 'react';
import { Chart } from 'react-google-charts';
import { Assessment } from '../context/AssessmentContext';

interface SankeyDiagramProps {
  assessmentData: Assessment;
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ assessmentData }) => {
  const { metalType, productionRoute, energySource, transportMode, endOfLife } = assessmentData;

  const data = [
    ['From', 'To', 'Weight'],
    ['Raw Material', `Primary Production (${metalType})`, 100],
    [`Primary Production (${metalType})`, 'Product Manufacturing', 80],
    ['Energy', `Primary Production (${metalType})`, 20],
    ['Product Manufacturing', 'Use Phase', 80],
    ['Use Phase', 'End of Life', 80],
    ['End of Life', 'Recycling', 60],
    ['End of Life', 'Landfill', 20],
    ['Recycling', `Secondary Production (${metalType})`, 60],
    [`Secondary Production (${metalType})`, 'Product Manufacturing', 60],
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
};
