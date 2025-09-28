"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  // Navigation links based on authentication state
  const navItems: { path: string; label: string }[] = user
    ? [
        { path: '/input', label: 'New Assessment' },
        { path: '/results', label: 'Results' },
        { path: '/report', label: 'Reports' },
        { path: '/about', label: 'About' },
      ]
    : [
        { path: '/login', label: 'Login' },
        { path: '/signup', label: 'Sign up' },
        { path: '/about', label: 'About' },
      ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await logout();
    // The middleware will handle redirection to "/" when user becomes null
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dhatuchakra</h1>
              <p className="text-xs text-gray-500">AI based Circular Assessments Tool</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {!loading && (
              user ? (
                <>
                  {/* Nav links for authenticated users */}
                  <div className="flex items-center space-x-3 mr-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.path)
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {!loading && (
              user ? (
                <>
                  {/* Show navigation items for authenticated users */}
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
