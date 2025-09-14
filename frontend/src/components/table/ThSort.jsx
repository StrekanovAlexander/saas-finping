export default function({ title, field, fn, sortConfig, textAlign }) {

    let classOptions = "px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 cursor-pointer";
    if (textAlign === "center") {
        classOptions += " text-center";
    }    
    else if (textAlign === "right") {
        classOptions += " text-end";    
    } else {
        classOptions += " text-start";
    } 

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "▲" : "▼";
        }
        return "";
    };

    return(
        <th 
            scope="col" 
            className={ classOptions }
            onClick={ () => fn(field) }
        >
            { title } { getSortIndicator(field) }
        </th>
    );
}