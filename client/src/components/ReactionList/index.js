import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, ButtonBase} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';


const ReactionList = ({ reactions }) => {
  return (

    <div style={{ width: '100%'}}>
      {reactions &&
          reactions.map(reaction => (     
    <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
    >
      
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
        <Typography variant="body2" color="textSecondary" component="p" key={reaction._id}>
        {reaction.reactionBody}
        </Typography>
        </CardContent>
        </Card>
    </Box>
    </Box>
    ))};
      
    </div>
    

    
  );
};

export default ReactionList;
