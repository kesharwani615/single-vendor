import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCityManagementSlice, GetCityManagementSlice } from '../../redux/features/CityManagementSlice';
import { Link, Outlet } from 'react-router-dom';
import { Loader } from '../../common/Loader/Loader';


const CityManagement = () => {

  const dispatch = useDispatch();
  const [CityData,setCityData] = useState([])
  const [dataForHold,setDataForHold] = useState();
  const [pagination, setPagination] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [getSearch, setGetSearch] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    page: 1,
  });

  const { CityManagement,loading} = useSelector((state) => state.CityManagement);
    const { UpdatedCityManagement } = useSelector((state) => state.CityManagement);


  useEffect(()=>{
  //  if(!(CityManagement.length > 0)){
     dispatch(GetCityManagementSlice()).then((res)=>{
       setCityData(res?.payload?.data)
      //  console.log(res?.payload?.data)
      })
    // }
  },[UpdatedCityManagement])
 

  useMemo(()=>{
    setCityData(CityManagement);
  },[CityManagement])

  
  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 3)
      );
    }
  }, [pagination, handleArrforPage]);

  const handlePagesIncrease = () => {
    console.log("handleIncrease:", handleArrforPage);
    if (handleArrforPage + 3 <= pagination?.totalPages) {
      setHandleArrforPage((prev) => prev + 3);
    }
  };

  const handlePagesDecrease = () => {
    if (handleArrforPage > 2) {
      setHandleArrforPage((prev) => prev - 3);
    }
  };

  const FetchDataOnPages = (pageNum) => {
    setPage(pageNum);
    setGetSearch((prev) => ({ ...prev, page: pageNum }));
    let dataSet = "";
    for (const [name, searchData] of Object.entries({
      ...getSearch,
      page: pageNum,
    })) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetCityManagementSlice()).then((res)=>{
      setCityData(res?.payload?.data)
     //  console.log(res?.payload?.data)
     })
  };
 


  const handleDelete = () =>{
    dispatch(DeleteCityManagementSlice(dataForHold)).then((res)=>{
      dispatch(GetCityManagementSlice()).then((res)=>{
        setCityData(res?.payload?.data)
        console.log(res?.payload?.data)
       })
    })
  }

  return (
    <>
     <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h2>City Management</h2>
        <Link
          to={'/CityManagement/CreateCity'}
          data-toggle="modal"
          data-target="#AddCategory"
          className="Button"
        >
          Add City 
        </Link>
      </div>
      {/* <div className="Small-Wrapper">
        <div className="Filter justify-content-between">
          <div className="FilterLeft">
            <div className="form-group">
              <label>Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="form-group">
              <label>From Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button className="Button"style={{marginRight:'10px'}}>Apply</button>
              <button className="Button Cancel">
                <i className="fa fa-refresh" />
              </button>
            </div>
          </div>
           <div className="FilterRight">
            <div className="form-group">
              <label>Timeframe</label>
              <select className="form-control">
                <option value="select">--Select--</option>
                <option value="select">Today</option>
                <option value="Month">This Week</option>
                <option value="Month">This Month</option>
                <option value="Year">This Year</option>
              </select>
            </div>
          </div> 
        </div>
      </div> */}
      <div className="TableList">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>City Name</th>
              <th>City Pin Code</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <Loader/> :Array.isArray(CityData) && CityData?.length > 0 ?(CityData?.map((item,index)=>{
             return(
             <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.cityName}</td>
              <td>{item?.pincode || "-"}</td>
              <td>{item?.createdAt.substring(0,10)}</td>
              <td>
                <div className="Actions">
                  <Link
                  to={'/CityManagement/UpdateCity'}
                    className="Green"
                    data-toggle="modal"
                    data-target="#UpdateCity"
                    state={item}
                  >
                    <i className="fa fa-pencil" />
                  </Link>
                  <a
                    className="Red"
                    data-toggle="modal"
                    data-target="#DeleteModal"
                    onClick={()=>setDataForHold(item?._id)}
                  >
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            )
            })
            ):(
               <tr>
                <td>There is no City</td>
               </tr>
            )
            }
          </tbody>
        </table>
      </div>
      <div className="pagination">
                <a onClick={handlePagesDecrease}>
                  <span>
                    <i className="fa fa-caret-left" aria-hidden="true" />
                  </span>
                </a>
                {/* {arr?.map((item, index) => {
                  console.log("item:", item);
                  return (
                    <a
                      onClick={() => FetchDataOnPages(item)}
                      className={page === item && "active"}
                    >
                      {item}
                    </a>
                  );
                })} */}
                <a className='active'>1</a>
                <a onClick={handlePagesIncrease}>
                  <span>
                    <i className="fa fa-caret-right" aria-hidden="true" />
                  </span>
                </a>
              </div>
    </div>
  </div>
  <div className="ModalBox">
    <div
      id="DeleteModal"
      className="modal fade"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="Decline">
              <a
                href="javascript:void(0);"
                className="CloseModal"
                data-dismiss="modal"
              >
                ×
              </a>
              <h3>Delete</h3>
              <p>Are you sure you want to Delete Category ?</p>
              <h4>
                <a href="javascript:void(0);" data-dismiss="modal">
                  no
                </a>
                <a href="javascript:void(0);" data-dismiss="modal"
                onClick={handleDelete}
                >
                  Yes
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Outlet/>  
    <div
      id="LogOutModal"
      className="modal fade"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="Decline">
              <a
                href="javascript:void(0);"
                className="CloseModal"
                data-dismiss="modal"
              >
                ×
              </a>
              <h3>Log Out</h3>
              <p>Are you sure you want to logout?</p>
              <h4>
                <a href="javascript:void(0);" data-dismiss="modal">
                  no
                </a>
                <a href="login.html">Yes</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
 
    </>
  )
}

export default CityManagement
