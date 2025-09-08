function Register() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Register</h1>
      <form onSubmit="" className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full max-w-md bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;