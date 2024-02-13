import { builder } from "./builder";
import { db } from "./db";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.exposeString("content"),
  }),
});

builder.queryType({
  fields: (t) => ({
    posts: t.prismaField({
      type: ["Post"],
      resolve: async (query, root, args, ctx, info) => {
        return await db.post.findMany()
      }
    }),
  }),
});

builder.mutationField("createPost", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      content: t.arg.string({required: true}),
    },
    resolve: async (query, _, { content }) => {
      const post = await db.post.create({
        data: {
          content,
        },
      });
      return post;
    },
  }),
);

builder.mutationType();

export const schema = builder.toSchema();
