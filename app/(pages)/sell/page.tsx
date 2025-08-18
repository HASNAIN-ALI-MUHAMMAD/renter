"use client"
import CompleteForm from "./components/CompleteForm"
import TopBar from "../(utils)/components/TopBar"

export default function SellPage(){

    return(
            <div className="bg-gray-600 w-screen m-0 h-full p-1 text-gray-900 flex flex-col gap-5">
              <div className="bg-gray-500 w-full p-2 h-400 rounded-lg flex flex-col gap-3">
                <div>
                  <TopBar/>
                </div>
                <div className="w-full h-30 text-2xl">
                    
                </div>
                <div className="w-full h-max p-2 flex items-center justify-center border-2 border-gray-700">
                    <CompleteForm/>
                </div>
              </div>
            </div>
    )
}