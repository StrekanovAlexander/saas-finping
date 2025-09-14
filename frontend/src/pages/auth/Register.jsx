import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Checkbox from "../../components/checkboxes/Checkbox.jsx";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [errors, setErrors] = useState({});
    const [registered, setRegistered] = useState(false); 
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
                error = 'email ?';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'wrong email';
            }
        }

        if (field === 'password') {
            if (!value) {
                error = 'password ?';
            } else if (value.length < 8) {
                error = 'wrong password';
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

    function changeSubscribe() {
        setSubscribe(!subscribe);
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        validateField('email', email);
        validateField('password', password);
        validateField('confirmPassword', confirmPassword);

        if (!errors.email && !errors.password && !errors.confirmPassword && email && password && confirmPassword) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/users`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password, subscribe }),
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
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-12">
            { !registered ? (
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <div className="flex items-center">
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="name@example.com" 
                                    value={ email }
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateField("email", e.target.value);
                                    }}
                                />
                                { renderIcon("email", email) }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <div className="flex items-center">
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    value={ password }
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validateField("password", e.target.value);
                                    }}
                                />
                                { renderIcon("password", password) }
                            </div>
                            {passwordStrength && (
                                <p className={`text-sm mt-1 ${getStrengthColor()}`}>
                                    Password strength: {passwordStrength}
                                </p>
                            )}
                        </div>          
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <div className="flex items-center">
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    type="password" 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    placeholder="••••••••" 
                                    value={ confirmPassword }
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        validateField("confirmPassword", e.target.value);
                                    }}
                                />
                                { renderIcon("confirmPassword", confirmPassword) }
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                            )}
                        </div>
                        {/* <Checkbox 
                            name="subScribe" 
                            title="I want to receive news by email" 
                            checked={ subscribe }
                            onChange={ changeSubscribe }
                        /> */}

                        <div className="flex items-center justify-between">
                            <button 
                                type="submit" 
                                className="flex justify-center text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 transition"
                            >
                                Next
                            </button>
                            <p className="text-sm text-gray-500">
                                Already have an account? 
                                <Link 
                                    to="/login" 
                                    className="font-medium text-teal-600 hover:text-teal-700 ml-1"
                                >
                                    Login here
                                </Link>
                            </p> 
                        </div>
                    </form>
                    <Toaster position="top-right" />
                </div>
            </div>
            ) : (
            <div className="bg-green-50 border border-green-300 text-green-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Registration successful!</h2>
                <p className="mb-4">
                    Please check your email and click on the activation link to confirm your account.
                </p>
                <p className="text-sm text-gray-600">
                    Didn't get the email? Check your spam folder or request a new activation link from the login page.
                </p>
            </div>
        )}
        </div>
    )

}

export default Register;