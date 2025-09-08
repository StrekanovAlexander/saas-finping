import { useEffect, useState } from 'react';

function Assets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/assets`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch assets");
                return res.json();
            })
            .then((data) => {
                setAssets(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (

      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assets</h2>

        {loading && <div>Loading assets...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {!loading && !error && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="p-4 bg-white rounded shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">{asset.name}</span>
                  <span className="text-gray-600">{asset.symbol}</span>
                </div>
                <div className="mt-2 text-xl font-semibold text-green-600">
                  ${asset.price}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>


    );
}

export default Assets;