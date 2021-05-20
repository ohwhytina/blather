import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHT } from '../utils/queries';

import { Divider, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, ButtonBase} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';


const SingleThought = props => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

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
        title={thought.username}
        subheader={thought.createdAt}
      />
      <CardMedia
      style={{height: 0, paddingTop: '56.25%'}}
        image="https://timesofindia.indiatimes.com/photo/67586673.cms"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" component="p">
        {thought.thoughtText}
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
    {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    <Divider variant="middle" />
    {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
