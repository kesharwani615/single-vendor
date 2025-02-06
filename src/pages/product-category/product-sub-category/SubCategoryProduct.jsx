import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  DeleteSubCategoryProductSlice,
  GetSubCategoryProductSlice,
} from "../../../redux/features/ProductCategorySlice";
import { Loader } from "../../../common/Loader/Loader";
import AddSubCategory from "./Add Sub Category/AddSubCategory";
import EditSubCategory from "./Edit Sub Category/EditSubCategory";

const SubCategoryProduct = () => {
  const { id: state } = useParams();
  const dispatch = useDispatch();
  const [subCategory, setSubCategory] = useState({});
  const [dataForSend, setDataForSend] = useState({});

  const { loading, EditedSubProductCategory, createdSubCategory,DeleteSubCategory } = useSelector(
    (state) => state.ProductCategory
  );

  useEffect(() => {
    dispatch(GetSubCategoryProductSlice(state)).then((res) => {
      const dummyData = res?.payload?.data?.subcategory;
      setSubCategory(dummyData);
    });
  }, [EditedSubProductCategory, createdSubCategory,DeleteSubCategory]);

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h2>List of Sub Category</h2>
              <Link
                to={"AddSubCategory"}
                className="Button"
                data-toggle="modal"
                data-target="#NotificationAdd"
              >
                Add new sub category
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
                    />
                  </div>
                  <div className="form-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="form-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="form-group">
                    <label>&nbsp;</label>
                    <button className="Button" style={{ marginRight: "10px" }}>
                      Apply
                    </button>
                    <button className="Button Cancel">
                      <i className="fa fa-refresh" />
                    </button>
                  </div>
                </div>
                <div className="FilterRight">
                  <div className="form-group">
                    <label>By Sort</label>
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
                    <th>S.No.</th>
                    <th>Subcat Id</th>
                    <th>Sub-Category Image</th>
                    <th>Sub-Category Name</th>
                    <th>Created On</th>
                    <th>View Sub-Category</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    subCategory?.length > 0 ? (
                      subCategory?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.subcatId}</td>
                            <td>
                              <figure>
                                <img src={item?.subcategoryImage} alt="" />
                              </figure>
                            </td>
                            <td>{item?.subcategoryName}</td>
                            <td>{item?.createdAt.substring(0, 10)}</td>
                            <td>
                              <div className="Actions">
                                <a className="Blue" href="javascript:void(0);">
                                  <i className="fa fa-eye" />
                                </a>
                              </div>
                            </td>
                            <td>
                              <span
                                className={item?.isActive ? "Green" : "Red"}
                              >
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
                                <a
                                  className="Green"
                                  data-toggle="modal"
                                  data-target="#NotificationEdit"
                                  onClick={() => setDataForSend({ data: item })}
                                >
                                  <i className="fa fa-pencil" />
                                </a>
                                <a
                                  className="Red"
                                  data-toggle="modal"
                                  data-target="#DeleteModal"
                                  onClick={() =>
                                    setDataForSend((prev) => ({
                                      ...prev,
                                      id: item._id,
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
              <a href="#">
                <span>
                  <i className="fa fa-caret-left" aria-hidden="true" />
                </span>
              </a>
              <a href="#">1</a>
              <a href="#" className="active">
                2
              </a>
              <a href="#">3</a>
              <a href="#">
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
                    <p>Are you sure you want to Delete this category ?</p>
                    <h4>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        no
                      </a>
                      <a
                        href="javascript:void(0);"
                        onClick={() =>
                          dispatch(
                            DeleteSubCategoryProductSlice(dataForSend.id)
                          )
                        }
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
          {/* <div
            id="NotificationAdd"
            className="modal fade"
            aria-hidden="true"
            style={{ display: "none" }}
          >
          <AddSubCategory/>
          </div> */}
          <div id="NotificationEdit" className="modal fade" role="dialog">
            <EditSubCategory EditItem={dataForSend.data} />
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
        <Outlet />
      </>
    </>
  );
};

export default SubCategoryProduct;
