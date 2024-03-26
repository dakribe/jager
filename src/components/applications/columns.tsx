import { ColumnDef } from "@tanstack/react-table";

export type JobApplication = {
  id: string;
  company: string;
  title: string;
};

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "appliedDate",
    header: "Date Applied",
  },
];
