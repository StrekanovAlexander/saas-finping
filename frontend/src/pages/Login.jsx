import { useState } from "react";
import { Link } from 'react-router-dom';
import { CheckCircle, KeyRound, LogIn, Mail, XCircle } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        let error = '';
        if (field === 'email') {
            if (!value) {
                error = 'email ?';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'wrong email';
            }
        }

        if (field === 'password') {
            if (!value) {
                error = 'password ?';
            } else if (value.length < 5) {
                error = 'wrong password';
            }
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.email && !errors.password && email && password) {
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

    return (
        <div className="flex items-center justify-center pt-12">
            <form onSubmit={ handleSubmit } className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {/* Email */}
                <div className="mb-5">
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                        <Mail className="text-gray-500 mr-2 w-5 h-5" />
                        <input
                            className="flex-1 outline-none"
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateField("email", e.target.value);
                            }}
                        />
                        { renderIcon("email", email) }
                    </div>
                    {/* {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )} */}
                </div>
                {/* Password */}
                <div className="mb-5">
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                        <KeyRound className="text-gray-500 mr-2 w-5 h-5" />
                        <input
                            className="flex-1 outline-none"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validateField("password", e.target.value);
                            }}
                        />
                        {renderIcon("password", password)}
                    </div>
                    {/* {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )} */}
                </div>
                {/* Button sending */}
                <div className="mb-5">
                    <div className="flex items-center">
                        <input 
                            // checked
                            id="remember"
                            type="checkbox"
                            className="w-5 h-5 text-indigo-600 accent-indigo-600 border-gray-200 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="remember" className="ml-2 text-gray-700">
                            Remember me
                        </label>
                    </div>            
                </div>        
                <button type="submit" className="md:flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <LogIn className="w-5 h-5 mr-2" /> Log In
                </button>
                <p className="text-center pt-8 text-gray-700">
                    Don't have an account yet? <Link to="/register" className="text-indigo-600 underline">Register</Link> here.
                </p>
            </form>
        </div>
    );
}
