import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";

const End = ({ song }) => {
  return (
    <div>
      <button
        style={{
          width: "70%",
          margin: "0.5em",
          padding: "1em",
          backgroundColor: "#c020fa",
          border: "none",
          outline: "none",
        }}
      >
        <Header as="h5" style={{ color: "white" }}>
          {song}
        </Header>
      </button>
    </div>
  );
};

export default End;
