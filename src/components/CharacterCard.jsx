import { Link } from "react-router-dom";
import "./CharacterCard.css";

export default function CharacterCard({ character }) {
  return (
    <Link to={`/character/${character.id}`} className="card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{character.first_appearance}</p>
    </Link>
  );
}
