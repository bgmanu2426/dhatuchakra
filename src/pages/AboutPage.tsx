import { Leaf, Target, Users, TrendingUp, BookOpen, Mail } from 'lucide-react';

export function AboutPage() {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: 'Precision Analysis',
      description: 'Advanced LCA calculations with industry-standard methodologies and real-time impact assessment.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'AI-Powered Insights',
      description: 'Machine learning algorithms predict missing parameters and suggest optimization strategies.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Multi-Stakeholder',
      description: 'Designed for metallurgists, engineers, sustainability officers, and decision makers.'
    }
  ];

  const principles = [
    {
      title: 'Circular Economy',
      description: 'Moving from linear take-make-dispose models to circular systems that regenerate resources.'
    },
    {
      title: 'Life Cycle Thinking',
      description: 'Considering environmental impacts across the entire product lifecycle from cradle to grave.'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Using quantitative analysis to support evidence-based sustainability strategies.'
    },
    {
      title: 'Continuous Improvement',
      description: 'Enabling iterative optimization through comprehensive impact measurement and monitoring.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About AI-LCA Tool
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Revolutionizing sustainability assessment through intelligent automation 
            and circular economy principles
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To democratize Life Cycle Assessment by making it accessible, intelligent, and actionable 
            for organizations transitioning to circular economy models. We believe that every sustainability 
            decision should be informed by comprehensive environmental impact data.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What is LCA? */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Life Cycle Assessment</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Life Cycle Assessment (LCA) is a systematic methodology for evaluating the environmental 
                impacts of products, processes, or services throughout their entire life cycle. From raw 
                material extraction through manufacturing, use, and end-of-life treatment, LCA provides 
                a comprehensive view of environmental performance.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Goal & Scope:</strong> Define the purpose and boundaries of the assessment
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Inventory Analysis:</strong> Quantify inputs, outputs, and emissions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Impact Assessment:</strong> Evaluate potential environmental effects
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Interpretation:</strong> Analyze results and make informed decisions
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Circular LCA Matters</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  Traditional linear models follow a "take-make-dispose" approach that depletes 
                  natural resources and generates waste. Circular economy principles aim to:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>Minimize resource extraction through recycling and reuse</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>Maximize material utilization and efficiency</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>Eliminate waste through closed-loop systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>Regenerate natural systems wherever possible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Sustainability Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Industries */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Target Industries</h2>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Currently optimized for metal production industries with plans to expand to other sectors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Metal Processing</h3>
              <p className="text-sm text-gray-600">Aluminum, copper, lithium, and other metal production facilities</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Energy-Intensive Industries</h3>
              <p className="text-sm text-gray-600">Manufacturing sectors with significant energy consumption</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Recycling Operations</h3>
              <p className="text-sm text-gray-600">Waste management and material recovery facilities</p>
            </div>
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Development Roadmap</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phase 1: Metal Industry Focus</h3>
                <p className="text-gray-600">Comprehensive LCA for aluminum, copper, and lithium processing</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phase 2: Advanced AI Integration</h3>
                <p className="text-gray-600">Enhanced prediction models and real-time optimization suggestions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phase 3: Multi-Industry Expansion</h3>
                <p className="text-gray-600">Extension to plastics, textiles, electronics, and other manufacturing sectors</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phase 4: Ecosystem Integration</h3>
                <p className="text-gray-600">API connectivity with ERP systems, IoT sensors, and supply chain platforms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Access comprehensive guides, API documentation, and best practices for implementing 
              circular LCA in your organization.
            </p>
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              View Documentation
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Get Support</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Need help with implementation or have questions about methodology? Our sustainability 
              experts are here to assist.
            </p>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}