import { createContext, useContext } from "react";
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
