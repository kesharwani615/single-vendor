import React from 'react'
import { Link } from 'react-router-dom'

const OTPVarification = () => {
  return (
    <>
      <div className="LoginArea">
  <div className="LoginBox">
    <div className="LoginLeft">
      <h2>
        Sinlge<span>Vendor</span>
      </h2>
      <h3>
        <span>OTP Verification</span>
      </h3>
      <h4>Please enter the code sent to you on ....16301</h4>
      <form>
        <div className="form-group">
          <div className="OTPBox">
            <input type="text" className="form-control" maxLength={1} />
            <input type="text" className="form-control" maxLength={1} />
            <input type="text" className="form-control" maxLength={1} />
            <input type="text" className="form-control" maxLength={1} />
            <input type="text" className="form-control" maxLength={1} />
            <input type="text" className="form-control" maxLength={1} />
          </div>
          <p className="text-right">
            <a>Resend</a>
          </p>
        </div>
        {/* <button class="Login">Submit</button>  */}
        <Link className="Login" to={'/'}>
          Verify otp
        </Link>
      </form>
    </div>
    {/* <div class="LoginRight">
          <img src="images/bg.jpg" alt="">
      </div> */}
  </div>
</div>

    </>
  )
}

export default OTPVarification
