import "./user";
import "./job-application";
import { builder } from "../builder";

builder.mutationType();

export const schema = builder.toSchema();
