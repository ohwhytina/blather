import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { StoreProvider } from "./utils/GlobalState";
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleBlab from './pages/SingleBlab';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <StoreProvider>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profile/:username?" component={Profile} />
                <Route exact path="/blab/:id" component={SingleBlab} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
