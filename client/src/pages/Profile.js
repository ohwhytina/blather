import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BlabForm from '../components/BlabForm';
import BlabList from '../components/BlabList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import { Box, Divider, Typography, Button } from '@material-ui/core/';


const Profile = props => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (
    Auth.loggedIn() &&
    Auth.getProfile().data.username === userParam
  ) {
    return <Redirect to="/profile/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Redirect to="/" />
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Box pt={1}>
        <Typography variant="h4">
          Viewing {userParam ? `${user.username}'s` : 'your'} Profile.
        </Typography>
        <div>{!userParam && <BlabForm />}</div>

        <Box p={2}>
        {userParam && (
          <Button variant="contained" style={{ backgroundColor: '#90a4ae' }} onClick={handleClick}>
            Follow
          </Button>
        )}
        </Box>
      </Box>
      <Divider/>

      <div className="flex-row justify-space-between mb-3">
        <Typography>
          <BlabList blabs={user.blabs} title={`${user.username}'s Blabs`} />
        </Typography>
        <Divider/>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
     
    </div>
  );
};

export default Profile;
