import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Dashboard from './components/Dashboard';
import Purchases from './components/Purchases';
import PurchasesPage from './components/PurchasesPage';
import TransferPage from './components/TransferPage';
import AssignmentsPage from './components/AssignmentsPage';
import Navbar from './components/Navbar';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
