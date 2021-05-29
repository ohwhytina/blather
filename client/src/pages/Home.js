import React, { useEffect, useState } from "react";
import BlabList from '../components/BlabList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BLABS, QUERY_ME_BASIC, QUERY_USERS } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_BLABS, UPDATE_USERS, UPDATE_CURRENT_USER } from '../utils/actions';


const Home = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_BLABS);
  const { data: thisUserData } = useQuery(QUERY_ME_BASIC);
  const { data: usersData } = useQuery(QUERY_USERS);

  const allBlabs = data?.blabs || [];
  const { blabs, users } = state;
  let thisUser;
  let greeting = "!";
  const loggedIn = Auth.loggedIn();
  if (thisUserData && loggedIn) {
    thisUser = thisUserData.me;
    console.log(thisUser);
    greeting = ", " + thisUser.username + "!";
  }
  useEffect(() => {
    if (thisUserData) {
      dispatch({
        type: UPDATE_CURRENT_USER,
        currentUser: thisUserData.me
      });
    }
   
  }, [thisUserData, dispatch]);
  greeting = "Welecome to the Blabs" + greeting;
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BLABS,
        blabs: data.blabs
      });
    }
   
  }, [data, dispatch]);

  useEffect(() => {
    if (usersData) {
      dispatch({
        type: UPDATE_USERS,
        users: usersData.users
      });
    }
  }, [usersData, dispatch]);

  



  return (
    <main>
      <div>

        <div className={`${loggedIn}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BlabList blabs={allBlabs} title={greeting} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
