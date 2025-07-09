import { useParams } from "react-router-dom";
import { useState } from "react";
import characters from "../data/characters.json";
import "./CharacterPage.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function CharacterPage() {
  const { id } = useParams();
  const character = characters.find((c) => c.id === id);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const [showGallery, setShowGallery] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!character)
    return <div className="not-found">Personnage introuvable.</div>;

  const visibleVideos = showAllVideos
    ? character.videos
    : character.videos?.slice(0, 1) || [];

  return (
    <div className="character-page">
      <div className="banner">
        <img
          src={`${process.env.PUBLIC_URL}/${character.image}`}
          alt={character.name}
        />
      </div>
      <div className="details">
        <h1>{character.name}</h1>
        <p className="quote">"{character.quotes?.[0]}"</p>

        <div className="info">
          <p>
            <strong>Origine :</strong> {character.origin}
          </p>
          <p>
            <strong>Style de combat :</strong> {character.style}
          </p>
          <p>
            <strong>Première apparition :</strong> {character.first_appearance}
          </p>
        </div>

        <div className="description">
          <h2>Biographie</h2>
          <p>{character.description}</p>
        </div>

        <div className="relationships">
          <h2>Relations</h2>
          <ul>
            {character.relationships &&
              Object.entries(character.relationships).map(([key, value]) => (
                <li key={key}>
                  <strong>{key} :</strong> {value}
                </li>
              ))}
          </ul>
        </div>

        {character.gallery && character.gallery.length > 0 && (
          <div className="gallery-section">
            <h2>Galerie</h2>

            <div className="gallery-toggle">
              <button onClick={() => setShowGallery(!showGallery)}>
                {showGallery ? "Masquer la galerie" : "Voir la galerie"}
              </button>
            </div>

            {showGallery && (
              <div className="gallery-grid">
                {character.gallery.map((imgUrl, index) => (
                  <div className="gallery-item" key={index}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${imgUrl}`}
                      alt={`Galerie ${character.name} ${index + 1}`}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsLightboxOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {isLightboxOpen && (
              <Lightbox
                mainSrc={`${process.env.PUBLIC_URL}/${character.gallery[currentImageIndex]}`}
                nextSrc={`${process.env.PUBLIC_URL}/${
                  character.gallery[
                    (currentImageIndex + 1) % character.gallery.length
                  ]
                }`}
                prevSrc={`${process.env.PUBLIC_URL}/${
                  character.gallery[
                    (currentImageIndex + character.gallery.length - 1) %
                      character.gallery.length
                  ]
                }`}
                onCloseRequest={() => setIsLightboxOpen(false)}
                onMovePrevRequest={() =>
                  setCurrentImageIndex(
                    (currentImageIndex + character.gallery.length - 1) %
                      character.gallery.length
                  )
                }
                onMoveNextRequest={() =>
                  setCurrentImageIndex(
                    (currentImageIndex + 1) % character.gallery.length
                  )
                }
              />
            )}
          </div>
        )}

        {visibleVideos.length > 0 && (
          <div className="video-section">
            <h2>Vidéos</h2>
            <div className="video-list">
              {visibleVideos.map((videoUrl, index) => (
                <div className="video-wrapper" key={index}>
                  <iframe
                    src={videoUrl}
                    title={`Vidéo ${index + 1} de ${character.name}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>

            {character.videos?.length > 1 && (
              <div className="video-toggle">
                <button onClick={() => setShowAllVideos(!showAllVideos)}>
                  {showAllVideos ? "Masquer les vidéos" : "Voir plus de vidéos"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
