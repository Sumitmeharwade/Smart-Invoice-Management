"use client"


import { ModeToggle } from "./toggle/toggle";
import { TabsComponent } from "./tabs/tabs";
import { DataTable } from "./tables/data-table";
import columns from "./tables/Customers/columns";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default function Home() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
  return (
    <div>
      <div className="absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <TabsComponent />
      </div>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}
