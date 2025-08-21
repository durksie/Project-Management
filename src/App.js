import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the page component
import page from './components/page';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route that shows your Page.tsx content */}
        <Route path="/" element={<page />} />
      </Routes>
    </Router>
  );
}

export default App;
