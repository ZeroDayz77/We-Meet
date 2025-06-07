import * as React from 'react';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Card from "./ProfileCard.jsx";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function Home() {
  const [dataList, setDataList] = useState([]);
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
    const fetchData = async () => {
      try {
        setError(null);
        
        // Create promises for all API calls
        const fetchPromises = Array.from({ length: 20 }, async () => {
          const response = await fetch('/api/proxy/');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const { results } = await response.json();
          const user = results[0];
          const rand = getRandomNumber(0, universityList.length - 1);
          
          return {
            gender: user.gender,
            name: `${user.name.first} ${user.name.last}`,
            location: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
            email: user.email,
            username: user.login.username,
            dob: user.dob.date,
            phone: user.phone,
            cell: user.cell,
            picture: user.picture.medium,
            university: universityList[rand]
          };
        });

        // Execute all promises concurrently
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
        
        setDataList(successfulResults);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
          Failed to load user data: {error}
        </Alert>
      </Box>
    );
  }

  if (dataList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="warning" sx={{ maxWidth: 500 }}>
          No user data available
        </Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" justifyContent="center">
      {dataList.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my: 2 }}>
          <Card 
            university={user.university} 
            loading={false} 
            profile={user.picture} 
            name={user.name} 
            username={user.username}
          />
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}