import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleView from "../components/SingleView";
import { Link } from "react-router-dom";
const View = () => {
  const [anime, setAnime] = useState([]);
  const { id } = useParams();
  const ANIME_URL = `https://api.jikan.moe/v3/anime/${id}`;

  const [search, setSearch] = useState();
  const [display, setDisplay] = useState([]);
  const [results, setResults] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleform = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://api.jikan.moe/v3/search/anime?q=" + search
    );
    const searchlength = search.length;
    response
      .json()
      .then((data) => {
        if (response.ok) {
          setDisplay(data.results.slice(0, 20));
          setResults("Results for " + `"${search}"`);
          setError("");
        }
        if (!response.ok) {
          throw Error("Error");
        }
        if (searchlength < 3) {
          setError("Input 3 characters or above");
          setResults("");
        }
      })
      .catch(error);
    setError("Anime not found");
  };
  useEffect(() => {
    fetch(ANIME_URL)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
      });
  }, [id]);

  return (
    <div>
      <Link to="/">
        <p className="title">
          NANI<span style={{ color: "white" }}>me</span>
        </p>
      </Link>
      <form action="" onSubmit={handleform}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          required
        />
        <Link to={search ? `/main/${search}` : "/"}>
          <button type="submit" primary>
            Search
          </button>
        </Link>
      </form>

      <SingleView
        id={id}
        key={anime.mal_id}
        idname={anime.mal_id}
        title={anime.title}
        img={anime.image_url}
        rating={anime.rating}
        score={anime.score}
        episodes={anime.episodes}
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
