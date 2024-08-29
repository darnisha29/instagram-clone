// import React, { useState } from "react";
// import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
// import ImageIcon from '@mui/icons-material/Image';
// import { useMutation, gql } from "@apollo/client";
// import { useSession } from "next-auth/react";

// const CREATE_POST_MUTATION = gql`
//   mutation CreatePost($title: String!, $body: String!, $photo: String, $userId: ID!) {
//     createPost(title: $title, body: $body, photo: $photo, userId: $userId) {
//       id
//       title
//       body
//       photo
//       postedBy {
//         id
//         email
//       }
//     }
//   }
// `;

// const Createpost: React.FC = () => {
//   const [body, setBody] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);
//   const [url, setUrl] = useState<string>("");
//   const [createPost] = useMutation(CREATE_POST_MUTATION);
//   const {data:session} = useSession()
//   const userId = String(session?.user)
    
//   const postDetails = () => {
//     if (!image) {
//       // You can add some validation to check if an image is selected
//       console.error("No image selected");
//       return;
//     }

//     // First, upload the image to Cloudinary
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "insta-clone");
//     data.append("cloud_name", "cantacloud2");

//     fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
//       method: "POST",
//       body: data,
//     })
//     .then(res => res.json())
//     .then(data => {
//       const uploadedUrl = data.url;

//       // After the image is successfully uploaded, create the post in the database
//       createPost({
//         variables: {
//           body,
//           photo: uploadedUrl,
//           userId:userId,
//           title: "post title"
//         },
//       })
//       .then(({ data }) => {
//         if (data) {
//           console.log("Successfully Posted:", data);
//           // Add any additional logic after successful post creation, e.g., navigation or notifications
//         }
//       })
//       .catch((error) => {
//         console.error("Error creating post:", error);
//         // Handle any errors during post creation
//       });
//     })
//     .catch(err => console.log(err));
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setImage(file);
//       const output = document.getElementById("output") as HTMLImageElement;
//       output.src = URL.createObjectURL(file);
//       output.onload = () => URL.revokeObjectURL(output.src); 
//     }
//   };

//   return (
//     <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       <Box className="createPost" sx={{ padding: 2, width: '500px' }}>
//         <Box className="post-header" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography variant="h6">Create New Post</Typography>
//           <Button variant="contained" color="primary" onClick={postDetails}>Share</Button>
//         </Box>

//         <Box className="main-div" sx={{ mb: 2, width: '200px' }}>
//           <img
//             id="output"
//             src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
//             alt="Preview"
//             style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//             id="fileInput"
//           />
//           <label htmlFor="fileInput">
//             <IconButton color="primary" component="span">
//               <ImageIcon />
//             </IconButton>
//           </label>
//         </Box>

//         <Box className="details">
//           <Box className="card-header" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <img
//               src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
//               alt="Profile"
//               style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', marginRight: 1 }}
//             />
//             <Typography variant="h6">Ramesh</Typography>
//           </Box>
//           <TextField
//             multiline
//             rows={4}
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Write a caption...."
//             fullWidth
//             variant="outlined"
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Createpost;




import React, { useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { useMutation, gql } from "@apollo/client";
import { useSession } from "next-auth/react";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $body: String!, $photo: String, $userId: ID!) {
    createPost(title: $title, body: $body, photo: $photo, userId: $userId) {
      id
      title
      body
      photo
      postedBy {
        id
        email
      }
    }
  }
`;

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);
  const { data: session } = useSession();

  const userId = session?.user;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setImage(file);
      const output = document.getElementById("output") as HTMLImageElement;
      output.src = URL.createObjectURL(file);
      output.onload = () => URL.revokeObjectURL(output.src);
    }
  };

  const handlePostCreation = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "cantacloud2");

      const res = await fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
        method: "POST",
        body: data,
      });

      const cloudinaryData = await res.json();
      const uploadedUrl = cloudinaryData.url;

      await createPost({
        variables: {
          title: "Post Title",
          body,
          photo: uploadedUrl,
          userId,
        },
      });

      console.log("Post created successfully");
      // Optional: Reset form or navigate after successful post creation

    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error state
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box sx={{ width: '500px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Create New Post</Typography>
          <Button variant="contained" color="primary" onClick={handlePostCreation} disabled={loading}>
            Share
          </Button>
        </Box>

        <Box sx={{ mb: 2, width: '100%', position: 'relative' }}>
          <img
            id="output"
            src={image ? URL.createObjectURL(image) : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"}
            alt="Preview"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <IconButton color="primary" component="span" sx={{ position: 'absolute', bottom: 8, right: 8 }}>
              <ImageIcon />
            </IconButton>
          </label>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }}
          />
          <Typography variant="h6">Ramesh</Typography>
        </Box>

        <TextField
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a caption..."
          fullWidth
          variant="outlined"
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Error creating post: {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CreatePost;

