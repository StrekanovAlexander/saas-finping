import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Checkbox from "../../components/checkboxes/Checkbox.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value) {
        error = "email ?";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "wrong email";
      }
    }

    if (field === "password") {
      if (!value) {
        error = "password ?";
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

      navigate("/dashboard/trackings");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-12">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                {renderIcon("email", email)}
              </div>
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
                {renderIcon("password", password)}
              </div>
            </div>
            <Checkbox
              name="stayLogged"
              title="Stay logged in"
              checked={stayLogged}
              onChange={changeStayLogged}
            />

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