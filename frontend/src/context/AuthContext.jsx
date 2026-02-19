import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* LOGIN */
  const login = async ({ token, role }) => {
    const authData = { token, role };
    localStorage.setItem("auth", JSON.stringify(authData));
    setAuth(authData);

    // after login fetch user profile
    await fetchMe();
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    setUser(null);
  };

  /* FETCH CURRENT USER */
  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log("Session expired");
      logout();
    } finally {
      setLoading(false);
    }
  };

  /* AUTO LOGIN AFTER REFRESH */
  useEffect(() => {
    if (auth?.token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, []);

  /* HELPERS */
  const isLoggedIn = !!auth?.token && !!user;
  const isAdmin = user?.role === "superadmin";

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        login,
        logout,
        isLoggedIn,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
