import React, { useState, useEffect } from "react";
import { Card, Loader, Popup } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

const Main = () => {
  const { anime } = useParams();
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState([]);
  const [results, setResults] = useState("");
  const [error, setError] = useState("");

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
  }, [anime]);

  return (
    <div>
      <h1 style={{ color: "white", margin: "0.8em" }}>{results}</h1>
      {loading ? (
        <div>
          <Loader active inverted inline="centered" content="Fetching Data" />
        </div>
      ) : (
        <div className="cards">
          {display ? (
            display.map((anime) => (
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
            ))
          ) : (
            <h3 style={{ color: "white", height: "75vh", margin: "1em" }}>
              No results 😢 Please input 3 characters
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
