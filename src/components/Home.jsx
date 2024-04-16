import * as React from 'react';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Card from "./ProfileCard.jsx";
import Grid from '@mui/material/Grid';


export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" justifyContent="center">
      {dataList.map((user, index) => (
        <Grid item xs={3} sm={3} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Card university={user.university} loading={loading} profile={user.picture} name={user.name} username={user.username}></Card>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}