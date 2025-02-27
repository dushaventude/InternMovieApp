import type React from "react";
import { useState, useEffect } from "react";
import "./ActorSearch.scss";

interface Actor {
  Id: number;
  Name: string;
  Photo: string;
  DOB: string;
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
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(searchTerm.trim() !== "");
  }, [searchTerm]);

  const handleActorClick = (actor: Actor, e: React.MouseEvent) => {
    e.stopPropagation(); 
    onActorSelect(actor);
  };

  return (
    <div className="actor-search">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search for actors..."
        className="actor-search-input"
      />
      {showResults && (
        <ul className="actor-search-results">
          {searchResults.length > 0 ? (
            searchResults.map((actor) => (
              <li
                key={actor.Id}
                className="actor-search-item"
                onClick={(e) => handleActorClick(actor, e)}
              >
                <img
                  src={actor.Photo || "/placeholder.svg"}
                  alt={actor.Name}
                  className="actor-thumbnail"
                />
                <span>{actor.Name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleActorClick(actor, e);
                  }}
                  className="add-actor-btn"
                >
                  Add
                </button>
              </li>
            ))
          ) : (
            <li className="no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ActorSearch;
