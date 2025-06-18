import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PurchasesPage from './components/PurchasesPage';
import TransferPage from './components/TransferPage';
import AssignmentsPage from './components/AssignmentsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/purchases" component={PurchasesPage} />
        <Route path="/transfers" component={TransferPage} />
        <Route path="/assignments" component={AssignmentsPage} />
      </Routes>
    </Router>
  );
}

export default App;
