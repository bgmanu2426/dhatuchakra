# Sustainability Command Centre for India's Mineral Future

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An AI-powered Life Cycle Assessment (LCA) platform developed for the **Smart India Hackathon 2025** in collaboration with the **Ministry of Mines, Government of India**. This tool revolutionizes sustainability assessments in the mining sector by focusing on circularity principles, responsible extraction, and global competitiveness.

## 🏆 Smart India Hackathon 2025

**Problem Statement:** Develop an intelligent platform for lifecycle assessment of mineral production processes, emphasizing circular economy principles and AI-driven insights for sustainable mining practices.

**Ministry Partner:** Ministry of Mines, Government of India

**Theme:** Digital India for New India - Sustainable Mining & Circular Economy

**Objective:** Empower decision-makers with data-driven tools to monitor mineral clusters, carbon budgets, and district-level readiness for critical minerals, while promoting transparent ESG-ready reporting.

## 🌟 Key Features

### 🔄 Circularity Focus
- Assess the circular potential of metal production processes
- Track land reclamation, water stewardship, and waste-to-resource pathways
- Benchmark smelting and refining through AI-led lifecycle assessments

### 🤖 AI-Powered Insights
- Intelligent predictions and recommendations based on real-time data
- Scenario planning with AI-augmented decision support
- Automated reporting for ESG compliance

### 🛡️ Comprehensive LCA
- Full lifecycle assessment from extraction to end-of-life
- Integration of geological survey data, emission factors, and ore grade information
- Customizable workflows for regional minerals and policy mandates

### ⚡ Quick Results
- Generate detailed reports and visualizations in minutes
- Real-time dashboards for policy makers and public sector units
- 6x faster insights with AI-driven analysis

## 🏗️ Architecture & Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

### Backend & Data
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Database for user data and assessments
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication and authorization

### AI & Analytics
- **OpenAI API** - AI-powered insights and chat functionality
- **Chart.js** - Data visualization
- **React Google Charts** - Advanced charting components
- **Sankey Diagrams** - Flow visualization for circular processes

### Additional Libraries
- **bcryptjs** - Password hashing
- **jsPDF** - Report generation
- **html2canvas** - Screenshot functionality
- **React Hot Toast** - User notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bgmanu2426/lca-sih.git
   cd lca-sih
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### User Journey
1. **Registration/Login** - Create an account or sign in
2. **Input Assessment** - Enter mineral production data and parameters
3. **AI Estimation** - Get AI-powered predictions and recommendations
4. **View Results** - Analyze comprehensive LCA reports and visualizations
5. **Generate Report** - Download detailed PDF reports for stakeholders

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user info
- `POST /api/gemini-chat` - AI-powered chat for insights
- `POST /api/insights` - Generate LCA insights and recommendations

## 🎯 Impact & Objectives

### For Policy Makers
- Monitor mineral clusters and carbon budgets
- Track district-level readiness for critical minerals
- Ensure compliance with MMDR Act and National Mineral Policy 2019

### For Public Sector Units
- Digitize mine-to-market workflows
- Access auditable dashboards and improvement roadmaps
- Benchmark against national sustainability targets

### For Innovation Partners
- Collaborate on Smart India Hackathon pilots
- Scale sustainable mining technologies across India
- Contribute to G20 critical mineral roadmaps



## 👥 Team

Developed by Smart India Hackathon 2025 participants.

**Project Lead:** [Lakshminarayana BG](https://github.com/bgmanu2426)

**Contributors:**
- [Ramya RK](https://github.com/Ramyark818)
- [Siddesh B](https://github.com/Siddesh6)
- [Sneha HM](https://github.com/snehahm98)
- [KM Susheela](https://github.com/Susheela-KM)

## 🙏 Acknowledgments

- **Ministry of Mines, Government of India** - For the visionary problem statement
- **Smart India Hackathon 2025** - For providing the platform for innovation
