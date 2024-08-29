// import React, { useEffect, useState } from "react";
// import { Container, Typography, Paper, Grid, Box, Divider } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useQuery, gql } from "@apollo/client";
// import { useSession } from "next-auth/react";

// // Define a styled component for the profile picture
// const ProfilePic = styled('img')({
//   width: '150px',
//   height: '150px',
//   borderRadius: '50%',
//   cursor: 'pointer',
// });

// // GraphQL query to fetch posts by userId
// const GET_POSTS_BY_USER = gql`
//   query GetPostsByUser($userId: ID!) {
//     getPostsByUser(userId: $userId) {
//       id
//       photo
//       body
//       postedBy {
//         id
//         name
//       }
//     }
//   }
// `;

// interface Post {
//   id: string;
//   postedBy: {
//     id: string;
//     name: string;
//     photo?: string;
//   };
//   photo: string;
//   body: string;
//   comments: {
//     postedBy: {
//       name: string;
//     };
//     comment: string;
//   }[];
// }

// export default function Profile() {
//   const {data:session,status} = useSession()
//   const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
//   const [show, setShow] = useState(false);
//   const [posts, setPosts] = useState<Post | null>(null);
//   const [user, setUser] = useState<any>({});
//   const [changePic, setChangePic] = useState(false);


//   const userId = session?.user
//   console.log("userID over here",userId)

//   const { data, loading, error } = useQuery(GET_POSTS_BY_USER, {
//     variables: { userId },
//     onCompleted: (data) => {
//       setUser(data?.getPostsByUser[0]?.postedBy || {});
//     },
//   });
//   if (data) {
//   console.log(data);
// }

// if(error) {
//   console.log(error);
// }

//   const toggleDetails = (post: Post) => {
//     setShow(!show);
//     setPosts(post);
//   };

//   const changeProfile = () => {
//     setChangePic(!changePic);
//   };

//   if(loading) {
//     return (<div>
//       Loading...
//     </div>)
//   }

  

//   return (
//     <Container sx={{zIndex:'-1'}}>
//       <Paper style={{ padding: '20px', marginBottom: '20px' }} sx={{border:'none',boxShadow:'none',bgcolor:'transparent'}}>
//         <Box display="flex" alignItems="center">
//           <ProfilePic
//             src={user.photo || picLink}
//             alt="Profile Picture"
//             onClick={changeProfile}
//           />
//           <Box ml={2}>
//             <Typography variant="h4">{user.name || 'Name'}</Typography>
//             <Box display="flex" mt={1}>
//               <Typography variant="body1" mr={2}>{data?.getPostsByUser.length || "0"} posts</Typography>
//               <Typography variant="body1" mr={2}>{user.followers?.length || "0"} followers</Typography>
//               <Typography variant="body1">{user.following?.length || "0"} following</Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>

//       <Divider style={{ margin: '25px 0' }} sx={{ height:'2px', backgroundColor:'black' }} />

//        <Grid container spacing={2}>
//          {data?.getPostsByUser.map((post: Post) => (
//           <Grid item xs={4} key={post.id}>
//             <Paper elevation={2}>
//               <img
//                 src={post.photo || picLink}
//                 alt={post.body}
//                 style={{ width: '100%', cursor: 'pointer' }}
//                 onClick={() => toggleDetails(post)} 
//               />
//             </Paper>
//           </Grid>
//         ))} 
//       </Grid>

//       {show && posts && (
//         // Replace with your PostDetail component
//         <div>{/* Post detail goes here */}</div>
//       )}

//       {changePic && (
//         // Replace with your ProfilePic component
//         <div>{/* Profile picture change goes here */}</div>
//       )}
//     </Container>
//   );
// }



import React, { useEffect, useState, FC } from "react";
import { Container, Typography, Paper, Grid, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchPostsByUser } from "@/store/slices/postSlice";
import { AppDispatch, RootState } from "@/store/store";

const ProfilePic = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  cursor: 'pointer',
});

const Profile: FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [changePic, setChangePic] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPostsByUser(userId));
    }
  }, [userId, dispatch]);

  const toggleDetails = (post: any) => {
    setSelectedPost(post);
    setShow((prevShow) => !prevShow);
  };

  return (
    <Container sx={{ zIndex: '-1' }}>
      <Paper sx={{ p: 3, mb: 3, border: 'none', boxShadow: 'none', bgcolor: 'transparent' }}>
        <Box display="flex" alignItems="center">
          <ProfilePic alt="Profile Picture" />
          <Box ml={2}>
            <Typography variant="h4">{"Name"}</Typography>
            <Box display="flex" mt={1}>
              <Typography variant="body1" mr={2}>{posts.length} posts</Typography>
              <Typography variant="body1" mr={2}>{"0"} followers</Typography>
              <Typography variant="body1">{"0"} following</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ my: 3, height: 2, backgroundColor: 'black' }} />

      <Grid container spacing={2}>
        {posts.map((post: any) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Paper elevation={2}>
              <img
                src={post.photo}
                alt={post.body}
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => toggleDetails(post)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {show && selectedPost && (
        <div>{/* Post detail goes here */}</div>
      )}

      {changePic && (
        <div>{/* Profile picture change goes here */}</div>
      )}
    </Container>
  );
};

export default Profile;
