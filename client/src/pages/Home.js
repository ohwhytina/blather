import React from 'react';
import BlabList from '../components/BlabList';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BLABS, QUERY_ME_BASIC } from '../utils/queries';

import { Divider } from '@material-ui/core/';


const Home = () => {
  const { loading, data } = useQuery(QUERY_BLABS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const blabs = data?.blabs || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>

        <div className={`${loggedIn}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BlabList blabs={blabs} title="Welcome to the Blabs!" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
