// import { useQuery } from '@apollo/client';
// import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';
// import { gql } from 'apollo-server-micro';

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
//     id: string;
//     photo: string;
//     body: string;
//     postedBy: {
//       id: string;
//       name: string;
//     };
//   }
  
//   interface PostsState {
//     posts: Post[];
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | null;
//   }

//   const initialState: PostsState = {
//     posts: [],
//     status: 'idle',
//     error: null,
//   };
  

// export const fetchPostsByUser = createAsyncThunk(
//     'posts/fetchPostsByUser',
//     async(userId:String) => {
//         console.log("id in slice",userId);
//         const { data, loading, error } = useQuery(GET_POSTS_BY_USER, {
//             variables: { userId },
//         })
//         console.log("data in slice",data);
         
//     return data.getPostsByUser
// }
// )


//   const postsSlice = createSlice({
//     name: "posts",
//     initialState,
//     reducers: {
//       // You can add additional reducers here if needed
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchPostsByUser.pending, (state) => {
//           state.status = 'loading';
//         })
//         .addCase(fetchPostsByUser.fulfilled, (state, action: PayloadAction<Post[]>) => {
//           state.status = 'succeeded';
//           state.posts = action.payload;
//         })
//         .addCase(fetchPostsByUser.rejected, (state, action) => {
//           state.status = 'failed';
//           state.error = action.error.message || null;
//         });
//     },
//   });
  
//   export default postsSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';

// GraphQL query for fetching posts by user ID
const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: ID!) {
    getPostsByUser(userId: $userId) {
      id
      photo
      body
      postedBy {
        id
        name
      }
    }
  }
`;

// Types for Post and PostsState
interface Post {
  id: string;
  photo: string;
  body: string;
  postedBy: {
    id: string;
    name: string;
  };
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching posts by user ID
export const fetchPostsByUser = createAsyncThunk<
  Post[],           // Return type of the thunk
  string,           // Argument type (userId)
  { rejectValue: string; extra: ApolloClient<NormalizedCacheObject> } // Options
>(
  'posts/fetchPostsByUser',
  async (userId, { rejectWithValue, extra }) => {
    try {
      const { data } = await extra.query({
        query: GET_POSTS_BY_USER,
        variables: { userId },
      });
      return data.getPostsByUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for posts
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;
