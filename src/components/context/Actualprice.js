
import {useState,useContext,createContext} from 'react'

const ActualPriceContext =createContext();

const ActualPriceProvider =({children})=>{


    const [actualPrice,setActualPrice] =useState(0);
      //default axios
   


// eslint-disable-next-line

      
        return (
            <ActualPriceContext.Provider value={[actualPrice,setActualPrice]}>
             {children}
            </ActualPriceContext.Provider>
        )

}

const useActualPrice =()=>useContext(ActualPriceContext)

export {useActualPrice,ActualPriceProvider}


