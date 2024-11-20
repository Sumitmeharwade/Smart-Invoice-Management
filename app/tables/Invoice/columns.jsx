"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the data shape in plain JavaScript instead of TypeScript.
const columnsInvoices = [
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
  

export default columnsInvoices;
