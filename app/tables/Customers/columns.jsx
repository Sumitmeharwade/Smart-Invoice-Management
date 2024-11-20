"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the data shape in plain JavaScript instead of TypeScript.
const columnsCustomers = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "totalPurchaseAmount",
    header: "Total Purchase Amount",
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];
  

export default columnsCustomers;
