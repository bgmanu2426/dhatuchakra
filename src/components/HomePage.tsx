import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, TrendingUp, Shield, Zap } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      title: 'Circularity Focus',
      description: 'Assess the circular potential of your metal production processes'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'AI-Powered Insights',
      description: 'Get intelligent predictions and recommendations based on your data'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: 'Comprehensive LCA',
      description: 'Full lifecycle assessment from extraction to end-of-life'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: 'Quick Results',
      description: 'Generate detailed reports and visualizations in minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Driven <span className="text-green-600">LCA Tool</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionize your sustainability assessments with intelligent 
            Life Cycle Analysis focused on circularity principles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/input"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg shadow-lg"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold text-lg border border-green-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Circular LCA Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
              <p className="text-gray-600">Reduction in emissions through recycling</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600">Resource efficiency improvement potential</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
              <p className="text-gray-600">Cost savings through circular practices</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Sustainability Strategy?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join leading companies using AI-powered LCA for better decisions
          </p>
          <Link
            to="/input"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Begin Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}