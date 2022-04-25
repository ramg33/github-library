import { useState, useEffect } from "react";
import GridHistory from "./grids/gridHistory";

const History = () => {

  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    
    const getData = async () => {

      const fecthData = async () => {
        try {
          const getTransactions = await fetch(`${process.env.REACT_APP_LIBRARY_API}transactions/${localStorage.getItem('userId')}`);
          console.log(getTransactions)
          const getTransactionsJson = await getTransactions.json();
          if (getTransactionsJson.length > 0) {
            return getTransactionsJson;
          }        
        } catch (error) {
          return 'error';
        };
      };

      const result = await fecthData();
      
      if (result !== 'error') {
        setTransactionsData(result);
      };

    };

    getData();

  }, []);

  return <GridHistory transactions={transactionsData}/>
}

export default History;