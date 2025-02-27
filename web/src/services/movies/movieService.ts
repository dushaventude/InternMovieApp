import { request } from "../request";

const movieService = {
  getMovie: (Id: string) => request.get(`/Movie/${Id}`),
  getAllMovies: (queryParams: {
    Query: string;
    ReleaseDateFrom: string;
    ReleaseDateTo: string;
    IsFeatured?: boolean;
    PageSize: number;
    PageNumber: number;
  }) => request.post("/Movie", queryParams),
};

export default movieService;
