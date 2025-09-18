import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { validateEmail } from "../../utils/validators";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    // Backend API
    try {
      const url = `${import.meta.env.VITE_API_URL}/users/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      toast.success("Welcome back!");
      navigate("/manage/trackings");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  function handleDemoMode(checked) {
    setDemoMode(checked);
    if (checked) {
      setEmailError("");
      setEmail("demo@finping.space");
      setPassword("demonstration");
    } else {
      setEmail("");
      setPassword("");
    }  
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Log in to Your Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`mt-2 block w-full rounded-lg border ${
              emailError ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:ring-teal-500 focus:border-teal-500`}
            placeholder="email@example.com"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
            placeholder="••••••••"
            required
          />
        </label>
                
        <label className="block flex items-center">
          <input 
            className="w-4 h-4 text-teal-600 accent-teal-600 border-gray-200 rounded focus:ring-teal-500"
            type="checkbox"
            checked={demoMode}
            onChange={(ev) => handleDemoMode(ev.target.checked)}
          />
          <span className="text-teal-600 ml-1">Demonstration mode</span>
        </label>

        <button
          type="submit"
          disabled={!validateEmail(email) || !password}
          className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
            !validateEmail(email) || !password
           ? "bg-gray-400 cursor-not-allowed"
           : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          Log In
        </button>
      </form>
      <Toaster position="top-right" />

      <p className="text-center text-gray-600 text-sm mt-4">
        Don't have an account?
        <a
          href="/register"
          className="text-teal-600 font-medium hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
