import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";

const End = ({ song }) => {
  return (
    <div>
      <button style={{ width: "70%", margin: "0.5em", padding: "1em" }}>
        <Header as="h5">{song}</Header>
      </button>
    </div>
  );
};

export default End;
