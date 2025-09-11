export default function Heading({ title }) {
    return(
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{ title }</h1>
        </div>
    )
}