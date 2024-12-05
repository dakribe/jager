import type { ColumnDef } from "@tanstack/table-core";

export type JobApplication = {
	id: string;
	company: string;
	title: string;
	status: string;
	appliedDate: Date;
};

export const columns: ColumnDef<JobApplication>[] = [
	{
		accessorKey: "company",
		header: "Company",
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "appliedDate",
		header: "Applied Date",
	},
];
