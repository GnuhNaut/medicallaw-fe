import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load các trang
const HomePage = lazy(() => import('./pages/HomePage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const MemberPage = lazy(() => import('./pages/MemberPage')); // Import trang thành viên mới

// Import các component khác
import FloatingActionButton from './components/FloatingActionButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';

function App() {
  return (
    <Router>
      <ScrollProgressBar />
      <ScrollToTop />
      <Header />
      {/* Sử dụng Suspense để hiển thị fallback UI khi trang đang được tải */}
      <Suspense fallback={<div className="text-center py-40">Đang tải trang...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Sử dụng :ticket_id làm tham số động cho trang thanh toán */}
          <Route path="/payment/:ticket_id" element={<PaymentPage />} />
          {/* Sử dụng :ticket_id làm tham số động cho trang thành viên */}
          <Route path="/member/:ticket_id" element={<MemberPage />} />
          {/* Bạn có thể thêm các route khác ở đây nếu cần */}
        </Routes>
      </Suspense>
      <Footer />
      <FloatingActionButton />
    </Router>
  );
}

export default App;