import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TouristForm from './Pages/TouristForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TouristForm />} />
      </Routes>
    </Router>
  );
}

export default App;
