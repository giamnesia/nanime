import React, { useState, useEffect } from "react";
import { Loader, Placeholder, Dimmer} from "semantic-ui-react";
import Characters from "../components/Characters";
const SingleView = ({ title, img, rating, score, background, trailer, id }) => {
  const [loader, setLoader] = useState(true);
  const [cast, setCast] = useState([]);

  const CAST_URL = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;
  useEffect(() => {
    fetch(CAST_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCast(data.characters.slice(0, 8));
        setLoader(false);
      });
  }, [id]);

  return (
    <div className="singleview">
      {/*I really hate css frameworks 🤣*/}

          {loader ? (
        <Dimmer active>
        <Loader active inline="centered" />
                  
        </Dimmer>
      ) : (
        <div className="contentview">
          <img src={img} alt={title} />
          <h1>{title}</h1>

          <h3>Rated: {rating ? rating : "None"}</h3>
          <h3>Score: {score ? score : "No score available"}</h3>
          <p className="desc">
            {background ? background : "No Background Preview Available"}
          </p>

          <div className="cast">
            {loader ? (
              <Placeholder>
                <Placeholder.Image />
              </Placeholder>
            ) : (
              cast.map((casts, id) => (
                <Characters
                  key={id}
                  castimg={casts.image_url ? casts.image_url : "No casts"}
                  castname={casts.name ? casts.name : "No cast name"}
                  castrole={casts.role ? casts.role : "No role"}
                  voice={casts.voice_actors.slice(0, 1)}
                />
              ))
            )}
          </div>
          <h1>Trailer</h1>
          <iframe
            src={trailer ? trailer : "No trailer available"}
            title={title}
            frameborder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SingleView;
