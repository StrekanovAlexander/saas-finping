export default function({ name, title, checked, onChange }) { 
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input 
                    className="w-4 h-4 text-indigo-600 accent-indigo-600 border-gray-200 rounded focus:ring-indigo-500"
                    type="checkbox"
                    name={ name }
                    id={ name }
                    checked={ checked }
                    onChange={ onChange }
                />
            </div>    
            <div className="ml-3 text-sm">
                <label htmlFor={ name } className="font-light text-gray-500 dark:text-gray-300">
                    { title }
                </label>
            </div>
        </div> 
    )                
}                    