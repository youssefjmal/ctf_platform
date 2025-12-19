import React, { createContext, useState, useEffect  } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  refreshUser: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export type { AuthContextType };