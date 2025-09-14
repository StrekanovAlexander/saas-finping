export default function({ title, weight }) {
    let classOptions = "px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200";
    if (weight === "bold") {
        classOptions += " font-medium";
    }  
    return (
        <td class={ classOptions }>
            { title }
        </td>
    );
} 