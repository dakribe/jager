import { builder } from "../builder";
import { db } from "../db";

builder.prismaObject("JobApplication", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    company: t.exposeString("company"),
  }),
});

const CreateApplicationInput = builder.inputType("createApplicationInput", {
  fields: (t) => ({
    company: t.string({ required: true }),
    title: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  create: t.prismaField({
    type: "JobApplication",
    args: {
      input: t.arg({ type: CreateApplicationInput, required: true }),
    },
    resolve: async (query, _, { input }, ctx) => {
      const { company, title } = input;

      try {
        const application = await db.jobApplication.create({
          data: {
            company,
            title,
            userId: ctx.userId,
          },
        });
        return application;
      } catch (error) {
        throw new Error("User not authenticated");
      }
    },
  }),
}));

builder.queryField("getApplications", (t) =>
  t.prismaField({
    type: ["JobApplication"],
    resolve: async (query, _, input, ctx) => {
      if (!ctx.userId) {
        throw new Error("User is not authenticated");
      }
      try {
        const applications = db.jobApplication.findMany({
          where: {
            userId: ctx.userId,
          },
        });
        return applications;
      } catch (error) {
        throw new Error("Unable to get applications");
      }
    },
  }),
);
