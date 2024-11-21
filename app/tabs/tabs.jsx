
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
 


import { DataTable } from "../tables/data-table";
import columnsInvoices from "../tables/Invoice/columns";

import columnsProducts from "../tables/Products/columns" 
import columnsCustomers from "../tables/Customers/columns"

export function TabsComponent() {
    const dataInvoices = [
        {
          serialNumber: "001",
          customerName: "John Doe",
          productName: "Laptop",
          quantity: 1,
          tax: 50,
          totalAmount: 1050,
          date: "2024-11-20",
        },
        {
          serialNumber: "002",
          customerName: "Jane Smith",
          productName: "Smartphone",
          quantity: 2,
          tax: 30,
          totalAmount: 630,
          date: "2024-11-19",
        },
        // Add more entries as needed
      ];
      
      const dataProducts = [
        {
          name: "Laptop",
          quantity: 2,
          unitPrice: 1000,
          tax: 100,
          priceWithTax: 1100,
          discount: "50",
        },
        {
          name: "Smartphone",
          quantity: 1,
          unitPrice: 600,
          tax: 60,
          priceWithTax: 660,
          discount: "None",
        },
        {
          name: "Headphones",
          quantity: 3,
          unitPrice: 50,
          tax: 5,
          priceWithTax: 55,
          discount: "10%",
        },
        // Add more entries as needed
      ];

      const dataCustomers = [
        {
          customerName: "John Doe",
          phoneNumber: "123-456-7890",
          totalPurchaseAmount: 5000,
          emailAddress: "john.doe@example.com",
          address: "123 Main St, Springfield",
        },
        {
          customerName: "Jane Smith",
          phoneNumber: "987-654-3210",
          totalPurchaseAmount: 3200,
          emailAddress: "jane.smith@example.com",
          address: "456 Elm St, Metropolis",
        },
        {
          customerName: "Michael Johnson",
          phoneNumber: "555-678-1234",
          totalPurchaseAmount: 1500,
          emailAddress: "",
          address: "789 Oak St, Gotham",
        },
        // Add more entries as needed
      ];
      
      

  return (
    <Tabs defaultValue="invoices" className="w-[600]">
      <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>
      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>
              Here is the Invoice details uploaded.
            </CardDescription>
          </CardHeader>


            <div className="container mx-auto py-10">
                <DataTable columns={columnsInvoices} data={dataInvoices} />
                </div>

        </Card>
      </TabsContent> 
      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Here is the list of products in the invoice uploaded.
            </CardDescription>
          </CardHeader>

            <div className="container mx-auto py-10">
                <DataTable columns={columnsProducts} data={dataProducts} />
            </div>
        </Card>
      </TabsContent>
      <TabsContent value="customers">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Here is the list of customers.
            </CardDescription>
          </CardHeader>

            <div className="container mx-auto py-10">
                <DataTable columns={columnsCustomers} data={dataCustomers} />
            </div>

        </Card>
      </TabsContent>
    </Tabs>
  )
}



