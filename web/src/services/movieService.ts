import { request } from "./request";

const movieService = {
  getMovie: (Id: number) => request.get(`/Movie/${Id}`),
};

export default movieService;
