import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Button, Container, Grid, TextField} from '@material-ui/core/';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Container style={{paddingTop: (30)}} maxWidth="xs">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField 
                  fullWidth label="Username" 
                  name="username" 
                  id="username"
                  size="small" 
                  variant="outlined" 
                  onChange={handleChange}
                  value={formState.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                  fullWidth label="Email" 
                  name="email" 
                  size="small" 
                  id="email"
                  variant="outlined" 
                  onChange={handleChange}
                  value={formState.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    id="pwd"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
              </Grid>
                <Grid item xs={12}>
              <Button color="secondary" fullWidth type="submit" variant="contained">
                Sign Up
              </Button>
            </Grid>
            </Grid>
            </form>

            {error && <div>Signup failed</div>}
            
          </Container>
      </div>
  );
};

export default Signup;
