/* eslint-disable */
import type { Prisma, Post } from "@prisma/client";
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
}