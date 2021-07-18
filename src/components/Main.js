import React, { useState, useEffect } from "react";
import { Card, Dimmer, Loader, Popup, Icon } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

export const IdContext = React.createContext();

const Main = () => {
  const { anime } = useParams();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [display, setDisplay] = useState([]);
  const [results, setResults] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.jikan.moe/v3/search/anime?q=${anime}&order_by=title&sort=asc&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults("Results for " + `"${anime}"`);
        setDisplay(data.results);
        setError("");
      })
      .catch(error)
      .finally(() => {
        setLoading(false);
      });
    setError("Anime not found");
  }, [anime]);
  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  //SCROLL
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div>
      <Link to="/">
        <p className="title">
          NANI<span style={{ color: "white" }}>me</span>
        </p>
      </Link>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onInput={handleSearch}
          required
        />
        <Link to={search ? `/main/${search}` : "/main/Wrong Input"}>
          <button type="submit" loading={loading} onClick={handleLoadingClick}>
            Search
          </button>
        </Link>
      </form>
      <h1 style={{ color: "white" }}>{results}</h1>
      {loading ? (
        <Dimmer active>
          <Loader active inline="centered" content="Fetching Results" />
        </Dimmer>
      ) : (
        <div className="cards">
          {display.map((anime) => (
            <Link to={`/view/${anime.mal_id}`}>
              <div className="card">
                <div className="carddiv">
                  <Popup
                    header={`${"Rated: " + anime.rated}`}
                    trigger={<img className="img" src={anime.image_url}></img>}
                  />
                  <Card.Content>
                    <>
                      <Popup
                        header={`${"Ratings: " + anime.score}`}
                        inverted
                        trigger={
                          <h4 style={{ color: "white", padding: "0.8em" }}>
                            {anime.title}
                          </h4>
                        }
                      />
                    </>
                  </Card.Content>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Icon
        name="angle up"
        color="violet"
        className="arrow"
        size="large"
        onClick={scrollToTop}
        style={{ display: visible ? "block" : "none" }}
      />
    </div>
  );
};

export default Main;
