import React, { useState, useEffect } from "react";
 import Image from '../Image'
//  import { ADD_BLAB } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { QUERY_BLABS, QUERY_ME } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_BLAB_TEXT, ADD_BLAB} from '../../utils/actions';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core/';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { image } from "@cloudinary/base/qualifiers/source";

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

const BlabForm = () => {
  const [state, dispatch] = useStoreContext();
  const {blabText, imageUrl} = state;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [characterCount, setCharacterCount] = useState(0);

  const [addBlab, { error }] = useMutation(ADD_BLAB, {
    update(cache, { data: { addBlab } }) {
      try {
        // update blab array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { blabs } = cache.readQuery({ query: QUERY_BLABS });
        cache.writeQuery({
          query: QUERY_BLABS,
          data: { blabs: [addBlab, ...blabs] }
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, blabs: [...me.blabs, addBlab] } }
      });
    }
  });
  // const addToBlabs = () => {
  //   dispatch({
  //     type: ADD_BLAB,
  //     blabText: blabText,
  //     imageUrl: imageUrl
  //   });
  // };
  //, blabs

  // update state based on form input changes
  const handleChange = event => {
    const currentText = event.target.value;
    if (currentText.length <= 280) {
          setCharacterCount(currentText.length);
          dispatch({
            type: UPDATE_BLAB_TEXT,
            blabText: currentText
          });
    }
    
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

      try {

        await addBlab({
          variables: { blabText, imageUrl }
        });

        // clear form value
        // setText('');
        setCharacterCount(0);
        handleClose();
      } catch (e) {
        console.error(e);
      }
   };

  return (
    <div>
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Button color="secondary" onClick={handleOpen} type="submit" variant="contained">
          CREATE A BLAB!
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
            <div><Container maxWidth="sm">
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="What do you want to Blab about?"
                          name="Blabinfo"
                          size="large"
                          multiline="bool"
                          row="40"
                          variant="outlined"
                          className={`${characterCount === 280 || error ? 'text-error' : ''}`}
                          value={blabText}
                          onChange={handleChange}
                        />
                        <Typography>Character Count: {characterCount}/280</Typography>
                        {error && <span className="ml-2">Something went wrong...</span>}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box>
                    <Image></Image>
                  </Box>

                  <Box display="flex" m={1} p={1} bgcolor="background.paper">
                    <Button color="secondary" type="submit" variant="contained">
                      Blab away!
        </Button>
                  </Box>
                </Grid>

              </form>
            </Container>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BlabForm;
