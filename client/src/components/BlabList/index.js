import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from '../LikeButton'


import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Divider, unstable_createMuiStrictModeTheme} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { useMutation } from '@apollo/react-hooks';


const BlabList = ({ blabs, title }) => {



  if (!blabs.length) {
    return <h3>No Blabs Yet</h3>;
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
      {blabs &&
    blabs.map(blab => (
    <Box p={1} key={blab._id}>
    <Card style={{minWidth: 360, maxWidth: 360, maxheight: 400}}>
      <Link to={`/profile/${blab.username}`} style={{ textDecoration: 'none'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: '#2196f3'}}>
            <FaceIcon/>
          </Avatar>
        }
        title={blab.username}
        subheader={blab.createdAt}
      />
      </Link>
      <CardMedia
      style={{height: 0, paddingTop: '56.25%'}}
        image="https://res.cloudinary.com/tinablab/image/upload/v1621565724/Jasper_o9dcn9.jpg"
        title=""
      />

      <CardContent>
      <Link to={`/blab/${blab._id}`} style={{ textDecoration: 'none'}}>
        <Typography variant="body2" component="p">
        {blab.blabText}
        </Typography>
        </Link>
      </CardContent>
      <Divider/>
      <CardActions>
        <LikeButton></LikeButton>
{/* 
        <IconButton aria-label="click to like">
        <FavoriteIcon />
        </IconButton >
        <Typography>{blab.likeCount}</Typography> */}
        
        <Link to={`/blab/${blab._id}`}>
         <IconButton aria-label="comment">
         <CommentIcon/>
        </IconButton>
          </Link>
          <Typography>{blab.commentCount}</Typography>
        </CardActions>
        
    </Card>
  </Box>
    ))}
  </Box>
  
  </div>
  )
};

export default BlabList;