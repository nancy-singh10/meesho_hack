import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import EmployerLogin from './pages/EmployerLogin';
import AdminLogin from './pages/AdminLogin';
import VerifyOTP from './pages/VerifyOTP';
import DashboardHome from './pages/dashboard/DashboardHome';
import PostJob from './pages/dashboard/PostJob';
import MatchesView from './pages/dashboard/MatchesView';
import ContractsView from './pages/dashboard/ContractsView';
import EmployerJobs from './pages/dashboard/EmployerJobs';
import MyWorkers from './pages/dashboard/MyWorkers';
import AdminDashboard from './pages/admin/AdminDashboard';
import WhatsappSimulator from './pages/WhatsappSimulator';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerWallet from './pages/worker/WorkerWallet';
import WorkerJobs from './pages/worker/WorkerJobs';
import WorkerFraudScore from './pages/worker/WorkerFraudScore';
import WorkerNegotiation from './pages/worker/WorkerNegotiation';
import WorkerContract from './pages/worker/WorkerContract';
import WorkerPayments from './pages/worker/WorkerPayments';
import WorkerInsurance from './pages/worker/WorkerInsurance';
import WorkerAttendance from './pages/worker/WorkerAttendance';

import PublicJobs from './pages/PublicJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<PublicJobs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/post-job" element={<PostJob />} />
        <Route path="/dashboard/jobs" element={<EmployerJobs />} />
        <Route path="/dashboard/contracts" element={<ContractsView />} />
        <Route path="/dashboard/jobs/:id/matches" element={<MatchesView />} />
        <Route path="/dashboard/workers" element={<MyWorkers />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/whatsapp" element={<WhatsappSimulator />} />
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/worker/wallet" element={<WorkerWallet />} />
        <Route path="/worker/jobs" element={<WorkerJobs />} />
        <Route path="/worker/fraud-score" element={<WorkerFraudScore />} />
        <Route path="/worker/negotiation" element={<WorkerNegotiation />} />
        <Route path="/worker/contract" element={<WorkerContract />} />
        <Route path="/worker/payments" element={<WorkerPayments />} />
        <Route path="/worker/insurance" element={<WorkerInsurance />} />
        <Route path="/worker/attendance" element={<WorkerAttendance />} />
      </Routes>
    </Router>
  );
}

export default App;
