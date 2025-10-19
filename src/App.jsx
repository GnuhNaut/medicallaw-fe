import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

import FloatingActionButton from './components/FloatingActionButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';

function App() {
  return (
    <Router>
      <ScrollProgressBar />
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingActionButton />
    </Router>
  );
}

export default App;