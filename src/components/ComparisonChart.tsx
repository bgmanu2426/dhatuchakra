import { useEffect, useRef } from 'react';
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
import { Results, AssessmentData } from '../context/AssessmentContext';

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

  // Calculate linear scenario (worst case)
  const linearEmissions = results.carbonFootprint * 1.5; // Assume 50% worse for linear
  const circularEmissions = results.carbonFootprint;

  const data = {
    labels: ['Carbon Footprint', 'Resource Consumption', 'Waste Generation'],
    datasets: [
      {
        label: 'Linear Process',
        data: [
          linearEmissions,
          100, // Normalized resource consumption
          85   // Normalized waste generation
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Current (Circular) Process',
        data: [
          circularEmissions,
          100 - results.resourceEfficiency,
          Math.max(0, 85 - results.circularityIndex)
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
          label: function(context: any) {
            let suffix = '';
            if (context.dataIndex === 0) suffix = ' kg CO₂/ton';
            else if (context.dataIndex === 1) suffix = '% resource use';
            else suffix = '% waste generated';
            
            return context.dataset.label + ': ' + context.parsed.y + suffix;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
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
    <div className="h-80">
      <Bar ref={chartRef} data={data} options={options} />
      
      <div className="mt-4 grid grid-cols-1 gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Improvement Potential:</span>
          <span className="font-medium text-green-600">
            {Math.round(((linearEmissions - circularEmissions) / linearEmissions) * 100)}% reduction
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Circularity Benefits:</span>
          <span className="font-medium text-blue-600">
            {results.circularityIndex} points achieved
          </span>
        </div>
      </div>
    </div>
  );
}