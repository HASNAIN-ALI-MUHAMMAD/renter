// const arr = ["a","b","c"]
// const res = arr.map((x,i)=>{
//     if(x.length==1){
//         return false
//     }
//     return true
// })
// console.log(res)
// if(res.includes(false)){
//     throw new Error("A false value appeared!")
// }
//  async function test(){
//     const res = await fetch('https://api.geoapify.com/v1/geocode/reverse?lat=67.5&lon=66.5&apiKey=4cb0b61e39c7439a8c834815d6d8cc13',{
//         method:"GET"
//     })
//     const data = await res.json()
//     console.log(data.features[0].properties)
//  }
// test()

const obj = {
    name:"John",
    age:{today:23,yesterday:22
    }
}
const keys = Object.entries(obj)
console.log(keys)
for(const each of keys){
    console.log(typeof each[1])
}