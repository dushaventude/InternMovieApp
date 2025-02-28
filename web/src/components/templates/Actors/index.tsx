import React, { useEffect, useState } from "react";
import "./styles.scss";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../../../store";
//import { useDispatch, useSelector } from "react-redux";
import { fetchAllActors } from "../../../store/features/actors/actorSlice";
import Button from "../../atoms/button/Button";
import Dialog from "../../atoms/DialogBox/Dialog";
import ActorForm from "../../molecules/ActorForm/ActorForm";
import { createActor } from "../../../store/features/actors/actorSlice";

interface Actor {
  Id: number
  Name: string
  Gender : string
  Country: string
}

const Actors: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddActorModalOpen, setIsAddActorModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { fetchActors, fetchStatus } = useAppSelector(
    (state: RootState) => state.actors
  );
  const pageSize = 10;
  const totalPages = Math.ceil(fetchActors?.TotalCount / pageSize);

  useEffect(() => {
    dispatch(fetchAllActors({ pageNumber: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  const handleAddActor = () => {
    setIsAddActorModalOpen(true);
  };

  const handleSubmitActor = (actor: Actor) => {
    dispatch(createActor(actor));
    setIsAddActorModalOpen(false);

  };



  if (fetchStatus === "loading") return <div>Loading...</div>;

  return (
    <div className="movies-container">
      <div className="current-navigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="home-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <p>/ Manage Actors</p>
      </div>
      <div className="create-pagination-wrapper">
        <Button className="add-new-movie" onClick={handleAddActor}>
          <p>Add New Actor</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        {fetchActors.Response && (
          <div className="pagination">
            <p>Jump to</p>
            <input type="text" className="jump-to-input" />
            {[...Array(totalPages)].map((_, index) => (
              <p
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${currentPage === index + 1 ? "active-page" : ""}`}
              >
                {index + 1}
              </p>
            ))}
          </div>
        )}
      </div>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchActors.Response?.length > 0 ? (
            fetchActors.Response.map((actor, index) => (
              <tr key={actor.Id}>
                <td>{index + 1}</td>
                <td>{actor.Id}</td>
                <td>{actor.Name}</td>
                <td>{actor.Gender}</td>
                <td>{actor.Country}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data">
                No actors found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/*Add Actor Modal*/}
      <Dialog 
        isOpen={isAddActorModalOpen}
        onClose={() => setIsAddActorModalOpen(false)}
        title="Add Actor"
        size="medium"
      >
        <ActorForm 
          onSubmit={handleSubmitActor}
          onCancel={() => setIsAddActorModalOpen(false)}
        />
      </Dialog>

    </div>
  );
};

export default Actors;
