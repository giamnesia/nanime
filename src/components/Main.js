import React, { useState, useEffect } from "react";
import { Card, Placeholder, Dimmer, Loader, Popup } from "semantic-ui-react";
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

  return (
    <div>
      <Link to="/">
        <p className='title' >N<span style={{color:'violet'}}>Anime</span></p>
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
          <button
            type="submit"
            loading={loading}
            onClick={handleLoadingClick}
          >
            Search
          </button>
        </Link>
      </form>
      <h1 style={{ color: "white" }}>{results}</h1>
          {loading ? (
              <div className="cards">
                {display.map((anime) => (
                    <div className="card">
                      <div className="carddiv">
                        <Card inverted>
                          <Placeholder inverted>
                            <Placeholder.Image square />
                          </Placeholder>
                        <Card.Content>
                            <Placeholder >
                              <Placeholder.Header>
                                <Placeholder.Line length="very short" />
                                <Placeholder.Line length="medium" />
                              </Placeholder.Header>
                              <Placeholder.Paragraph>
                                <Placeholder.Line length="short" />
                              </Placeholder.Paragraph>
                            </Placeholder>
                            </Card.Content>
                            </Card>
                      </div>
                    </div>
                ))}
              </div>
      ) : (
        <div className="cards">
          {display.map((anime) => (
            <Link to={`/view/${anime.mal_id}`}>
              <div className="card">
                <div className="carddiv">
                      <Popup
                        header={`${"Rated: " + anime.rated}`}
                        trigger={
                          <img className="img" src={anime.image_url}></img>
                        }
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
    </div>
  );
};

export default Main;
