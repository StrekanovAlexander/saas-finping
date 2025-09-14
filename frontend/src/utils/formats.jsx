export function formatDate(date) {
    return date ? new Date(date).toLocaleString() : "-";
}

export function formatNumber(value) {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
    }).format(value);
};