import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, ButtonBase} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';

const ReactionList = ({ reactions }) => {
  return (

    <div style={{ width: '100%'}}>
        
    <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
    >
      {reactions &&
          reactions.map(reaction => (   
    <Box p={1}>
    <Card>
    <Link to={`/profile/${reaction.username}`}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: '#2196f3'}}>
            <FaceIcon/>
          </Avatar>
        }
        title={reaction.username}
        subheader={reaction.createdAt}
      />
      </Link>
     <CardContent>
        <Typography variant="body2" component="p" key={reaction._id}>
        {reaction.reactionBody}
        </Typography>
        </CardContent>
        <Divider/>
        <CardActions>
        <IconButton aria-label="click to like">
          <FavoriteIcon /> 
        </IconButton>
        <Typography># of likes</Typography>
        </CardActions>

        </Card>
    </Box>
      ))}
    </Box>
    </div>
  );
};

export default ReactionList;
