import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Demo state, connect to your auth logic
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Mock logout function - replace with your actual auth logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
    console.log("User logged out");
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white shadow-lg transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z"></path>
              </svg>
              <span className="text-xl font-bold">Server Management</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-6">
              
              <Link to="/server" className="hover:text-blue-200 transition-colors">Server Monitor</Link>
              <Link to="/db" className="hover:text-blue-200 transition-colors">DB Monitor</Link>
                <Link to="/users" className="hover:text-blue-200 transition-colors">Users</Link>
                <Link to="/databases" className="hover:text-blue-200 transition-colors">Databases</Link>
                <div className="group relative">
                  <button className="hover:text-blue-200 transition-colors flex items-center">
                    URLs
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2 z-10 hidden group-hover:block">
                    <Link to="/urls" className="block px-4 py-2 hover:bg-blue-100 transition-colors">URL List</Link>
                    <Link to="/add-url" className="block px-4 py-2 hover:bg-blue-100 transition-colors">Add New URL</Link>
                  </div>
                </div>
                <Link to="/cron" className="hover:text-blue-200 transition-colors">Cron Jobs</Link>
                <Link to="/backups" className="hover:text-blue-200 transition-colors">Backups</Link>
                <Link to="/rdp-list" className="hover:text-blue-200 transition-colors">RDP</Link>
                <Link to="/services" className="hover:text-blue-200 transition-colors">Services</Link>
              </div>
              <div className="border-l pl-6 flex items-center space-x-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="hover:text-blue-200 transition-colors flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="hover:text-blue-200 transition-colors flex items-center"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                    <Link to="/register" className="hover:text-blue-200 transition-colors bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400">Register</Link>
                  </div>
                )}
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </button>
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className={`md:hidden mt-3 pb-2 space-y-1 rounded-md ${isDarkMode ? 'bg-blue-800' : 'bg-blue-500'}`}>
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="flex items-center px-3 py-2 hover:bg-blue-700 rounded transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left flex items-center px-3 py-2 hover:bg-blue-700 rounded transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Login</Link>
                  <Link to="/register" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Register</Link>
                </>
              )}
              <div className="border-t border-blue-400 my-1"></div>
              <Link to="/users" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Users</Link>
              <Link to="/databases" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Databases</Link>
              <Link to="/urls" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">URL List</Link>
              <Link to="/add-url" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Add New URL</Link>
              <Link to="/cron" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Cron Jobs</Link>
              <Link to="/backups" className="block px-3 py-2 hover:bg-blue-700 rounded transition-colors">Backups</Link>
            </nav>
          )}
        </div>
      </header>

      <main className={`flex-grow container mx-auto px-4 py-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} my-6 rounded-lg shadow-md transition-colors duration-300`}>
        {children}
      </main>

      <footer className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white py-4 shadow-inner transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © 2025 Server Management App. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;