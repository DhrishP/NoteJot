import { useEffect, useState } from "react"


export function UseLocalStorage<T>(Key:string,Initialval:T | (()=>T) )  {
    const [value,setValue] = useState<T>(()=>{
      const jsonval = localStorage.getItem(Key);
      if (jsonval == null) {
        if (typeof Initialval == 'function') {
          return (Initialval as () =>T)()
        }else{
          return Initialval
        }
      }else{
        return JSON.parse(jsonval)
      }
    })
  
 

    useEffect(()=>{
        localStorage.setItem(Key,JSON.stringify(value))
    },[Key,value])

  return [value,setValue] as [T , typeof setValue]
}

