import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/router";

type AuthContextType = {
  user: {
    username: string;
    role: string;
    assignedShopId?: number | null;
  } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    username: string;
    role: string;
    assignedShopId?: number | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    // Mock authentication logic
    let loggedInUser: {
      username: string;
      role: string;
      assignedShopId?: number | null;
    } | null = null;

    if (username === "admin" && password === "password") {
      loggedInUser = { username, role: "Admin" };
    } else if (username === "manager" && password === "password") {
      loggedInUser = { username, role: "Manager", assignedShopId: 3 };
    }

    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      console.log("Login successful:", loggedInUser);
    } else {
      console.log("Login failed: Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/"); // Redirect to the index page

    console.log("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
