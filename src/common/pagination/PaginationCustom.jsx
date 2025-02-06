import React from 'react'

const Pagination = (props) => {
  const {arr,page,setUserData,setPage,pagination,handlePagesDecrease,FetchDataOnPages,getSearch,handlePagesIncrease,setGetSearch,setPagination}=props
  return (
    <>
        <div className="pagination">
              <a onClick={()=>handlePagesDecrease(handlePagesIncrease,pagination)}>
                <span>
                  <i className="fa fa-caret-left" aria-hidden="true" />
                </span>
              </a>
              {arr?.map((item, index) => {
                return (
                  <a
                    onClick={() => FetchDataOnPages({pageNum:item,setPage,getSearch,setGetSearch,setPagination,setUserData})}
                    className={page === item && "active"}
                    key={index}
                  >
                    {item}
                  </a>
                );
              })}
              <a onClick={()=>handlePagesIncrease(handlePagesIncrease,pagination)}>
                <span>
                  <i className="fa fa-caret-right" aria-hidden="true" />
                </span>
              </a>
            </div>
    </>
  )
}

export default Pagination
