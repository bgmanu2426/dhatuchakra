"use client";
import React from 'react';
import { Chart } from 'react-google-charts';
import { AssessmentData } from '../../context/AssessmentContext';

interface SankeyDiagramProps {
  assessmentData: AssessmentData;
}

// Google Charts Sankey does not support cycles. Keep the graph acyclic.
export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ assessmentData }) => {
  const { metalType } = assessmentData;

  const metal = metalType || 'Metal';

  // Acyclic flow data (no loops)
  const data: (string | number)[][] = [
    ['From', 'To', 'Weight'],
    ['Raw Material', `Primary Production (${metal})`, 100],
    [`Primary Production (${metal})`, 'Product Manufacturing', 80],
    ['Energy', `Primary Production (${metal})`, 20],
    ['Product Manufacturing', 'Use Phase', 80],
    ['Use Phase', 'End of Life', 80],
    ['End of Life', 'Recycling', 60],
    ['End of Life', 'Landfill', 20],
    // Stop here to avoid creating a loop back to earlier nodes
    ['Recycling', `Secondary Production (${metal})`, 60],
  ];

  const options = {
    sankey: {
      node: {
        colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'],
      },
      link: {
        colorMode: 'gradient' as const,
        colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'],
      },
    },
    backgroundColor: 'transparent',
  } as const;

  return (
    <Chart
      chartType="Sankey"
      chartVersion="current"
      chartPackages={["sankey"]}
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};
