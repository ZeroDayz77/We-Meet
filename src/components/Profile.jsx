import { Divider } from '@mui/material';
import React from 'react';
import "./Profile.css";
import { useState } from 'react';

export default function Profile() {

    const [profileImg, setProfileImg] = useState(localStorage.getItem('profileImg') || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDaWpTOnUCDqRIz8hHShOTcZzs4Vddd7SbKDaww_IsBg&s");


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name');
        const username = formData.get('username');
        const age = formData.get('age');
        const university = formData.get('university');
        const instagram = formData.get('instagram');

        const preferences = [];
        formData.forEach((value, key) => {
            if (key.startsWith('want')) {
                preferences.push(value);
            }
        });

        //for later use if wanted to...

        // Save user data to local storage
        const userData = {
            name,
            username,
            age,
            university,
            instagram,
            preferences
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert("Your info has been saved!");
    };

    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 1024 * 1024; // 1MB
        if (file.size > maxSize) {
            alert("File size exceeds the limit of 1MB. Please choose a smaller file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                let width = img.width;
                let height = img.height;
    
                // Set canvas dimensions
                canvas.width = 250;
                canvas.height = 250;
    
                // Calculate scaling ratio
                const scale = Math.max(canvas.width / width, canvas.height / height);
    
                // Calculate new dimensions after scaling
                width *= scale;
                height *= scale;
    
                // Calculate position to center the image
                const x = (canvas.width - width) / 2;
                const y = (canvas.height - height) / 2;
    
                // Draw image on canvas
                ctx.drawImage(img, x, y, width, height);
    
                // Convert canvas to data URL
                const dataURL = canvas.toDataURL('image/jpeg');
    
                // Set profile image
                setProfileImg(dataURL);
                localStorage.setItem('profileImg', dataURL);
            };
        };
        reader.readAsDataURL(file);
    }; // before anyone gets jittery i had to do a bit of searching to find ou this scaling and image reading function.. i am annoyed this took minutes to implement

    return (
        <div className="container">
            <div className="card">
                <img src={profileImg} className="profile-img" />

                <form onSubmit={handleSubmit} className='boxes'>
                    <div className="File">
                        <label htmlFor="profilePic">Choose Profile Picture:</label>
                        <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <input className="Name" type="text" name="name" placeholder="Enter your name" />
                    <input className="Username" type="text" name="username" placeholder="Enter your username" />
                    <input className="Age" type="number" name="age" placeholder="Enter your age" />
                    <input className="University" type="text" name="university" placeholder="Enter your university" />
                    <input className="Instagram" type="text" name="instagram" placeholder="Enter your instagram @" />

                    <Divider />
                    <h1>What are you looking for?</h1>
                    <div className="boxes">
                        <div>
                            <input type="checkbox" id="Friendship" name="want1" value="friendship" />
                            <label htmlFor="Friendship">I want a friendship</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Relationship" name="want2" value="Relationship" />
                            <label htmlFor="Relationship">I want a relationship</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Study" name="want3" value="Study" />
                            <label htmlFor="Study">I want a study group</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Thinking" name="want4" value="Thinking" />
                            <label htmlFor="Thinking">Thinking about it</label>
                        </div>
                    </div>

                    <Divider />
                    <label htmlFor="About"><h1>About me:</h1></label>
                    <textarea className="About-text" type="text" placeholder="Write a little something about yourself" rows="4" cols="50" name="about"></textarea>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}