import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CardHeader } from '@mui/material';

export default function ProfileCard({ name, profile, username, loading, university }) {

  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Card
      sx={{ width: 350, minWidth: 200, height: 350, minHeight: 200 }}
      variant="outlined"
      style={{ display: "inline-block" }}
    >
      <CardHeader subheader={loading ? <Skeleton /> : university} sx={{textAlign:'center'}}/>
      <CardMedia sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1 }}>
        {loading ? (
          <Skeleton variant="circular" width={100} height={100} />
        ) : (
          <Avatar alt={name} src={profile} sx={{ width: 100, height: 100 }} />
        )}
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          {loading ? <Skeleton /> : username}
        </Typography>
        <Typography gutterBottom variant="h7" component="div" textAlign={'center'}>
          {loading ? <Skeleton /> : name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton 
          aria-label="add to favorites" 
          onClick={handleFavoriteClick} 
          color={isFavorited ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
