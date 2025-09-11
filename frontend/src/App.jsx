import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;

