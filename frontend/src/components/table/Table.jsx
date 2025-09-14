export default function({ children }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white">
                { children }
            </table>
        </div>        
    );
}