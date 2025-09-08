import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="text-center py-10">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore atque a accusantium debitis quo illum quis, possimus eos consequuntur quos distinctio esse repellat sequi sit nam, harum repellendus deleniti et.</p>
            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </div>
    );
}

export default Login;