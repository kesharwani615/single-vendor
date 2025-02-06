import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const OrderManagment = () => {
  const location = useLocation().pathname;

  const [heading,setHeading] = useState("Booking Management");
  const [TabActive,setTabActive] = useState("/OrderManagment/ActiveBooking");

   useEffect(() =>{
    console.log("location:",location);
    if(location === "/OrderManagment/ActiveBooking"){
      setTabActive("/OrderManagment/ActiveBooking")
      setHeading("Booking Management");
    }
    if(location === "/OrderManagment/OrderCompleted"){
      setTabActive("/OrderManagment/OrderCompleted")
      setHeading("Order Management");
    }
    if(location === "/OrderManagment/OrderReturnd"){
      setTabActive("/OrderManagment/OrderReturnd")
      setHeading("Booking Management");
    }
  },[location]);

  return ( 
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox mb-2">
            <h2>{heading}</h2>
          </div>
          <div className="CommonLinks">
            <ul>
              <li className={TabActive ==='/OrderManagment/ActiveBooking' && `active`}> 
                <Link to={'/OrderManagment/ActiveBooking'}>Active Booking</Link>
              </li>
              <li className={TabActive ==='/OrderManagment/OrderCompleted' && `active`}>
                <Link to={'/OrderManagment/OrderCompleted'}>Completed Booking</Link>
              </li> 
              <li className={TabActive ==='/OrderManagment/OrderReturnd' && `active`}> 
                <Link to={'/OrderManagment/OrderReturnd'}>Cancelled Booking</Link>
              </li>
            </ul>
          </div>
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default OrderManagment;
