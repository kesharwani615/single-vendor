import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    GetNotificationSlice,
} from "../../redux/features/NotificationManagement";
import { Loader } from "../../common/Loader/Loader";
import Pagination from "../../common/pagination/PaginationCustom";
import { useNotification } from "../../components/PaginationMethod";
import { GetUserManagementSlice } from "../../redux/features/UserManagementSlice";

const Notification = () => {

  const {handlePagesDecrease,handlePagesIncrease,handleReset,handleApply,handleDelete} = useNotification();

  const [data, setData] = useState([]);
  const [getSearch, setGetSearch] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    page: 1,
  });
  const [serialNum, setSerialNum] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [dataFoHold, setDataForHold] = useState({
    deleteId: "",
  });

  const { loading, NotificationCreated, UpdatedNotification, } = useSelector(
    (state) => state.Notification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let dataSet = "";
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetNotificationSlice(dataSet)).then((res) => {
      setData(res?.payload?.data?.notification);
      setPagination(res?.payload?.data?.pagination);
    });
  }, [UpdatedNotification, NotificationCreated]);

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

 

  const FetchDataOnPages = ({pageNum,setPage,getSearch,setGetSearch,setPagination,setUserData}) => {
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

 

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h2>Notification Management</h2>
              <Link
                className="Button"
                data-toggle="modal"
                data-target="#NotificationAdd"
                to={"AddNotification"}
              >
                Add New Notifications
              </Link>
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
                    value={getSearch.search}
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
                    value={getSearch.fromDate}
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
                    name="toDate"
                    value={getSearch.toDate}
                    onChange={(e) =>
                      setGetSearch((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* <div className="form-group">
            <label>Timeframe</label>
            <select className="form-control">
              <option value="select">--Select--</option>
              <option value="select">Today</option>
              <option value="Month">This Week</option>
              <option value="Month">This Month</option>
            </select>
          </div> */}
                <div className="form-group">
                  <label>&nbsp;</label>
                  <button className="Button" style={{marginRight:'10px'}} onClick={()=>handleApply({getSearch,setGetSearch,setData})}>
                    Apply
                  </button>
                  <button className="Button Cancel" onClick={()=>handleReset({getSearch,setGetSearch,setData})}>
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
            <div className="TableList">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>User Type</th>
                    <th>To User</th>
                    <th>No. of Users</th>
                    <th>Sent On</th>
                    <th>Resend</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : Array.isArray(data) && [data.length].includes(0) ? (
                    <tr>
                      <td colSpan={10}>There is no data found</td>
                    </tr>
                  ) : (
                    data?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.title}</td>
                          <td>{item?.body}</td>
                          <td>ALL</td>
                          <td>ALL</td>
                          <td>{item?.userNumbers}</td>
                          <td>{item?.updatedAt.slice(0, 10)}</td>
                          <td>
                            <span className="Green">send</span>
                          </td>
                          <td>
                            <div className="Actions">
                              <Link
                                className="Green"
                                data-toggle="modal"
                                data-target="#NotificationEdit"
                                to={"UpdateNotification"}
                                state={item}
                              >
                                <i className="fa fa-pencil" />
                              </Link>
                              <a
                                className="Red"
                                data-toggle="modal"
                                data-target="#DeleteModal"
                                onClick={() =>
                                  setDataForHold((prev) => ({
                                    ...prev,
                                    deleteId: item?._id,
                                  }))
                                }
                              >
                                <i className="fa fa-trash" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* {pageNum,setPage,getSearch,setGetSearch,setPagination,setUserData} */}
          <Pagination arr={arr} page={page} setPage={setPage} setData={setData} setGetSearch={setGetSearch} setPagination={setPagination} getSearch={getSearch} pagination={pagination} handlePagesIncrease={handlePagesIncrease} FetchDataOnPages={FetchDataOnPages} handlePagesDecrease={handlePagesDecrease} />
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
                    <p>Are you sure you want to Delete this Notification ?</p>
                    <h4>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        no
                      </a>
                      <a
                        href="javascript:void(0);"
                        data-dismiss="modal"
                        onClick={()=>handleDelete({setData,getSearch,dataFoHold})}
                      >
                        Yes
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div id="NotificationAdd" className="modal fade" role="dialog">
     <AddNotification/>
    </div>
    <div id="NotificationEdit" className="modal fade" role="dialog">
      <UpdateNotification/>
    </div> */}
          <Outlet />
        </div>
      </>
    </>
  );
};

export default Notification;
