import React, { useEffect } from "react";
import { fetchAllActors } from "../../store/features/actors/actorSlice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../store/index";
import styles from "./actorListPage.module.scss";
import SmallCard from "../../components/molecules/smallCard";
import defaultProfileIcon from "../../assets/profile-icon.jpg"; // Import profile icon

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
  const dispatch: AppDispatch = useAppDispatch();
  const { fetchActors, fetchStatus, error } = useAppSelector(
    (state: RootState) => state.actors
  );

  useEffect(() => {
    dispatch(fetchAllActors({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  if (fetchStatus === "loading") {
    return (
      <div className={styles.container}>
        <h1>All Actors</h1>
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SmallCard 
              key={index} 
              isLoading={true} 
              id={index} 
              title="Loading..." 
              image={defaultProfileIcon}
              type="actors"
            />
          ))}
        </div>
      </div>
    );
  }

  if (fetchStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const actors: IActor[] =
    (fetchActors as unknown as IResponse)?.Response || [];

  if (actors.length === 0) {
    return <div>No actors found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>All Actors</h1>
      <div className={styles.grid}>
        {actors.map((actor) => (
          <SmallCard
            id={actor.Id}
            key={actor.Id}
            title={actor.Name}
            image={actor.Photo || defaultProfileIcon}
            type="actors"
          />
        ))}
      </div>
    </div>
  );
};

export default ActorListPage;
