import { Popup } from "semantic-ui-react";
const Character = ({ castimg, castrole, castname, voice }) => {
  return (
    <div className="characters">
      {voice.map((person) => (
        <Popup
          trigger={
            <div className="content">
              <img className="castimg" src={castimg} />
              <p>{castname}</p>
              <p
                style={{
                  backgroundColor: "#c020fa",
                  borderRadius: "0.3em",
                  margin: "0.5em",
                  padding: "0.1em",
                }}
              >
                Role: {castrole}
              </p>
            </div>
          }
        >
          <h4>{person.name}</h4>
          <img src={person.image_url} />
        </Popup>
      ))}
    </div>
  );
};
export default Character;
