import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {  Typography, Button, Icon } from '@material-ui/core';


function LikeButton({ user, blab: { _id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeBlab] = useMutation(LIKE_BLAB_MUTATION, {
    variables: { blabId: _id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" onClick={likeBlab}>
      {likeButton}
      <Typography>
        {likeCount}
        </Typography>
    </Button>
  );
}

const LIKE_BLAB_MUTATION = gql`
  mutation likeBlab($blabId: ID!) {
    likeBlab(blabId: $blabId) {
      _id
      likes {
        _id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;