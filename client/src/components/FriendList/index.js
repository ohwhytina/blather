import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Card } from '@material-ui/core';
import { teal } from '@material-ui/core/colors'


const FriendList = ({ friendCount, username, friends }) => {
  
  if (!friends || !friends.length) {
    return (
    <Box p={2}>
    <Typography>{username} is not following anyone.</Typography>
    </Box>
    )}

  return (
    <div>
    <Box p={2}>
    <Typography variant="h5">{username} is following {friendCount} {friendCount === 1 ? 'person' : 'people'}</Typography>

    <Box p={1}>
      {friends.map(friend => (
        <Link to={`/profile/${friend.username}`} style={{ textDecoration: 'none'}}>
          <Button variant="contained" style={{ backgroundColor: '#b2dfdb' }} key={friend._id}>
          {friend.username}
        </Button></Link>
      ))}
   </Box>

    </Box>
    </div>
  );
};

export default FriendList;
