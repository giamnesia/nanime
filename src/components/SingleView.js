import React, { useState, useEffect } from "react";
import { Loader, Placeholder, Dimmer, Icon} from "semantic-ui-react";
import Characters from "../components/Characters";
import Op from '../components/Op'
import End from '../components/End'
const SingleView = ({ title, img, rating, score, background, trailer, id,genres,op,end, popularity}) => {
  const [loader, setLoader] = useState(true);
  const [cast, setCast] = useState([]);

  const CAST_URL = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;
  useEffect(() => {
    fetch(CAST_URL)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.characters.slice(0, 8));
        setLoader(false);
      });
  }, [id]);

  return (
    <div className="singleview">
      {/*I really hate css frameworks 🤣*/}

          {loader ? (
        <Dimmer active>
          <Loader active inline="centered" content='Loading'/>
        </Dimmer>
      ) : (
          <>
          <div className="contentview">
            <div className="imgtitle">
            <img src={img} alt={title} />
                <h1>{title}</h1>
                <h3>Popularity #{popularity}</h3>
                <p>Rated: {rating ? rating : "None"}</p>

                <div className="genre">
              {
                genres.map(item => (
                  <button>{item.name}</button>
                ))
              }
            </div>
              </div>
              

           <div className='description'>
            <div className="desc">
            <h1>Synopsis <Icon name='write' size='tiny'/></h1>
            <p >
              {background ? background : "No Background Preview Available"}
                </p>
                  <h3>Score:  {score ? score : "No score available"} <Icon name='star' color= 'yellow'
            /></h3>
              </div>
              <div className="trailer">
            <h1>Trailer</h1>
          <iframe
            src={trailer ? trailer : "No trailer available"}
            title={title}
            frameborder="0"
                   
          ></iframe>
            </div>
                <div />
              </div>
              
        </div>
    
        <h1>Cast</h1>

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

            <div />
            <div className="opend">
              <div className="op">
              {op.map(song => (
                    <Op song={song}/>
                  ))
                  }
              </div>
              <div className="end">
                {
                  end.map( song=>(
                    <End song={song}/>
                  ))
                }
              </div>
            </div>   
            </>
      )}
    </div>
  );
};

export default SingleView;
