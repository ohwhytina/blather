import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Divider} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div style={{ width: '100%'}}>
      <Box p={2}>
      <Typography variant="h5">{title}</Typography>
      </Box>
    <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
    >
      {thoughts &&
    thoughts.map(thought => (
    <Box p={1} key={thought._id}>
    <Card style={{minWidth: 345, maxWidth: 345, maxheight: 300}}>
      <Link to={`/profile/${thought.username}`} style={{ textDecoration: 'none'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: '#2196f3'}}>
            <FaceIcon/>
          </Avatar>
        }
        title={thought.username}
        subheader={thought.createdAt}
      />
      </Link>
      <CardMedia
      style={{height: 0, paddingTop: '56.25%'}}
        image="https://timesofindia.indiatimes.com/photo/67586673.cms"
        title="Paella dish"
      />

      <CardContent>
      <Link to={`/thought/${thought._id}`} style={{ textDecoration: 'none'}}>
        <Typography variant="body2" color="textSecondary" component="p">
        {thought.thoughtText}
        </Typography>
        </Link>
      </CardContent>
      <Divider/>
      <CardActions>
        <IconButton aria-label="click to like">
          <FavoriteIcon /> 
        </IconButton>
        <Typography># of likes</Typography>
        
        <Link to={`/thought/${thought._id}`}>
         <IconButton aria-label="comment">
         <CommentIcon/>
        </IconButton>
          </Link>
          <Typography>{thought.reactionCount}</Typography>
        </CardActions>

    </Card>
  </Box>
    ))}
  </Box>
  
  </div>
  )
};

export default ThoughtList;