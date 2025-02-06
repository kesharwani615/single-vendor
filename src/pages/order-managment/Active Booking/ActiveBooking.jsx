import React from "react";
import { Link, Outlet } from "react-router-dom";

const ActiveBooking = () => {
  return (
    <>
    <div>
      {/* <div className="TitleBox mb-2">
        <h2>Booking Management</h2>
      </div>
      <div className="CommonLinks">
        <ul>
          <li className="active">
            <Link to={'/OrderManagment/ActiveBooking'}>Active Booking</Link>
          </li>
          <li>
            <Link to={'/OrderManagment/OrderCompleted'}>Completed Booking</Link>
          </li> 
          <li> 
            <Link to={'/OrderManagment/OrderReturnd'}>Cancelled Booking</Link>
          </li>
        </ul>
      </div> */}
      <div className="CommonTabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to={'/OrderManagment/ActiveBooking/ConfirmedBooking'}
              className="nav-link active"
              data-toggle="tab"
            >
              Confirmed Booking
            </Link>
          </li>
          <li className="nav-item">
            <Link
            to={'/OrderManagment/ActiveBooking/InTransitOrders'}
            className="nav-link" data-toggle="tab">
              In-Transit Booking
            </Link>
          </li>
        </ul>
      </div>
      <div className="tab-content">
       <Outlet/>
      </div>
    </div>
    </>
  );
};

export default ActiveBooking;
