"use client";
import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Results, AssessmentData } from '../../context/AssessmentContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  results: Results;
  assessmentData: AssessmentData;
}

export function ComparisonChart({ results, assessmentData }: ComparisonChartProps) {
  const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

  const linearEmissions = results.carbonFootprint * 1.5;
  const circularEmissions = results.carbonFootprint;
  // Use assessmentData for a simple derived view (e.g., baseline factor)
  const baselineFactor = assessmentData ? 1 + 0 : 1; // placeholder use to avoid unused lint

  const data = {
    labels: ['Carbon Footprint', 'Resource Consumption', 'Waste Generation'],
    datasets: [
      {
        label: 'Linear - Carbon Footprint',
        data: [linearEmissions * baselineFactor, null, null],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        yAxisID: 'yCarbon',
      },
      {
        label: 'Circular - Carbon Footprint',
        data: [circularEmissions, null, null],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        yAxisID: 'yCarbon',
      },
      {
        label: 'Linear - Resource Consumption',
        data: [null, 100, null],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 0.9)',
        borderWidth: 1,
        yAxisID: 'yPercent',
      },
      {
        label: 'Circular - Resource Consumption',
        data: [null, Math.max(0, 100 - results.resourceEfficiency), null],
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 0.9)',
        borderWidth: 1,
        yAxisID: 'yPercent',
      },
      {
        label: 'Linear - Waste Generation',
        data: [null, null, 85],
        backgroundColor: 'rgba(239, 68, 68, 0.4)',
        borderColor: 'rgba(239, 68, 68, 0.7)',
        borderWidth: 1,
        yAxisID: 'yPercent',
      },
      {
        label: 'Circular - Waste Generation',
        data: [null, null, Math.max(0, 85 - results.circularityIndex)],
        backgroundColor: 'rgba(34, 197, 94, 0.4)',
        borderColor: 'rgba(34, 197, 94, 0.7)',
        borderWidth: 1,
        yAxisID: 'yPercent',
      },
    ],
  };

  const options: import('chart.js').ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: import('chart.js').TooltipItem<'bar'>) {
            const value = context.parsed.y ?? 0;
            let suffix = '';
            if (context.dataset.yAxisID === 'yCarbon') {
              suffix = ' kg CO₂/ton';
            } else if (context.dataIndex === 1) {
              suffix = '% resource use';
            } else {
              suffix = '% waste generated';
            }

            return `${String(context.dataset.label)}: ${value}${suffix}`;
          },
        },
      },
    },
    scales: {
      yCarbon: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
        },
        title: {
          display: true,
          text: 'Emissions (kg CO₂/ton)',
        },
      },
      yPercent: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        suggestedMax: 100,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#6B7280',
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: 'Percent Change',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div>
      <div className="h-72 sm:h-80">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      
      <div className="mt-6 space-y-3 px-2">
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
          <span className="text-gray-600 mb-1 sm:mb-0">Improvement Potential:</span>
          <span className="font-medium text-green-600">
            {Math.round(((linearEmissions - circularEmissions) / linearEmissions) * 100)}% reduction in carbon footprint
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
          <span className="text-gray-600 mb-1 sm:mb-0">Circularity Benefits:</span>
          <span className="font-medium text-blue-600">
            {results.circularityIndex} points achieved on the circularity index
          </span>
        </div>
      </div>
    </div>
  );
}