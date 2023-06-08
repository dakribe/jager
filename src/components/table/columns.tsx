import { ColumnDef } from "@tanstack/react-table";

export type JobApplication = {
  id: string;
  company: string;
  appliedDate: Date;
  status: string;
};

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "appliedDate",
    header: "Applied Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
