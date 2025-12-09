import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthContextType, User } from "../types";
import { apiClient } from "../clients/api";


interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  const navigate = useNavigate();

  // need session on page refresh 
    useEffect(() =>{
       const token = localStorage.getItem('token');
       const savedUser = localStorage.getItem('user');

       if(token && savedUser){
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
       }

    },[] )

   const register = async (FormData: User) =>{
    const res = await apiClient.post('/api/users/register', FormData);

    navigate('/login')
   }
 
  const login = async (email:string, password:string) => {
    const res = await apiClient.post('/api/users/login', {email, password});

    const {token, user} = res.data;

    // save token and user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    setUser(user);
    setIsAuthenticated(true);
    navigate("/projects");
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //setUser(null);
    setIsAuthenticated(false);
    navigate('/login')
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
