"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/ui/Navigation';
import { HomePage } from '@/components/HomePage';
import { InputPage } from '@/components/InputPage';
import { AIEstimationPage } from '@/components/AIEstimationPage';
import { ResultsPage } from '@/components/ResultsPage';
import { ReportPage } from '@/components/ReportPage';
import { AboutPage } from '@/components/AboutPage';
import { AdminPage } from '@/components/AdminPage';
import { AssessmentProvider } from '@/context/AssessmentContext';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/input" element={<InputPage />} />
              <Route path="/ai-estimation" element={<AIEstimationPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AssessmentProvider>
  );
}

export default App;