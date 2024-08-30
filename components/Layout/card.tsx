// import { GetStaticProps, NextPage } from 'next';
// import { useState } from 'react';
// import Link from 'next/link';
// import { Card, CardHeader, CardMedia, CardContent, IconButton, TextField, Button, Typography } from '@mui/material';
// import { Favorite, Mood, Close } from '@mui/icons-material';

// interface Post {
//   _id: string;
//   postedBy: {
//     _id: string;
//     name: string;
//     Photo?: string;
//   };
//   photo: string;
//   likes: string[];
//   body: string;
//   comments: {
//     postedBy: {
//       name: string;
//     };
//     comment: string;
//   }[];
// }

// interface HomeProps {
//   posts: Post[];
// }

// const CardPage: NextPage<HomeProps> = ({ posts }) => {
//   const [data, setData] = useState<Post[]>(posts);
//   const [comment, setComment] = useState("");
//   const [show, setShow] = useState(false);
//   const [item, setItem] = useState<Post | null>(null);

//   const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

//   const toggleComment = (post?: Post) => {
//     setShow((prev) => !prev);
//     if (post) {
//       setItem(post);
//     }
//   };

//   const likePost = (id: string) => {
//     // Implement actual logic as needed
//   };

//   const unlikePost = (id: string) => {
//     // Implement actual logic as needed
//   };

//   const makeComment = (text: string, id: string) => {
//     // Implement actual logic as needed
//   };

//   return (
//     <div>
//       {/* {data.map((post) => ( */}
//         <Card  sx={{ maxWidth: 500, margin: '25px auto', border: '1px solid rgb(173, 173, 173)', borderRadius: 1 }}>
//           <CardHeader
//             avatar={
//               <img
//                 // src={post.postedBy.Photo || picLink}
//                 src = '/profile.avif'
//                 alt="Profile"
//                 style={{ width: 30, borderRadius: '50%' }}
//               />
//             }
//             title={
//               <Link href={`/profile`} >
//                 <Typography variant="h6" sx={{textDecoration:'none'}}>
//                   {/* {post.postedBy.name} */}
//                     sanaya
//                 </Typography>
//               </Link>
//             }
//           />
//           <CardMedia
//             component="img"
//             // image={post.photo}
//             image = '/profile.avif'
//             alt="Post"
//             sx={{ width: '100%' }}
//           />
//           <CardContent>
//             <IconButton 
//             // onClick={() => likePost(post._id)}
//             >
//               <Favorite color={
//                 // post.likes.includes('userId') ? 'error' :
//                  'inherit'} />
//             </IconButton>
//             <Typography variant="body2">
//               {/* {post.likes.length} */}
//                Likes</Typography>
//             <Typography variant="body2">
//               {/* {post.body} */}
//               </Typography>
//             <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'pointer' }} 
//             // onClick={() => toggleComment(post)}
//             >
//               View all comments
//             </Typography>
//           </CardContent>
//           <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
//             <Mood />
//             <TextField
//               variant="outlined"
//               placeholder="Add a comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               sx={{ flexGrow: 1, marginLeft: 1 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => {
//                 if (item) {
//                   makeComment(comment, item._id);
//                   toggleComment();
//                 }
//               }}
//             >
//               Post
//             </Button>
//           </div>
//         </Card>
//       {/* ))} */}

//       {show && item && (
//         <div style={{
//           width: '100vw',
//           minHeight: '100vh',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           backgroundColor: 'rgba(16, 13, 13, 0.4)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <Card sx={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
//             <CardMedia
//               component="img"
//               image={item.photo}
//               alt="Post"
//             />
//             <CardContent>
//               <CardHeader
//                 avatar={
//                   <img
//                     src= '/profile.avif'
//                     // {item.postedBy.Photo || picLink}
//                     alt="Profile"
//                     style={{ width: 30, borderRadius: '50%' }}
//                   />
//                 }
//                 title={item.postedBy.name}
//                 sx={{ borderBottom: '1px solid #00000029' }}
//               />
//               <div style={{ marginBottom: '16px', borderBottom: '1px solid #00000029' }}>
//                 {/* {item.comments.map((comment, index) => ( */}
//                   <Typography 
//                   // key={index}
//                    variant="body2">
//                     <strong>
//                       {/* {comment.postedBy.name} */}
//                       name 
//                       </strong>: this is comment 
//                       {/* {comment.comment} */}
//                   </Typography>
//                 {/* ))} */}
//               </div>
//               <Typography variant="body2">{item.likes.length} Likes</Typography>
//               <Typography variant="body2">{item.body}</Typography>
//               <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
//                 <Mood />
//                 <TextField
//                   variant="outlined"
//                   placeholder="Add a comment"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   sx={{ flexGrow: 1, marginLeft: 1 }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => {
//                     if (item) {
//                       makeComment(comment, item._id);
//                       toggleComment();
//                     }
//                   }}
//                 >
//                   Post
//                 </Button>
//               </div>
//             </CardContent>
//             <IconButton
//               sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
//               onClick={() => toggleComment()}
//             >
//               <Close />
//             </IconButton>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch("http://localhost:5000/allposts");
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 60, 
//   };
// };

// export default CardPage;

import { NextPage } from 'next';
import { useQuery, useMutation, gql } from '@apollo/client';
import Link from 'next/link';
import { Card, CardHeader, CardMedia, CardContent, IconButton, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import { Favorite, Mood, Close } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Post {
  id: string;
  postedBy: {
    id: string;
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

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      body
      photo
      postedBy {
        id
        name
      }
      likes
      comments {
        postedBy {
          id
          name
        }
        comment
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation LikePost($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
      id
      likes
    }
  }
`;

const MAKE_COMMENT = gql`
  mutation createComment($postId: ID!, $comment: String!, $userId: ID!) {
    createComment(postId: $postId, comment: $comment, userId: $userId) {
      id
      comment
      postedBy {
        id
        name
      }
    }
  }
`;

const CardPage: NextPage = () => {
  const { data, loading, error } = useQuery<{ posts: Post[] }>(GET_ALL_POSTS);
  const [likePostMutation] = useMutation(LIKE_POST);
  const [makeCommentMutation] = useMutation(MAKE_COMMENT);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<Post | null>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const toggleComment = (post?: Post) => {
    setShow((prev) => !prev);
    if (post) {
      setItem(post);
    }
  };

  const likePost = async (id: string) => {
    try {
      if (!userId) return;

      await likePostMutation({
        variables: { postId: id, userId },
        update: (cache, { data }) => {
          if (data) {
            const updatedPost = data.likePost;
            const cachedPosts = cache.readQuery<{ posts: Post[] }>({ query: GET_ALL_POSTS });
            if (cachedPosts) {
              const updatedPosts = cachedPosts.posts.map(post =>
                post.id === updatedPost.id ? { ...post, likes: updatedPost.likes } : post
              );
              cache.writeQuery({
                query: GET_ALL_POSTS,
                data: { posts: updatedPosts },
              });
            }
          }
        },
        onError: (error) => {
          console.error("Error liking post:", error);
        }
      });

    } catch (error) {
      console.error("Error during likePost mutation:", error);
    }
  };

  const makeComment = async (text: string, postId: string) => {
    try {
      if (!userId) return;

      const { data, errors } = await makeCommentMutation({
        variables: { postId, comment: text, userId },
      });

      if (errors) {
        console.error("GraphQL errors:", errors);
        return;
      }

      if (data && data.createComment) {
        console.log("Comment created:", data.createComment);
      }

      setComment("");
    } catch (error) {
      console.error("Error making comment:", error);
    }
  };

  if (loading) return <Typography variant="h6" align="center">Loading...</Typography>;
  if (error) return <Typography variant="h6" align="center">Error loading posts.</Typography>;

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '16px' }}>
      {data?.posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            marginBottom: '24px',
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            boxShadow: 2,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
            },
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={post.postedBy.Photo || picLink}
                alt="Profile"
              />
            }
            title={
              <Link href={`/profile/${post.postedBy.id}`} passHref>
                <Typography variant="subtitle1" sx={{ textDecoration: "none", color: 'primary.main', fontWeight: 'bold' }}>
                  {post.postedBy.name}
                </Typography>
              </Link>
            }
          />
          <CardMedia
            component="img"
            image={post.photo}
            alt="Post"
            sx={{ height: 300, objectFit: 'cover' }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton onClick={() => likePost(post.id)}>
                <Favorite
                  color={post.likes.includes(userId!) ? "error" : "inherit"}
                />
              </IconButton>
              <Typography variant="body2">
                {post.likes.length} {post.likes.length > 1 ? "Likes" : "Like"}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ marginY: 1 }}>{post.body}</Typography>

            {/* Comments Section */}
            {post.comments && post.comments.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  Comments:
                </Typography>
                {post.comments.map((comment, index) => (
                  <Typography key={index} variant="body2" sx={{ marginY: 0.5 }}>
                    <strong>{comment.postedBy.name}:</strong> {comment.comment}
                  </Typography>
                ))}
              </Box>
            )}

            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", cursor: "pointer", color: 'secondary.main', marginTop: 1 }}
              onClick={() => toggleComment(post)}
            >
              View all comments
            </Typography>
          </CardContent>
        </Card>
      ))}

      {show && item && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
          }}
        >
          <Card sx={{ width: '90%', maxWidth: '600px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }} onClick={() => toggleComment()}>
              <Close />
            </IconButton>
            <CardMedia component="img" image={item.photo} alt="Post" sx={{ height: 300, objectFit: 'cover' }} />
            <CardContent>
              <CardHeader
                avatar={
                  <Avatar
                    src={item.postedBy.Photo || picLink}
                    alt="Profile"
                  />
                }
                title={<Typography variant="subtitle1">{item.postedBy.name}</Typography>}
                sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: 1 }}
              />
              <Box sx={{ marginBottom: 2, paddingBottom: 2, borderBottom: '1px solid #e0e0e0' }}>
                {item.comments && Array.isArray(item.comments) && item.comments.length > 0 ? (
                  item.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ marginY: 0.5 }}>
                      <strong>{comment.postedBy.name}:</strong> {comment.comment}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No comments yet.</Typography>
                )}
              </Box>
              <TextField
                variant="outlined"
                label="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => makeComment(comment, item.id)}
                fullWidth
              >
                Comment
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default CardPage;
