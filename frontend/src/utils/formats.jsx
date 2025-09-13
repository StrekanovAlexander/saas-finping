export function formatDate(date) {
    const parts = date.split('T');
    return `${ parts[0] } ${ parts[1].split('.')[0] }`;
}