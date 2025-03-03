// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../store";
// import {
//   deleteMovie,
//   fetchSearchMovies,
// } from "../../../../store/features/movies/movieSlice";
// import { useUserOptimizer } from "../../../../hooks/useUserOptimizer";
// import { useNotification } from "../../../../contexts/NotificationContext";
// import "./styles.scss";

// const DeleteMovieModal = ({
//   movieId,
//   onClose,
// }: {
//   movieId: number;
//   onClose: () => void;
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { refresh } = useUserOptimizer();
//   const { showNotification } = useNotification();

//   useEffect(() => {
//     console.log("Movie ID received in modal:", movieId);
//   }, [movieId]);

//   const handleDelete = async () => {
//     if (!movieId) {
//       console.error("Error: movieId is undefined or null!");
//       return;
//     }

//     await dispatch(deleteMovie(movieId));

//     // Hook Refresh
//     await refresh();
//     showNotification("Movie deleted successfully!", "success");

//     onClose();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <p>Are you sure you want to delete this movie?</p>
//         <button onClick={handleDelete}>Yes, Delete</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default DeleteMovieModal;





import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  deleteMovie,
  fetchSearchMovies,
} from "../../../../store/features/movies/movieSlice";
import { useUserOptimizer } from "../../../../hooks/useUserOptimizer";
import { useNotification } from "../../../../contexts/NotificationContext";
import "./styles.scss";
 
const DeleteMovieModal = ({
  movieId,
  onClose,
}: {
  movieId: number;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refresh } = useUserOptimizer();
  const { showNotification } = useNotification( "default","default");
 
  useEffect(() => {
    console.log("Movie ID received in modal:", movieId);
  }, [movieId]);
 
  const handleDelete = async () => {
    if (!movieId) {
      console.error("Error: movieId is undefined or null!");
      return;
    }
 
    await dispatch(deleteMovie(movieId));
 
    // Hook Refresh
    await refresh();
    showNotification("Movie deleted successfully!", "success");
 
    onClose();
  };
 
  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this movie?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
 
export default DeleteMovieModal;