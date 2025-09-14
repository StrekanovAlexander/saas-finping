export default function({ title, field, fn, sortConfig }) {

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "▲" : "▼";
        }
        return "";
    };

    return(
        <th 
            scope="col" 
            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 cursor-pointer"
            onClick={ () => fn(field) }
        >
            { title } { getSortIndicator(field) }
        </th>
    );
}