import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/buttons/Button.jsx";
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
      <XCircle className="text-red-500 ml-2 w-5 h-5" />
    ) : (
      <CheckCircle className="text-green-500 ml-2 w-5 h-5" />
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
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in
          </h1>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <Button title="Sign in" icon="LogIn" />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/user/sign-up"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Create an account
              </Link>
            </p>
          </form>
          <Toaster position="top-right" />
        </div>
      </div>
    </div>
  );
}

export default Login;