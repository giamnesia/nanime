import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleView from "../components/SingleView";
const View = () => {
  const [anime, setAnime] = useState([]);
  const { id } = useParams();
  const ANIME_URL = `https://api.jikan.moe/v3/anime/${id}`;

  useEffect(() => {
    fetch(ANIME_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnime(data);
      });
  }, [id]);

  return (
    <div>
      <SingleView
        id={id}
        key={anime.mal_id}
        idname={anime.mal_id}
        title={anime.title}
        img={anime.image_url}
        rating={anime.rating}
        score={anime.score}
        episodes={anime.episodes}
        duration={anime.duration}
        premiered={anime.premiered}
        status={anime.status}
        popularity={anime.popularity}
        background={anime.background}
        trailer={anime.trailer_url}
        genres={anime.genres ? anime.genres : ["No genre"]}
        op={
          anime.opening_themes
            ? anime.opening_themes.slice(0, 5)
            : ["No opening themes"]
        }
        end={
          anime.ending_themes
            ? anime.ending_themes.slice(0, 5)
            : ["No ending themes"]
        }
      />
    </div>
  );
};

export default View;
