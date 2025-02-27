import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActors } from "../../store/features/actors/actorSlice";
import { RootState, AppDispatch } from "../../store/index";
import styles from "./actorListPage.module.scss";
import SmallCard from "../../components/molecules/smallCard";

interface IResponse {
  Response: IActor[];
}

interface IActor {
  Id: number;
  Name: string;
  Photo: string;
  DOB: string;
}

const ActorListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { fetchActors, fetchStatus, error } = useSelector(
    (state: RootState) => state.actors
  );

  useEffect(() => {
    dispatch(fetchAllActors({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  console.log("Output", fetchActors);

  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (fetchStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const actors : IActor[] = ((fetchActors as unknown) as IResponse)?.Response || [];

  if (actors.length === 0) {
    return <div>No actors found.</div>;
  }

  console.log("Actors", actors);

  return (
    <div className={styles.container}>
      <h1>All Actors</h1>
      <div className={styles.grid}>
        {actors.map((actor) => (
          <SmallCard key={actor.Id} title={actor.Name} image={actor.Photo} />
        ))}
      </div>
    </div>
  );
};

export default ActorListPage;
