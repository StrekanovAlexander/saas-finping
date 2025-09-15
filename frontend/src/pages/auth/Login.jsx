import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
// import Checkbox from "../../components/checkboxes/Checkbox.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const validateField = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value) {
        error = "email is empty";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "wrong email";
      }
    }

    if (field === "password") {
      if (!value) {
        error = "password is empty";
      } else if (value.length < 8) {
        error = "wrong password";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const renderIcon = (field, value) => {
    if (!value) return null;
    return errors[field] ? (
      <X className="text-red-500 mx-2 w-5 h-5" />
    ) : (
      <Check className="text-teal-600 mx-2 w-5 h-5" />
    );
  };

  function changeStayLogged() {
    setStayLogged(!stayLogged);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
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
    }
    finally {
      setLoading(false);
    }
  }

  function demoModeHandler(checked) {
    setDemoMode(checked);
    if (checked) {
      setErrors({});
      setEmail('demo@finping.space');
      setPassword('demonstration');
    } else {
      setEmail('');
      setPassword('');
    }  
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-12">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-4">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
          </h3>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <div className="flex items-center">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                />
              </div>
              { errors['email'] && <p className="text-sm text-red-600">{ errors['email'] }</p> }
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <div className="flex items-center">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                />
              </div>
              { errors['password'] && <p className="text-sm text-red-600">{ errors['password'] }</p> }
            </div>
            {/* Checkbox demo mode */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  className="w-4 h-4 text-teal-600 accent-teal-600 border-gray-200 rounded focus:ring-teal-500"
                  id="isDemoMode"
                  type="checkbox"
                  checked={ demoMode }
                  onChange={ (ev) => demoModeHandler(ev.target.checked) }
                />
              </div>    
              <div className="ml-3 text-sm">
                <label htmlFor="isDemoMode" className="font-medium text-orange-600">
                  Demonstration mode
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="flex justify-center text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 transition"
              >
                Next
              </button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-teal-600 hover:text-teal-700"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
          <Toaster position="top-right" />
        </div>
      </div>
    </div>
  );
}

export default Login;