import type React from "react";
import "./ActorSearch.scss";

interface Actor {
  id: number;
  name: string;
  photoUrl: string;
}

interface ActorSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Actor[];
  onActorSelect: (actor: Actor) => void;
}

const ActorSearch: React.FC<ActorSearchProps> = ({
  searchTerm,
  onSearchChange,
  searchResults,
  onActorSelect,
}) => {
  return (
    <div className="actor-search">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search for actors..."
        className="actor-search-input"
      />
      {searchResults.length > 0 && (
        <ul className="actor-search-results">
          {searchResults.map((actor) => (
            <li key={actor.id} className="actor-search-item">
              <img
                src={actor.photoUrl || "/placeholder.svg"}
                alt={actor.name}
                className="actor-thumbnail"
              />
              <span>{actor.name}</span>
              <button
                type="button"
                onClick={() => onActorSelect(actor)}
                className="add-actor-btn"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActorSearch;
