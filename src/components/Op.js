import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";
const Op = ({ song }) => {
  return (
      <div>
     <button style={{ width: "70%", margin: "0.5em", padding: "1em" ,backgroundColor:'#c020fa'}}>
        <Header as='h5' style={{ color:'white'}}>{song}</Header>
      </button>
    </div>
  );
};

export default Op;
