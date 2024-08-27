import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
  }

  

  type Post {
    id: ID!
    title: String!
    body: String!
    photo: String
    postedBy: User!
  }
  type Query {
    login(email: String!, password: String!): User
  }

  type Query {
    posts: [Post!]!
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
`;
