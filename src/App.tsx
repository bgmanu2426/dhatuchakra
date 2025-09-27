import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { InputPage } from './pages/InputPage';
import { AIEstimationPage } from './pages/AIEstimationPage';
import { ResultsPage } from './pages/ResultsPage';
import { ReportPage } from './pages/ReportPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { AssessmentProvider } from './context/AssessmentContext';

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