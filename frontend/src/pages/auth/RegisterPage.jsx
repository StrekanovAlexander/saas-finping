import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail, validatePassword, comparePasswords } from "../../utils/validators";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registered, setRegistered] = useState(false); 
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError("Please enter a valid password: at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!comparePasswords(password, value)) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password) || !comparePasswords(password, confirmPassword)) {
      return;
    }

    setLoading(true);
    // Backend API
    try {
      const url = `${import.meta.env.VITE_API_URL}/users`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
 
      const data = await res.json();
      if (res.ok) {
        toast.success("User was created successfully!");
        setRegistered(true);
      } else {
        toast.error(`${data.error || "Registration failed"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    } finally {
      setLoading(false);
    } 
  };
  
  return (
    <>
    { !registered ? (
      <div className="container mx-auto px-6 py-12 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
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
              onChange={handlePasswordChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="••••••••"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="••••••••"
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={!validateEmail(email) || !validatePassword(password) || !comparePasswords(password, confirmPassword)}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
              !validateEmail(email) || !validatePassword(password) || !comparePasswords(password, confirmPassword)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            Sign Up
          </button>
        </form>
        <Toaster position="top-right" />

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    ) : (
      <div className="container mx-auto px-6 py-12 max-w-md">
        <div className="bg-green-50 border border-green-300 text-green-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Registration successful!</h2>
          <p className="mb-4">
            Please check your email and click on the activation link to confirm your account.
          </p>
          <p className="text-sm text-gray-600">
            Didn't get the email? Check your spam folder or request a new activation link from the login page.
          </p>
        </div>
      </div>
    )}
    </>
  )
}

export default RegisterPage;
