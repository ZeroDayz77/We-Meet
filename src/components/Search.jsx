import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from "./ProfileCard.jsx";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function Search() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
          const response = await fetch('https://corsproxy.io/?https://randomuser.me/api/');
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

  useEffect(() => {
    if (selectedUniversity) {
      const filtered = dataList.filter(user => user.university === selectedUniversity);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedUniversity, dataList]);

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

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

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select University' }}
            sx={{ color: 'white' }}
          >
            <MenuItem value="" disabled>
              Select a University of interest...
            </MenuItem>
            {universityList.map((university, index) => (
              <MenuItem key={index} value={university}>{university}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      {selectedUniversity && filteredData.length > 0 ? (
        filteredData.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              university={user.university} 
              loading={false} // Fixed: should be false when data is loaded
              profile={user.picture} 
              name={user.name} 
              username={user.username}
            />
          </Grid>
        ))
      ) : selectedUniversity ? (
        // Show message when university is selected but no results found
        <Grid item xs={12}>
          <Typography variant="body1" align="center" sx={{ color: 'white', mt: 4 }}>
            No profiles found for {selectedUniversity}.
          </Typography>
        </Grid>
      ) : (
        // Show message when no university is selected
        <Grid item xs={12}>
          <Typography variant="body1" align="center" sx={{ color: 'white', mt: 4 }}>
            Please select a university to view profiles.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}