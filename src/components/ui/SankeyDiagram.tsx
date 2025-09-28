"use client";
import React, { useMemo } from 'react';
import { AssessmentData } from '../../context/AssessmentContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type ChartDataset,
  type ScriptableContext,
} from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import { Chart } from 'react-chartjs-2';

interface SankeyDiagramProps {
  assessmentData: AssessmentData;
}

// Google Charts Sankey does not support cycles. Keep the graph acyclic.
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, SankeyController, Flow);

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ assessmentData }) => {
  const { metalType } = assessmentData;

  const metal = metalType || 'Metal';

  // Acyclic flow data for chartjs-chart-sankey requires arrays of {from, to, flow}
  const flows = useMemo(
    () => [
      { from: 'Raw Material', to: `Primary Production (${metal})`, flow: 100 },
      { from: `Primary Production (${metal})`, to: 'Product Manufacturing', flow: 80 },
      { from: 'Energy', to: `Primary Production (${metal})`, flow: 20 },
      { from: 'Product Manufacturing', to: 'Use Phase', flow: 80 },
      { from: 'Use Phase', to: 'End of Life', flow: 80 },
      { from: 'End of Life', to: 'Recycling', flow: 60 },
      { from: 'End of Life', to: 'Landfill', flow: 20 },
      { from: 'Recycling', to: `Secondary Production (${metal})`, flow: 60 },
    ],
    [metal]
  );

  const dataset: ChartDataset<'sankey', Flow[]> = {
    label: 'Material Flow',
    data: flows,
    // use scriptable color functions to satisfy TS types
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    colorFrom: (ctx: ScriptableContext<'sankey'>) => 'rgba(34, 197, 94, 0.8)' as unknown as string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    colorTo: (ctx: ScriptableContext<'sankey'>) => 'rgba(59, 130, 246, 0.8)' as unknown as string,
    borderWidth: 0,
    nodeWidth: 20 as unknown as number,
    nodePadding: 12 as unknown as number,
  } as unknown as ChartDataset<'sankey', Flow[]>;

  const data: ChartData<'sankey', Flow[], string> = {
    datasets: [dataset],
  };

  const options: ChartOptions<'sankey'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    layout: { padding: 0 },
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <Chart type='sankey' data={data} options={options} />
    </div>
  );
};
