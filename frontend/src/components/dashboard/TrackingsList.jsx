function TrackingsList() {
    // temporary
    const trackings = [
        { id: 1, asset: "Bitcoin", condition: "Above $40,000", channel: "Email" },
        { id: 2, asset: "Ethereum", condition: "Below $2,500", channel: "Telegram" },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-4">
            {trackings.length > 0 ? (
                <ul className="divide-y">
                    {trackings.map((t) => (
                        <li key={t.id} className="py-3 flex justify-between">
                            <div>
                                <p className="font-semibold">{t.asset}</p>
                                <p className="text-sm text-gray-500">
                                    {t.condition} → {t.channel}
                                </p>
                            </div>
                            <button className="text-sm text-red-500 hover:underline">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No trackings yet.</p>
            )}
    </div>
  );
}

export default TrackingsList;
