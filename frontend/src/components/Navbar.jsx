import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">Niti IAS</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                {t('home')}
              </a>
              <a href="/courses" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                {t('courses')}
              </a>
              <a href="/blog" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                {t('blog')}
              </a>
              {user?.role === 'admin' && (
                <a href="/admin" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('admin')}
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <a href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  {t('login')}
                </a>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              {t('home')}
            </a>
            <a href="/courses" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              {t('courses')}
            </a>
            <a href="/blog" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              {t('blog')}
            </a>
            {user?.role === 'admin' && (
              <a href="/admin" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                {t('admin')}
              </a>
            )}
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <User className="h-8 w-8 text-gray-400" />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-3">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-300"
                  >
                    {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <a href="/login" className="bg-primary-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">
                {t('login')}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;