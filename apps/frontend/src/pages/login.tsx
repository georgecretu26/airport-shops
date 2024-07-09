import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/use-auth";
import TextInput from "../components/TextInput";
import dynamic from "next/dynamic";

const Error = dynamic(() => import("../components/Error"));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network request with 1.5s delay
    setTimeout(() => {
      setError("");

      try {
        login(username, password);
        const user = localStorage.getItem("user");
        if (user) {
          router.push("/admin");
        } else {
          setError("Login failed: Invalid credentials");
        }
      } catch (err: any) {
        setError("Login failed: " + (err.message || "Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <TextInput
          id="username"
          name="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Error message={error} />}
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
