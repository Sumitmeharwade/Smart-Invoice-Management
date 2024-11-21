"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "../tables/data-table";
import columnsInvoices from "../tables/Invoice/columns";
import columnsProducts from "../tables/Products/columns";
import columnsCustomers from "../tables/Customers/columns";


export function TabsComponent() {
  // Get data from Redux
  const invoices = useSelector((state) => state.invoices );
  const products = useSelector((state) => state.products );
  // const customers = useSelector((state) => state.customer.customers );
  const customers = useSelector((state) => state.customers);

  return (
    <Tabs defaultValue="invoices" className="w-4/5">
      <TabsList className="grid w-[600] grid-cols-3">
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Here is the Invoice details uploaded.</CardDescription>
          </CardHeader>
          <div className="container mx-auto ">
            <DataTable columns={columnsInvoices} data={invoices} className="w-4/5" />
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Here is the list of products in the invoice uploaded.</CardDescription>
          </CardHeader>
          <div className="container mx-auto ">
            <DataTable columns={columnsProducts} data={products} className="w-4/5" />
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="customers">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Here is the list of customers.</CardDescription>
          </CardHeader>
          <div className="container mx-auto ">
            <DataTable columns={columnsCustomers} data={customers} />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
