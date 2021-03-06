import React from 'react';
import { useParams } from 'react-router-dom';
import Image from '../components/Image'
import { useStoreContext } from "../utils/GlobalState";

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


import { useQuery } from '@apollo/react-hooks';
import { QUERY_BLAB } from '../utils/queries';
import { Link } from 'react-router-dom';

import { Divider, Box, Card, CardHeader, CardMedia, CardContent, Avatar, Typography } from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Auth from '../utils/auth';
// CardActions, IconButton

const SingleBlab = props => {

  const [state, dispatch] = useStoreContext();

  const { id: blabId } = useParams();

  const { loading, data } = useQuery(QUERY_BLAB, {
    variables: { id: blabId }
  });

  const blab = data?.blab || {};



  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Box p={2} key={blab.username}>
          <Card style={{ width: 300, maxheight: 300 }}>
            <Link to={`/profile/${blab.username}`} style={{ textDecoration: 'none' }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" style={{ backgroundColor: '#2196f3' }}>
                    <FaceIcon />
                  </Avatar>
                }
                title={blab.username}
                subheader={blab.createdAt}
              />
            </Link>
            <CardMedia
              style={{ height: 0, paddingTop: '56.25%' }}
              image={blab.imageUrl}
              title={blab.username}
            />
            <CardContent>
              <Typography variant="body2" component="p">
                {blab.blabText}

              </Typography>

              <Image thisBlabId={blabId} blabUsername={blab.username} />

            </CardContent>
            <Divider />
            {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Typography># of likes</Typography>

            </CardActions> */}
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
