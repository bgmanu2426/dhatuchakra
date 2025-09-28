import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number;
  unit: string;
  icon?: string;
  trend: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export function MetricsCard({ title, value, unit, icon, trend, description }: MetricsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const TrendIcon = trend === 'positive' ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl">{icon ?? ''}</div>
        <div className={`p-2 rounded-full ${getTrendColor()}`}>
          <TrendIcon className="h-4 w-4" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      <div className="flex items-baseline space-x-2 mb-3">
        <span className="text-3xl font-bold text-gray-900">
          {value.toLocaleString()}
        </span>
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      
  {description && <p className="text-sm text-gray-600">{description}</p>}
      
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            trend === 'positive' ? 'bg-green-500' : trend === 'negative' ? 'bg-red-500' : 'bg-gray-500'
          }`}
          style={{ width: `${Math.min(100, (value / (unit === '%' ? 100 : unit === 'Score' ? 100 : 15000)) * 100)}%` }}
        />
      </div>
    </div>
  );
}