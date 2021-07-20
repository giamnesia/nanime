import { React, useState, useEffect } from "react";
import { Comment, Icon, Checkbox, Segment } from 'semantic-ui-react'
const Review = ({ id }) => {
  const [display, setDisplay] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  const handlecheck = (e, {checked}) => {
    setCollapsed(checked)
  }
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/anime/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setDisplay(data.reviews.slice(0,5));
        console.log(data.reviews.slice(0, 5));
      });
  }, [id]);

  return (
    <div  className='comment' >
      <h1>Reviews</h1>
      <Segment style={{ backgroundColor:'whitesmoke'}}>
        <Checkbox
          defaultChecked
          toggle
          label='Hide Reviews'
          onChange={handlecheck}
        />
      </Segment>

      <Comment.Group minimal size='small' collapsed={collapsed} >
        {
            display.map(item => (
              <Comment style={{border:'1px solid white', margin:'1em', borderRadius:'0.5em'}}  >
                <Comment.Avatar as='a' href={item.reviewer.url} target='_blank' src={item.reviewer.image_url} style={{width:'100px', height:'120px',  margin:'1em'}}/>
                <Comment.Content style={{ margin:'1.5em'}}>
                  <Comment.Author as='a' href={item.reviewer.url} target='_blank' style={{color: "white" , margin:'0.5em'}}>@{item.reviewer.username}</Comment.Author>
                <Comment.Metadata>
                    <div style={{ color: "white"}}>{item.date.slice(0,10)}</div>
                </Comment.Metadata>
                  <Comment.Text style={{ color: "white", margin:'1em' }}>Score: {item.reviewer.scores.overall} <Icon name='star' color='yellow'/></Comment.Text>
                  <Comment.Text as='a' href={item.url } target='_blank'style={{ color: "white" }}>{item.content.length > 100 ? item.content.substring(0, 500) +'...' : item.content}</Comment.Text>
              </Comment.Content>
              </Comment>
          
        ))
      }
  
    </Comment.Group>
     

    </div>
  );
};

export default Review;
