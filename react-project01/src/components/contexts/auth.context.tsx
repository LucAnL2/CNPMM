import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  appLoading: boolean;
  setAuth: (auth: { isAuthenticated: boolean; user: User }) => void;
  setAppLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: { email: "", name: "" },
  appLoading: false,
  setAuth: () => {},
  setAppLoading: () => {},
});

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; user: User }>({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });

  const [appLoading, setAppLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        appLoading,
        setAuth,
        setAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
