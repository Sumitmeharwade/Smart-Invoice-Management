"use client"


import { ModeToggle } from "./toggle/toggle";
import { TabsComponent } from "./tabs/tabs";
import {InputFile} from "./fileUpload/FileUpload"


export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      
      <div className="absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center">
        <InputFile />
      </div>
      <div className="flex items-center justify-center">
        <TabsComponent />
      </div>
      
    </div>
  )
}
