export default function FormChart({ item, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        {item.name}
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Close
                    </button>
            </div>
        </div>
    );
}
