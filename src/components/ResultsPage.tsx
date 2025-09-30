"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowLeft, Target, Leaf, Zap, TrendingUp, MessageCircle, Send, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { MetricsCard } from './ui/MetricsCard';
import { ComparisonChart } from './ui/ComparisonChart';
import { SankeyDiagram } from './ui/SankeyDiagram';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function formatInlineText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function renderAssistantContent(content: string) {
  const blocks = content.trim().split(/\n{2,}/);

  return blocks.map((block, blockIndex) => {
    const rawLines = block.split('\n').map(line => line.trim()).filter(Boolean);

    if (!rawLines.length) {
      return null;
    }

    const isBulleted = rawLines.every(line => /^[-*•]/.test(line));
    const isNumbered = rawLines.every(line => /^\d+[\.\)]\s+/.test(line));

    if (isBulleted || isNumbered) {
      if (isNumbered) {
        return (
          <ol
            key={`list-${blockIndex}`}
            className="text-sm text-gray-800 leading-relaxed list-decimal ml-5 space-y-2"
          >
            {rawLines.map((line, lineIndex) => {
              const cleaned = line.replace(/^\d+[\.\)]\s*/, '');
              return (
                <li key={`list-item-${blockIndex}-${lineIndex}`} className="pl-1">
                  {formatInlineText(cleaned)}
                </li>
              );
            })}
          </ol>
        );
      }

      return (
        <ul
          key={`list-${blockIndex}`}
          className="text-sm text-gray-800 leading-relaxed space-y-2"
        >
          {rawLines.map((line, lineIndex) => {
            const cleaned = line.replace(/^[-*•]\s*/, '');
            return (
              <li
                key={`list-item-${blockIndex}-${lineIndex}`}
                className="flex gap-2"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span className="flex-1">{formatInlineText(cleaned)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p key={`para-${blockIndex}`} className="text-sm text-gray-800 leading-relaxed mb-2 last:mb-0">
        {formatInlineText(block)}
      </p>
    );
  });
}

export function ResultsPage() {
  const { assessmentData, results: contextResults, calculateResults } = useAssessment();
  const [activeTab, setActiveTab] = useState('overview');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (assessmentData.metalType && !contextResults) {
      calculateResults();
    }
  }, [assessmentData, contextResults, calculateResults]);

  const results = contextResults;

  if (!assessmentData.metalType) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data</h1>
          <p className="text-gray-600 mb-8">Please complete an assessment first.</p>
          <Link
            href="/input"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
          <p className="text-gray-700">Preparing your assessment results...</p>
        </div>
      </div>
    );
  }

  const conversationHint =
    "Ask follow-up questions like 'How can I reduce water usage further?' or 'Which supply-chain change matters most?'.";

  const suggestedPrompts = [
    `What if we switch from ${assessmentData.energySource} to nuclear energy?`,
    `Which recommendation should we prioritize to boost circularity beyond ${results.circularityIndex}?`,
    `How can we cut water usage below ${results.waterUsage} litres per batch?`
  ];

  const handleSend = async (messageOverride?: string) => {
    const rawInput = messageOverride ?? chatInput;
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setChatInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages,
          results,
          assessment: assessmentData,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Unable to generate insights.');
      }

      const data = await response.json();
      if (!data.reply) {
        throw new Error('No response received from AI Agent.');
      }

      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Failed to contact AI Agent API');
      setMessages(prev => prev.slice(0, -1));
      setChatInput(trimmed);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSending) {
      handleSend();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (isSending) return;
    setChatInput(prompt);
    handleSend(prompt);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isSending) {
        handleSend();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assessment Results</h1>
            <p className="text-gray-800 mt-1 sm:mt-2 text-sm sm:text-base">
              LCA for {assessmentData.metalType} - {assessmentData.productionRoute} Production
            </p>
          </div>
          <div className="flex space-x-3 sm:space-x-4">
            <Link
              href="/input"
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
            >
              Generate Report
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'detailed', label: 'Detailed Analysis' },
              { id: 'recommendations', label: 'Recommendations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Carbon Footprint"
                value={results.carbonFootprint}
                unit="kg CO₂ eq"
                icon={<Leaf className="h-5 w-5 text-green-600" />}
                trend="negative"
                trendLabel="-15% vs. industry average"
                description="Current footprint per unit of output"
              />
              <MetricsCard
                title="Energy Use"
                value={results.energyConsumption}
                unit="MJ"
                icon={<Zap className="h-5 w-5 text-yellow-400" />}
                trend="positive"
                trendLabel="+8% vs. previous assessment"
                description="Total energy consumed per batch"
              />
              <MetricsCard
                title="Circularity Index"
                value={results.circularityIndex}
                unit="%"
                icon={<Target className="h-5 w-5 text-red-600" />}
                trend="positive"
                trendLabel="+12% improvement potential"
                maxValue={100}
                description="Overall circularity performance"
              />
              <MetricsCard
                title="Water Usage"
                value={results.waterUsage}
                unit="L"
                icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
                trend="negative"
                trendLabel="-5% vs. benchmark"
                description="Fresh water consumption"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Comparison</h3>
                <ComparisonChart results={results} assessmentData={assessmentData} />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Flow</h3>
                <SankeyDiagram assessmentData={assessmentData} />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Configuration</h4>
                  <ul className="text-gray-800 space-y-1 text-sm">
                    <li><b>Material:</b> {assessmentData.metalType}</li>
                    <li><b>Route:</b> {assessmentData.productionRoute}</li>
                    <li><b>Energy:</b> {assessmentData.energySource}</li>
                    <li><b>Transport:</b> {assessmentData.transportMode}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Key Insights</h4>
                  <ul className="text-gray-800 space-y-1 text-sm">
                    <li><b>Circularity:</b> {results.circularityIndex}/100</li>
                    <li><b>Recycled Content:</b> {results.recycledContent}%</li>
                    <li><b>Waste Generated:</b> {results.wasteGenerated} kg</li>
                    <li><b>Opportunities:</b> {results.recommendations.length} identified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Analysis Tab */}
        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Environmental Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Raw Material Extraction</span>
                  <span className="text-gray-800">4.2 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Manufacturing Process</span>
                  <span className="text-gray-800">6.8 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">Transportation</span>
                  <span className="text-gray-800">1.2 kg CO₂ eq</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-black">End-of-Life</span>
                  <span className="text-gray-800">0.3 kg CO₂ eq</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Recommendations</h3>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10">
          <button
            onClick={() => setShowChat(prev => !prev)}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Get more insights
          </button>

          {showChat && (
            <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Insights Assistant</h3>
                  <p className="text-sm text-gray-600">{conversationHint}</p>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close insights assistant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 pt-4 flex flex-wrap gap-2 border-b border-gray-100 bg-gray-50">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={`prompt-${index}`}
                    type="button"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    disabled={isSending}
                    className="text-xs sm:text-sm px-3 py-2 rounded-full border border-green-300 bg-white text-green-700 hover:bg-green-50 transition-colors disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="max-h-80 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900 border border-gray-200'
                      }`}
                    >
                      {message.role === 'assistant'
                        ? renderAssistantContent(message.content)
                        : message.content}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating insights...</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-end space-x-3">
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    placeholder="Ask a question about your results..."
                    className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="submit"
                    disabled={isSending || chatInput.trim().length === 0}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}