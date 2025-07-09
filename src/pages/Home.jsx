import { useState } from "react";
import characters from "../data/characters.json";
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Regrouper par univers
  const groupedByUniverse = filteredCharacters.reduce((acc, char) => {
    if (!acc[char.universe]) {
      acc[char.universe] = [];
    }
    acc[char.universe].push(char);
    return acc;
  }, {});

  return (
    <>
      <h1 className="page-title">Personnages</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {Object.entries(groupedByUniverse).map(([universe, chars]) => (
        <div key={universe} className="universe-section">
          <h2 className="universe-title">
            <Link to={`/universe/${encodeURIComponent(universe)}`}>
              {universe}
            </Link>
          </h2>
          <div className="grid-container">
            {chars.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
