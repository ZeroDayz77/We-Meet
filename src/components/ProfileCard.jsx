import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ProfileCard({ name, profile, username }) {

  return (
    <Card 
      sx={{ width: 300, minWidth : 200, height: 300, minHeight: 200}}
      variant="outlined"
      style={{ display: "inline-block" }}
    >
      <CardMedia sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
        <Avatar alt={name} src={profile} sx={{ width: 100, height: 100 }}/>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            {username}
        </Typography>
        <Typography gutterBottom variant="h7" component="div" textAlign={'center'}>
            {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}