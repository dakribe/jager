import "./user";
import { builder } from "../builder";

builder.mutationType();

export const schema = builder.toSchema();
