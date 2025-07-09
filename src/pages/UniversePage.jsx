import { useParams } from "react-router-dom";
import characters from "../data/characters.json";
import CharacterCard from "../components/CharacterCard";
import "./UniversePage.css";

export default function UniversePage() {
  const { name } = useParams();
  const universeName = decodeURIComponent(name);

  const filteredCharacters = characters.filter(
    (char) => char.universe.toLowerCase() === universeName.toLowerCase()
  );

  //   Intro
  const intros = {
    Tekken:
      "Bienvenue dans l'univers brutal de Tekken, où chaque coup écrit une histoire de vengeance.",
    "Virtua Fighter":
      "Plonge dans le monde de Virtua Fighter, où la discipline et l'honneur guident les meilleurs combattants.",
    "Street Fighter":
      "Le tournoi mondial de Street Fighter t'attend, rempli de légendes et de défis inoubliables.",
    BAAM: "Explore l'univers mystérieux et futuriste de BAAM, où chaque personnage possède une histoire unique.",
  };

  // mapping univers -> image
  const banners = {
    Tekken: "images/banner-tekken.jpg",
    "Virtua Fighter": "images/banner-vf.jpg",
    "Street Fighter": "images/banner-sf.jpg",
    BAAM: "images/banner-baam.jpg",
  };

  const bannerImage =
    banners[filteredCharacters[0]?.universe] || "images/default-banner.jpg";

  const introText = intros[filteredCharacters[0]?.universe] || "";

  if (filteredCharacters.length === 0) {
    return (
      <div className="universe-page">
        <h1>{universeName}</h1>
        <p>Aucun personnage trouvé dans cet univers.</p>
      </div>
    );
  }

  return (
    <div className="universe-page">
      <div
        className="universe-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/${bannerImage})`,
        }}
      >
        <h1>{filteredCharacters[0].universe}</h1>
      </div>
      {introText && <p className="universe-intro">{introText}</p>}

      <h1>Univers : {filteredCharacters[0].universe}</h1>
      <div className="grid-container">
        {filteredCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
