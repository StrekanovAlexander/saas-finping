import { Link } from 'react-router-dom';
import Input from "./elements/Input";
import Button from "./elements/Button";

function FormCreateUser() {

    function handleSubmit() {
        console.log('form sumbit');
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-12">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                        <Input type="email" name="email" title="Your email" placeholder="name@example.com" />
                        <Input type="password" name="password" title="Password" placeholder="••••••••" />
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Stay logged in</label>
                            </div>
                        </div>
                        <Button title="Sign in" icon="LogIn" />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link to="/user/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormCreateUser;