import { useState, useEffect } from "react";
import { CheckCircle, KeyRound, Mail, UserPlus, XCircle } from "lucide-react";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  // PasswordStrength
  useEffect(() => {
    if (!password) {
      setPasswordStrength('');
    } else if (password.length < 8) {
      setPasswordStrength('Weak');
    } else if (password.length < 12) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  }, [password]);

  const validateField = (field, value) => {
    let error = '';

    if (field === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email';
      }
    }

    if (field === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 8) {
        error = 'Password must be at least 8 characters';
      }
    }

    if (field === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== password) {
        error = 'Passwords do not match';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField('email', email);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);

    if (!errors.email && !errors.password && !errors.confirmPassword && email && password && confirmPassword) {
      alert('Data was sent');
    }
  };

  const renderIcon = (field, value) => {
    if (!value) return null;
    return errors[field] ? (
      <XCircle className="text-red-500 ml-2 w-5 h-5" />
    ) : (
      <CheckCircle className="text-green-500 ml-2 w-5 h-5" />
    );
  };

  const getStrengthColor = () => {
    if (passwordStrength === 'Weak') return 'text-red-500';
    if (passwordStrength === 'Medium') return 'text-yellow-500';
    if (passwordStrength === 'Strong') return 'text-green-500';
    return '';
  };

  return (
    <div className="flex items-center justify-center pt-12">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {/* Email */}
        <div className="mb-5">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="text-gray-400 mr-2 w-5 h-5" />
            <input
              className="flex-1 outline-none"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
            />
            {renderIcon("email", email)}
          </div>
        </div>
        {/* Password */}
        <div className="mb-5">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <KeyRound className="text-gray-400 mr-2 w-5 h-5" />
            <input
              className="flex-1 outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
            />
            {renderIcon("password", password)}
          </div>
          {passwordStrength && (
            <p className={`text-sm mt-1 ${getStrengthColor()}`}>
              Password strength: {passwordStrength}
            </p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="mb-6">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <KeyRound className="text-gray-400 mr-2 w-5 h-5" />
            <input
              className="flex-1 outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
            />
            {renderIcon("confirmPassword", confirmPassword)}
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
        {/* Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="md:flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <UserPlus className="w-5 h-5 mr-2" /> Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
