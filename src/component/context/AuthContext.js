import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginType, setLoginType] = useState('');

  useEffect(() => {
    // When the component mounts, check the localStorage for the login type
    const loginTypeData = localStorage.getItem('loginType');

    setLoginType(loginTypeData)
  }, []);

  const login = (type) => {
    // Implement your login logic here
    // Update the localStorage with the login type
    localStorage.setItem('loginType', loginType);
    setLoginType(type)
    // Update the authentication status
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    // Clear the login type from localStorage
    localStorage.removeItem('loginType');
    setLoginType(type)
    // Update the authentication status
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,loginType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
