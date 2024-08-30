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
            likes: [], 
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

  
    likePost: async (_: any, { postId, userId }: any) => {
      if (!userId) throw new Error("User not authenticated");
    
      const post = await prisma.posts.findUnique({ where: { id: postId } });
      if (!post) throw new Error("Post not found");
    
      const alreadyLiked = post.likes.includes(userId);
      const updatedLikes = alreadyLiked
        ? post.likes.filter((id: string) => id !== userId)
        : [...post.likes, userId];
    
      console.log("Updated Likes:", updatedLikes); 
    
      // Ensure no undefined values
      const filteredLikes = updatedLikes.filter((id) => id);
    
      return prisma.posts.update({
        where: { id: postId },
        data: { likes: filteredLikes },
      });
    },
    
    
    

    // async unlikePost(_: any, { postId, userId }: { postId: string; userId: string }) {
    //   try {
    //     const post = await prisma.posts.update({
    //       where: { id: postId },
    //       data: {
    //         likes: {
    //           set: (await prisma.posts.findUnique({ where: { id: postId } }))?.likes.filter(
    //             (id) => id !== userId
    //           ) || [],
    //         },
    //       },
    //     });

    //     return post;
    //   } catch (error) {
    //     console.error("Error unliking post:", error);
    //     throw new Error("Failed to unlike post");
    //   }
    // },
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
