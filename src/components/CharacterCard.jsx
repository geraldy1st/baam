import { Link } from "react-router-dom";
import "./CharacterCard.css";

export default function CharacterCard({ character }) {
  return (
    <Link to={`/character/${character.id}`} className="card">
      <img
        src={`${process.env.PUBLIC_URL}/${character.image}`}
        alt={character.name}
        className="character-img"
      />
      <h2>{character.name}</h2>
      <p>{character.first_appearance}</p>
    </Link>
  );
}
