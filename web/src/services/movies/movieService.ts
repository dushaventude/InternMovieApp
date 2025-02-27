import { request } from "../request";

const movieService = {
  getMovie: (Id: string) => request.get(`/Movie/${Id}`),

  //removed IsFeatured from the query params because need to get all movies not only featured
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
