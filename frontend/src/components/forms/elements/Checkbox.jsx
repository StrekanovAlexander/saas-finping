export default function({ title }) { 
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input 
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 accent-indigo-600 border-gray-200 rounded focus:ring-indigo-500"
                />
            </div>    
            <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-light text-gray-500 dark:text-gray-300">
                    { title }
                </label>
            </div>
        </div> 
    )                
}                    