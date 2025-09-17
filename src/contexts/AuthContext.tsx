import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  name: string;
  email: string;
  department: string;
  password: string;
}

// Mock users for demo
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@kmrl.kerala.gov.in",
    department: "Engineering",
    role: "Senior Engineer",
    password: "password123"
  },
  {
    id: "2", 
    name: "Priya Nair",
    email: "priya@kmrl.kerala.gov.in",
    department: "Administration",
    role: "Manager",
    password: "password123"
  },
  {
    id: "3",
    name: "Admin User", 
    email: "admin@kmrl.kerala.gov.in",
    department: "IT",
    role: "Administrator",
    password: "admin123"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("kmrl_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("kmrl_user", JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      department: userData.department,
      role: "Employee"
    };
    
    // In real app, this would be sent to backend
    mockUsers.push({ ...newUser, password: userData.password });
    
    setUser(newUser);
    localStorage.setItem("kmrl_user", JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kmrl_user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};