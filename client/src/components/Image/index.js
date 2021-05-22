import axios from 'axios';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import React, { useState } from 'react';

const Image = props => {

    const [imageState, setImageState] = useState("");
    const handleSuccess=(result) => { 
        setImageState(result.info.url)
          props.thisImageData(imageState);
          console.log("URL: "+ result.info.url) ;

        }
      
    const cloudName = "jaderiver54";
    return (
        <>
            <WidgetLoader />
            <Widget
                resourceType={'image'}
                cloudName={cloudName}
                uploadPreset={'slo45v0x'} // check that an upload preset exists and check mode is signed or unisgned
                buttonText={'Upload Image'} // default 'Upload Files'
                style={{
                    color: 'white',
                    border: 'none',
                    width: '120px',
                    backgroundColor: 'green',
                    borderRadius: '4px',
                    height: '25px'
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
    )
}
export default Image;
