import { useAuth } from "../../context/AuthContext.jsx";

function ContactsPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contacts</h1>
      <p className="text-gray-600 mb-6">
        You can reach out to the site administrator using the form below.
        Please note that only registered users can send messages.
      </p>
      {!user && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
          Only registered users can send messages. Please{" "}
          <a href="/login" className="text-teal-600 font-medium hover:underline">
            log in
          </a>{" "}
          or{" "}
          <a href="/register" className="text-teal-600 font-medium hover:underline">
            create an account
          </a>.
        </div>
      )}
      <form className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-gray-700">Your Message</span>
          <textarea
            rows="5"
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:text-gray-400"
            placeholder="Type your message here..."
            disabled={!user}
          />
        </label>
        <button
          type="submit"
          disabled={!user}
          className={`w-full py-2 px-4 rounded-lg font-medium transition ${
            user
              ? "bg-teal-600 text-white hover:bg-teal-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactsPage;
