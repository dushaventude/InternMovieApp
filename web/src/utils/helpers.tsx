import { formatDistance, formatDistanceToNow } from "date-fns";

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

export function getFullYear(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
}

export function getReviewSentimentCounts(reviewList: { Rate: number }[]) {
  return {
    positive: reviewList.filter((review) => review.Rate > 7).length,
    mixed: reviewList.filter((review) => review.Rate >= 4 && review.Rate <= 7)
      .length,
    negative: reviewList.filter((review) => review.Rate < 4).length,
  };
}

export function getTimeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
  // return formatDistance(new Date(dat);
}
