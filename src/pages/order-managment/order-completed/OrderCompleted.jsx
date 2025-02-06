import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../../common/Loader/Loader";
import { GetCompletedOrderslistBookingManagementSlice } from "../../../redux/features/BookingManagementSlice";

const OrderCompleted = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { loading } = useSelector((state) => state.BookingManagement);

  useEffect(() => {
    dispatch(GetCompletedOrderslistBookingManagementSlice()).then((res) => {
      console.log("res:", res);
      setData(res?.payload?.data.completed);
    });
  }, []);

  return (
    <>
      <>
        <>
          <div className="Small-Wrapper">
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
                  <button className="Button" style={{ marginRight: "10px" }}>
                    Apply
                  </button>
                  <button className="Button Cancel">
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
              {/* <div className="FilterRight">
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
              </div> */}
            </div>
          </div>
          <div className="TableList">
            <table style={{ width: "160%" }}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Booking Id</th>
                  <th>Booking Date &amp; Time</th>
                  <th>Customer id</th>
                  <th>Customer name</th>
                  <th>Customer contact details</th>
                  <th>Decorator address</th>
                  <th>Item quantity</th>
                  <th>Amount (in TZS)</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>View Booking details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader />
                ) : Array.isArray(data) && data?.length > 0 ? (
                  data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item?.bookingId}</td>
                        <td>22-Feb-2022, 09:00 AM</td>
                        <td>{item?.customerId}</td>
                        <td>lorem</td>
                        <td>1234567</td>
                        <td style={{ width: 400 }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Vel labore facilis autem rerum ipsum obcaecati
                          minima dolorem modi, officia incidunt reprehenderit
                          laborum sunt vitae ex, earum fugit facere saepe
                          blanditiis! <a href="#">view more</a>
                        </td>
                        <td>2</td>
                        <td>100</td>
                        <td>Online</td>
                        <td>
                          <span className="Green">Completed</span>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="order-completed-details.html"
                            >
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={13}>There is no data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
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

export default OrderCompleted;
