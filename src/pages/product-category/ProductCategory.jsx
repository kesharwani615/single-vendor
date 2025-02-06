import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  DeleteCategoryProductSlice,
  GetProductCategorySlice,
} from "../../redux/features/ProductCategorySlice";
import { Loader } from "../../common/Loader/Loader";
import useParamsFormat from "../../common/Params Values format/ParamsFormat";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState({});
  const [dataForSend, setDataForSend] = useState({});
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

  const { createDataSetParams } = useParamsFormat();

  // const { loading,} = useSelector((state) => state.ProductCategory);

  const {loading,EditedProductCategory, createdCategory,DeleteCategory } = useSelector(
    (state) => state.ProductCategory
  );

  useEffect(() => {
    console.log("createdCategory:",createdCategory)
    dispatch(GetProductCategorySlice(createDataSetParams(getSearch))).then(
      (res) => {
        const dummyData = res?.payload?.data?.category;
        setPagination(res?.payload?.data?.pagination);
        setCategoryList(dummyData);
      }
    );
  }, [createdCategory, EditedProductCategory,DeleteCategory]);

  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 3)
      );
    }
  }, [pagination, handleArrforPage]);

  // const handlePagesIncrease = () => {
  //   console.log("handleIncrease:", handleArrforPage);
  //   if (handleArrforPage + 3 <= pagination?.totalPages) {
  //     setHandleArrforPage((prev) => prev + 3);
  //   }
  // };

  // const handlePagesDecrease = () => {
  //   if (handleArrforPage > 2) {
  //     setHandleArrforPage((prev) => prev - 3);
  //   }
  // };

  // const FetchDataOnPages = (pageNum) => {
  //   setPage(pageNum);
  //   setGetSearch((prev) => ({ ...prev, page: pageNum }));

  //   dispatch(
  //     GetProductCategorySlice({
  //       ...getSearch,
  //       page: pageNum,
  //     })
  //   ).then((res) => {
  //     console.log("res", res);
  //     const dummyData = res?.payload?.data?.category;
  //     setPagination(res?.payload?.data?.pagination);
  //     setCategoryList(dummyData);
  //   });
  // };

  const handleDelete = () => {
    dispatch(DeleteCategoryProductSlice(dataForSend?.id)).then((res) => {
      dispatch(GetProductCategorySlice(createDataSetParams(getSearch))).then(
        (res) => {
          const dummyData = res?.payload?.data?.category;
          setPagination(res?.payload?.data?.pagination);
          setCategoryList(dummyData);
        }
      );
    });
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h2>List of Product Category</h2>
            <Link
              to={"AddCategory"}
              data-toggle="modal"
              data-target="#AddCategory"
              className="Button"
            >
              Add new
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
                  <button className="Button">Apply</button>
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
                  <th>cat Id</th>
                  <th>Category Image</th>
                  <th>Category Name</th>
                  <th>Created On</th>
                  <th>Status</th>
                  <th>Change Status</th>
                  <th>View category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  Array.isArray(categoryList) && categoryList?.length > 0 ? (
                    categoryList?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.catId}</td>
                          <td>
                            <figure>
                              <img
                                src={item?.categoryImage}
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                                alt="internal server error"
                              />
                            </figure>
                          </td>
                          <td>{item?.categoryName}</td>
                          <td>{item?.createdAt?.substring(0, 10)}</td>
                          <td>
                            <span className={item?.isActive ? "Green" : "Red"}>
                              {item?.isActive ? "Active" : "inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="Actions">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={item?.isActive}
                                />
                                <span className="slider" />
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="Actions">
                              <Link
                                className="Blue"
                                to={`SubCategoryProduct/${item._id}`}
                                state={item?._id}
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div className="Actions">
                              <Link
                                to={`ProductEdit/${item._id}`}
                                className="Green"
                                data-toggle="modal"
                                data-target="#NotificationEdit"
                                onClick={() => setDataForSend({ data: item })}
                              >
                                <i className="fa fa-pencil" />
                              </Link>
                              <a
                                className="Red"
                                data-toggle="modal"
                                data-target="#DeleteModal"
                                onClick={() =>
                                  setDataForSend((prev) => ({
                                    ...prev,
                                    id: item?._id,
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
                  ) : (
                    <tr>
                      <td colSpan={9}>There is no category</td>
                    </tr>
                  )
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="pagination">
            <a onClick={handlePagesDecrease}>
              <span>
                <i className="fa fa-caret-left" aria-hidden="true" />
              </span>
            </a>
            {arr?.map((item, index) => {
              return (
                <a
                  onClick={() => FetchDataOnPages(item)}
                  className={page === item && "active"}
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
          </div> */}
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
                    <a
                      href="javascript:void(0);"
                      data-dismiss="modal"
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
        {/* <div id="AddCategory" className="modal fade" aria-hidden="true">
        <AddCategory/>
        </div> */}
        {/* <div
          id="AddCustomizedProduct"
          className="modal fade"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                  >
                    ×
                  </a>
                  <h3>Create New Category</h3>
                  <div className="form-group">
                    <label>Choose From Available List</label>
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload</span>
                        <input type="file" />
                      </div>
                    </div>
                  </div>
                  <span className="PlusIcon">
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                  <h2
                    style={{
                      color: "#000",
                      fontWeight: 700,
                      fontSize: 16,
                      margin: "0 0 20px 0",
                      textAlign: "center",
                    }}
                  >
                    Or
                  </h2>
                  <div className="form-group">
                    <label>Customize Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Customize Product Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Images</label>
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload</span>
                        <input type="file" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Customize Product Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Write here.."
                      rows={4}
                      defaultValue={""}
                    />
                  </div>
                  <a href="javascript:void(0);" className="Button">
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div id="NotificationEdit" className="modal fade" role="dialog">
        <EditCategory data={dataForSend.data}/>
        </div> */}
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
      <Outlet />
    </>
  );
};

export default ProductCategory;
