import React from 'react'

const Dashboard = () => {
  return (
    <>
     <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h2>Dashboard Statistics</h2>
      </div>
      <div>
        <div className="TitleBox">
          <h2>Users</h2>
        </div>
        <div className="DashboardBox">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>1500</h3>
                  <p>Total Registered Users</p>
                </aside>
              </a>
            </li>
          </ul>
        </div>
        <div className="TitleBox">
          <h2>Product</h2>
        </div>
        <div className="DashboardBox">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>1500</h3>
                  <p>Total Product Category</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>1500</h3>
                  <p>Total Listed Product</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>1500</h3>
                  <p>Best Selling Product</p>
                </aside>
              </a>
            </li>
          </ul>
        </div>
        <div className="TitleBox">
          <h2>Bookings</h2>
        </div>
        <div className="DashboardBox">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>60</h3>
                  <p>Total Booking</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>60</h3>
                  <p>Total Pending Booking</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>60</h3>
                  <p>Total Cancelled Booking</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>60</h3>
                  <p>Total Completed Booking</p>
                </aside>
              </a>
            </li>
          </ul>
        </div>
        <div className="TitleBox">
          <h2>Cancellation Request</h2>
        </div>
        <div className="DashboardBox">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>50</h3>
                  <p>Total No. of cancellation Request</p>
                </aside>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>50</h3>
                  <p>Cancelled requests</p>
                </aside>
              </a>
            </li>
          </ul>
        </div>
        <div className="TitleBox">
          <h2>Refund Request</h2>
        </div>
        <div className="DashboardBox">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <aside>
                  <span className="Icon">
                    <i className="fa fa-user-secret" aria-hidden="true" />
                  </span>
                  <h3>60</h3>
                  <p>Total Product Category</p>
                </aside>
              </a>
            </li>
          </ul>
        </div>
      </div>
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
</>
 
    </>
  )
}

export default Dashboard
