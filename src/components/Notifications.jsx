import React, { useEffect, useState } from 'react';
import NotificationCard from "./NotificationCard.jsx";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Notifications() {
  const [likes, setLikes] = useState([]);
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
    const generateFakeLikes = async () => {
      try {
        const tempLikes = [];
        for (let i = 0; i < 20; i++) {
          const response = await fetch('https://randomuser.me/api/');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          let rand = getRandomNumber(0, universityList.length - 1);
          const { results } = await response.json();
          const user = results[0];
          const likeData = {
            profile: user.picture.medium,
            name: `${user.name.first} ${user.name.last}`,
            username: user.login.username,
            university: universityList[rand]
          };
          tempLikes.push(likeData);
        }
        setLikes(tempLikes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    generateFakeLikes();
  }, []);

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
      {likes.map((like, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} sx={{ width: '100%' }}>
          <NotificationCard username={like.username} university={like.university} loading={loading} profile={like.profile} name={like.name}></NotificationCard>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}
