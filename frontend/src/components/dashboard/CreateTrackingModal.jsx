function CreateTrackingModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">New Tracking</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Asset (e.g. BTC)"
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Threshold"
                        className="w-full border rounded px-3 py-2"
                    />
                    <select className="w-full border rounded px-3 py-2">
                        <option value="above">Above</option>
                        <option value="below">Below</option>
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTrackingModal;
