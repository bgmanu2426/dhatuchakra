"use client";
import { Leaf, ChevronRight, Building, Globe, BookOpen } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              About <span className="text-green-600">Dhatuchakra</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Advanced AI-driven life cycle assessments for circular economy principles in the metals industry
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pioneering Sustainable Metal Production Through AI Innovation
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Dhatuchakra, we believe in a future where metal production minimizes environmental impact 
              while maximizing resource efficiency. Our mission is to leverage cutting-edge AI technology to 
              transform how industries approach life cycle assessments, making sustainability accessible, 
              actionable, and economically viable.
            </p>
            <div 
              className="inline-flex items-center text-green-600 font-medium cursor-pointer hover:text-green-700"
              onClick={() => {
                toast.success('Learn more about our technology and approach');
              }}
            >
              Learn about our technology
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Leaf className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600 text-sm">
                  Promoting eco-friendly practices throughout the metal lifecycle
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Globe className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Circularity</h3>
                <p className="text-gray-600 text-sm">
                  Designing systems that eliminate waste and maximize resource reuse
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Building className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Leveraging AI to transform traditional assessment methods
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <BookOpen className="h-8 w-8 text-yellow-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600 text-sm">
                  Spreading knowledge about sustainable metal production
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Technology */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800 mb-6">
              Our Technology
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              AI-Powered Lifecycle Assessment
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Our platform combines advanced machine learning algorithms, comprehensive materials databases, 
              and intuitive visualization tools to deliver accurate, actionable insights for sustainable 
              metal production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Analysis</h3>
              <p className="text-gray-600">
                Our AI models analyze thousands of data points across the entire metal lifecycle, 
                from extraction to end-of-life management.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact Assessment</h3>
              <p className="text-gray-600">
                Comprehensive evaluation of environmental impacts including carbon footprint, 
                resource depletion, and waste generation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Optimization</h3>
              <p className="text-gray-600">
                AI-generated recommendations for process improvements, material substitutions, 
                and circularity enhancements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-0.5 text-sm font-medium text-purple-800 mb-6">
            Our Team
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meet the Experts Behind Dhatuchakra
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Our interdisciplinary team combines expertise in metallurgy, environmental science, 
            artificial intelligence, and sustainable business practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Dr. Amit Patel',
              role: 'Chief Scientist',
              bio: 'PhD in Metallurgical Engineering with 15+ years of research experience in sustainable metal production.'
            },
            {
              name: 'Sarah Johnson',
              role: 'AI Lead',
              bio: 'Expert in machine learning applications for environmental impact modeling and predictive analytics.'
            },
            {
              name: 'Rajesh Kumar',
              role: 'Sustainability Director',
              bio: 'Specialist in circular economy principles and lifecycle assessment methodologies.'
            },
            {
              name: 'Priya Sharma',
              role: 'Product Manager',
              bio: 'Focused on creating intuitive user experiences for complex environmental data analysis.'
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-green-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Metal Production Process?
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Join leading companies using Dhatuchakra to create more sustainable, 
              circular metal production processes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/input"
                className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Start Assessment
              </Link>
              <button
                onClick={() => {
                  toast.success('Contact form opened');
                }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}