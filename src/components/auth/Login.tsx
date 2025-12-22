import { createContext } from "react";
import type { ReactNode } from "react";
export type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const login = async (email: string, password: string) => {
    // TODO: replace with real API call
    if (!email || !password) {
      throw new Error("Missing credentials");
    }
  };

  const logout = () => {
    // logout logic
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import './Login.css';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) navigate('/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <Input type="email" name="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" name="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      </form>
    </div>
  );
};

export default Login; 
