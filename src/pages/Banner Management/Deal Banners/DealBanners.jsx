// DealBanners Component

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DealSearchBannerSlice,
  DeleteDealBannerSlice,
  GetDealBannerListSlice,
  InsertEditDealBannerID,
} from "../../../redux/features/BannerManagementSlice";
import { Loader } from "../../../common/Loader/Loader";
import { Link, Outlet } from "react-router-dom";

const DealBanners = () => {
  const dispatch = useDispatch();
  const [DealBannerListdata, setDealBannerListdata] = useState([]);
  const [pagination, setPagination] = useState({});
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [idForDelete, SetIdForDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [getSearch, setGetSearch] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    page: 1,
  });

  const { updatedDealBanner, loading, AddDealBanner } = useSelector(
    (state) => state.bannerManagement
  );

  useEffect(() => {
    let dataSet = "";
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetDealBannerListSlice(dataSet)).then((res) => {
      setDealBannerListdata(res?.payload?.data.dealbanners);
      setPagination(res?.payload?.data?.pagination);
    });
  }, [updatedDealBanner, AddDealBanner]);

  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 2)
      );
    }
  }, [pagination, handleArrforPage]);

  const handlePagesIncrease = () => {
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
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetDealBannerListSlice(page)).then((res) => {
      setDealBannerListdata(res?.payload?.data.dealbanners);
      setPagination(res?.payload?.data?.pagination);
    });
  };

  const handleDelete = () => {
    let dataSet = "";
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(DeleteDealBannerSlice(idForDelete)).then(() => {
      dispatch(GetDealBannerListSlice(dataSet)).then((res) => {
        setDealBannerListdata(res?.payload?.data.dealbanners);
        setPagination(res?.payload?.data?.pagination);
      });
    });
  };

  const HandleSearch = () => {
    console.log("getSearch:", getSearch);
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    let dataSet = "";
    if (getSearch) {
      for (const [name, searchData] of Object.entries(getSearch)) {
        dataSet = `${dataSet}${name}=${searchData}&`;
      }

      dispatch(GetDealBannerListSlice(dataSet)).then((res) => {
        setDealBannerListdata(res?.payload?.data.dealbanners);
        setPagination(res?.payload?.data?.pagination);
      });
    }
  };

  return (
    <>
      <div className="TitleBox justify-content-end">
        <Link
          to={'AddDealsBanner'}
          className="Button"
          data-toggle="modal"
          data-target="#DealsBannerAdd"
          style={{ marginTop: "-75px" }}
        >
          + Add New
        </Link>
      </div>
      {/* <div className="Small-Wrapper">
        <div className="Filter justify-content-between">
          <div className="FilterLeft">
            <div className="form-group">
              <label>Search</label>
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                value={getSearch?.search}
                name="search"
                onChange={(e) => setGetSearch((prev)=>({...prev,[e.target.name]:e.target.value}))}
              />
            </div>
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Search"
                value={getSearch?.fromDate}
                name="fromDate"
                onChange={(e) => setGetSearch((prev)=>({...prev,[e.target.name]:e.target.value}))}
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Search"
                value={getSearch?.toDate}
                name="toDate"
                onChange={(e) => setGetSearch((prev)=>({...prev,[e.target.name]:e.target.value}))}
              />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button className="Button" onClick={HandleSearch}>Apply</button>
              <button className="Button Cancel">
                <i className="fa fa-refresh" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="banner-coupon">
        <div className="TableList">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Banner Id</th>
                <th>Banner Title</th>
                <th>Banner image</th>
                <th>Uploaded on</th>
                <th>Last Updated on</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : Array.isArray(DealBannerListdata) &&
                DealBannerListdata.length > 0 ? (
                DealBannerListdata?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.dealbannerId}</td>
                      <td>{item?.dealbannerTitle}</td>
                      <td>
                        <figure>
                          <img
                            src={`${item?.dealbannerImage}`}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              border: "1px solid #ddd",
                              borderRadius: "0px",
                            }}
                            alt=""
                          />
                        </figure>
                      </td>
                      <td>{item?.createdAt.substring(0, 10)}</td>
                      <td>{item?.updatedAt.substring(0, 10)}</td>
                      <td>
                        <div className="Actions">
                          <Link
                            to={'EditDealsBanner'}
                            className="Green"
                            data-toggle="modal"
                            data-target="#DealsBannerEdit"
                            onClick={() =>
                              dispatch(
                                InsertEditDealBannerID({
                                  id: item?._id,
                                  title: item?.dealbannerTitle,
                                  image: item?.dealbannerImage,
                                })
                              )
                            }
                          >
                            <i className="fa fa-pencil" />
                          </Link>
                          <a
                            className="Red"
                            data-toggle="modal"
                            data-target="#DeleteModal"
                            onClick={() => SetIdForDelete(item?._id)}
                          >
                            <i className="fa fa-trash" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10}>There is no data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <a onClick={handlePagesDecrease}>
            <span>
              <i className="fa fa-caret-left" aria-hidden="true" />
            </span>
          </a>
          {arr?.map((item) => {
            return (
              <a
                onClick={() => FetchDataOnPages(item)}
                className={`${page === item && "active"}`}
              >
                {item}
              </a>
            );
          })}
          <a onClick={handlePagesIncrease}>
            <span>
              <i className="fa fa-caret-right" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
      <div className="ModalBox">
        <div id="DeleteModal" className="modal fade" aria-hidden="true">
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
                  <p>Are you sure you want to delete this banner ?</p>
                  <h4>
                    <a href="javascript:void(0);" data-dismiss="modal">
                      no
                    </a>
                    <a
                      href="javascript:void(0);"
                      onClick={handleDelete}
                      data-dismiss="modal"
                    >
                      Yes
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet/> 
    </>
  );
};

export default DealBanners;
