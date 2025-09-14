export default function Tr({ children, zebra }) {
    return (
        <tr className={ zebra ? 'odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800' : null}>
            { children }
        </tr>
    );
}