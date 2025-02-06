import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from '../../common/Loader/Loader.jsx'
import {
  GetSearchUserManagementSlice,
  GetUserManagementSlice,
} from "../../redux/features/UserManagementSlice";
import Pagination from "../../common/pagination/PaginationCustom";
import { toast } from "react-toastify";
import useParamsFormat from "../../common/Params Values format/ParamsFormat.jsx";

const UsersManagement = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state)=>state.userManagement)
  const {createDataSetParams} = useParamsFormat()
  const [userData, setUserData] = useState([]);
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
  
  const [serialNum, setSerialNum] = useState([]);

  useEffect(() => {
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    let dataSet = "";
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetUserManagementSlice(dataSet)).then((res) => {
      console.log("newsres", res);
      const dummyData = res?.payload?.data;
      setUserData(dummyData);
      setPagination(res.payload.meta);
    });
  }, []);

  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 2)
      );
      setSerialNum(
        [...Array(pagination?.currentPage * 10 + 1).keys()]
          .slice(1)
          .slice(
            (pagination?.currentPage - 1) * 10,
            pagination?.currentPage * 10
          )
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

    dispatch(GetUserManagementSlice(dataSet)).then((res) => {
      const dummyData = res?.payload?.data;
      setUserData(dummyData);
      setPagination(res.payload.meta);
    });
  };

  const HandleSearch = () => {
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    if (Object.entries(getSearch).map(([key,value])=>value.length).some(item=>item > 0)) {

      if(![getSearch.fromDate.length,getSearch.toDate.length].every((item)=>item === 0)){
         if(![getSearch.fromDate.length,getSearch.toDate.length].every((item)=>item > 0)){
          toast.error('Please complete the date!')
          return;
         }
      } 

      dispatch(GetUserManagementSlice(createDataSetParams(getSearch))).then((res) => {
        const dummyData = res?.payload?.data;
        setUserData(dummyData);
        setPagination(res.payload.meta);
      });
    }
  };

   const HandleReset = () =>{
  
    if (Object.entries(getSearch).map(([key,value])=>value.length).some(item=>item > 0)) {
      setGetSearch({
        search: "",
        fromDate: "",
        toDate: "",
        page: 1,
      })
  
      dispatch(GetUserManagementSlice()).then((res) => {
        console.log("newsres", res);
        const dummyData = res?.payload?.data;
        setUserData(dummyData);
        setPagination(res.payload.meta);
      });
  }
    }

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h2>List of All Customers</h2>
            </div>
            <div className="Small-Wrapper">
              <div className="Filter">
                <div className="form-group">
                  <label>Search</label>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    name="search"
                    value={getSearch?.search}
                    onChange={(e) =>
                      setGetSearch((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={getSearch?.fromDate}
                    onChange={(e) =>
                      setGetSearch((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getSearch?.toDate}
                    name="toDate"
                    onChange={(e) =>
                      setGetSearch((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>&nbsp;</label>
                  <button className="Button" style={{marginRight:'10px'}} onClick={HandleSearch}>
                    Apply
                  </button>

                  <button
                    className="Button Cancel"
                    onClick={HandleReset}
                  >
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="TableList">
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Customer Id</th>
                      <th>Customer Name</th>
                      <th>Mobile No.</th>
                      <th>City</th>
                      <th>Registered On</th>
                      <th>Status</th>
                      <th>Change Status</th>
                      <th>View Booking History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <Loader/> :(Array.isArray(userData) && userData.length > 0 ? (
                      userData?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{serialNum[index]}</td>
                            <td>{data?.customerId}</td>
                            <td>{data?.personalInfo?.name?.slice(0, 15)}</td>
                            <td>{data?.phone}</td>
                            <td>{data?.address?.city}</td>
                            <td>{data?.createdAt?.substring(0, 10)}</td>
                            <td>
                              <span
                                className={data?.isActive ? `Green` : "Red"}
                              >
                                {data?.isActive ? `Active` : "inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="Actions">
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={data?.isActive}
                                  />
                                  <span className="slider" />
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="Actions">
                                <Link
                                  to={`UsersListDetails/${data._id}/BasicPersonal`}
                                  state={data}
                                  className="Blue"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10}>there is no user</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                arr={arr}
                page={page}
                handlePagesIncrease={handlePagesIncrease}
                FetchDataOnPages={FetchDataOnPages}
                handlePagesDecrease={handlePagesDecrease}
              />
            </div>
          </div>
        </div>
        <div className="ModalBox">
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
  );
};

export default UsersManagement;
