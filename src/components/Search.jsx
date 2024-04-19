import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from "./ProfileCard.jsx";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

export default function Search() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const tempDataList = [];
        for (let i = 0; i < 20; i++) {
          const response = await fetch('https://randomuser.me/api/');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          let rand = getRandomNumber(0, universityList.length - 1);
          const { results } = await response.json();
          const user = results[0];
          const userData = {
            gender: user.gender,
            name: `${user.name.first} ${user.name.last}`,
            location: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
            email: user.email,
            username: user.login.username,
            dob: user.dob.date,
            phone: user.phone,
            cell: user.cell,
            picture: user.picture.medium, // Adjust picture size as needed
            university: universityList[rand]
          };
          tempDataList.push(userData);
        }
        setDataList(tempDataList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
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
            <Card university={user.university} loading={loading} profile={user.picture} name={user.name} username={user.username}></Card>
          </Grid>
        ))
      ) : (
        //if no profiles found
        <Grid item xs={12}>
          <Typography variant="body1" align="center" sx={{ color: 'white' }}>No profiles found for the selected university.</Typography>
        </Grid>
      )}
    </Grid>
  );
}
