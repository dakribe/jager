import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type JobApplication = {
  id: string;
  company: string;
  title: string;
  appliedDate: Date;
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
    accessorFn: (d) => {
      return moment(d.appliedDate).format("DD-MM-YYYY");
    },
  },
];
