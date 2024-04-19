import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function NotificationCard({ profile, name, university, loading, username }) {
  return (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: "#44538D", color: "white" }}>
      <Avatar src={profile} sx={{ mr: 2 }} />
      <div>
        <Typography variant="body1">{username} ( {name} ) liked your profile!</Typography>
        <Typography variant="body2">{university}</Typography>
      </div>
    </Paper>
  );
}
