import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type JobApplication = {
  company: string;
  title: string;
  appliedDate: Date;
  status: string;
};

export const columns: ColumnDef<JobApplication>[] = [
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
    accessorFn: (d) => {
      return moment(d.appliedDate).format("DD-MM-YYYY");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
