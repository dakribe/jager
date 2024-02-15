/* eslint-disable */
import type { Prisma, Post, User, Session, JobApplication } from "@prisma/client";
export default interface PrismaTypes {
    Post: {
        Name: "Post";
        Shape: Post;
        Include: never;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "sessions" | "jobApplications";
        ListRelations: "sessions" | "jobApplications";
        Relations: {
            sessions: {
                Shape: Session[];
                Name: "Session";
            };
            jobApplications: {
                Shape: JobApplication[];
                Name: "JobApplication";
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    JobApplication: {
        Name: "JobApplication";
        Shape: JobApplication;
        Include: Prisma.JobApplicationInclude;
        Select: Prisma.JobApplicationSelect;
        OrderBy: Prisma.JobApplicationOrderByWithRelationInput;
        WhereUnique: Prisma.JobApplicationWhereUniqueInput;
        Where: Prisma.JobApplicationWhereInput;
        Create: {};
        Update: {};
        RelationName: "User";
        ListRelations: never;
        Relations: {
            User: {
                Shape: User;
                Name: "User";
            };
        };
    };
}