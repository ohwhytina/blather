import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

import { Box, Divider, Typography} from '@material-ui/core/';


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
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
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
          Viewing {userParam ? `${user.username}'s` : 'your'} Dashboard.
        </Typography>
        <div className="mb-3">{!userParam && <ThoughtForm />}</div>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </Box>
      <Divider/>

      <div className="flex-row justify-space-between mb-3">
        <Typography>
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s Blabs`} />
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
