import { request } from "../api/index";

const reviewService = {
  getAllReviews: (movieId: number) => request.get(`/Review/${movieId}`),
  createReview: (reviewContent: {
    MovieId: number;
    Comment: string;
    Rate: number;
  }) => request.post("/Review", reviewContent),
};

export default reviewService;
