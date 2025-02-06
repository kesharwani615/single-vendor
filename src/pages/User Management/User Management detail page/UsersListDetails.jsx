import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import BasicPersonal from './BasicPersonal/BasicPersonal';
import BookingHistory from './BookingHistory/BookingHistory';

const UsersListDetails = () => {

  const {id} = useParams();
  const {pathname} = useLocation();
  const [activeTab,setActiveTab] = useState(pathname.split('/').splice(1));

  console.log("id:",id)

  return (
    <>
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h2>Users Details</h2>
        </div>
        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to={`${id}/BasicPersonal`} className={`nav-link ${activeTab.includes('BasicPersonal') && 'active'} `} data-toggle="tab" >
                Basic Personal
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`${id}/BookingHistory`}  className={`nav-link ${activeTab.includes('BookingHistory') && 'active'} `} data-toggle="tab">
                Booking History
              </Link>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {/* <div className="tab-pane active" id="Profile">
           <BasicPersonal data={state}/>
          </div>
          <div className="tab-pane fade" id="History">
           <BookingHistory/>
          </div> */}
          <Outlet/>
        </div>
      </div>
    </div>
  
  </>
  
  )
}

export default UsersListDetails
