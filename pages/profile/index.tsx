import React, { useEffect, useState } from "react";
import { Container, Typography, IconButton, Paper, Grid, Box, Divider } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Define a styled component for the profile picture
const ProfilePic = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  cursor: 'pointer',
});

interface Post {
  _id: string;
  postedBy: {
    _id: string;
    name: string;
    Photo?: string;
  };
  photo: string;
  likes: string[];
  body: string;
  comments: {
    postedBy: {
      name: string;
    };
    comment: string;
  }[];
}

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState<Post[]>([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState<Post | null>(null);
  const [user, setUser] = useState<any>({});
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (post: Post) => {
    setShow(!show);
    setPosts(post);
  };

  const changeProfile = () => {
    setChangePic(!changePic);
  };

  useEffect(() => {
    // Replace with your API call
    // fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setPic(result.post);
    //     setUser(result.user);
    //   });
  }, []);

  return (
    <Container sx={{zIndex:'-1'}}>
      <Paper style={{ padding: '20px', marginBottom: '20px' }} sx={{border:'none',boxShadow:'none',bgcolor:'transparent'}}>
        <Box display="flex" alignItems="center">
          <ProfilePic
            src= '/profile.avif'
            // {user.Photo ? user.Photo : picLink}
            alt="Profile Picture"
            onClick={changeProfile}
          />
          <Box ml={2}>
            <Typography variant="h4">{user.name || 'Name'}</Typography>
            <Box display="flex" mt={1}>
              <Typography variant="body1" mr={2}>{pic.length || "0"} posts</Typography>
              <Typography variant="body1" mr={2}>{user.followers?.length || "0"} followers</Typography>
              <Typography variant="body1">{user.following?.length || "0"} following</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Divider style={{ margin: '25px 0' }} sx={{
        height:'2px', backgroundColor:'black'
      }} />

      <Grid container spacing={2}>
        {/* {pic.map((pics) => ( */}
          <Grid item xs={4} 
          // key={pics._id}
          >
            <Paper elevation={2}>
              <img
                src= '/profile.avif'
                // {pics.photo}
                alt={"photo"}
                style={{ width: '100%', cursor: 'pointer' }}
                // onClick={() => toggleDetails(pics)}
              />
            </Paper>
          </Grid>
          <Grid item xs={4} 
          // key={pics._id}
          >
            <Paper elevation={2}>
              <img
                src= '/profile.avif'
                // {pics.photo}
                alt={"photo"}
                style={{ width: '100%', cursor: 'pointer' }}
                // onClick={() => toggleDetails(pics)}
              />
            </Paper>
          </Grid>
        {/* ))} */}
      </Grid>

      {show && posts && (
        // Replace with your PostDetail component
        // <PostDetail item={posts} toggleDetails={toggleDetails} />
        <div>{/* Post detail goes here */}</div>
      )}

      {changePic && (
        // Replace with your ProfilePic component
        // <ProfilePic changeprofile={changeProfile} />
        <div>{/* Profile picture change goes here */}</div>
      )}
    </Container>
  );
}
