import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Container, Grid, TextField} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CommentForm = ({ blabId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentBody, blabId }
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
<div>
        <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Button color="secondary" onClick={handleOpen} type="submit" variant="contained">
            Add a comment!
        </Button>
        </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div>
        <Container maxWidth="sm">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add a comment"
                    name="comment"
                    size="large"
                    multiline="bool"
                    row="40"
                    variant="outlined"
                    className={`${characterCount === 280 || error ? 'text-error' : ''}`}
                       value={commentBody}
                      onChange={handleChange}
                  />
                  Character Count: {characterCount}/280
                  {error && <span className="ml-2">Something went wrong...</span>}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button fullWidth color="secondary" type="submit" variant="contained">
                Add comment!
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <div>Something went wrong...</div>}
      </Container>
      </div>
          </div>
        </Fade>
      </Modal> 
    </div>
  );
};

export default CommentForm;
