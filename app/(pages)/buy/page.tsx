import { RentalFilters } from "./components/RentalFilters"
import { BuyFilters } from "./components/BuyFilters"
import { BuyHouses } from "./components/BuyHouses"
import { RentHouses } from "./components/RentalHouses"
import Link from "next/link"

export default function Page(){
    return(
        <div className="flex flex-col w-screen h-screen  items-center bg-gray-100">
            <div>
                <Link href={'http://localhost:3000/sell'}>Sell</Link>
            </div>
            <div className="h-30 flex items-center text-3xl font-bold text-gray-800">
                <h1>Buy or Rent your Dream House</h1>
            </div>
            <div className="flex flex-row w-full border-3 h-screen b-black gap-10 px-4">
                <div className="bg-gray-200 h-100 w-1/2 h-full">
                    <div className="w-full flex justify-center items-center gap-4">
                        <h1>Rent</h1>
                    </div>
                    <div>
                        <RentalFilters />
                    </div>
                    <div>
                        <RentHouses/>
                    </div>
                </div>
                <div className="bg-gray-200 h-100 w-1/2 h-full">
                    <div className="w-full flex justify-center items-center gap-4">
                        <h1>Buy</h1>
                    </div>
                    <div>
                        <BuyFilters />
                    </div>
                    <div>
                        <BuyHouses></BuyHouses>
                    </div>
                </div>
            </div>
            <div>
                footer
            </div>
        </div>
    )
}

