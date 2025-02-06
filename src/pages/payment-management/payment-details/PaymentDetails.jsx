import React from 'react'

const PaymentDetails = () => {
  return (
    <>
     <div className="WrapperArea">
  <div className="WrapperBox">
    {/* <div class="TitleBox">
          <h2>View History</h2>                    
      </div> */}
    <div className="OrderDetails">
      <h5>Payment Details</h5>
      <article>
        <aside>
          <p>
            <label>Transaction ID</label>
            <span>T-030</span>
          </p>
          <p>
            <label>Transaction Date &amp; Time</label>
            <span>01/01/2023 &amp; 01:01</span>
          </p>
          <p>
            <label>Booking ID</label>
            <span>#959595944</span>
          </p>
          <p>
            <label>Customer ID</label>
            <span>#5894859494</span>
          </p>
        </aside>
        <aside>
          <p>
            <label>Customer Name</label>
            <span>Rahul</span>
          </p>
          <p>
            <label>Amount (in Rs.)</label>
            <span>Rs. 500</span>
          </p>
          <p>
            <label>Total Amount</label>
            <span>Rs. 1000</span>
          </p>
          <p>
            <label>Payment Status</label>
            <span>Successful</span>
          </p>
        </aside>
      </article>
    </div>
  </div>
</div> 
    </>
  )
}

export default PaymentDetails
