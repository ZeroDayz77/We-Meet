import React, { useEffect, useState } from 'react';
import NotificationCard from "./NotificationCard.jsx";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function Notifications() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const universityList = [
    "University of the West Indies: Mona",
    "University of the West Indies: Saint Augustine",
    "University of Puerto Rico",
    "University of the West Indies: Cave Hill",
    "University of the West Indies: Open Campus",
    "University of the West Indies: Five Islands",
    "University of the West Indies: Saint Vincent and the Grenadines",
    "University of Guyana",
    "University of Technology, Jamaica",
    "University of the Commonwealth Caribbean",
    "University of Trinidad and Tobago"
  ];

  useEffect(() => {
    const generateFakeLikes = async () => {
      try {
        setError(null);
        
        // Create promises for all API calls
        const fetchPromises = Array.from({ length: 20 }, async () => {
          const response = await fetch('https://corsproxy.io/?https://randomuser.me/api/');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const { results } = await response.json();
          const user = results[0];
          const rand = getRandomNumber(0, universityList.length - 1);
          
          return {
            profile: user.picture.medium,
            name: `${user.name.first} ${user.name.last}`,
            username: user.login.username,
            university: universityList[rand]
          };
        });

        // Execute all promises concurrently for better performance
        const results = await Promise.allSettled(fetchPromises);
        
        // Filter successful results
        const successfulResults = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
        
        // Log any failures
        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
          console.warn(`${failures.length} requests failed:`, failures);
        }
        
        setLikes(successfulResults);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error generating fake likes:', error);
      }
    };

    generateFakeLikes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          Failed to load notifications: {error}
        </Alert>
      </Box>
    );
  }

  if (likes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="info" sx={{ maxWidth: 500 }}>
          No notifications available
        </Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
      {likes.map((like, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} sx={{ width: '100%' }}>
          <NotificationCard 
            username={like.username} 
            university={like.university} 
            loading={false} // Fixed: loading should be false when data is loaded
            profile={like.profile} 
            name={like.name}
          />
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}