export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
export function getBackgroundColor(rating: number) {
  // if (rating >= 8) return "#007a55";
  if (rating >= 8) return "#22c55e";
  if (rating >= 5) return "#d08700";
  // return "#c70036";
  return "#ef4444";
}
