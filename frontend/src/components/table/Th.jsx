export default function({ title, textAlign }) {

    let classOptions = "px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500";

    if (textAlign === "center") {
        classOptions += " text-center";
    } else if (textAlign === "right") {
        classOptions += " text-end";    
    } else {
        classOptions += " text-start";
    } 

    return(
        <th scope="col" className={ classOptions }>
            { title }
        </th>
    );
}