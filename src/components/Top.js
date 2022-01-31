import { React, useState, useEffect } from "react";
import { Card, Popup, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Top = () => {
  const [display, setDisplay] = useState([]);
  const [loader, setLoader] = useState(true);
  const result = async () => {
    const response = await fetch(
      "https://api.jikan.moe/v3/top/anime/1/upcoming"
    );
    response.json().then((data) => {
      setLoader(false);
      setDisplay(data.top.slice(0, 10));
      document.title = `NANIME | Home`;
    });
  };
  useEffect(() => {
    result();
  }, [display]);

  return (
    <div>
      <h2 style={{ color: "white", margin: "0.8em" }}>Upcoming Anime 2021</h2>
      <div className="topcards">
        {loader ? (
          <div>
            <Loader active inverted inline="centered" content="Loading" />
          </div>
        ) : (
          display.map((anime) => (
            <Link to={`/view/${anime.mal_id}`}>
              <div className="card">
                <div className="carddiv" inverted>
                  <>
                    <Popup
                      header={`${"Rank: " + anime.rank}`}
                      trigger={
                        <img className="img" src={anime.image_url}></img>
                      }
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
          ))
        )}
      </div>
    </div>
  );
};

export default Top;
