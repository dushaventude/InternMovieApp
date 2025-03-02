import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchSearchMovies } from "../store/features/movies/movieSlice";
import { fetchAllActors } from "../store/features/actors/actorSlice";

export const useUserOptimizer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const refresh = async () => {
    await dispatch(
      fetchSearchMovies({
        Query: "",
        ReleaseDateFrom: "1900-01-01",
        ReleaseDateTo: "2025-12-12",
        PageSize: 10,
        PageNumber: 1,
      })
    );

    await dispatch(fetchAllActors({ pageNumber: 1, pageSize: 20 }));
  };



  return { refresh };
};
