import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import TouristForm from './Pages/TouristForm';
import BudgetPlan from './Pages/BudgetPlan';
import PlanDetails from './Pages/PlanDetails';

function App() {
  const globalStyle = {
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={globalStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/touristform" element={<TouristForm />} />
          <Route path="/budget-plan" element={<BudgetPlan />} />
          <Route path="/plan-detail" element={<PlanDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
