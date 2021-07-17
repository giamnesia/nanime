import { React, useState, useEffect } from "react";
import { Card, Placeholder, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TOP_URL = "https://api.jikan.moe/v3/top/anime/1/upcoming";

const Top = () => {
  const [display, setDisplay] = useState([]);

  const result = async (url) => {
    const response = await fetch(url);
    response.json().then((data) => {
      setDisplay(data.top.slice(0, 5));
    });
  };
  useEffect(() => {
    result(TOP_URL);
  }, []);

  return (
    <>
      <h1 style={{ color: "white" }}>Top Anime 2021</h1>
      <div className="topcards">
        {display.map((anime) => (
          <Link to={`/view/${anime.mal_id}`}>
            <div className="card">
              <div className="carddiv" inverted>
                <>
                  <Popup
                    header={`${"Rank: " + anime.rank}`}
                    trigger={<img className="img" src={anime.image_url}></img>}
                  />
                </>
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
    </>
  );
};

export default Top;
