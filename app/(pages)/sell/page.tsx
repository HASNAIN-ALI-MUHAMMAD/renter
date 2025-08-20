"use client"
import CompleteForm from "./components/CompleteForm"

export default function SellPage(){

    return(
            <div className="bg-gray-600 w-full m-0 h-full p-1 text-gray-900 flex flex-col gap-5">
              <div className="bg-gray-500 w-full p-2 h-400 rounded-lg flex flex-col gap-3">
                <div className="w-full h-150 bg-gray-600 rounded-sm">
                  <div className="w-full h-max p-2 flex items-center justify-center">
                      <CompleteForm/>
                  </div>
                </div>
              </div>
            </div>
    )
}