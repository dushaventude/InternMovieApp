import { request } from "../api";
import { create } from "domain";

const movieService = {
  getMovie: (Id: string) => {
    if (!Id) {
      console.error("Invalid movie ID:", Id); // Debugging log
      return Promise.reject("Invalid movie ID");
    }
    return request.get(`/Movie/${Id}`);
  },
  getAllActors: () => request.get(`/Actor`), // ✅ Fetch all actors

  //removed IsFeatured from the query params because need to get all movies not only featured
  getAllMovies: (queryParams: {
    Query?: string;
    ReleaseDateFrom?: string;
    ReleaseDateTo?: string;
    IsFeatured?: boolean;
    PageSize: number;
    PageNumber: number;
  }) => request.post("/Movie", queryParams),

  createMovie: (movie: {
    Title: string;
    Description: string;
    
    Photo: string;
    IsFeatured: boolean;
    ReleaseDate: string;
    PhotoUrlList: string[];
    ActorIds: number[];

  }) => request.post("/Movie/Create", movie),

  updateMovie: (Id: number, movieData: any) =>
    request.put(`/Movie/${Id}`, movieData),

  deleteMovie: (Id: number) => request.delete(`/Movie/${Id}`),
};

export default movieService;
