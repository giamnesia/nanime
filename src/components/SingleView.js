import React, { useState, useEffect } from "react";
import { Loader, Icon } from "semantic-ui-react";
import Characters from "../components/Characters";
import Op from "../components/Op";
import End from "../components/End";
const SingleView = ({
  title,
  img,
  rating,
  score,
  background,
  trailer,
  status,
  id,
  genres,
  op,
  end,
  premiered,
  popularity,
  episodes,
  duration,
}) => {
  const [loader, setLoader] = useState(true);
  const [cast, setCast] = useState([]);

  const CAST_URL = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;
  useEffect(() => {
    fetch(CAST_URL)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.characters ? data.characters.slice(0, 8) : ["Error"]);
        setLoader(false);
      });
  }, [id]);

  return (
    <div className="singleview">
      {/*I really hate css frameworks 🤣*/}

      {loader ? (
        <div style={{ height: "100vh" }}>
          <Loader active inverted inline="centered" content="Loading" />
        </div>
      ) : (
        <>
          <div className="contentview">
            <div className="imgtitle">
              <img src={img} alt={title} />
              <h1>{title}</h1>
              <h3>Popularity #{popularity}</h3>
              <p>Rated: {rating ? rating : "None"}</p>
              <div className="genre">
                {genres.map((item) => (
                  <button>{item.name}</button>
                ))}
              </div>
            </div>

            <div className="description">
              <div className="desc">
                <h1>
                  Synopsis <Icon name="write" size="tiny" />
                </h1>
                <p>
                  Score: {score ? score : "No score available"}{" "}
                  <Icon name="star" color="yellow" />
                </p>
                <p className="bc">
                  {background ? background : "No Background Preview Available"}
                </p>
              </div>
              <div />

              {/*Section */}
              <div className="section">
                <div className="otherdesc">
                  <h1>Details</h1>
                  <div className="descs">
                    <p>{episodes ? episodes : "No"} episode/s</p>
                    <p>Duration: {duration}</p>
                    <p>
                      {premiered ? `${"Premiered: " + premiered}` : "No date"}
                    </p>
                    <p>{status}</p>
                  </div>
                </div>
                <div className="trailer">
                  {trailer ? (
                    <>
                      <h1>Trailer </h1>
                      <iframe
                        src={trailer}
                        title={title}
                        frameborder="0"
                      ></iframe>
                    </>
                  ) : (
                    <h3>No trailer</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h1 style={{ marginTop: "2em" }}>Cast</h1>
          <div className="cast">
            {cast ? (
              cast.map((casts, id) => (
                <Characters
                  key={id}
                  castimg={casts.image_url ? casts.image_url : "No casts"}
                  castname={casts.name ? casts.name : "No cast name"}
                  castrole={casts.role ? casts.role : "No role"}
                  voice={
                    casts.voice_actors
                      ? casts.voice_actors.slice(0, 1)
                      : ["Error"]
                  }
                />
              ))
            ) : (
              <h3 style={{ color: "white" }}>No cast</h3>
            )}
          </div>

          <div />
          <div className="opend">
            <div className="op">
              {op ? (
                <>
                  <h1 style={{ margin: "1em" }}>Opening Themes</h1>
                  {op.map((song) => (
                    <Op song={song} />
                  ))}
                </>
              ) : (
                <h1>No opening themes</h1>
              )}
            </div>
            <div className="end">
              {end ? (
                <>
                  <h1 style={{ margin: "1em" }}>Ending Themes</h1>
                  {end.map((song) => (
                    <End song={song} />
                  ))}
                </>
              ) : (
                <h1>No ending themes</h1>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleView;
