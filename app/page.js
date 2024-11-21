"use client"


import { ModeToggle } from "./toggle/toggle";
import { TabsComponent } from "./tabs/tabs";
import {InputFile} from "./fileUpload/FileUpload"
import { ReduxProvider } from "./redux/redux-provider";
import FileUpload from "./services/fileUpload";
export default function Home() {
  
  return (
    <ReduxProvider>
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      
      <div className="absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center ">
        <FileUpload />
      </div>
      {/* <div className="flex items-center justify-center">
        <InputFile />
      </div> */}
      <div className="flex items-center justify-center">
        <TabsComponent />
      </div>
      
    </div>
    </ReduxProvider>
  )
}
