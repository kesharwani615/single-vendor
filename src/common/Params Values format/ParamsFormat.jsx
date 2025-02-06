import React from 'react'

const useParamsFormat = () => {
    const createDataSetParams = (getSearch) =>{
        let dataSet = "";
        for (const [name, searchData] of Object.entries(getSearch)) {
            dataSet = `${dataSet}${name}=${searchData}&`;
        }
        return dataSet;
    }
    
  return {createDataSetParams}
}

export default useParamsFormat
