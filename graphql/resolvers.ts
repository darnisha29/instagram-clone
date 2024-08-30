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
        const allPosts = await prisma.posts.findMany({
          include: {
            comments: {
              include: {
                postedBy: true,
              },
            },
          },
        });
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
          include: {
            comments: {
              include: {
                postedBy: true,
              },
            },
          },
        });

        return userPosts;
      } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Failed to fetch user posts");
      }
    },

    async getCommentsByPost(_: any, { postId }: { postId: string }) {
      try {
        const comments = await prisma.comments.findMany({
          where: { postId },
          include: {
            postedBy: true,
          },
        });

        return comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
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

    async likePost(_: any, { postId, userId }: { postId: string; userId: string }) {
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

    async createComment(
      _: any,
      { postId, userId, comment }: { postId: string; userId: string; comment: string }
    ) {
      try {
        const postExists = await prisma.posts.findUnique({
          where: { id: postId },
        });
    
        if (!postExists) {
          throw new Error("Post does not exist");
        }
    
        const newComment = await prisma.comments.create({
          data: {
            comment,
            postId,
            userId,
          },
          include: {
            postedBy: true,
          },
        });
    
        return newComment;
      } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Failed to create comment");
      }
    },
    
    async deleteComment(_: any, { id }: { id: string }) {
      try {
        const deletedComment = await prisma.comments.delete({
          where: { id },
        });

        return deletedComment;
      } catch (error) {
        console.error("Error deleting comment:", error);
        throw new Error("Failed to delete comment");
      }
    },
  },

  User: {
    async posts(parent: any) {
      return prisma.posts.findMany({
        where: { userId: parent.id },
      });
    },

    async comments(parent: any) {
      return prisma.comments.findMany({
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

    async comments(parent: any) {
      return prisma.comments.findMany({
        where: { postId: parent.id },
        include: {
          postedBy: true,
        },
      });
    },
  },

  Comment: {
    async postedBy(parent: any) {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },

    async post(parent: any) {
      return prisma.posts.findUnique({
        where: { id: parent.postId },
      });
    },
  },
};
