import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Button, Container, Grid, TextField} from '@material-ui/core/';

const Login = props => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    });
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
                  fullWidth label="Email" 
                  name="email" 
                  size="small" 
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
                    variant="outlined"
                    onChange={handleChange}
                    value={formState.password}
                  />
                </Grid>
                <Grid item xs={12}>
              <Button color="secondary" fullWidth type="submit" variant="contained">
                Log in
              </Button>
            </Grid>
          </Grid>
          </Grid>
          </Grid>
          </form>
            {error && <div>Login failed</div>}
        </Container>
      </div>
    
  );
};

export default Login;
