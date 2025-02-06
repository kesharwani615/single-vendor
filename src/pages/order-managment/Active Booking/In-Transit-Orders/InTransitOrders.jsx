import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../../../common/Loader/Loader";

const InTransitOrders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { loading } = useSelector((state) => state.BookingManagement);

  useEffect(() => {
    // dispatch(GetOrderslistBookingManagementSlice()).then((res)=>{
    //   setData(res?.payload?.data)
    // })
  }, []);

  return (
    <>
      <div>
        <div className="Small-Wrapper">
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
                <button className="Button" style={{marginRight:'10px'}}>Apply</button>
                <button className="Button Cancel">
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
            {/* <div className="FilterRight">
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
            </div> */}
          </div>
        </div>
        <div className="TableList">
          <table style={{ width: "180%" }}>
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
                <th>Update Booking status</th>
                <th>View Booking details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={13}>
                    <Loader />
                  </td>
                </tr>
              ) : Array.isArray(data) && data?.length > 0 ? (
                <tr>
                  <td>1</td>
                  <td>O-344</td>
                  <td>22-Feb-2022, 09:00 AM</td>
                  <td>lorem</td>
                  <td>lorem</td>
                  <td>1234567</td>
                  <td style={{ width: 400 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    labore facilis autem rerum ipsum obcaecati minima dolorem
                    modi, officia incidunt reprehenderit laborum sunt vitae ex,
                    earum fugit facere saepe blanditiis!{" "}
                    <a href="#">view more</a>
                  </td>
                  <td>2</td>
                  <td>100</td>
                  <td>Online</td>
                  <td>
                    <Link
                      to={
                        "/OrderManagment/ActiveBooking/ConfirmedBooking/AddDecoratorPartnerDetails"
                      }
                    >
                      <span
                        className="Green"
                        data-toggle="modal"
                        data-target="#AddDecoratorPartnerModal"
                      >
                        Add
                      </span>
                    </Link>
                  </td>
                  {/* <td><span class="Green" data-toggle="modal" data-target="#AddSupplierModal">Add</span></td> */}
                  <td>
                    <div className="Actions">
                      <Link
                        className="Blue"
                        to={"/OrderManagment/OrderActiveConfirmDetails"}
                      >
                        <i className="fa fa-eye" />
                      </Link>
                      <Link
                        to={
                          "/OrderManagment/ActiveBooking/ConfirmedBooking/CancelOrder"
                        }
                        href="javascript:void(0);"
                        className="RedCancel"
                        data-toggle="modal"
                        data-target="#CancelOrder"
                      >
                        Cancel
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={13}>There is no data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InTransitOrders;
