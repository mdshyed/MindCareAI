import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';
import Assessment from './pages/Assessment';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Counseling from './pages/Counseling';
import Emergency from './pages/Emergency';
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';
import CounselorDashboard from './pages/CounselorDashboard';
import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px' },
                    success: { iconTheme: { primary: '#a855f7', secondary: '#fff' } },
                    error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                }}
            />
            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/community" element={<Community />} />
                <Route path="/emergency" element={<Emergency />} />

                {/* Authenticated */}
                <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
                <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
                <Route path="/counseling" element={<ProtectedRoute roles={['student']}><Counseling /></ProtectedRoute>} />

                {/* Role-specific dashboards */}
                <Route path="/student-dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
                <Route path="/counselor-dashboard" element={<ProtectedRoute roles={['counselor']}><CounselorDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Admin /></ProtectedRoute>} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
