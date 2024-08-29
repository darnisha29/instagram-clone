import { Context } from "@apollo/client";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    async login(_: Context, { email, password }: { email: string; password: string }) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && (await compare(password, user.password))) {
        return user;
      }

      throw new Error("Invalid email or password");
    },

    async posts(_: any, __: any) {
      try {
        const allPosts = await prisma.posts.findMany();
        return allPosts;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },

    async getPostsByUser(_: any, { userId }: { userId: string }) {
      try {
        const userPosts = await prisma.posts.findMany({
          where: { userId },
        });

        return userPosts;
      } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Failed to fetch user posts");
      }
    },
  },

  Mutation: {
    async createPost(
      _: any,
      { title, body, photo, userId }: { title: string; body: string; photo?: string; userId: string }
    ) {
      console.log("here is the data", { title, body, photo, userId });
      try {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!userExists) {
          throw new Error("User does not exist");
        }

        const newPost = await prisma.posts.create({
          data: {
            title,
            body,
            photo,
            userId,
            likes: [], // Initialize with an empty array
          },
        });

        return newPost;
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
      }
    },

    async updatePost(
      _: any,
      { id, title, body, photo }: { id: string; title?: string; body?: string; photo?: string }
    ) {
      try {
        const updatedPost = await prisma.posts.update({
          where: { id },
          data: {
            title,
            body,
            photo,
          },
        });

        return updatedPost;
      } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post");
      }
    },

    async deletePost(_: any, { id }: { id: string }) {
      try {
        const deletedPost = await prisma.posts.delete({
          where: { id },
        });

        return deletedPost;
      } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
      }
    },

    async likePost(_: any, { postId, userId }: { postId: string; userId: string }) {
      try {
        const post = await prisma.posts.update({
          where: { id: postId },
          data: {
            likes: {
              push: userId, // Add the user's ID to the likes array
            },
          },
        });

        return post;
      } catch (error) {
        console.error("Error liking post:", error);
        throw new Error("Failed to like post");
      }
    },

    async unlikePost(_: any, { postId, userId }: { postId: string; userId: string }) {
      try {
        const post = await prisma.posts.update({
          where: { id: postId },
          data: {
            likes: {
              set: (await prisma.posts.findUnique({ where: { id: postId } }))?.likes.filter(
                (id) => id !== userId
              ) || [],
            },
          },
        });

        return post;
      } catch (error) {
        console.error("Error unliking post:", error);
        throw new Error("Failed to unlike post");
      }
    },
  },

  User: {
    async posts(parent: any) {
      return prisma.posts.findMany({
        where: { userId: parent.id },
      });
    },
  },

  Post: {
    async postedBy(parent: any) {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};
