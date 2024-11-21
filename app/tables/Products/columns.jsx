"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the data shape in plain JavaScript instead of TypeScript.
const columnsProducts = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "priceWithTax",
    header: "Price with Tax",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
];

  

export default columnsProducts;
