import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";


interface JwtPayload {
  Email: string;
  nameid: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export default function useAuth() {
  const token = Cookies.get("react-template-app-token");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT
        const decodedToken: JwtPayload = jwtDecode(token);

        // Set the user's role from the decoded token
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserRole(null);
      }
    }
  }, [token]);

  const userLogin = (token: string) => {
    Cookies.set("react-template-app-token", token);
    setIsAuthenticated(true);

    try {
      const decodedToken: JwtPayload = jwtDecode(token);
      setUserRole(decodedToken.role);
    } catch (error) {
      console.error("Invalid token during login:", error);
      setUserRole(null);
    }
  };

  const userLogout = () => {
    Cookies.remove("react-template-app-token");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return { isAuthenticated, userRole, userLogin, userLogout };
}
