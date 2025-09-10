import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("isAuth") === "true";
  });

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  useEffect(() => {
    console.log("Auth state:", isAuth);
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
