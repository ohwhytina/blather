import axios from 'axios';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_BLAB_IMAGE } from '../../utils/actions';
import { ADD_IMAGE } from '../../utils/mutations';
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from '@apollo/react-hooks';
// import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core/';



const Image = ({ thisBlabId, blabUsername }) => {
    let blabUser;
    const { data } = useQuery(QUERY_ME);
    let user;

    if (data) {
        user = data.me;
        console.log(user.username);

    }
    console.log(thisBlabId);
    console.log(blabUsername);

    const [state, dispatch] = useStoreContext();
    // const { imageUrl } = state;
    const [addImage, { error }] = useMutation(ADD_IMAGE);

    const handleSuccess = async (result) => {
        const newUrl = result.info.url;
        console.log("URL: " + newUrl);
        if (newUrl) {
            dispatch({
                type: UPDATE_BLAB_IMAGE,
                imageUrl: newUrl
            })
        }
        try {
            await addImage({
                variables: { blabId: thisBlabId, imageUrl: newUrl }
            });

        } catch (e) {
            console.error(e);
        }
    }

    // const cloudName = "jaderiver54";
    //process.env.CLOUD_NAME;
    if (true) {
        return (
            <div>
                {true ? (
                    <>


                        <WidgetLoader />
                        <Widget
                            resourceType={'image'}
                            cloudName='jaderiver54'
                            uploadPreset={'slo45v0x'} // check that an upload preset exists and check mode is signed or unisgned
                            buttonText={'Upload Image'} // default 'Upload Files'
                            style={{
                                color: 'white',
                                border: 'none',
                                width: '120px',
                                backgroundColor: 'grey',
                                borderRadius: '4px',
                                height: '30px',
                            }} // inline styling only or style id='cloudinary_upload_button'
                            onSuccess={handleSuccess}
                            onFailure={(res) => console.log(res)} // add failure callback
                            use_filename={true}
                            logging={true} // logs will be provided for success and failure messages, 
                        // set to false for production -> default = true
                        // use_filename={true} // set a specific custom public_id. 
                        // To use the file name as the public_id use 'use_filename={true}' parameter
                        // eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'} // add eager transformations -> deafult = null
                        // tell Cloudinary to use the original name of the uploaded 
                        // file as its public ID -> default = true,
                        />
                    </>
                ) : null}
            </div>
        );
    } else {
        return (<div>
            <Link to="/" style={{ textDecoration: 'none' }}><Button color="black">Home</Button></Link>

        </div>)
    }
}
export default Image;
