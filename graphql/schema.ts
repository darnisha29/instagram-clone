import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
    comments: [Comment!]! 
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    photo: String
    postedBy: User!
    likes: [ID!]!
    comments: [Comment!]!   
  }

  type Comment {
  id: ID!
  comment: String!
  post: Post!
  postedBy: User!
}
  type Query {
    login(email: String!, password: String!): User
  }

  type Query {
    getPostsByUser(userId: ID!): [Post!]!
  }

  type Query {
    posts: [Post!]!
  }
  type Query {
    getCommentsByPost(postId: ID!): [Comment!]!
  }

  type Query {
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, body: String!, photo: String, userId: ID!): Post!
  }

  type Mutation{
    updatePost(id: ID!, title: String, body: String, photo: String): Post!
   
  }
  type Mutation {
    deletePost(id: ID!): Post!
  }

  type Mutation {
    likePost(postId: ID!, userId: ID!): Post!  
  }

  type Mutaion {
    unlikePost(postId: ID!, userId: ID!): Post! 
  }
  type Mutation {
    createComment(postId: ID!, userId: ID!, comment: String!): Comment!
  }
  type Mutation {
    deleteComment(id: ID!): Comment!
  }
`;
