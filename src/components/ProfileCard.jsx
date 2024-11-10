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
      sx={{ width: 350, minWidth: 200, height: 350, minHeight: 200, display: 'flex', flexDirection: 'column' }}
      style={{ display: "flex", borderRadius: 10, backgroundColor: "#44538D", color: "white", boxShadow: "10px 10px 20px 2px rgba(0,0,0,0.43)" }}
    >
      <CardHeader
        subheader={loading ? <Skeleton /> : name} 
        sx={{textAlign:'center', backgroundColor: "#8191A5"}}
        subheaderTypographyProps={{ color: 'white', fontWeight: 500, fontStyle: 'bold', fontSize: 24}}
      />
      <CardMedia sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
        {loading ? (
          <Skeleton variant="circular" width={100} height={100} />
        ) : (
          <Avatar alt={name} src={profile} sx={{ width: 100, height: 100 }} />
        )}
      </CardMedia>
      <CardContent sx={{ marginBottom: 'auto', paddingBottom: 0 }}>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          {loading ? <Skeleton /> : username}
        </Typography>
        <Typography gutterBottom variant="h7" component="div" textAlign={'center'}>
          {loading ? <Skeleton /> : university}
        </Typography>
      </CardContent>
      <CardActions 
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: "#8191A5",
          paddingTop: 'auto',
        }}
      >
        <IconButton 
          aria-label="add to favorites" 
          onClick={handleFavoriteClick} 
          style={{ color: isFavorited ? "#FF474C" : "#C8D9C1" }}
        >
          <FavoriteIcon/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon style={{ color: '#C8D9C1' }}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
