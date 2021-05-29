import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Box, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
// import FavoriteIcon from '@material-ui/icons/Favorite';


const CommentList = ({ comments }) => {
  return (

    <div style={{ width: '100%'}}>
        
    <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
    >
      {comments &&
          comments.map(comment => (   
    <Box p={1} key={comment._id}>
    <Card style={{height: '100%'}}>
    <Link to={`/profile/${comment.username}`} style={{ textDecoration: 'none'}}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: '#2196f3'}}>
            <FaceIcon/>
          </Avatar>
        }
        title={comment.username}
        subheader={comment.createdAt}
      />
      </Link>
     <CardContent>
        <Typography variant="body2" component="p" key={comment._id}>
        {comment.commentBody}
        </Typography>
        </CardContent>
        <Divider/>

        {/* <CardActions>
        <IconButton aria-label="click to like">
          <FavoriteIcon /> 
        </IconButton>
        <Typography># of likes</Typography>
        </CardActions> */}

        </Card>
    </Box>
      ))}
    </Box>
    </div>
  );
};

export default CommentList;
