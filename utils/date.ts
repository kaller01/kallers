export const dateToString = (date: Date) => date.toLocaleDateString("en-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
});