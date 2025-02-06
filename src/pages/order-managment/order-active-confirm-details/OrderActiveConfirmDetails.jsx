import React from 'react'

const OrderActiveConfirmDetails = () => {
  return (
    <>
     <>
  <>
    <>
      {/* <div class="TitleBox">
          <h2>View History</h2>                    
      </div> */}
      <div className="OrderDetails">
        <h5>Booking Details</h5>
        <article>
          <aside>
            <p>
              <label>Booking Number</label>
              <span>U-030</span>
            </p>
            <p>
              <label>Placed On</label>
              <span>01/01/2023 &amp; 01:01</span>
            </p>
          </aside>
          <aside>
            <p>
              <label>Payment Status</label>
              <span>Cancelled</span>
            </p>
            <p>
              <label>Total Amount</label>
              <span>Rs. 1,512.00</span>
            </p>
          </aside>
        </article>
      </div>
      <div className="OrderDetails">
        <h5>Customer Details</h5>
        <article>
          <aside>
            <p>
              <label>Customer Id</label>
              <span>customid1</span>
            </p>
            <p>
              <label>Customer Name</label>
              <span>Lorem Ipsum</span>
            </p>
          </aside>
          <aside>
            <p>
              <label>Customer Contact Details</label>
              <span>1234567</span>
            </p>
          </aside>
        </article>
      </div>
      <div className="OrderDetails">
        <h5>Item(s) List</h5>
        <article>
          <figure>
            <img src="images/Avatar-2.png" />
          </figure>
          <aside>
            <p>
              <label>Name of the product</label>
              <span>lorem</span>
            </p>
          </aside>
          <aside>
            <p>
              <label>Qty</label>
              <span>1</span>
            </p>
          </aside>
        </article>
        <article>
          <figure>
            <img src="images/Avatar-2.png" />
          </figure>
          <aside>
            <p>
              <label>Name of the product</label>
              <span>lorem</span>
            </p>
          </aside>
          <aside>
            <p>
              <label>Qty</label>
              <span>1</span>
            </p>
            {/* <p>
                      <label>Size</label>
                      <span>lorem</span>
                  </p> */}
          </aside>
        </article>
      </div>
      <div className="OrderDetails">
        <h5>Venue Address</h5>
        <article>
          <aside>
            <p>
              <label>Full Name</label>
              <span>Rahul Bhawaliya</span>
            </p>
            <p>
              <label>Mobile Number </label>
              <span>(+91 9865321470)</span>
            </p>
            <p>
              <label>Address</label>
              <span>
                House Number/Flat No./Office No. <br />
                Road name, Area Name, Society Name <br />
                City, Region, Country <br />
                Pin Code
              </span>
            </p>
          </aside>
        </article>
      </div>
      <div className="OrderDetails">
        <h5>Price Details</h5>
        <article>
          <aside>
            <p>
              <label>Total Amount</label>
              <span>Rs. 10.00</span>
            </p>
            <p>
              <label>GST</label>
              <span>10%</span>
            </p>
            <p>
              {/* <label>Decorator Charges</label>
                      <span>Rs. 10.00</span> */}
            </p>
            <hr />
            <p>
              <label>You Pay</label>
              <span>Rs. 10.00</span>
            </p>
          </aside>
        </article>
      </div>
    </>
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
  )
}

export default OrderActiveConfirmDetails
