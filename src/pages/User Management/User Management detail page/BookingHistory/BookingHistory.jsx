import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const BookingHistory = () => {
  
  return (
    <>
      <div className="Small-Wrapper">
              <div className="Filter">
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
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Timeframe</label>
                  <select className="form-control">
                    <option value="select">--Select--</option>
                    <option value="select">Today</option>
                    <option value="Month">This Week</option>
                    <option value="Month">This Month</option>
                    <option value="Month">This Year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>&nbsp;</label>
                  <button className="Button">Apply</button>
                  <button className="Button Cancel">
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
            <div className="TableList">
              <table style={{ width: "130%" }}>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Booking Id</th>
                    <th>Booking Date &amp; Time</th>
                    <th>Decorator Address</th>
                    <th>Item Quantity</th>
                    <th>Amount(in TZS)</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Booking Status</th>
                    <th>View Booking Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>B-302</td>
                    <td>22-Feb-2022 01:01</td>
                    <td>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam egestas vel tellus ac porta. Vivamus vel ante
                        pulvinar,……….. View More
                      </p>
                    </td>
                    <td>1</td>
                    <td>1000</td>
                    <td>Online</td>
                    <td>Completed</td>
                    <td>
                      <span className="Green">Delivered</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <Link className="Blue" to={'/UsersManagement/UsersListDetails/BookingHistory/UserHistory'}>
                          <i className="fa fa-eye" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagination">
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
            </div> 
            
    </>
  )
}

export default BookingHistory
