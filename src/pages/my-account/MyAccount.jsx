import React from 'react'

const MyAccount = () => {
  return (
    <>
      <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="Small-Wrapper">
        <div className="PasswordBox">
          <aside>
            <div className="TitleBox">
              <h2>My Account</h2>
            </div>
            <figure>
              <img src="images/user.avif" alt="" />
            </figure>
          </aside>
          <article>
            <div className="CommonForm">
              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full name"
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email address"
                />
              </div>
              <div className="form-group">
                <label>Contact number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Contact number"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                />
              </div>
              <button className="Button">Save Details</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</>

    </>
  )
}

export default MyAccount
