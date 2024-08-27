// import { PrismaClient } from "@prisma/client";
// import { compare } from "bcryptjs";

// const prisma = new PrismaClient();

// export const resolvers = {
//   Query: {
//     async login(_: any, { email, password }: { email: string; password: string }) {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (user && (await compare(password, user.password))) {
//         return user;
//       }

//       throw new Error("Invalid email or password");
//     },
//   },
// };


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
  },

  Mutation: {
    async createPost(
      _: any,
      { title, body, photo, userId }: { title: string; body: string; photo?: string; userId: string }
    ) {
      console.log("here is the data",{ title, body, photo, userId} );
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
