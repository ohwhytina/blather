import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import { Button, Icon, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Divider, unstable_createMuiStrictModeTheme} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useMutation } from '@apollo/react-hooks';
import { ADD_LIKE } from '../../utils/mutations';


function LikeButton( {user, blab: { likes }}){
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes]);

    const [likeBlab] = useMutation(ADD_LIKE);

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name ="heart" />
            </Button>
        )
    ) : ( 
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
            </Button>
    )

    return (
        <Button as="div" onClick={likeBlab}>
            {likeButton}
        </Button>
        
    )
}

export default LikeButton;
