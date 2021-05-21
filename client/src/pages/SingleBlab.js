import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BLAB } from '../utils/queries';

import { Divider, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, ButtonBase} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';


const SingleBlab = props => {
  const { id: blabId } = useParams();

  const { loading, data } = useQuery(QUERY_BLAB, {
    variables: { id: blabId }
  });

  const blab = data?.blab || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  <div style={{ width: '100%'}}>
    <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
    >
    <Box p={2}>
    <Card style={{ width: 300, maxheight: 300}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: '#2196f3'}}>
            <FaceIcon/>
          </Avatar>
        }
        title={blab.username}
        subheader={blab.createdAt}
      />
      <CardMedia
      style={{height: 0, paddingTop: '56.25%'}}
        image="https://timesofindia.indiatimes.com/photo/67586673.cms"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" component="p">
        {blab.blabText}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/> 
        </IconButton>
        <Typography># of likes</Typography>
        </CardActions>
    </Card>
    </Box>
    </Box>
    {Auth.loggedIn() && <CommentForm blabId={blab._id} />}
    <Divider variant="middle" />
    {blab.commentCount > 0 && <CommentList comments={blab.comments} />}
    </div>
  );
};

export default SingleBlab;
