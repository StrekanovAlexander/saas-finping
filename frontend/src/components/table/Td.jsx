export default function({ children, weight, textAlign }) {
    let classOptions = "px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200";
    
    if (weight === "bold") {
        classOptions += " font-medium";
    }  

    if (textAlign === "center") {
        classOptions += " text-center";
    } else if (textAlign === "right") {
        classOptions += " text-end";    
    } else {
        classOptions += " text-start";
    } 

    return (
        <td className={ classOptions }>
            { children }
        </td>
    );
} 