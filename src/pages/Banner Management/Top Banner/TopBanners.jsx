import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteBannerSlice,
  GetBannerListSlice,
  InsertEditBannerID,
  SearchBannerSlice,
} from "../../../redux/features/BannerManagementSlice";

import { Loader } from "../../../common/Loader/Loader";
import { Link, Outlet } from "react-router-dom";

const TopBanners = () => {
  const dispatch = useDispatch();
  const [BannerListdata, setBannerListdata] = useState([]);
  const [pagination, setPagination] = useState({});
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [idForDelete, SetIdForDelete] = useState(null);
  const [getSearch, setGetSearch] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    page: 1,
  });
  const [page, setPage] = useState(1);

  const { updatedBanner, AddBannerManagent, loading } = useSelector(
    (state) => state.bannerManagement
  );

  useEffect(() => {
    console.log("updatedBanner:", updatedBanner);

    let dataSet = "";
    for (const [name, searchData] of Object.entries(getSearch)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }

    dispatch(GetBannerListSlice(dataSet)).then((res) => {
      console.log("res?.payload?.data.banners:",res?.payload?.data.banners)
      setBannerListdata(res?.payload?.data.banners);
      setPagination(res?.payload?.data?.pagination);
    });
  }, [updatedBanner, AddBannerManagent]);

  // useEffect(() => {
  //   dispatch(GetBannerListSlice()).then((res) => {
  //     setBannerListdata(res?.payload?.data.banners);
  //     setPagination(res?.payload?.data?.pagination);
  //   });
  // }, []);

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
    console.log("handleIncrease:", handleArrforPage);
    if (handleArrforPage + 3 < pagination?.totalPages) {
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

    dispatch(GetBannerListSlice(dataSet)).then((res) => {
      setBannerListdata(res?.payload?.data.banners);
      setPagination(res?.payload?.data?.pagination);
    });
  };
  const handleDelete = () => {
    dispatch(DeleteBannerSlice(idForDelete)).then((res) => {
      dispatch(GetBannerListSlice()).then((res) => {
        setBannerListdata(res?.payload?.data.banners);
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

      dispatch(GetBannerListSlice(dataSet)).then((res) => {
        setBannerListdata(res?.payload?.data);
      });
    }
  };

  return (
    <>
      {" "}
      <div className="banner-coupon">
        <div className="TitleBox justify-content-end">
          <Link
            to={"AddBanner"}
            className="Button"
            data-toggle="modal"
            data-target="#BannersAddModal"
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
                  name="search"
                  value={getSearch?.search}
                  onChange={(e) => setGetSearch((prev)=>({...prev,[e.target.name]:e.target.value}))}
                />
              </div>
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  value={getSearch?.fromDate}
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
                <button className="Button" onClick={HandleSearch}>
                  Apply
                </button>
                <button
                  className="Button Cancel"
                  onClick={() => {
                    dispatch(GetBannerListSlice()).then((res) => {
                      setBannerListdata(res?.payload?.data.banners);
                      setPagination(res?.payload?.data?.pagination);
                      setGetSearch("");
                    });
                  }}
                >
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="TableList">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Banner Id</th>
                <th>Banner Title</th>
                <th>Banner image</th>
                <th>Uploaded on</th>
                <th>Last Updated On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : Array.isArray(BannerListdata) && BannerListdata.length > 0 ? (
                BannerListdata?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.bannerId}</td>
                      <td>{item?.bannerTitle}</td>
                      <td>
                        <figure>
                          <img
                            src={`${item?.bannerImage}`}
                            style={{
                              width: "60px",
                              height: "60px",
                              "object-fit": "cover",
                              "border-radius": "0px",
                            }}
                            alt="internal server error"
                          />
                        </figure>
                      </td>
                      <td>{item?.createdAt.substring(0, 10)}</td>
                      <td>{item?.updatedAt.substring(0, 10)}</td>
                      <td>
                        <div className="Actions">
                          {/* <label class="switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                          </label> */}
                          <Link
                            to={'EditBanners'}
                            className="Green"
                            data-toggle="modal"
                            data-target="#BannerEditModal"
                            style={{cursor:'pointer'}}
                            onClick={() =>
                              dispatch(
                                InsertEditBannerID({
                                  id: item?._id,
                                  title: item?.bannerTitle,
                                  image: item?.bannerImage,
                                  bannerDescription: item?.bannerDescription,
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
          {arr?.map((item, index) => {
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

export default TopBanners;
